import { useState } from 'react'

const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Button = (props) => {
  return <button onClick={props.click}>{props.text}</button>
}

const StatisticLine = (props) => {
  if (props.text === 'positive') {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral
  const avg = (props.good * 1 + props.bad * -1) / total
  const pos = (props.good * 100) / total

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text={'good'} value={props.good} />
          <StatisticLine text={'neutral'} value={props.neutral} />
          <StatisticLine text={'bad'} value={props.bad} />
          <StatisticLine text={'total'} value={total} />
          <StatisticLine text={'average'} value={avg} />
          <StatisticLine text={'positive'} value={pos} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header name='give feedback' />
      <Button click={handleGoodClick} text='good' />
      <Button click={handleNeutralClick} text='neutral' />
      <Button click={handleBadClick} text='bad' />
      <Header name='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App
