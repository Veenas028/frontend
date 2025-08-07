import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const IncomeList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className="card bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Sources</h5>
        <button className="flex items-center gap-2 bg-pink-200 text-black px-4 py-2 rounded cursor-pointer hover:bg-pink-300 transition" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;