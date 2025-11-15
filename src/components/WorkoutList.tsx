import WorkoutItem from "./WorkoutItem";
import { useWorkout } from "../contexts/WorkoutContext";
import styled from "styled-components";
import AddNewItem from "./AddNewItem";
import SrOnly from "./SrOnly";

const Container = styled.section`
`;

const WorkoutsWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  grid-auto-rows: 1fr;
  min-height: 300px;
  gap: 1rem;
  padding: 0;
  list-style: none;
`;

const WorkoutList = () => {
  const { workouts, addNewWorkout } = useWorkout();
  
  return (
    <Container aria-labelledby="workouts-heading">
      <SrOnly><h2 id="workouts-heading">My Workouts</h2></SrOnly>
      
      <WorkoutsWrapper>
        {workouts.map((workout) => (
          <WorkoutItem key={workout.id} workout={workout} />
        ))}
        <li>
          <AddNewItem onClick={addNewWorkout} title="workout" />
        </li>
      </WorkoutsWrapper>
    </Container>
  );
};

export default WorkoutList;
