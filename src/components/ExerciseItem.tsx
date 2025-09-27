import styled from "styled-components";
import type { Exercise } from "../pages/ExercisePage";

const Container = styled.div`
  border: 2px solid black;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ExerciseTitle = styled.input`
  padding: 0.5rem;
  width: 100%;
`;

type ExerciseItemProps = {
  exercise: Exercise;
  updateExerciseTitle: (id: string, newTitle: string ) => void;
}

const ExerciseItem = ({ exercise, updateExerciseTitle }: ExerciseItemProps) => {
  return (
    <Container>
      <ExerciseTitle 
        type="text"
        name="exerciseTitle"
        id="exerciseTitle"
        placeholder="Exercise Name..."
        value={exercise.title}
        onChange={(e) => updateExerciseTitle(exercise.id, e.target.value)}
      />
    </Container>
  );
};

export default ExerciseItem;