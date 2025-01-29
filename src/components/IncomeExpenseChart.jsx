import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import moment from "moment";

const IncomeExpenseChart = ({ transactions }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [timeline, setTimeline] = useState("1w");

  useEffect(() => {
    filterData();
  }, [transactions, timeline]);

  const filterData = () => {
    const now = moment();
    let startDate;
    let interval;
    let format;

    switch (timeline) {
      case "1w":
        startDate = now.clone().subtract(1, "weeks");
        interval = "day";
        format = "ddd DD";
        break;
      case "1m":
        startDate = now.clone().subtract(1, "months");
        interval = "7d";
        format = "MMM DD";
        break;
      case "3m":
        startDate = now.clone().subtract(3, "months");
        interval = "2w";
        format = now.year() !== startDate.year() ? "DD-MMM-YYYY" : "MMM DD";
        break;
      case "6m":
      case "1y":
      case "all":
        startDate = now.clone().subtract(timeline === "6m" ? 6 : timeline === "1y" ? 12 : 100, "months");
        interval = "month";
        format = now.year() !== startDate.year() ? "MMM-YYYY" : "MMM";
        break;
      default:
        return;
    }

    const filtered = transactions
      .filter((t) => moment(t.date).isBetween(startDate, now, undefined, "[]"))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const groupedData = {};

    filtered.forEach((t) => {
      const dateKey = moment(t.date).format(format);
      if (!groupedData[dateKey]) {
        groupedData[dateKey] = { date: dateKey, income: 0, expense: 0 };
      }
      if (t.type === "income") {
        groupedData[dateKey].income += t.amount;
      } else {
        groupedData[dateKey].expense += t.amount;
      }
    });

    setFilteredData(Object.values(groupedData));
  };

  return (
    <div  className="chart-container">
    <div className="filter-container">
      <select className="filter-select" onChange={(e) => setTimeline(e.target.value)} value={timeline}>
        <option value="1w">Last Week</option>
        <option value="1m">Last Month</option>
        <option value="3m">Last 3 Months</option>
        <option value="6m">Last 6 Months</option>
        <option value="1y">Last Year</option>
        <option value="all">All Time</option>
      </select>
    </div>
      <ResponsiveContainer className="full-width" height={300}>
        <AreaChart data={filteredData}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="income" stroke="#82ca9d" fill="#82ca9d80" />
          <Area type="monotone" dataKey="expense" stroke="#ff4d4d" fill="#ff4d4d80" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpenseChart;
