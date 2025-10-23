import styled, { keyframes } from "styled-components";
import { useWorkout } from "../contexts/WorkoutContext";
import { useWorkoutTimer } from "../contexts/WorkoutTimerContext";
import { useNavigate } from "react-router-dom";
import { useWakeLock } from "react-screen-wake-lock";
import { useState } from "react";

const Container = styled.div`
  width: min(100%, 768px);
  margin: 0 auto;

`;

const Button = styled.button<{ $workoutActive: boolean }>`
  position: relative;
  padding: 0.5rem;
  min-height: 44px;
  width: 100%;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  text-transform: uppercase;
  font-weight: bold;
  color: rgb(var(--primary-color));
  border: ${({ $workoutActive }) => $workoutActive ? "2px solid rgb(var(--green-accent))" : "2px solid rgb(var(--gold-accent))"} ;
  background: ${({ $workoutActive }) => $workoutActive ? "rgba(var(--green-accent), 0.6)" : "rgba(var(--gold-accent), 0.6)"}; 
  transition: opacity 0.3s ease;
  overflow: hidden;

  &:focus-visible,
  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    color: rgba(var(--primary-color), 0.5);
    border: 2px solid rgba(var(--primary-color), 0.4);
    background: rgba(var(--primary-color), 0.3);
  }

  span {
    z-index: 5;
  }
`;

const stripeAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  10% {
    opacity: 1;
  }
  33% {
    transform: translate(2000%, -50%) rotate(45deg);
    opacity: 0;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;

const ButtonStripe = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 10%;
  height: 400%;
  transform: translate(-50%, -50%) rotate(45deg);
  background: linear-gradient(to right, transparent, rgba(var(--gold-accent), 0.8), transparent);
  animation: ${stripeAnimation} 6s linear infinite;
`;

const WorkoutTimerControls = () => {
  const { workoutTimer, resetWorkoutTimer, currentProgress } = useWorkout();
  const { startTimer, timerActive } = useWorkoutTimer();
  const navigate = useNavigate();
  const [startWorkout, setStartWorkout] = useState(false);
  const { request, release } = useWakeLock({ reacquireOnPageVisible: true });

  const setRestTime = currentProgress?.set?.rest ?? 0;

  const handleButtonClick = async () => {
    if (!workoutTimer) return;

    if (!startWorkout) {
      setStartWorkout(true);
      await request();
      return;
    }

    if (workoutTimer.complete) {
      await release();
      navigate("/workouts");
      resetWorkoutTimer();
      return;
    }

    startTimer(setRestTime);
  }

  return (
    <Container>
      <Button
        onClick={handleButtonClick}
        disabled={timerActive || !workoutTimer}
        $workoutActive={startWorkout}
      >
        {!startWorkout && <ButtonStripe />}
        <span>{!startWorkout ? "Start Workout" : workoutTimer?.complete ? "Finish Workout" : "Complete Set"}</span>
      </Button>
    </Container>
  );
};

export default WorkoutTimerControls;