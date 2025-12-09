import { useState } from "react";
import { useWorkout } from "../contexts/WorkoutContext";
import styled, { css, keyframes } from "styled-components";
import { Check, ChevronDown, X } from "lucide-react";
import ProgressBar from "./ProgressBar";
import SrOnly from "./SrOnly";

const fadeIn = keyframes`
  0% {
    transform: translateY(-6px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Container = styled.section`
  width: min(100%, 768px);
  margin: 0 auto;
`;

const DefaultButtonStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  min-height: 44px;
  gap: 0.5rem;
  width: 100%;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
`;

const WorkoutButton = styled.button`
  ${DefaultButtonStyles}
  text-transform: uppercase;
  font-weight: bold;
  color: rgb(var(--primary-color));
  border: 2px solid rgb(var(--gold-accent));
  background: rgba(var(--gold-accent), 0.6);
  transition: box-shadow 0.3s ease;

  &:focus-visible,
  &:hover {
    box-shadow: 0 0 4px 2px rgb(var(--gold-accent));
  }
`;

const ExerciseButton = styled.button`
  ${DefaultButtonStyles}
  color: rgb(var(--primary-color));
  border: none;
  border-bottom: 2px solid rgba(var(--primary-color), 0.8);
  background: rgba(var(--primary-color), 0.3);
  transition: opacity 0.3s ease;

  &:focus-visible,
  &:hover {
    opacity: 0.9;
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
  display: ${({$showExercises}) => $showExercises ? "block" : "none"};
  animation: ${fadeIn} 0.3s ease forwards;
`;

const TitleStyle = css`
  margin-right: auto;
  font-size: 1rem;
`;

const WorkoutTitle = styled.h2`
  ${TitleStyle}
`;

const ExerciseTitle = styled.h3`
  ${TitleStyle}
  z-index: 5;
`;

const CompleteTracker = styled.span`
  z-index: 5;
`;

const SetsList = styled.section<{ $selectedExercise: number; $index: number }>`
  display: ${({$selectedExercise, $index}) => $selectedExercise === $index ? "block" : "none"};
  animation: ${fadeIn} 0.3s ease forwards;
  background: rgba(var(--primary-color), 0.1);
  user-select: none;
`;

const SetStyles = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SetHeading = styled.div`
  ${SetStyles}
  font-weight: bold;
  font-size: 13px;
  text-transform: uppercase;
  padding: 0.2rem 0.5rem;
`;

const SetRow = styled.div`
  ${SetStyles}
  padding: 0.2rem 0.5rem;
  background: rgba(var(--primary-color), 0.1);
`;

const WorkoutTimerCard = () => {
  const { workoutTimer } = useWorkout();
  const [showExercises, setShowExercises] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState(-1);

  const workoutComplete = workoutTimer?.exercises?.filter((exercise) => exercise?.complete).length ?? 0;
  const totalExercises = workoutTimer?.exercises?.length ?? 0;

  return (
    <Container aria-label="Workout breakdown">
      <WorkoutButton
        disabled={!workoutTimer}
        aria-expanded={showExercises}
        onClick={() => {
          setShowExercises(!showExercises);
          setSelectedExercise(-1);
        }}
      >
        <WorkoutTitle>{workoutTimer?.workoutTitle ?? "Empty workout"}</WorkoutTitle>
        <CompleteTracker
          title="Exercises complete"
          aria-label={`${workoutComplete} of ${totalExercises} exercises complete`}
        >
          {workoutComplete}/{totalExercises}
        </CompleteTracker>
        <WorkoutChevron $showExercises={showExercises} />
      </WorkoutButton>

      <ExerciseList $showExercises={showExercises}>
        {workoutTimer?.exercises.map((exercise, index) => {

          const exerciseComplete = exercise?.sets?.filter((set) => set.complete).length ?? 0;
          const totalSets = exercise?.sets?.length ?? 0;

          return (
            <div key={index}>
              <ExerciseButton
                onClick={() =>
                  setSelectedExercise((prev) => (prev === index ? -1 : index))
                }
                aria-expanded={selectedExercise === index}
              >
                <ProgressBar progress={totalSets > 0 ? exerciseComplete / totalSets : 0} />
                <ExerciseTitle>{exercise?.title}</ExerciseTitle>
                <CompleteTracker
                  title="Sets complete"
                  aria-label={`${exerciseComplete} of ${totalSets} sets complete`}
                >
                  {exerciseComplete}/{totalSets}
                </CompleteTracker>
                <ExerciseChevron $selectedExercise={selectedExercise} $index={index} />
              </ExerciseButton>

              <SetsList 
                $selectedExercise={selectedExercise}
                $index={index}
                aria-hidden={selectedExercise !== index}
                aria-label="Exercise breakdown"
              >
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
                    <span>{set.complete ? (
                      <>
                        <Check color="rgb(var(--green-accent))"/>
                        <SrOnly>Set complete</SrOnly>
                      </>
                    ) : (
                    <>
                      <X color="rgba(var(--primary-color), 0.8)" />
                      <SrOnly>Set not complete</SrOnly>
                    </>
                    )}
                    </span>
                  </SetRow>
                ))}
              </SetsList>
          </div>
        )})}
      </ExerciseList>
    </Container>
  );
};

export default WorkoutTimerCard;
