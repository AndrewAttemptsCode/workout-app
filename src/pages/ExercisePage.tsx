import styled from "styled-components";
import ExerciseList from "../components/ExerciseList";

const StylesContainer = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  padding: 1rem 0;
  background: linear-gradient(to bottom, #3f3f3f, #1a1919);
`;

const ResponsiveContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const ExercisePage = () => {
  return (
    <StylesContainer>
      <ResponsiveContainer>
        <h1>Exercises</h1>
        <ExerciseList />
      </ResponsiveContainer>
    </StylesContainer>
  );
};

export default ExercisePage;
