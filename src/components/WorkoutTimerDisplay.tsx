import { Dumbbell, Hourglass, Repeat2 } from "lucide-react";
import { useWorkout } from "../contexts/WorkoutContext";
import styled, { keyframes } from "styled-components";
import { useWorkoutTimer } from "../contexts/WorkoutTimerContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: min(100%, 768px);
  margin: 0 auto;
  padding: 0.5rem;
  color: rgb(var(--primary-color));
  border: 4px solid rgba(var(--primary-color), 0.8);
  background: rgba(var(--primary-color), 0.3);
`;

const TitleContainer = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;

  @media (min-width: 768px) {
    font-size: 1.6rem;
  }
  
`;

const SetItemContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (min-width: 768px) {
    gap: 2rem;
  }

`;

const SetItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  span {
    font-size: 1.1rem;
    font-weight: bold;
    text-transform: uppercase;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }

  }

`;

const spin = keyframes`
  100% {
    transform: rotate(180deg);
  }
`;

const StyledHourglass = styled(Hourglass)`
  animation: ${spin} 1s infinite forwards;
`;

const WorkoutTimerDisplay = () => {
  const { currentProgress } = useWorkout();
  const { timerActive, secondsLeft } = useWorkoutTimer();

  return (
    <Container>
      <TitleContainer>
        {currentProgress?.exercise?.title ?? "No current exercise"}
      </TitleContainer>
      <SetItemContainer>
        {timerActive ? (
          <SetItem>
            <StyledHourglass />
            <span>Rest: {secondsLeft}</span>
          </SetItem>
        ) : (
        <>
          <SetItem>
            <Repeat2 />
            <span>Reps: {currentProgress?.set?.reps ?? "N/A"}</span>
          </SetItem>
          <SetItem>
            <Dumbbell />
            <span>Weight: {currentProgress?.set?.weight ?? "N/A"}</span>
          </SetItem>
        </>
        )}
      </SetItemContainer>
    </Container>
  );
};

export default WorkoutTimerDisplay;