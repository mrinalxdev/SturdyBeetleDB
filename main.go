package main

import (
	"encoding/json"
	"fmt"
	"os"
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

func New()(){

}

func Write() error {

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

	if err := db.Delete("user", "john"); err != nil {
		fmt.Println("Error Occured", err)
	}
	
	if err := db.Delete("user", ""); err != nil {
		fmt.Println("Error Occured", err)
	}
}