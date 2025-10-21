import styled, { css } from "styled-components";
import ExerciseSets from "./ExerciseSets";
import { useState } from "react";
import { useWorkout, type Exercise } from "../contexts/WorkoutContext";
import ExerciseWorkoutSelector from "./ExerciseWorkoutSelector";
import LockButton from "./LockButton";
import RemoveItemButton from "./RemoveItemButton";
import AddSetButton from "./AddSetButton";

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
  min-height: 44px;
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

  &::placeholder {
    color: rgba(var(--primary-color), 0.6);
  }
`;

const ExerciseDisplayTitle = styled.div`
  ${sharedTitleStyles}
  overflow-x: auto;
  border: 2px solid transparent;
  font-weight: bold;
  background: rgba(var(--primary-color), 0.2);
  scrollbar-width: thin;
  scrollbar-color: rgb(var(--gold-accent)) #1a1919;
  white-space: nowrap;
  user-select: none;
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
    outline: none;
    color: rgb(var(--primary-color));
    border: 2px solid rgb(var(--gold-accent));
    background: rgba(var(--gold-accent), 0.6);
    transition: box-shadow 0.3s ease;
    -webkit-tap-highlight-color: transparent;

    &:focus-visible {
      box-shadow: 0 0 4px 2px rgb(var(--gold-accent));
    }

    &:hover {
      box-shadow: 0 0 4px 2px rgb(var(--gold-accent));
    }
  }
`;

const ExerciseStats = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: rgba(var(--primary-color), 0.2);
  user-select: none;
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
            <AddSetButton onClick={() => addSet(exercise.id)} />
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
        <ExerciseDisplayTitle>
          {exercise.title}
        </ExerciseDisplayTitle>
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
        {editMode ? (
          <ExerciseStats>
            Total Sets: {exercise.sets.length}
          </ExerciseStats>  
        ) : (
          <button onClick={() => setMenuMode((prev) => !prev)}>{menuMode ? "Back" : "Add to workout"}</button>
        )}
      </AddToWorkoutContainer>
    </Container>
  );
};

export default ExerciseItem;
