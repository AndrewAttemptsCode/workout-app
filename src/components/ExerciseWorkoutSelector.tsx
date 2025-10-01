import styled from "styled-components";
import { useWorkout } from "../contexts/WorkoutContext";

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
      {workouts.map((workout) => (
        <SelectItem key={workout.id} onClick={() => onSelectWorkout(workout.id)}>
          {workout.workoutTitle}
        </SelectItem>
      ))}
    </Container>
  );
};

export default ExerciseWorkoutSelector;
