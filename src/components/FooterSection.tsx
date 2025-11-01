import styled from "styled-components";
import HeaderLogo from "./HeaderLogo";
import Socials from "./Socials";

const Container = styled.footer`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;

  hr {
    width: 90%;
    margin: 0 auto;
  }
`;

const LayoutPad = styled.div`
  padding: 2rem 0;
`;

const FooterSection = () => {
  return (
    <Container>
      <hr />
      <LayoutPad>
        <HeaderLogo />
        <Socials />
      </LayoutPad>
    </Container>
  );
};

export default FooterSection;