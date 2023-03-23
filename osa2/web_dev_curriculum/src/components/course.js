const Header = (props) => {
  return <h1>{props.parts}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = (props) => {
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  return <b>total of {total} exercises</b>;
};

const Course = (props) => {
  return (
    <div>
      <Header parts={"Web development curriculum"} />
      {props.course.map((course) => (
          <div key={course.id}>
              <Header parts={course.name} />
              <Content parts={course.parts} />
              <Total parts={course.parts} />
          </div>
      ))}
    </div>
  );
};
export default Course;
