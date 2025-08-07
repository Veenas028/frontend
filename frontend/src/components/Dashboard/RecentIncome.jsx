import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <div className="flex items-center justify-between ">
        <h5 className="text-lg">Income</h5>
        <button className="card-btn flex items-center gap-1" onClick={onSeeMore}>
         See All <LuArrowRight className="text-base" />
       </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncome;