import type React from "react";
import styled from "styled-components";

const SrOnlyWrapper = styled.span`
  position: absolute;
  height: 1px;
  width: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

type SrOnlyProps = {
  children: React.ReactNode;
}

const SrOnly = ({ children }: SrOnlyProps) => {
  return (
    <SrOnlyWrapper>{children}</SrOnlyWrapper>
  );
};

export default SrOnly;