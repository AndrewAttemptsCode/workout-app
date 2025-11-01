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
    display: inline-block;
    color: inherit;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    transition: color 0.3s ease, transform 0.3s ease;

    &:focus-visible {
      color: rgb(var(--gold-accent));
      transform: translateY(-2px);
    }

    &:hover {
      color: rgb(var(--gold-accent));
      transform: translateY(-2px);
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