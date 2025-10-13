import { useWorkout } from "../contexts/WorkoutContext";

const WorkoutTimerCard = () => {
  const { workoutTimer } = useWorkout();

  return (
    <div>
      <p>{workoutTimer?.workoutTitle}</p>
      {workoutTimer?.exercises.map((exercise, index) => (
        <div key={index}>
          <p>{exercise?.title}</p>
          {exercise?.sets.map((set, index) => (
            <div key={index}>
              <p>{set.reps} {set.weight} {set.rest}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WorkoutTimerCard;