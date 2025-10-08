import styled from "styled-components";

const Button = styled.button`
  border: 2px dashed rgb(var(--gold-accent));
  background: transparent;
`;

type AddNewItemProps = {
  onClick: () => void;
  title: string;
}

const AddNewItem = ({ onClick, title }: AddNewItemProps) => {
  return (
    <Button onClick={onClick}>Add new {title}</Button>
  );
};

export default AddNewItem;