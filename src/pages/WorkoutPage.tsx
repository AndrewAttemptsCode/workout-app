import styled from "styled-components";
import WorkoutList from "../components/WorkoutList";
import { useWorkout } from "../contexts/WorkoutContext";

const StylesContainer = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  padding: 1rem 0;
  background: linear-gradient(to bottom, #3f3f3f, #1a1919);
`;

const ResponsiveContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const WorkoutPage = () => {
  const { addNewWorkout } = useWorkout();

  return (
    <StylesContainer>
      <ResponsiveContainer>
        <h1>Workouts</h1>
        <button onClick={addNewWorkout}>Add new workout</button>
        <WorkoutList />
      </ResponsiveContainer>
    </StylesContainer>
  );
};

export default WorkoutPage;
