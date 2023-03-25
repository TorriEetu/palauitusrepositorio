import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import PersonServices from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    PersonServices.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    const newPerson = persons.filter((x) => x.name === newName);
    if (newPerson.length !== 0) {
      if (
        window.confirm(
          `${newPerson[0].name} is already added to the phonebook, replace the old number with a new one ?`
        )) {
        PersonServices.update(newPerson[0].id, nameObject)
          .then((returnPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== newPerson[0].id ? person : returnPerson
              )
            );
            setNotification([`${newName} was successfully updated`, true])
            setTimeout(() => {
              setNotification(null)
            }, 3000)
          })
          .catch((error) => {
            setNotification([
              `'${newName}' was already deleted from server`,
              false,
            ])
            setTimeout(() => {
              setNotification(null)
            }, 3000)
            setPersons(persons.filter((n) => n.id !== newPerson[0].id));
          });
      }
    } else {
      PersonServices.create(nameObject)
        .then((returnPerson) => {
          setPersons(persons.concat(nameObject));
          setNotification([`${newName} was successfully added`, true]);
        })
        .catch((error) => {
          setNotification([`${error.response.data.error}`, false])
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        }
        );
        
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (event) => {
    const filteredPerson = persons.filter((person) => person.id === event);
    if (window.confirm(`Delete ${filteredPerson[0].name} ?`)) {
      PersonServices.remove(filteredPerson[0].id);
      setNotification([`${filteredPerson[0].name} was successfully deleted`, true])
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
    setPersons(persons.filter((person) => person.id !== event));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      ></Filter>
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      ></PersonForm>
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        newFilter={newFilter}
        deletePerson={deletePerson}
      ></Persons>
    </div>
  );
};

export default App;
