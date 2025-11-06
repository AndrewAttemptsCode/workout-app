import styled from "styled-components";
import { useDashboard } from "../contexts/DashboardContext";

const StylesContainer = styled.div`
  padding: 1rem 0;
`;

const ResponsiveContainer = styled.div`
  width: min(90%, 1024px);
  margin: 0 auto;
  background: rgba(var(--primary-color), 0.2);
  padding: 1rem;

  h2 {
    line-height: 1;
    margin-bottom: 1rem;
    text-transform: uppercase;
    font-size: 1rem;
    display: flex;
    align-items: center;

    &::after  {
      content: "";
      flex: 1;
      height: 2px;
      background: rgb(var(--primary-color));
      margin-left: 1rem;
    }
  }
`;

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  text-align: center;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemDisplay = styled.div<{ $complete: boolean; }>`
  aspect-ratio: 16 / 9;
  background: ${({ $complete }) => $complete ? ("rgba(var(--green-accent), 0.6)") : ("rgba(var(--primary-color), 0.1)")}; 
`;

const ItemText = styled.span`
  font-weight: bold;
  
  &::before {
    content: attr(data-short);
  }

  @media (min-width: 1024px) {
    &::before {
      content: attr(data-long);
    }
  }

`;


const DashboardWeeklyTracker = () => {
  const { daysComplete } = useDashboard();

  return (
    <StylesContainer>
      <ResponsiveContainer>
          <h2>Weekly Tracker</h2>
        <DaysContainer>
          {daysComplete.map(dayComplete => (
            <ItemWrapper key={dayComplete.day}>
              <ItemDisplay 
                $complete={dayComplete.complete} 
                aria-label={`${dayComplete.day} is ${dayComplete.complete ? "complete" : "not complete"}`}
              />
              <ItemText
                data-short={dayComplete.day.slice(0, 2)}
                data-long={dayComplete.day}
              />
            </ItemWrapper>
          ))}
        </DaysContainer>
      </ResponsiveContainer>
    </StylesContainer>
  );
};

export default DashboardWeeklyTracker;