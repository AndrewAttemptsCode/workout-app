import styled from "styled-components";
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
`

const SelectItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  cursor: pointer;
`

type ExerciseWorkoutSelectorProps = {
  onSelectWorkout: (workoutId: string) => void;
}

const ExerciseWorkoutSelector = ({ onSelectWorkout }: ExerciseWorkoutSelectorProps) => {
  const { workouts } = useWorkout();

  return (
    <Container>
      <h2>Select Workout</h2>
      
      {workouts.length === 0 && ( 
        <SelectItem>
          <p>No workouts available...</p>
          <p><Link to={"/workouts"}>Create</Link> a workout to get started</p>
        </SelectItem>
      )}

      {workouts.map((workout) => (
        <SelectItem key={workout.id} onClick={() => onSelectWorkout(workout.id)}>
          {workout.workoutTitle}
        </SelectItem>
      ))}

    </Container>
  );
};

export default ExerciseWorkoutSelector;
