import styled from "styled-components";
import { useWorkout, type Workout } from "../contexts/WorkoutContext";

const Container = styled.div`
  border: 2px solid black;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const WorkoutTitle = styled.input`
  padding: 0.5rem;
  width: 100%;
`;

type WorkoutItemProps = {
  workout: Workout;
}

const WorkoutItem = ({ workout }: WorkoutItemProps) => {
  const { updateWorkoutTitle, removeWorkoutItem } = useWorkout();

  return (
    <Container>
      <WorkoutTitle
        type="text"
        name="workoutTitle"
        id="workoutTitle"
        placeholder="Workout Name..."
        value={workout.workoutTitle}
        onChange={(e) => updateWorkoutTitle(workout.id, e.target.value)}
      />
      <button onClick={() => removeWorkoutItem(workout.id)}>Remove</button>
    </Container>
  );
};

export default WorkoutItem;
