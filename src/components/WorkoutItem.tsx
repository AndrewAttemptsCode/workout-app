import styled, { css } from "styled-components";
import { useWorkout, type Workout } from "../contexts/WorkoutContext";
import { useState } from "react";
import WorkoutExercisesList from "./WorkoutExercisesList";
import { Link, useNavigate } from "react-router-dom";
import RemoveItemButton from "./RemoveItemButton";
import LockButton from "./LockButton";
import SrOnly from "./SrOnly";

const Container = styled.li<ContainerProps>`
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

const ExerciseContainer = styled.div`
  height: 220px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgb(var(--gold-accent)) #1a1919;
  background: rgba(var(--primary-color), 0.2);
`

const sharedTitleStyles = css`
  padding: 0.5rem;
  width: 100%;
  min-height: 44px;
`;

const WorkoutTitle = styled.input`
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

const WorkoutTitleLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const WorkoutDisplayTitle = styled.p`
  ${sharedTitleStyles}
  margin: none;
  border: 2px solid transparent;
  font-weight: bold;
  background: rgba(var(--primary-color), 0.2);
  user-select: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const EmptyExercisesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  user-select: none;

  a {
    font-weight: bold;
    color: rgb(var(--gold-accent));
    -webkit-tap-highlight-color: transparent;
  }
`;

const LoadWorkoutContainer = styled.div`
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

const WorkoutStats = styled.div`
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

type WorkoutItemProps = {
  workout: Workout;
}

type ContainerProps = {
  $editMode: boolean;
}

const WorkoutItem = ({ workout }: WorkoutItemProps) => {
  const [editMode, setEditMode] = useState(workout.editStatus);
  const { updateWorkoutTitle, removeWorkoutItem, updateWorkoutEditMode, startWorkoutTimer } = useWorkout();
  const navigate = useNavigate();

  return (
    <Container $editMode={editMode}>

      <SrOnly>{`Current workout item: ${workout.workoutTitle}`}</SrOnly>

      <ButtonContainer>
        {editMode && (
          <>
            <RemoveItemButton onClick={() => removeWorkoutItem(workout.id)} />
          </>
        )}

        <LockButton 
          onClick={() => {
          setEditMode((prev) => !prev);
          updateWorkoutEditMode(workout.id, !editMode);
          }}
          status={editMode}
        />
      </ButtonContainer>

      {editMode ? (
        <>
          <WorkoutTitleLabel htmlFor="workoutTitle">workout name</WorkoutTitleLabel>
          <WorkoutTitle
            type="text"
            name="workoutTitle"
            id="workoutTitle"
            placeholder="Workout Name..."
            value={workout.workoutTitle}
            onChange={(e) => updateWorkoutTitle(workout.id, e.target.value)}
          />
        </>
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
        {editMode ? (
          <WorkoutStats>Total Exercises: {workout.exercises.length}</WorkoutStats>
        ) : workout.exercises.length > 0 ? (
          <button onClick={() => {
            startWorkoutTimer(workout.id);
            navigate("/timer");
          }}>
            Load workout
          </button>
        ) : (
          <WorkoutStats>Total Exercises: {workout.exercises.length}</WorkoutStats>
        )}
      </LoadWorkoutContainer>
      
    </Container>
  );
};

export default WorkoutItem;
