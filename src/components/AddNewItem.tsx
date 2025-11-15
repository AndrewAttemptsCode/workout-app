import { Dumbbell } from "lucide-react";
import styled from "styled-components";

const Button = styled.button`
  border: 2px dashed rgb(var(--gold-accent));
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  width: 100%;
  gap: 2rem;
  font-size: 1.5rem;
  color: rgb(var(--primary-color));
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  transition: border 0.3s ease, background 0.3s ease;

  svg {
    transition: transform 0.3s ease;
  }

  &:focus-visible {
    border: 2px dashed rgb(var(--green-accent));
    background: rgba(var(--green-accent), 0.6);

    svg {
      transform: scale(1.1);
    }
  }

  &:hover {
    border: 2px dashed rgb(var(--green-accent));
    background: rgba(var(--green-accent), 0.6);

    svg {
      transform: scale(1.1);
    }
  }
`;

type AddNewItemProps = {
  onClick: () => void;
  title: string;
}

const AddNewItem = ({ onClick, title }: AddNewItemProps) => {
  return (
    <Button onClick={onClick} aria-label={`Add new ${title}`}>
      <Dumbbell size={60} color="rgb(var(--primary-color))" />
      Add new {title}
    </Button>
  );
};

export default AddNewItem;