import { useState } from "react";

const Header = (props) => {
  return <h1>{props.name}</h1>;
};

const Anecdote = (props) => {
  return (
    <div>
      <p>{props.text}</p>
      <p>{props.vote}</p>
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.click}>{props.text}</button>;
};

const MostVotes = (props) => {
  const max = Math.max(...props.points);
  const mostVoted = props.anecdotes[props.points.indexOf(max)];

  if (max === 0) {
    return;
  }
  return <Anecdote text={mostVoted} vote={max} />;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const handleAnecdotesClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };
  const handleVoteClick = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  return (
    <div>
      <Header name={"Anecdote of the day"} />
      <Anecdote text={anecdotes[selected]} vote={points[selected]} />
      <Button click={handleVoteClick} text={"vote"} />
      <Button click={handleAnecdotesClick} text={"next anecdote"} />
      <Header name={"Anecdote with most votes"} />
      <MostVotes points={points} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
