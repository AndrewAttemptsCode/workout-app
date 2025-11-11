import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
`;

const Copyright = () => {
  return (
    <Container>
      <p>&copy; {new Date().getFullYear()} Andrew Travis</p>
    </Container>
  );
};

export default Copyright;