import { useWorkout } from "../contexts/WorkoutContext";
import { useWorkoutTimer } from "../contexts/WorkoutTimerContext";

const WorkoutTimerControls = () => {
  const { workoutTimer, currentProgress } = useWorkout();
  const { startTimer, secondsLeft, timerActive } = useWorkoutTimer();

  const setRestTime = currentProgress?.set?.rest ?? 0;

  return (
    <button
      onClick={() => startTimer(setRestTime)}
      disabled={timerActive}
    >
      { secondsLeft } {workoutTimer?.complete ? "Finish" : "Complete"}
    </button>
  );
};

export default WorkoutTimerControls;