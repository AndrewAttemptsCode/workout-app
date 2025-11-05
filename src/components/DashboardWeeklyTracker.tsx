import styled from "styled-components";

const StylesContainer = styled.div`
  padding: 1rem 0;
`;

const ResponsiveContainer = styled.div`
  width: min(90%, 1024px);
  margin: 0 auto;
  background: rgba(var(--primary-color), 0.2);
  padding: 1rem;
`;

const DashboardWeeklyTracker = () => {
  return (
    <StylesContainer>
      <ResponsiveContainer>
        Weekly worked out tracker
      </ResponsiveContainer>
    </StylesContainer>
  );
};

export default DashboardWeeklyTracker;