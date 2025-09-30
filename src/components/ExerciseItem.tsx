import styled, { css } from "styled-components";
import ExerciseSets from "./ExerciseSets";
import { useState } from "react";
import { useWorkout, type Exercise } from "../contexts/WorkoutContext";

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

type ExerciseItemProps = {
  exercise: Exercise;
};

const ExerciseItem = ({ exercise }: ExerciseItemProps) => {
  const [editMode, setEditMode] = useState(true);
  const { addSet, removeExercise, updateExerciseTitle } = useWorkout();

  return (
    <Container>
      <ButtonContainer>
        {editMode && (
          <>
            <button onClick={() => addSet(exercise.id)}>Add new set</button>
            <button onClick={() => removeExercise(exercise.id)}>Remove</button>
          </>
        )}

        <button onClick={() => setEditMode((prev) => !prev)}>
          {editMode ? "Lock" : "Unlock"}
        </button>
      </ButtonContainer>

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

      <ExerciseSets
        exercise={exercise}
        editMode={editMode}
      />

      {editMode === false && <button>Add to workout</button>}
    </Container>
  );
};

export default ExerciseItem;
