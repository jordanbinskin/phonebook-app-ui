import React, { useState, useEffect } from 'react'
import phoneBook from './services/phoneBook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    phoneBook
      .getBook()
      .then(contacts => setPersons(contacts))
  }, [])

  const updateBook = (e) => {
    e.preventDefault();
    const id = persons.reduce((match, persons) => {
      if (persons.name === newName) return persons.id
      return match;
    }, undefined)

    if (!persons.every((person) => person.name !== newName)) {
      if (window.confirm(`${newName} exists already, would you like to replace the number with the one provided?`)) {
        phoneBook
          .changeNumber(id, {name: newName, number: newNum})
          .then((updatedContact) => setPersons(persons.map((person) => 
            person.id === updatedContact.id ? updatedContact : person
          )))
      };
      return;
    }

    let person = {
      name: newName,
      number: newNum
    }

    phoneBook.newContact(person)
      .then((newContact) => {
        setPersons([...persons, newContact])
        setNewName('')
        setNewNum('')
      })
  }

  const numbers = (contactList) => contactList.map((person, i) => {
    return (
    <div key={person.name}>
      {person.name} {person.number}
      <button onClick={() => deletePrompt(person)}>Delete contact</button>
    </div>
    )
  })

  const deletePrompt = (person) => {
    let { id, name } = person;
    if (window.confirm(`Do you really want to delete ${name}`)) {
      phoneBook.deleteContact(id)
      .then(() => setPersons(persons.filter((person) => person.id !== id)))
    }
  }

  const contactFilter = () => {
    const match = filter.toLowerCase();
    return persons.filter(person => person.name.toLowerCase().includes(match))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter for: <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      <h3>Add a new</h3>
      <form onSubmit={updateBook}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNum} onChange={(e) => setNewNum(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {numbers(contactFilter())}
    </div>
  )
}

export default App