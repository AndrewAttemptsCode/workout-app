import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";
import styled from "styled-components";
import HeaderLogo from "./HeaderLogo";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-height: 100dvh;
  background: linear-gradient(to bottom, #3f3f3f, #1a1919);
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem 0;
  width: min(90%, 400px);
  background: rgba(var(--red-accent), 0.2);
  box-shadow: 0 0 8px 2px rgb(var(--red-accent));

  h1, p, button {
    margin: 0 auto;
    text-align: center;
  }

  h1 {
    line-height: 1.1;
  }

  button {
    padding: 0.5rem 1rem;
    width: fit-content;
    cursor: pointer;
    font-weight: bold;
    text-transform: uppercase;
    outline: none;
    color: rgb(var(--primary-color));
    border: 2px solid rgb(var(--gold-accent));
    background: rgba(var(--gold-accent), 0.6);
    transition: box-shadow 0.3s ease;
    -webkit-tap-highlight-color: transparent;

    &:focus-visible {
      box-shadow: 0 0 4px 2px rgb(var(--gold-accent));
    }

    &:hover {
      box-shadow: 0 0 4px 2px rgb(var(--gold-accent));
    }
  }
`;

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let message = "Unknown Error";

  if (isRouteErrorResponse(error)) {
    message = `${error.status} - ${error.statusText}`;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <Container>
      <MessageContainer>
        <HeaderLogo />
        <h1>Oops!</h1>
        <p>{message}</p>
        <button onClick={() => navigate("/")}>Back to safety</button>
      </MessageContainer>
    </Container>
  );
};

export default ErrorBoundary;