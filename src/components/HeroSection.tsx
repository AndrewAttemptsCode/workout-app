import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StylesContainer = styled.section`
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
  font-size: clamp(2rem, 1.3333rem + 3.3333vw, 4rem);
  user-select: none;
`;

const Subtitle = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: clamp(1rem, 0.7333rem + 1.3333vw, 1.8rem);
  user-select: none;
`;

const CtaButton = styled.button`
  margin: 0 auto;
  padding: 1rem;
  width: min(100%, 440px);
  text-transform: uppercase;
  font-weight: bold;
  font-size: clamp(1rem, 0.7333rem + 1.3333vw, 1.8rem);
  outline: none;
  color: rgb(var(--primary-color));
  background: rgba(var(--gold-accent), 0.6);
  border: 2px solid rgb(var(--gold-accent));
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: box-shadow 0.3s ease;

  &:focus-visible {
      box-shadow: 0 0 4px 4px rgb(var(--gold-accent));
    }

  &:hover {
    box-shadow: 0 0 4px 4px rgb(var(--gold-accent));
  }
`;

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <StylesContainer aria-label="Hero section introducing Storm Lifts app">
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