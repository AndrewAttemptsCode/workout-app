import styled from "styled-components";
import { useWorkout } from "../contexts/WorkoutContext";
import ExerciseItem from "./ExerciseItem";
import AddNewItem from "./AddNewItem";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  grid-auto-rows: 1fr;
  min-height: 300px;
  gap: 1rem;
`;

const ExerciseList = () => {
  const { exercises, addNewExercise } = useWorkout(); 

  return (
    <Container>
      {exercises.map((exercise) => (
        <ExerciseItem key={exercise.id} exercise={exercise} />
      ))}
      <AddNewItem onClick={addNewExercise} title="exercise" />
    </Container>
  );
};

export default ExerciseList;
