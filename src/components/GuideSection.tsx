import styled from "styled-components";

const StylesContainer = styled.div`
  padding: 2rem 0;
`;

const ResponsiveContainer = styled.div`
  width: min(90%);
  margin: 0 auto;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  gap: 1.5rem;
`;

const GuideCard = styled.div`
  position: relative;
  background: rgba(var(--primary-color), 0.3);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: clamp(1.5rem, 1.3333rem + 0.8333vw, 2rem);
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 0.8rem + 1vw, 1.6rem);
`;

const StepNumber = styled.div`
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  font-size: 4rem;
  color: rgba(var(--primary-color), 0.2);
`;

const steps = [
  {
    title: "Create your exercises",
    subtitle: "Add your favourite movements",
  },
  {
    title: "Build your workouts",
    subtitle: "Combine exercises into workouts",
  },
  {
    title: "Load your workout",
    subtitle: "Start the workout and get lifting",
  },
  {
    title: "Track your progress",
    subtitle: "Revisit, edit, or expand as you grow",
  },
];

const GuideSection = () => {
  return (
    <StylesContainer>
      <ResponsiveContainer>
        {steps.map((step, index) => (
          <GuideCard key={index}>
            <StepNumber>{index + 1}</StepNumber>
            <Title>{step.title}</Title>
            <Subtitle>{step.subtitle}</Subtitle>
          </GuideCard>
        ))}
      </ResponsiveContainer>
    </StylesContainer>
  );
};

export default GuideSection;