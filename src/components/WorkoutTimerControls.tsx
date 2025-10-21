import styled from "styled-components";
import { useWorkout } from "../contexts/WorkoutContext";
import { useWorkoutTimer } from "../contexts/WorkoutTimerContext";

const Container = styled.div`
  width: min(100%, 768px);
  margin: 0 auto;

  button {
    padding: 0.5rem;
    min-height: 44px;
    width: 100%;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    text-transform: uppercase;
    font-weight: bold;
    color: rgb(var(--primary-color));
    border: 2px solid rgb(var(--green-accent));
    background: rgba(var(--green-accent), 0.6);

    &:disabled {
      color: rgba(var(--primary-color), 0.5);
      border: 2px solid rgba(var(--primary-color), 0.4);
      background: rgba(var(--primary-color), 0.3);
    }
  }
`;

const WorkoutTimerControls = () => {
  const { workoutTimer, currentProgress } = useWorkout();
  const { startTimer, timerActive } = useWorkoutTimer();

  const setRestTime = currentProgress?.set?.rest ?? 0;

  return (
    <Container>
      <button
        onClick={() => startTimer(setRestTime)}
        disabled={timerActive}
      >
        {workoutTimer?.complete ? "Finish Workout" : "Complete Set"}
      </button>
    </Container>
  );
};

export default WorkoutTimerControls;