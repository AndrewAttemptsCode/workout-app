import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import styled from "styled-components";
import { useDashboard } from "../contexts/DashboardContext";

const Container = styled.div`
  padding: 1rem 0;
  margin: 0 auto;
  width: min(90%, 1024px);

  h2 {
    line-height: 1;
    margin-bottom: 1rem;
    text-transform: uppercase;
    font-size: 1rem;
    display: flex;
    align-items: center;
    user-select: none;

    &::after  {
      content: "";
      flex: 1;
      height: 2px;
      background: rgb(var(--primary-color));
      margin-left: 1rem;
    }
  }
`;

const MonthlyWorkoutChart = () => {
  const { monthlyWorkoutCount } = useDashboard();

  return (
    <Container>
      <h2>Workouts per month</h2>
      <BarChart
        style={{ width: "100%", maxHeight: "150px", aspectRatio: 1.618 }}
        responsive
        data={monthlyWorkoutCount}
        margin={{
        top: 10,
        right: 0,
        left: 0,
        bottom: 10,
      }}
      >
        <Bar dataKey="count" fill="rgb(var(--primary-color))" />
        <XAxis
          dataKey="month"
          interval={0}
          angle={-35}
          height={25}
          textAnchor="end"
          fontSize={14}
          tick={{ fill: "rgb(var(--primary-color))" }}
          tickFormatter={(value) => value.slice(0, 3)}
          stroke="rgb(var(--primary-color))"
        />
        <YAxis 
          width="auto"
          interval={0}
          allowDecimals={false}
          tick={{ fill: "rgb(var(--primary-color))" }}
          stroke="rgb(var(--primary-color))"
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: "#1e1e1e",
            border: "2px solid rgb(var(--gold-accent))",
            color: "rgb(var(--primary-color))",
            padding: "0.5rem 1rem"
          }}
          cursor={false}
        />
      </BarChart>
    </Container>
  );
};

export default MonthlyWorkoutChart;