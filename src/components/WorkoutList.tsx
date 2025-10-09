import WorkoutItem from "./WorkoutItem";
import { useWorkout } from "../contexts/WorkoutContext";
import styled from "styled-components";
import AddNewItem from "./AddNewItem";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  grid-auto-rows: 1fr;
  min-height: 300px;
  gap: 1rem;
`;

const WorkoutList = () => {
  const { workouts, addNewWorkout } = useWorkout();
  
  return (
    <Container>
      {workouts.map((workout) => (
        <WorkoutItem key={workout.id} workout={workout} />
      ))}
      <AddNewItem onClick={addNewWorkout} title="workout" />
    </Container>
  );
};

export default WorkoutList;
