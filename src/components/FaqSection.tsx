import { ChevronDown } from "lucide-react";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

const StylesContainer = styled.section`
  padding-bottom: 2rem;
`;

const ResponsiveContainer = styled.div`
  width: min(90%);
  margin: 0 auto;

  h2 {
    font-size: clamp(1.5rem, 1.3333rem + 0.8333vw, 2rem);
  }
`;

const QuestionContainer = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  min-height: 44px;
  width: 100%;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  color: rgb(var(--primary-color));
  border: none;
  border-bottom: 2px solid rgba(var(--primary-color), 0.8);
  background: rgba(var(--primary-color), 0.3);
  transition: color 0.3s ease, background 0.2s ease;

  span {
    font-weight: bold;
    font-size: clamp(1rem, 0.8rem + 1vw, 1.6rem);
  }

  &:focus-visible,
  &:hover {
    color: rgb(var(--gold-accent));
    background: rgba(var(--primary-color), 0.2);
  }
`;

const fadeIn = keyframes`
  0% {
    transform: translateY(-6px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const AnswerContainer = styled.div<{ $active: number; $index: number }>`
  display: ${({$active, $index}) => $active === $index ? "block" : "none"};
  user-select: none;
  padding: 1rem 0.5rem;
  animation: ${fadeIn} 0.8s ease forwards;

  span {
    font-size: clamp(1rem, 0.8rem + 1vw, 1.6rem);
  }
`;

const FaqChevron = styled(ChevronDown)<{ $active: number; $index: number }>`
  transition: transform 0.3s ease;
  transform: rotate(${({ $active, $index }) =>
    $active === $index ? "180deg" : "0deg"});
`;

const faqs = [
  {
    question: "Do I need an account?",
    answer: "No, you do not need an account to use this app.",
  },
  {
    question: "Is my data stored online?",
    answer: "No, everything is stored locally in your device browser.",
  },
  {
    question: "Is the app free to use?",
    answer: "Yes, the app is completely free to use.",
  },
  {
    question: "Does the app have adverts?",
    answer: "No, no adverts here."
  }
];

const FaqSection = () => {
  const [questionSelected, setQuestionSelected] = useState(-1);

  return (
    <StylesContainer aria-labelledby="faq-title">
      <ResponsiveContainer>
        <h2 id="faq-title">FAQ</h2>
        {faqs.map((faq, index) => (
          <div key={index}>
            <QuestionContainer
              onClick={() => setQuestionSelected(questionSelected === index ? -1 : index)}
              aria-expanded={questionSelected === index}
            >
              <span>{faq.question}</span>
              <FaqChevron $active={questionSelected} $index={index} />
            </QuestionContainer>
            <AnswerContainer
              $active={questionSelected}
              $index={index}
              aria-hidden={questionSelected !== index}
            >
              <span>{faq.answer}</span>
            </AnswerContainer>
          </div>
        ))}
      </ResponsiveContainer>
    </StylesContainer>
  );
};

export default FaqSection;