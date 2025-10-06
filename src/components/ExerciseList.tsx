import styled from "styled-components";
import { useWorkout } from "../contexts/WorkoutContext";
import ExerciseItem from "./ExerciseItem";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 1rem;
`;

const ExerciseList = () => {
  const { exercises } = useWorkout(); 

  return (
    <Container>
      {exercises.map((exercise) => (
        <ExerciseItem key={exercise.id} exercise={exercise} />
      ))}
    </Container>
  );
};

export default ExerciseList;
