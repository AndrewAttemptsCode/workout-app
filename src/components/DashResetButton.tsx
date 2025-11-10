import { RiResetLeftLine } from "react-icons/ri";
import styled from "styled-components";

const Button = styled.button`
  aspect-ratio: 1 / 1;
`;

const DashResetButton = () => {
  return (
    <Button>
      <RiResetLeftLine />
    </Button>
  );
};

export default DashResetButton;