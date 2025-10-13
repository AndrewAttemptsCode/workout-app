import { useState } from "react";
import { useWorkout } from "../contexts/WorkoutContext";
import styled from "styled-components";

const Container = styled.div`
  width: min(100%, 768px);
  margin: 0 auto;

  button {
    width: 100%;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
`

const WorkoutTimerCard = () => {
  const { workoutTimer } = useWorkout();
  const [showExercises, setShowExercises] = useState(false);
  const [showSets, setShowSets] = useState(-1);

  return (
    <Container>
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
    </Container>
  );
};

export default WorkoutTimerCard;
