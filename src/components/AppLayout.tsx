import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./NavBar";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  min-height: 100dvh;
  background: linear-gradient(to bottom, #3f3f3f, #1a1919);

  header {
    margin: 0 auto;
  }
`;

const AppLayout = () => {
  return (
    <Container>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </Container>
  );
};

export default AppLayout;