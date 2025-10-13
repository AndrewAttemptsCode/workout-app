import { useState } from "react";
import { useWorkout } from "../contexts/WorkoutContext";

const WorkoutTimerCard = () => {
  const { workoutTimer } = useWorkout();
  const [showExercises, setShowExercises] = useState(false);
  const [showSets, setShowSets] = useState(-1);

  return (
    <div>
      <button
        onClick={() => {
          setShowExercises(!showExercises);
          setShowSets(-1);
        }}
      >
        {workoutTimer?.workoutTitle}
      </button>

      {showExercises &&
        workoutTimer?.exercises.map((exercise, index) => (
          <div key={index}>
            <button
              onClick={() =>
                setShowSets((prev) => (prev === index ? -1 : index))
              }
            >
              {exercise?.title}
            </button>
            
            {showSets === index &&
              exercise?.sets.map((set, index) => (
                <div key={index}>
                  <p>
                    {set.reps} {set.weight} {set.rest}
                  </p>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default WorkoutTimerCard;
