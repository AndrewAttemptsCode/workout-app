import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    font-weight: bold;
    text-transform: uppercase;

    @media (min-width: 768px) {
      font-size: 1.4rem;
    }
  }

  li {
    list-style: none;
    padding: 0.5rem;
  }

  li a {
    color: inherit;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }

    &.active {
      border-bottom: 2px solid rgb(var(--gold-accent));
    }
  }
`;

const NavBar = () => {
  return (
    <Nav>
      <ul>
        <li><NavLink to={"/workouts"}>Workouts</NavLink></li>    
        <li><NavLink to={"/exercises"}>Exercises</NavLink></li>  
        <li><NavLink to={"/dashboard"}>Dashboard</NavLink></li>  
      </ul>
    </Nav>
  );
};

export default NavBar;