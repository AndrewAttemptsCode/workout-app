import { RiResetLeftLine } from "react-icons/ri";
import styled from "styled-components";
import { useDashboard, type DashResetStatProps } from "../contexts/DashboardContext";

const Button = styled.button`
  aspect-ratio: 1 / 1;
  background: rgba(var(--primary-color), 0.2);
  color: inherit;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 4rem;
  -webkit-tap-highlight-color: transparent;
  transition: box-shadow 0.3s ease, background 0.3s ease;
    
  &:focus-visible {
    box-shadow: 0 0 4px 2px rgb(var(--red-accent));
    background: rgba(var(--red-accent), 0.2);
  }

  &:hover {
    box-shadow: 0 0 4px 2px rgb(var(--red-accent));
    background: rgba(var(--red-accent), 0.2);
  }
`;

type DashResetButtonProps = {
  value: DashResetStatProps;
}

const DashResetButton = ({ value }: DashResetButtonProps) => {
  const { dashResetStat } = useDashboard();
  
  return (
    <Button
      title="Reset Stats"
      aria-label={`Reset stats for ${value}`}
      onClick={() => dashResetStat(value)}
    >
      <RiResetLeftLine />
    </Button>
  );
};

export default DashResetButton;