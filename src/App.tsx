import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap'
import {Routes, Route, Navigate} from "react-router-dom"


function App() {

  return (

    <Container className='my-4'>
      <Routes>
        <Route path = '/' element = {<h1>Home</h1>}/>
        <Route path = '/new' element = { <NewNote /> }/>
        <Route path='/:id' element={<Navigate to="/" />}>
          <Route index element={<h1>Show</h1>} />
          <Route path='edit' element={<h1>Edit</h1>} />
        </Route>
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </Container>
    
  )
}

export default App
