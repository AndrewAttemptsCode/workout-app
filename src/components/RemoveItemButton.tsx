import { Trash2 } from "lucide-react";
import styled from "styled-components";

const Button = styled.button`
  background: rgba(var(--red-accent), 0.6);
  border: 2px solid rgb(var(--red-accent));
  cursor: pointer;
  outline: none;
  transition: box-shadow 0.3s ease;

  &:focus-visible {
    box-shadow: 0 0 4px 2px rgb(var(--red-accent));
  }

  &:hover {
    box-shadow: 0 0 4px 2px rgb(var(--red-accent));
  }
`;

type RemoveItemButtonProps = {
  onClick: () => void;
}

const RemoveItemButton = ({ onClick }: RemoveItemButtonProps) => {
  return (
    <Button onClick={onClick} aria-label="Remove item from list">
      <Trash2 size={20} color="rgb(var(--primary-color))" />
    </Button>
  );
};

export default RemoveItemButton;