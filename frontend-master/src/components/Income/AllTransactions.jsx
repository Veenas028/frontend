import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";


const AllTransactions = ({ transactions }) => {
  return (
   <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <div className="flex items-center justify-between ">
        <h5 className="text-lg">All Transactions</h5>
      </div>

      <div className="mt-6">
 {transactions?.length ? (
    transactions.map((item) => (
    <TransactionInfoCard
      key={item._id}
      title={item.type === 'expense' ? item.category : item.source}
      icon={item.icon}
      date={moment(item.date).format("Do MMM YYYY")}
      amount={item.amount}
      type={item.type}
      hideDeleteBtn
    />
  ))
) : (
  <p className="text-gray-500 text-sm">No recent transactions.</p>
)}
      </div>
    </div>
  );
};

export default AllTransactions;