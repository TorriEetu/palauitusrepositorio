import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  /*TODO fix this atm this just deletes other values*/
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    const filtered = () =>
      persons.filter((x) => x.name.match(RegExp(newFilter, "i")));
    setPersons(filtered);
  };

  const addName = (event) => {
    event.preventDefault();
    //TODO figure out if there is better way to do this
    if (persons.some((x) => x.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(nameObject));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:{" "}
        <input input value={newFilter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
    </div>
  );
};

export default App;
