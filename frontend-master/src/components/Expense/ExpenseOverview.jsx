import React, { useEffect, useState } from 'react';
import { LuPlus } from "react-icons/lu";
import CustomLineChart from '../Charts/CustomLineChart';
import { prepareExpenseLineChartData } from "../../helper/helper";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <div className="card bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending patterns and manage your expenses efficiently.
          </p>
        </div>

        <button className="add-btn flex items-center gap-2 bg-pink-200 text-black px-4 py-2 rounded cursor-pointer hover:bg-pink-300 transition" onClick={onAddExpense}>
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
