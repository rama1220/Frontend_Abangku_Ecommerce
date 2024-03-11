import { Chart } from "react-google-charts";

const data = [
  ["Year", "Sales", "Expenses"],
  ["2021", 560, 460],
  ["2022", 660, 1120],
  ["2023", 1030, 540],
];

const options = {
  title: "Sales Statistics",
  curveType: "function",
  legend: { position: "bottom" },
};

const Charts = () => {
  return (
    <Chart
      chartType="LineChart"
      width="620px"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default Charts;
