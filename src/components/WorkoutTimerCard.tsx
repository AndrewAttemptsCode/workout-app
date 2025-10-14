import { useState } from "react";
import { useWorkout } from "../contexts/WorkoutContext";
import styled, { css } from "styled-components";
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

const WorkoutChevron = styled(ChevronDown)<{ $showExercises: boolean }>`
  transition: transform 0.3s ease;
  transform: rotate(${({ $showExercises }) =>
    $showExercises ? "180deg" : "0deg"});
`;

const ExerciseChevron = styled(ChevronDown)<{ $selectedExercise: number; $index: number }>`
  transition: transform 0.3s ease;
  transform: rotate(${({ $selectedExercise, $index }) => 
    $selectedExercise === $index ? "180deg": "0deg"});
`;

const ExerciseList = styled.div<{ $showExercises: boolean }>`
  overflow: hidden;
  transition: max-height 0.4s ease, opacity 0.3s ease;
  max-height: ${({ $showExercises }) =>
    ($showExercises ? "1000px" : 0)
  };
  opacity: ${({ $showExercises }) => ($showExercises ? 1 : 0)};
`;

const TitleStyle = css`
  margin-right: auto;
`;

const WorkoutTitle = styled.div`
  ${TitleStyle}
`;

const ExerciseTitle = styled.div`
  ${TitleStyle}
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
  padding: 0 0.5rem;
`;

const SetStyles = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  text-align: center;
`;

const SetHeading = styled.div`
  ${SetStyles}
  font-weight: bold;
  font-size: 13px;
  text-transform: uppercase;
`;

const SetRow = styled.div`
  ${SetStyles}
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
        <WorkoutChevron $showExercises={showExercises} />
      </button>

      <ExerciseList $showExercises={showExercises}>
        {workoutTimer?.exercises.map((exercise, index) => (
          <div key={index}>
            <button
              onClick={() =>
                setSelectedExercise((prev) => (prev === index ? -1 : index))
              }
            >
              <ExerciseTitle>{exercise?.title}</ExerciseTitle>
              <span>0/{exercise?.sets.length}</span>
              <ExerciseChevron $selectedExercise={selectedExercise} $index={index} />
            </button>

            <SetsList $selectedExercise={selectedExercise} $index={index}>
              <SetHeading>
                <span>Reps</span>
                <span>Weight</span>
                <span>Rest</span>
                <span>Complete</span>
              </SetHeading>
              
              {exercise?.sets.map((set, index) => (
                <SetRow key={index}>
                  <span>{set.reps}</span>
                  <span>{set.weight}</span>
                  <span>{set.rest}</span>
                  <span>{set.complete}</span>
                </SetRow>
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
