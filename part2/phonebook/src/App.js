import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from "./components/Persons"
import Filter from './components/Filter'
import personService from './services/person'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(e=> alert(`server not running`, e))
  }

  useEffect(hook, [])


  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some((e)=> e.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else {
    const personObject = {
      name: newName,
      number: newNumber,      
      id: persons.length + 1,
    }
    personService
      .add(personObject)
      .then(response => setPersons(persons.concat(response)))
    setNewName('')
    setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    console.log(newName)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    console.log(newNumber)
  } 

  const handleFilter = (event) => {
    setFilter(event.target.value)
    console.log(filter) 
  }

  const personToShow = filter.length === 0 ? persons : persons.filter(person=>person.name.toLowerCase().includes(filter.toLowerCase()))
 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm 
      submit={addPerson}
      newName={newName}
      newNumber={newNumber}
      changeName={handleNameChange}
      changeNumber={handleNumberChange}/>
      <h2>Numbers</h2> 
      <Persons key={persons.id} persons={personToShow}/>
    </div>
  )
}




export default App