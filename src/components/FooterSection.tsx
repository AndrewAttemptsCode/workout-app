import styled from "styled-components";
import HeaderLogo from "./HeaderLogo";
import Socials from "./Socials";
import Copyright from "./Copyright";

const Container = styled.footer`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;

  hr {
    width: 90%;
    margin: 0 auto;
  }
`;

const LayoutPad = styled.div`
  padding: 1rem 0;

  @media (min-width: 768px) {
    padding: 2rem 0;
  }
`;

const FooterSection = () => {
  return (
    <Container aria-label="Footer section">
      <hr aria-hidden="true" />
      <LayoutPad>
        <HeaderLogo />
        <Socials />
        <Copyright />
      </LayoutPad>
    </Container>
  );
};

export default FooterSection;