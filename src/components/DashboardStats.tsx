import styled from "styled-components";
import { useDashboard } from "../contexts/DashboardContext";
import { formatDistance } from "date-fns";

const StylesContainer = styled.div`
  padding: 1rem 0;
`;

const ResponsiveContainer = styled.div`
  width: min(90%, 1024px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 1fr;
  gap: 1rem;
`;

const StatItem = styled.div`
  background: rgba(var(--primary-color), 0.2);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

const StatName = styled.h2`
  font-size: 1rem;
`;

const StatValue = styled.p`

`;

const DashboardStats = () => {
  const { stats } = useDashboard();

  return (
    <StylesContainer>
      <ResponsiveContainer>
        {stats.map(stat => {
          let displayValue

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
      </ResponsiveContainer>
    </StylesContainer>
  );
};

export default DashboardStats;