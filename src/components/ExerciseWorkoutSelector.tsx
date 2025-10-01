import styled from "styled-components";
import { useWorkout, type Exercise } from "../contexts/WorkoutContext";

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
  exercise: Exercise;
  setMenuMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExerciseWorkoutSelector = ({ exercise, setMenuMode }: ExerciseWorkoutSelectorProps) => {
  const { workouts, addExerciseToWorkout } = useWorkout();

  return (
    <Container>
      <h2>Select Workout</h2>
      {workouts.map((workout) => (
        <SelectItem key={workout.id} onClick={() => {
          addExerciseToWorkout(workout.id, exercise.id);
          setMenuMode(false);
        }}>
          {workout.workoutTitle}
        </SelectItem>
      ))}
    </Container>
  );
};

export default ExerciseWorkoutSelector;
