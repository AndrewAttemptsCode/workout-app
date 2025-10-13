import styled from "styled-components";
import WorkoutTimerCard from "../components/WorkoutTimerCard";

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

const WorkoutTimerPage = () => {

  return (
    <StylesContainer>
      <ResponsiveContainer>
        <WorkoutTimerCard />
      </ResponsiveContainer>
    </StylesContainer>
  );
};

export default WorkoutTimerPage;