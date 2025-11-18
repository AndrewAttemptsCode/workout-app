import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
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
  outline: none;
  background: rgba(var(--primary-color), 0.2);
  border: 2px solid transparent;
  -webkit-tap-highlight-color: transparent;
  transition: box-shadow 0.3s ease;

  &:focus-visible {
    box-shadow: 0 0 4px 2px rgb(var(--gold-accent));
  }

  &:hover {
    box-shadow: 0 0 4px 2px rgb(var(--gold-accent));
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .lock {
    opacity: 1;
    transform: translate(-50%, -50%) translateX(13px);
  }

  .unlock {
    opacity: 1;
    transform: translate(-50%, -50%) translateX(-13px) rotate(-10deg);
  }

  .hidden {
    opacity: 0;
  }
`;

const SliderPip = styled.div<SliderPipProps>`
  position: absolute;
  height: 20px;
  width: 20px;
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
        aria-label={"Edit item"}
        aria-pressed={status}
        title={`${status ? "Lock" : "Unlock"} item`}
      >
        <SliderPip $status={status} />

        <LockKeyholeOpen
          size={20} 
          color="rgb(var(--gold-accent))"
          className={status ? "unlock" : "hidden"} 
        />

        <LockKeyhole 
          size={20} 
          color="rgb(var(--gold-accent))" 
          className={status ? "hidden" : "lock"}
        />
        
      </Button>
    </Container>
  );
};

export default LockButton;