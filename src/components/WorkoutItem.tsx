import styled from "styled-components";
import type { Workout } from "../pages/WorkoutPage";

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
  index: number;
  updateWorkoutTitle: (index: number, newTitle: string) => void;
}

const WorkoutItem = ({ workout, index, updateWorkoutTitle }: WorkoutItemProps) => {
  return (
    <Container>
      <WorkoutTitle
        type="text"
        name="workoutTitle"
        id="workoutTitle"
        placeholder="Workout Name..."
        value={workout.workoutTitle}
        onChange={(e) => updateWorkoutTitle(index, e.target.value)}
      />
    </Container>
  );
};

export default WorkoutItem;
