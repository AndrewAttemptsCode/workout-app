import styled, { css } from "styled-components";
import { useWorkout, type Workout } from "../contexts/WorkoutContext";
import { useState } from "react";
import WorkoutExercisesList from "./WorkoutExercisesList";
import { Link } from "react-router-dom";

const Container = styled.div`
  border: 2px solid black;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ExerciseContainer = styled.div`
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

const EmptyExercisesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
`;

const LoadWorkoutContainer = styled.div`
  height: 1.875rem;
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

      <ExerciseContainer>
        {workout.exercises.length === 0 ? (
          <EmptyExercisesContainer>
            <p>Exercise list is currently empty...</p>
            <p><Link to={"/exercises"}>Add</Link> an exercise to get started</p>
          </EmptyExercisesContainer>
        ) : (
          <WorkoutExercisesList
            workoutId={workout.id}
            workoutExercises={workout.exercises}
            editMode={editMode}
          />
        )}
      </ExerciseContainer>

      <LoadWorkoutContainer>
        {!editMode && workout.exercises.length > 0 && <button>Load workout</button>}
      </LoadWorkoutContainer>
      
    </Container>
  );
};

export default WorkoutItem;
