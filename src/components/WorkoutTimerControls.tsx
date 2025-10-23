import styled from "styled-components";
import { useWorkout } from "../contexts/WorkoutContext";
import { useWorkoutTimer } from "../contexts/WorkoutTimerContext";
import { useNavigate } from "react-router-dom";
import { useWakeLock } from "react-screen-wake-lock";
import { useState } from "react";

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
    transition: opacity 0.3s ease;

    &:focus-visible,
    &:hover {
      opacity: 0.9;
    }

    &:disabled {
      color: rgba(var(--primary-color), 0.5);
      border: 2px solid rgba(var(--primary-color), 0.4);
      background: rgba(var(--primary-color), 0.3);
    }
  }
`;

const WorkoutTimerControls = () => {
  const { workoutTimer, resetWorkoutTimer, currentProgress } = useWorkout();
  const { startTimer, timerActive } = useWorkoutTimer();
  const navigate = useNavigate();
  const [startWorkout, setStartWorkout] = useState(false);
  const { request, release, released, isSupported } = useWakeLock({ reacquireOnPageVisible: true });

  const setRestTime = currentProgress?.set?.rest ?? 0;

  const handleButtonClick = async () => {
    if (!workoutTimer) return;

    if (startWorkout === false) {
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
      <button
        onClick={handleButtonClick}
        disabled={timerActive || !workoutTimer}
      >
        {!startWorkout ? "Start Workout" : workoutTimer?.complete ? "Finish Workout" : "Complete Set"}
        Released: <b>{`${released}`}</b>
        Supported: <b>{`${isSupported}`}</b>
      </button>
    </Container>
  );
};

export default WorkoutTimerControls;