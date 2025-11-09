import { Bar, BarChart, XAxis, YAxis } from "recharts";
import styled from "styled-components";

const defaultMonthlyWorkoutCount = [
  {
    month: "January",
    count: 2,
  },
  {
    month: "February",
    count: 5,
  },
  {
    month: "March",
    count: 2,
  },
  {
    month: "April",
    count: 0,
  },
  {
    month: "May",
    count: 8,
  },
  {
    month: "June",
    count: 2,
  },
  {
    month: "July",
    count: 6,
  },
  {
    month: "August",
    count: 11,
  },
  {
    month: "September",
    count: 0,
  },
  {
    month: "October",
    count: 7,
  },
  {
    month: "November",
    count: 5,
  },
  {
    month: "December",
    count: 1,
  },
];

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

  return (
    <Container>
      <h2>Workouts per month</h2>
      <BarChart
        style={{ width: "100%", maxHeight: "150px", aspectRatio: 1.618 }}
        responsive
        data={defaultMonthlyWorkoutCount}
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
        />
        <YAxis 
          width="auto"
          interval={0}
          tick={{ fill: "rgb(var(--primary-color))" }}
        />
      </BarChart>
    </Container>
  );
};

export default MonthlyWorkoutChart;