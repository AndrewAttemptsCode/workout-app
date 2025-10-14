import { useState } from "react";
import { useWorkout } from "../contexts/WorkoutContext";
import styled from "styled-components";
import { ChevronDown } from "lucide-react";

const Container = styled.div`
  width: min(100%, 768px);
  margin: 0 auto;

  button {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    min-height: 44px;
    gap: 0.5rem;
    width: 100%;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
`;

const Chevron = styled(ChevronDown)<{$showExercises: boolean}>`
  transition: transform 0.3s ease;
  transform: rotate(${({ $showExercises }) =>
    $showExercises ? "180deg" : "0deg"});
`;

const ExerciseList = styled.div<{ $showExercises: boolean }>`
  overflow: hidden;
  transition: max-height 0.4s ease, opacity 0.3s ease;
  max-height: ${({ $showExercises }) =>
    ($showExercises ? "1000px" : 0)
  };
  opacity: ${({ $showExercises }) => ($showExercises ? 1 : 0)};
`;

const WorkoutTitle = styled.div`
  margin-right: auto;
`;

const SetsList = styled.div<{ $selectedExercise: number; $index: number }>`
  overflow: hidden;
  transition: max-height 0.4s ease, opacity 0.3s ease;
  max-height: ${({ $selectedExercise, $index }) =>
    ($selectedExercise === $index ? "1000px" : 0)
  };
  opacity: ${({ $selectedExercise, $index }) =>
    ($selectedExercise === $index ? 1 : 0)
  };
`;

const WorkoutTimerCard = () => {
  const { workoutTimer } = useWorkout();
  const [showExercises, setShowExercises] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(-1);

  return (
    <Container>
      <button
        onClick={() => {
          setShowExercises(!showExercises);
          setSelectedExercise(-1);
        }}
      >
        <WorkoutTitle>{workoutTimer?.workoutTitle}</WorkoutTitle>
        <span>0/{workoutTimer?.exercises.length}</span>
        <Chevron $showExercises={showExercises} />
      </button>

      <ExerciseList $showExercises={showExercises}>
        {workoutTimer?.exercises.map((exercise, index) => (
          <div key={index}>
            <button
              onClick={() =>
                setSelectedExercise((prev) => (prev === index ? -1 : index))
              }
            >
              {exercise?.title}
            </button>

            <SetsList $selectedExercise={selectedExercise} $index={index}>
              {exercise?.sets.map((set, index) => (
                <div key={index}>
                  {set.reps} {set.weight} {set.rest}
                </div>
              ))}
            </SetsList>
          </div>
        ))}
      </ExerciseList>
    </Container>
  );
};

export default WorkoutTimerCard;

            // {showSets === index &&
            //   exercise?.sets.map((set, index) => (
            //     <div key={index}>
            //       <p>
            //         {set.reps} {set.weight} {set.rest}
            //       </p>
            //     </div>
            //   ))}
