import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import styled from "styled-components";
import { useDashboard } from "../contexts/DashboardContext";
import DashResetButton from "./DashResetButton";

const Container = styled.section`
  padding: 1rem 0;
  margin: 0 auto;
  width: min(90%, 1024px);
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

const MonthlyWorkoutChart = () => {
  const { monthlyWorkoutCount } = useDashboard();

  return (
    <Container aria-labelledby="chart-heading">
      <Heading>
        <h2 id="chart-heading">Workouts per month</h2>
        <DashResetButton value="workouts per month"/>
      </Heading>
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