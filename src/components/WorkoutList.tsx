import WorkoutItem from "./WorkoutItem";
import { useWorkout } from "../contexts/WorkoutContext";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 1rem;
`;

const WorkoutList = () => {
  const { workouts } = useWorkout();
  
  return (
    <Container>
      {workouts.map((workout) => (
        <WorkoutItem key={workout.id} workout={workout} />
      ))}
    </Container>
  );
};

export default WorkoutList;
