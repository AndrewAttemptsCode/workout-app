import styled, { css } from "styled-components";
import { useWorkout, type Workout } from "../contexts/WorkoutContext";
import { useState } from "react";
import WorkoutExercisesDisplay from "./WorkoutExercisesDisplay";

const Container = styled.div`
  border: 2px solid black;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const SetsContainer = styled.div`
  height: 220px;
  overflow-y: auto;
`

const sharedTitleStyles = css`
  padding: 0.5rem;
  width: 100%;
`;

const WorkoutTitle = styled.input`
  ${sharedTitleStyles}
`;

const WorkoutDisplayTitle = styled.p`
  ${sharedTitleStyles}
  margin: none;
  border: 2px solid transparent;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

type WorkoutItemProps = {
  workout: Workout;
}

const WorkoutItem = ({ workout }: WorkoutItemProps) => {
  const [editMode, setEditMode] = useState(workout.editStatus);
  const { updateWorkoutTitle, removeWorkoutItem, updateWorkoutEditMode } = useWorkout();

  return (
    <Container>

      <ButtonContainer>
        {editMode && (
          <>
            <button onClick={() => removeWorkoutItem(workout.id)}>Remove</button>
          </>
        )}

        <button onClick={() => {
          setEditMode((prev) => !prev);
          updateWorkoutEditMode(workout.id, !editMode);
        }}>
          {editMode ? "Lock" : "Unlock"}
        </button>
      </ButtonContainer>

      {editMode ? (
        <WorkoutTitle
          type="text"
          name="workoutTitle"
          id="workoutTitle"
          placeholder="Workout Name..."
          value={workout.workoutTitle}
          onChange={(e) => updateWorkoutTitle(workout.id, e.target.value)}
        />
      ) : (
        <WorkoutDisplayTitle>{workout.workoutTitle}</WorkoutDisplayTitle>
      )}

      <SetsContainer>
        <WorkoutExercisesDisplay
          exercises={workout.exercises}
          editMode={editMode}
        />
      </SetsContainer>
      
    </Container>
  );
};

export default WorkoutItem;
