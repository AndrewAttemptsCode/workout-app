import styled from "styled-components";
import { useWorkout } from "../contexts/WorkoutContext";
import ExerciseItem from "./ExerciseItem";
import AddNewItem from "./AddNewItem";
import SrOnly from "./SrOnly";

const Container = styled.section`
`;

const ExercisesWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  grid-auto-rows: 1fr;
  min-height: 300px;
  gap: 1rem;
  list-style-type: none;
  padding: 0;
`;

const ExerciseList = () => {
  const { exercises, addNewExercise } = useWorkout(); 

  return (
    <Container aria-labelledby="exercises-heading">
      <SrOnly><h2 id="exercises-heading">My Exercises</h2></SrOnly>

      <ExercisesWrapper>
        {exercises.map((exercise) => (
          <ExerciseItem key={exercise.id} exercise={exercise} />
        ))}
        <li>
          <AddNewItem onClick={addNewExercise} title="exercise" />
        </li>
      </ExercisesWrapper>
    </Container>
  );
};

export default ExerciseList;
