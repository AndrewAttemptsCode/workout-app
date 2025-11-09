import styled from "styled-components";
import { useDashboard } from "../contexts/DashboardContext";
import { formatDistance } from "date-fns";

const StylesContainer = styled.div`
  padding: 1rem 0;
`;

const ResponsiveContainer = styled.div`
  width: min(90%, 1024px);
  margin: 0 auto;

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

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 1fr;
  gap: 1rem;
`;

const StatItem = styled.div`
  background: rgba(var(--primary-color), 0.2);
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const StatName = styled.h3`
  font-size: 1rem;
`;

const StatValue = styled.p`
  font-weight: bold;
  color: rgb(var(--gold-accent));
`;

const DashboardStats = () => {
  const { stats } = useDashboard();

  return (
    <StylesContainer>
      <ResponsiveContainer>
        <h2>Quick Stats</h2>
        <StatsContainer>
          {stats.map(stat => {
            let displayValue: number | string;

            if (typeof stat.value === "number") {
              if (stat.name === "Heaviest weight lifted") {
                displayValue = Number(stat.value) + " kg";
              } else {
                displayValue = Number(stat.value);
              }
            } else if (stat.name === "Last worked out") {
              if (stat.value !== "None yet") {
                const currentDate = new Date();
                displayValue = formatDistance(new Date(stat.value), currentDate, {
                  addSuffix: true,
                  includeSeconds: true,
                });
              } else {
                displayValue = String(stat.value);
              }
            } else {
              displayValue = String(stat.value);
            }
            
            return (
              <StatItem key={stat.name}>
                <StatName>
                  {stat.name}
                </StatName>
                <StatValue>
                  {displayValue}
                </StatValue>
              </StatItem>  
            )
            })
          }      
        </StatsContainer>
      </ResponsiveContainer>
    </StylesContainer>
  );
};

export default DashboardStats;