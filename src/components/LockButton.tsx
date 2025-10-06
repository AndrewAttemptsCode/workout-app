import styled, { css } from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Button = styled.button`
  position: relative;
  height: 30px;
  width: 60px;
  border-radius: 4rem;
  cursor: pointer;
  background: rgba(var(--primary-color), 0.2);
  border: 2px solid transparent;
  -webkit-tap-highlight-color: transparent;
`;

const SliderPip = styled.div<SliderPipProps>`
  position: absolute;
  height: 20px;
  width: 20px;
  background: red;
  border-radius: 4rem;
  top: 50%;
  left: 5px;
  background: rgba(var(--primary-color), 0.6);
  transform: translateY(-50%);
  transition: transform 0.3s ease;
  ${({$status}) =>
    $status && 
      css`
          transform: translate(25px, -50%);
          background: rgb(var(--gold-accent));
        `}
`;

type LockButtonProps = {
  onClick: () => void;
  status?: boolean;
};

type SliderPipProps = {
  $status: boolean;
};

const LockButton = ({ onClick, status = false }: LockButtonProps) => {
  return (
    <Container>
      <Button
        onClick={onClick}
      >
        <SliderPip $status={status} />
      </Button>
    </Container>
  );
};

export default LockButton;