import styled, { css } from "styled-components";
import type { Exercise } from "../pages/ExercisePage";
import ExerciseSets from "./ExerciseSets";
import { useState } from "react";

const Container = styled.div`
  border: 2px solid black;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const sharedTitleStyles = css`
  padding: 0.5rem;
  width: 100%;
`;

const ExerciseTitle = styled.input`
  ${sharedTitleStyles}
`;

const ExerciseDisplayTitle = styled.p`
  ${sharedTitleStyles}
  margin: none;
  border: 2px solid transparent;
`;

type ExerciseItemProps = {
  exercise: Exercise;
  updateExerciseTitle: (id: string, newTitle: string) => void;
  removeExercise: (id: string) => void;
  updateSetField: (exerciseId: string, setId: string, field: "reps" | "weight" | "rest", value: number) => void;
  addSet: (exerciseId: string) => void;
  removeSet: (exerciseId: string, setId: string) => void;
};

const ExerciseItem = ({ exercise, updateExerciseTitle, removeExercise, updateSetField, addSet, removeSet }: ExerciseItemProps) => {
  const [editMode, setEditMode] = useState(true);

  return (
    <Container>
      {editMode ? (
        <ExerciseTitle
          type="text"
          name="exerciseTitle"
          id="exerciseTitle"
          placeholder="Exercise Name..."
          value={exercise.title}
          onChange={(e) => updateExerciseTitle(exercise.id, e.target.value)}
        />
      ) : (
        <ExerciseDisplayTitle>{exercise.title}</ExerciseDisplayTitle>
      )}

      <button onClick={() => setEditMode((prev) => !prev)}>
        {editMode ? "Lock" : "Unlock"}
      </button>

      {editMode && (
        <>
          <button onClick={() => removeExercise(exercise.id)}>Remove</button>
          <button onClick={() => addSet(exercise.id)}>Add new set</button>
        </>
      )}

      <ExerciseSets
        exercise={exercise}
        updateSetField={updateSetField}
        removeSet={removeSet}
      />
    </Container>
  );
};

export default ExerciseItem;
