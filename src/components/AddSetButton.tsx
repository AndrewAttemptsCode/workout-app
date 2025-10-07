import { Dumbbell } from "lucide-react";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-weight: bold;
  outline: none;
  color: rgb(var(--primary-color));
  background: rgba(var(--green-accent), 0.6);
  border: 2px solid rgb(var(--green-accent));
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: box-shadow 0.3s ease;

  &:focus-visible {
      box-shadow: 0 0 4px 2px rgb(var(--green-accent));
    }

  &:hover {
    box-shadow: 0 0 4px 2px rgb(var(--green-accent));
  }
`;

type AddSetButtonProps = {
  onClick: () => void;
}

const AddSetButton = ({ onClick }: AddSetButtonProps) => {
  return (
    <Button onClick={onClick} aria-label="Add new set">
      <Dumbbell size={20} color="rgb(var(--primary-color))" />
      +
    </Button>
  );
};

export default AddSetButton;