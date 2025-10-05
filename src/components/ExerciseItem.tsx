import styled, { css } from "styled-components";
import ExerciseSets from "./ExerciseSets";
import { useState } from "react";
import { useWorkout, type Exercise } from "../contexts/WorkoutContext";
import ExerciseWorkoutSelector from "./ExerciseWorkoutSelector";

const Container = styled.div`
  border: 2px solid black;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const MenuModeContainer = styled.div`
  height: 220px;
  overflow-y: auto;
`

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

const ButtonControlsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const AddToWorkoutContainer=  styled.div`
  height: 1.875rem;
`;

type ExerciseItemProps = {
  exercise: Exercise;
};

const ExerciseItem = ({ exercise }: ExerciseItemProps) => {
  const [editMode, setEditMode] = useState(exercise.editStatus);
  const [menuMode, setMenuMode] = useState(false);
  const { addSet, removeExercise, updateExerciseTitle, updateExerciseEditMode, addExerciseToWorkout } = useWorkout();

  return (
    <Container>
      <ButtonControlsContainer>
        {editMode && (
          <>
            <button onClick={() => addSet(exercise.id)}>Add new set</button>
            <button onClick={() => removeExercise(exercise.id)}>Remove</button>
          </>
        )}

        <button onClick={() => {
          setEditMode((prev) => !prev);
          updateExerciseEditMode(exercise.id, !editMode);
          setMenuMode(false);
        }}>
          {editMode ? "Lock" : "Unlock"}
        </button>
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
