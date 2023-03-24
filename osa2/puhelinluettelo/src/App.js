import { useState , useEffect} from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import PersonServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    PersonServices.getAll().then(persons => {
      setPersons(persons)
    })
  }, [])
  

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
    //TODO figure out if there is better way to do this
    if (persons.some((x) => x.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };
    PersonServices.create(nameObject);
    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (event) => {
    const filteredPerson = persons.filter(person => person.id === event)
    if (window.confirm(`Delete ${filteredPerson[0].name} ?`)) {
      PersonServices.remove(filteredPerson[0].id)
    }
    //Updates list after delete there is probably better way to do this
    setPersons(persons.filter(person => person.id !== event))
  };


  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson}></Persons>
    </div>
  );
};

export default App;
