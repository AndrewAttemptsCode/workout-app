import { Globe } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import styled from "styled-components";

const Container = styled.ul`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 0.5rem 0;
  list-style: none;
`;

const SocialItem = styled.li`
  aspect-ratio: 1 / 1;
  height: 2rem;
  width: auto;
  -webkit-tap-highlight-color: transparent;

  &:hover svg {
    transform: scale(1.1);
    color: rgb(var(--gold-accent));
  }
  
  svg {
    object-fit: contain;
    width: 100%;
    height: 100%;
    transition: transform 0.2s ease, color 0.2s ease;
  }

  a {
    color: inherit;
    outline: none;

    &:focus-visible svg{
      transform: translateY(-5px);
      color: rgb(var(--gold-accent));
    }
  }
`;

const Socials = () => {
  return (
    <Container>
      <SocialItem>
        <a href="https://andrewtravis.uk/" target="_blank" rel="noopener noreferrer" aria-label="Navigate to portfolio website">
          <Globe />
        </a>
      </SocialItem>
      <SocialItem>
        <a href="https://github.com/AndrewAttemptsCode" target="_blank" rel="noopener noreferrer" aria-label="Navigate to Github profile">
          <FaGithub />
        </a>
      </SocialItem>
      <SocialItem>
        <a href="https://www.linkedin.com/in/andrewtravis0/" target="_blank" rel="noopener noreferrer" aria-label="Navigate to LinkedIn profile">
          <FaLinkedin />
        </a>
      </SocialItem>
    </Container>
  );
};

export default Socials;