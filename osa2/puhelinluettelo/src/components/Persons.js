import React from "react";

const Persons = ({ persons, newFilter, deletePerson }) => (
  <ul>
    {persons
      .filter((person) => person.name.match(RegExp(newFilter, "i")))
      .map((filteredPerson) => (
        <li key={filteredPerson.name}>
          {filteredPerson.name} {filteredPerson.number} <button onClick={() => deletePerson(filteredPerson.id)}>delete</button>
        </li>
      ))}
  </ul>
);

export default Persons;
