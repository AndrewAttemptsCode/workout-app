import styled from "styled-components";

const Bar = styled.div<{ $progress: number; }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: left;
  transform: scaleX(${({ $progress }) => $progress});
  background: rgba(var(--green-accent), 0.5);
  border-right: 2px solid rgba(var(--green-accent), 1);
  transition: transform 4s ease;
`;

const ProgressBar = ({ progress = 0 }: { progress: number }) => {
  return (
    <Bar $progress={progress} />
  );
};

export default ProgressBar;