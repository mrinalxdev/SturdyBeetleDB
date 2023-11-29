package main

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sync"

	"github.com/jcelliott/lumber"
)

const Version = "1.0.0"

type (
	Logger interface {
		Fatal(string, ...interface{})
		Error(string, ...interface{})
		Info(string, ...interface{})
		Warn(string, ...interface{})
		Debug(string, ...interface{})
		Trace(string, ...interface{})
	}

 	Driver struct {
		mutex sync.Mutex 
		mutexes map[string]*sync.Mutex
		dir string
		log Logger
	}
)

type Options struct {
	Logger
}

func New(dir string, options *Options)(*Driver, error){

	dir = filepath.Clean(dir)

	opts := Options{}

	if options != nil {
		opts = *options
	}

	if opts.Logger != nil {
		opts.Logger = lumber.NewConsoleLogger((lumber.INFO))
	}

	driver := Driver{
		dir: dir, 
		mutexes: make(map[string]*sync.Mutex),
		log : opts.Logger,
	}

	if _, err := os.Stat(dir); err == nil {
		opts.Logger.Debug("Using '%s' (database already exists)\n", dir)

		return &driver, nil
	}

	opts.Logger.Debug("Creating the Base at '%s' ....", dir)

	return &driver, os.MkdirAll(dir, 0755)
}

func (d* Driver) Write(collection, resource string, v interface{}) error {
	if collection == ""{
		return fmt.Errorf("Missing collection - No place to save")
	}

	if resource == "" {
		return fmt.Errorf("Missing resources - unable to save record (no name)")
	}

	mutex := d.getOrCreateMutex(collection)
	mutex.Lock()

	defer mutex.Unlock()

	dir := filepath.Join(d.dir, collection)

	fnlPath := filepath.Join(dir, resource + ".json")

	tmpPath := fnlPath + ".temp"

	if err := os.MkdirAll(dir, 0755); err != nil {
		return err 
	}

	b, err := json.MarshalIndent(v, "", "\t")
	if err != nil {
		return err
	}

	b = append(b, byte('\n'))

	if err := os.WriteFile(tmpPath, b, 0644) ; err != nil {
		return err
	} 

	return os.Rename(tmpPath, fnlPath)
}

func (d *Driver) Read(collection , resource string, v interface{}) error {
	if collection == "" {
		return fmt.Errorf("Missing collection - no place to save ")
	}

	if resource == "" {
		return fmt.Errorf("Missing collection - no collection to save")
	}
	record := filepath.Join(d.dir , resource)

	if _, err := stat(record); err != nil {
		return nil
	}

	b, err := os.ReadFile(record + ".json")

	if err != nil {
		return err 
	}

	return json.Unmarshal(b, &v)
}

func (d *Driver) ReadAll(collection string)([]string, error) {
	if collection == "" {
		return nil, fmt.Errorf("Missing Collection - unable to read")
	}

	dir := filepath.Join(d.dir, collection)

	if _, err := stat(dir); err != nil {
		return nil, err
	}

	files, _ := os.ReadDir(dir)

	var records []string 

	for _, file := range files {
		b, err := os.ReadFile(filepath.Join(dir, file.Name()))

		if err != nil {
			return nil, err
		}

		records = append(records, string(b))
	}

	return records, nil
}



func (d *Driver) getOrCreateMutex(collection string) *sync.Mutex {

	d.mutex.Lock()
	defer d.mutex.Unlock()
	m, ok := d.mutexes[collection]

	if !ok {
		m = &sync.Mutex{}
		d.mutexes[collection] = m
	}

	return m
}

func stat(path string)(fi os.FileInfo, err error){
	if fi, err = os.Stat(path); os.IsNotExist(err){
		fi, err = os.Stat(path + ".json")
	}
	return 
}

type Address struct {
	City string
	State string 
	Country string
	Pincode string
}

type User struct {
	Name string
	Age json.Number
	Contact string
	Company string
	Address Address
}

func main() {
	dir := "./"

	db, err := New(dir, nil)

	if err != nil {
		fmt.Println("Error Occured", err)
	}

	employees := []User{
		{"Mrinal", "19", "3423251", "Aramco", Address{"Varanasi", "Up", "India", "3424"}},
		{"Utkarsh", "18", "3423234", "Airtel", Address{"JanakPuri", "Delhi", "India", "8912"}},
		{"Prachi", "17", "3423251", "Aramco", Address{"Bhidaur", "Tamil Nadu", "India", "1321"}},
	}

	for _, value := range employees {
		db.Write("users", value.Name, User{
			Name : value.Name, 
			Age : value.Age,
			Contact : value.Contact,
			Address: value.Address,
		})
	}
	

	records, err := db.ReadAll("users")
	if err != nil {
		fmt.Println("Error Occurred", err)
	}
	fmt.Println(records)

	allUsers := []User{}

	for _, f := range records {
		employeesFound := User{}

		if err := json.Unmarshal([]byte(f), &employeesFound); err != nil {
			fmt.Println("Error Occurred", err)
		}

		allUsers = append(allUsers, employeesFound)
	}

	fmt.Println((allUsers))

	// if err := db.Delete("user", "Mrinal"); err != nil {
	// 	fmt.Println("Error Occured", err)
	// }
	
	// if err := db.Delete("user", ""); err != nil {
	// 	fmt.Println("Error Occured", err)
	// }
}