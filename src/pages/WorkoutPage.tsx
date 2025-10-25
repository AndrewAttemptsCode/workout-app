import styled from "styled-components";
import WorkoutList from "../components/WorkoutList";

const StylesContainer = styled.div`
  padding: 1rem 0;
`;

const ResponsiveContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const WorkoutPage = () => {
  return (
    <StylesContainer>
      <ResponsiveContainer>
        <h1>Workouts</h1>
        <WorkoutList />
      </ResponsiveContainer>
    </StylesContainer>
  );
};

export default WorkoutPage;
