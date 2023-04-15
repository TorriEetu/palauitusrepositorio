interface HeaderProps {
  name: string;
}

interface TotalProps {
  total: number;
}

interface CourseContentProps {
  parts: Array<CoursePartProps>;
}

interface CoursePartProps {
  name: string;
  exerciseCount: number;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

const Content = (props: CourseContentProps) => {
  console.log(props);
  return (
    <>
      {props.parts.map((p) => (
        <p key={p.name}>
          {p.name} {p.exerciseCount}
        </p>
      ))}
    </>
  );
};

const Total = (props: TotalProps) => {
  return <p> Number of exercises {props.total}</p>;
};

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePartProps[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];
  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={total} />
    </div>
  );
};

export default App;
