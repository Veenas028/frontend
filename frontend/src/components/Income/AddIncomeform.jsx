import React, { useState } from "react";

const emojiOptions = [
  { label: "💼 Work", value: "💼" },
  { label: "🧾 Bonus", value: "🧾" },
  { label: "🎓 Scholarship", value: "🎓" },
  { label: "🏦 Bank Interest", value: "🏦" },
  { label: "🎁 Gift", value: "🎁" },
  { label: "💸 Other", value: "💸" },
  { label: "🧑‍💻 Freelancing", value: "🧑‍💻" },
  { label: "🏠 Rent Income", value: "🏠" },
  { label: "📈 Investment", value: "📈" },
  { label: "🪙 Crypto", value: "🪙" },
  { label: "📊 Stocks", value: "📊" },
  { label: "🛍️ Business", value: "🛍️" },
  { label: "👨‍🏫 Tutoring", value: "👨‍🏫" },
  { label: "🍼 Child Benefit", value: "🍼" },
  { label: "🏥 Insurance Claim", value: "🏥" },
  { label: "🪪 Pension", value: "🪪" },
  { label: "🛠️ Side Gig", value: "🛠️" },
  { label: "🪄 Magic Money", value: "🪄" }, // for fun
  { label: "🧿 Unexpected Income", value: "🧿" },
];


const IncomeForm = ({ onAddIncome }) => {
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { source, amount, date } = formData;
    if (!source || !amount || !date) {
      alert("Please fill all required fields.");
      return;
    }

    const income = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    onAddIncome(income);
    setFormData({
      source: "",
      amount: "",
      date: "",
      icon: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-6 rounded shadow-md"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Income Source
        </label>
        <input
          type="text"
          name="source"
          value={formData.source}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
          placeholder="e.g., Freelance Work"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Amount (₹)
        </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
          placeholder="e.g., 5000"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Date
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Icon (Emoji)
        </label>
        <select
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
        >
          <option value="">Select an icon</option>
          {emojiOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded"
      >
        Add Income
      </button>
    </form>
  );
};

export default IncomeForm;
