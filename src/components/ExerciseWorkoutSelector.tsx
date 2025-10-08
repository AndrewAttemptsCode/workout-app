import styled, { css } from "styled-components";
import { useWorkout } from "../contexts/WorkoutContext";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;

  h2 {
    font-size: 1rem;
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
    padding: 0.1rem;
    text-decoration: none;
    font-weight: bold;
    color: rgb(var(--primary-color));
    border: 2px solid rgb(var(--gold-accent));
    background: rgba(var(--gold-accent), 0.6);
  }
`;

const SelectWorkoutItem = styled.div`
  ${SelectItem}
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(var(--gold-accent), 0.6);
  }
`;

type ExerciseWorkoutSelectorProps = {
  onSelectWorkout: (workoutId: string) => void;
}

const ExerciseWorkoutSelector = ({ onSelectWorkout }: ExerciseWorkoutSelectorProps) => {
  const { workouts } = useWorkout();

  return (
    <Container>
      <h2>Select Workout</h2>
      
      {workouts.length === 0 && ( 
        <FallbackContainer>
          <p>No workouts available...</p>
          <p><Link to={"/workouts"}>Create</Link> a workout to get started</p>
        </FallbackContainer>
      )}

      {workouts.map((workout) => (
        <SelectWorkoutItem key={workout.id} onClick={() => onSelectWorkout(workout.id)}>
          {workout.workoutTitle}
        </SelectWorkoutItem>
      ))}

    </Container>
  );
};

export default ExerciseWorkoutSelector;
