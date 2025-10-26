import styled from "styled-components";
import ExerciseList from "../components/ExerciseList";

const StylesContainer = styled.div`
  padding: 1rem 0;
`;

const ResponsiveContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const ExercisePage = () => {
  return (
    <StylesContainer>
      <ResponsiveContainer>
        <ExerciseList />
      </ResponsiveContainer>
    </StylesContainer>
  );
};

export default ExercisePage;
