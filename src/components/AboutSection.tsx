import styled from "styled-components";

const StylesContainer = styled.div`
  padding: 2rem 0;
  background: rgba(var(--primary-color), 0.3);
`;

const ResponsiveContainer = styled.div`
  width: min(90%, 768px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AboutTitle = styled.h2`
  line-height: 1.1;
  font-size: clamp(1.5rem, 1rem + 2.5vw, 3rem);
  margin-bottom: 1rem;
`;

const AboutSubtitle = styled.p`
  font-size: clamp(1rem, 0.7333rem + 1.3333vw, 1.8rem);
  line-height: 1.3;
`;

const AboutSection = () => {
  return (
    <StylesContainer>
      <ResponsiveContainer>
        <AboutTitle>
          Build and organize personalized workouts from your own exercises.
        </AboutTitle>
        <AboutSubtitle>
          Designed for full flexibility, you are never locked into presets — every routine is your own.
        </AboutSubtitle>
      </ResponsiveContainer>
    </StylesContainer>
  );
};

export default AboutSection;