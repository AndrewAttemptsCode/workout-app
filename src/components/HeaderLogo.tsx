import styled, { keyframes } from "styled-components";
import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";

const fade = keyframes`
  33% {
    filter: drop-shadow(0px 0px 2px #ffffff);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 0.5rem;
`;

const LogoImageWrapper = styled.div`
  aspect-ratio: 1 / 1;
  height: 50px;
  width: auto;
  background: rgb(var(--gold-accent));
  border-radius: 5rem;
  box-shadow: 0px 0px 4px rgb(var(--gold-accent));

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
    animation: ${fade} 6s ease-in-out infinite;
  }
`;

const LogoText = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  line-height: 1.1;
  letter-spacing: 2px;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  color: inherit;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  padding: 0.5rem;

  &:focus-visible {
    box-shadow: 0 0 4px 2px rgb(var(--gold-accent));
  }
`;

const HeaderLogo = () => {
  return (
    <Container>
      <StyledNavLink to={"/"} aria-label="Navigate to Storm Lifts homepage">
        <LogoImageWrapper>
          <img src={logo} alt="" />
        </LogoImageWrapper>
        <LogoText>
          Storm <br /> Lifts
        </LogoText>
      </StyledNavLink>
    </Container>
  );
};

export default HeaderLogo;