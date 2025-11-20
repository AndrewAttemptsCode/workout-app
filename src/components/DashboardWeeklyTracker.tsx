import styled from "styled-components";
import { useDashboard } from "../contexts/DashboardContext";
import DashResetButton from "./DashResetButton";
import SrOnly from "./SrOnly";

const StylesContainer = styled.section`
  padding: 1rem 0;
`;

const ResponsiveContainer = styled.div`
  width: min(90%, 1024px);
  margin: 0 auto;
`;

const DaysContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  text-align: center;
  list-style-type: none;
  padding: 0;
`;

const ItemWrapper = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemDisplay = styled.div<{ $complete: boolean; }>`
  aspect-ratio: 16 / 9;
  background: ${({ $complete }) => $complete ? ("rgba(var(--green-accent), 0.6)") : ("rgba(var(--primary-color), 0.2)")}; 
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

const Heading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
      line-height: 1;
      margin: 1rem 0;
      text-transform: uppercase;
      font-size: 1rem;
      display: flex;
      align-items: center;
      flex: 1;
      user-select: none;

      &::after  {
        content: "";
        flex: 1;
        height: 2px;
        background: rgb(var(--primary-color));
        margin: 0 1rem;
      }
    }
`;


const DashboardWeeklyTracker = () => {
  const { daysComplete } = useDashboard();

  return (
    <StylesContainer aria-labelledby="tracker-heading">
      <ResponsiveContainer>
        <Heading>
          <h2 id="tracker-heading">Weekly Tracker</h2>
          <DashResetButton value="weekly tracker" />
        </Heading>
        <DaysContainer>
          {daysComplete.map(dayComplete => (
            <ItemWrapper key={dayComplete.day}>
              <ItemDisplay $complete={dayComplete.complete} />
              <ItemText
                data-short={dayComplete.day.slice(0, 2)}
                data-long={dayComplete.day}
                aria-hidden="true"
              />
              <SrOnly>
                {`${dayComplete.day} is ${dayComplete.complete ? "complete" : "not complete"}`}
              </SrOnly>
            </ItemWrapper>
          ))}
        </DaysContainer>
      </ResponsiveContainer>
    </StylesContainer>
  );
};

export default DashboardWeeklyTracker;