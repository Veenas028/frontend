import React, { useState } from "react";

// Updated emoji options for Expenses
const emojiOptions = [
  { label: "🍔 Food & Dining", value: "🍔" },
  { label: "🚌 Transportation", value: "🚌" },
  { label: "🏠 Rent", value: "🏠" },
  { label: "💡 Utilities", value: "💡" },
  { label: "📱 Mobile/Internet", value: "📱" },
  { label: "🛒 Groceries", value: "🛒" },
  { label: "🎉 Entertainment", value: "🎉" },
  { label: "🛍️ Shopping", value: "🛍️" },
  { label: "💊 Health", value: "💊" },
  { label: "🏥 Medical", value: "🏥" },
  { label: "📚 Education", value: "📚" },
  { label: "✈️ Travel", value: "✈️" },
  { label: "🐾 Pet Care", value: "🐾" },
  { label: "🎁 Gifts", value: "🎁" },
  { label: "💳 Subscriptions", value: "💳" },
  { label: "🧾 Bills", value: "🧾" },
  { label: "🚗 Car", value: "🚗" },
  { label: "🧹 Household", value: "🧹" },
  { label: "📦 Others", value: "📦" },
];

const ExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    category: "",
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

    const { category, amount, date } = formData;
    if (!category || !amount || !date) {
      alert("Please fill all required fields.");
      return;
    }

    const expense = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    onAddExpense(expense);
    setFormData({
      category: "",
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
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Expense Category
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
          placeholder="e.g., Grocery Shopping"
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
          placeholder="e.g., 1200"
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

     

      <button
        type="submit"
        className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
