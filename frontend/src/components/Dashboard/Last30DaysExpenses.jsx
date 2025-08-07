import React, { useEffect, useState } from 'react';
import CustomPieChart from "../Charts/CustomPieCharts";

const COLORS = ["#FA2C37", "#FF6900", "#4f39f6", "#875CF5", "#12B76A", "#F79009"];

const RecentExpenseWithChart = ({ data, totalExpense }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.category,   // Assuming each expense has a category
      amount: item?.amount,
    }));

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Expenses"
        totalAmount={`$${totalExpense}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentExpenseWithChart;
