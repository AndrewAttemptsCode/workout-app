import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StylesContainer = styled.div`
  padding: 2rem 0;
  background: rgba(var(--gold-accent), 0.6);
  border-top: 2px solid rgb(var(--gold-accent));
  border-bottom: 2px solid rgb(var(--gold-accent));
`;

const ResponsiveContainer = styled.div`
  width: min(90%, 1024px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  line-height: 1.1;
  text-align: center;
  text-transform: uppercase;
`;

const Subtitle = styled.p`
  text-align: center;
  font-weight: bold;
`;

const CtaButton = styled.button`
  text-transform: uppercase;
  font-weight: bold;
  outline: none;
  color: rgb(var(--primary-color));
  background: rgba(var(--gold-accent), 0.6);
  border: 2px solid rgb(var(--gold-accent));
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: box-shadow 0.3s ease;
  padding: 1rem;

  &:focus-visible {
      box-shadow: 0 0 4px 2px rgb(var(--gold-accent));
    }

  &:hover {
    box-shadow: 0 0 4px 2px rgb(var(--gold-accent));
  }
`;

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <StylesContainer>
      <ResponsiveContainer>
        <Title>Track. Train.<br /> Transform.</Title>
        <Subtitle>
          Create workouts, add exercises,<br /> reach goals your way!
        </Subtitle>
        <CtaButton onClick={() => navigate("/workouts")}>Get Started</CtaButton>
      </ResponsiveContainer>
    </StylesContainer>
  );
};

export default HeroSection;