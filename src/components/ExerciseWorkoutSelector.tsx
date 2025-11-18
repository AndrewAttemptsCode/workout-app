import styled, { css } from "styled-components";
import { useWorkout } from "../contexts/WorkoutContext";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
  user-select: none;

  h2 {
    font-size: 1rem;
    outline: none;
  }
`;

const SelectItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
`;

const FallbackContainer = styled.div`
  ${SelectItem}

  a {
    font-weight: bold;
    color: rgb(var(--gold-accent));
    -webkit-tap-highlight-color: transparent;
  }
`;

const SelectWorkoutWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
`;

const SelectWorkoutItem = styled.li`

  button {
    cursor: pointer;
    outline: none;
    width: 100%;
    background: transparent;
    border: none;
    color: inherit;
    padding: 0.5rem;
    text-align: center;
    transition: background 0.3s ease;
    overflow: hidden;
    overflow-wrap: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
  
    &:focus-visible {
      background: rgba(var(--gold-accent), 0.6);
    }
    
    &:hover {
      background: rgba(var(--gold-accent), 0.6);
    }
  }
`;

type ExerciseWorkoutSelectorProps = {
  onSelectWorkout: (workoutId: string) => void;
}

const ExerciseWorkoutSelector = ({ onSelectWorkout }: ExerciseWorkoutSelectorProps) => {
  const { workouts } = useWorkout();
  const workoutHeadingRef = useRef<HTMLHeadingElement| null>(null);

  useEffect(() => {
    if (workoutHeadingRef.current) {
      workoutHeadingRef.current.focus();
    }
  }, []);

  return (
    <Container aria-labelledby="select-workout-heading">
      <h2
        id="select-workout-heading"
        ref={workoutHeadingRef}
        tabIndex={-1}
      >
        Select Workout
      </h2>
      
      {workouts.length === 0 && ( 
        <FallbackContainer>
          <p>No workouts available...</p>
          <p><Link to={"/workouts"}>Create</Link> a workout to get started</p>
        </FallbackContainer>
      )}

      <SelectWorkoutWrapper>
        {workouts.map((workout) => (
          <SelectWorkoutItem key={workout.id}>
            <button
              onClick={() => onSelectWorkout(workout.id)}
              aria-label={`Add exercise to ${workout.workoutTitle}`}
              title={workout.workoutTitle}
            >
              {workout.workoutTitle}
            </button>
          </SelectWorkoutItem>
        ))}
      </SelectWorkoutWrapper>

    </Container>
  );
};

export default ExerciseWorkoutSelector;
