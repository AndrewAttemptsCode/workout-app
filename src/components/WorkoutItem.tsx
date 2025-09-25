import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 2px solid black;
  padding: 0.5rem;
`;

const WorkoutTitle = styled.input`
  padding: 0.5rem;
  width: 100%;
`;

const WorkoutItem = () => {
  const [workoutTitle, setWorkoutTitle] = useState("");

  const handleSetWorkoutTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkoutTitle(e.target.value);
  };

  return (
    <Container>
      <WorkoutTitle
        type="text"
        name="workoutTitle"
        id="workoutTitle"
        placeholder="Workout Name..."
        value={workoutTitle}
        onChange={handleSetWorkoutTitle}
      />
    </Container>
  );
};

export default WorkoutItem;
