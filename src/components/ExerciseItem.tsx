import styled, { css } from "styled-components";
import ExerciseSets from "./ExerciseSets";
import { useState } from "react";
import { useWorkout, type Exercise } from "../contexts/WorkoutContext";
import ExerciseWorkoutSelector from "./ExerciseWorkoutSelector";
import LockButton from "./LockButton";
import RemoveItemButton from "./RemoveItemButton";

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 2px solid rgb(var(--gold-accent));
  ${({$editMode}) =>
    $editMode &&
    css`
      box-shadow: 0 0 4px 2px rgb(var(--gold-accent));
    `}
`;

const MenuModeContainer = styled.div`
  height: 220px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgb(var(--gold-accent)) #1a1919;
  background: rgba(var(--primary-color), 0.2);
`;

const sharedTitleStyles = css`
  padding: 0.5rem;
  width: 100%;
`;

const ExerciseTitle = styled.input`
  ${sharedTitleStyles}
  color: rgb(var(--primary-color));
  font-weight: bold;
  background: rgba(var(--gold-accent), 0.6);
  border: 2px solid rgb(var(--gold-accent));
  outline: none;

  &:focus {
    box-shadow: 0 0 4px 2px rgb(var(--gold-accent));
  }
`;

const ExerciseDisplayTitle = styled.p`
  ${sharedTitleStyles}
  margin: none;
  border: 2px solid transparent;
  font-weight: bold;
  background: rgba(var(--primary-color), 0.2);
`;

const ButtonControlsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const AddToWorkoutContainer = styled.div`
  height: 1.875rem;

  button {
    width: 100%;
    cursor: pointer;
    font-weight: bold;
    text-transform: uppercase;
    color: rgb(var(--primary-color));
    border: 2px solid rgb(var(--gold-accent));
    background: rgba(var(--gold-accent), 0.6);
  }
`;

type ExerciseItemProps = {
  exercise: Exercise;
};

type ContainerProps = {
  $editMode: boolean;
}

const ExerciseItem = ({ exercise }: ExerciseItemProps) => {
  const [editMode, setEditMode] = useState(exercise.editStatus);
  const [menuMode, setMenuMode] = useState(false);
  const { addSet, removeExercise, updateExerciseTitle, updateExerciseEditMode, addExerciseToWorkout } = useWorkout();

  return (
    <Container $editMode={editMode}>
      <ButtonControlsContainer>
        {editMode && (
          <>
            <button onClick={() => addSet(exercise.id)}>Add new set</button>
            <RemoveItemButton onClick={() => removeExercise(exercise.id)} />
          </>
        )}

        <LockButton 
          onClick={() => {
            setEditMode((prev) => !prev);
            updateExerciseEditMode(exercise.id, !editMode);
            setMenuMode(false);
          }}
          status={editMode} 
        />
      </ButtonControlsContainer>

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

      <MenuModeContainer>
        {menuMode ? 
          <ExerciseWorkoutSelector 
            onSelectWorkout={(workoutId) => {
              addExerciseToWorkout(workoutId, exercise.id);
              setMenuMode(false);
            }} 
          />
          :
          <ExerciseSets
            exercise={exercise}
            editMode={editMode}
          />
        }
      </MenuModeContainer>

      <AddToWorkoutContainer>
        {editMode === false && <button onClick={() => setMenuMode((prev) => !prev)}>{menuMode ? "Back" : "Add to workout"}</button>}
      </AddToWorkoutContainer>
    </Container>
  );
};

export default ExerciseItem;
