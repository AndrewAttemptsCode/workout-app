import styled from "styled-components";
import WorkoutTimerCard from "../components/WorkoutTimerCard";
import WorkoutTimerControls from "../components/WorkoutTimerControls";
import WorkoutTimerDisplay from "../components/WorkoutTimerDisplay";
import { WorkoutTimerProvider } from "../contexts/WorkoutTimerContext";

const StylesContainer = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  padding: 1rem 0;
`;

const ResponsiveContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 768px) {
    gap: 2rem;
  }
`;

const WorkoutTimerPage = () => {

  return (
    <StylesContainer>
      <ResponsiveContainer>
        <WorkoutTimerProvider>
          <WorkoutTimerDisplay />
          <WorkoutTimerControls />
        </WorkoutTimerProvider>
        <WorkoutTimerCard />
      </ResponsiveContainer>
    </StylesContainer>
  );
};

export default WorkoutTimerPage;