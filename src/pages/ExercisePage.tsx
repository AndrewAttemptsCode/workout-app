import styled from "styled-components";
import ExerciseList from "../components/ExerciseList";
import { useWorkout } from "../contexts/WorkoutContext";

const StylesContainer = styled.div`
  min-height: 100vh;
  padding: 1rem 0;
  background: linear-gradient(to bottom, #3f3f3f, #1a1919);
`;

const ResponsiveContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const ExercisePage = () => {
  const { addNewExercise } = useWorkout();

  return (
    <StylesContainer>
      <ResponsiveContainer>
        <h1>Exercises</h1>
        <button onClick={addNewExercise}>Add new exercise</button>
        <ExerciseList />
      </ResponsiveContainer>
    </StylesContainer>
  );
};

export default ExercisePage;
