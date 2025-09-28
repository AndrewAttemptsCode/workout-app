import styled from "styled-components";
import type { Exercise } from "../pages/ExercisePage";
import ExerciseSets from "./ExerciseSets";

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
  removeExercise: (id: string) => void;
  updateSetField: (exerciseId: string, setId: string, field: "reps" | "weight" | "rest", value: number) => void;
  addSet: (exerciseId: string) => void;
}

const ExerciseItem = ({ exercise, updateExerciseTitle, removeExercise, updateSetField, addSet }: ExerciseItemProps) => {
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
      <button onClick={() => removeExercise(exercise.id)}>Remove</button>
      <button onClick={() => addSet(exercise.id)}>Add new set</button>
      <ExerciseSets exercise={exercise} updateSetField={updateSetField} />
    </Container>
  );
};

export default ExerciseItem;