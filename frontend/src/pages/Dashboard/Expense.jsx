import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosinstance";
import toast from "react-hot-toast";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";

const Expense = () => {
  useUserAuth();
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;
    if (!category || !amount || !date) {
      alert("Please fill all required fields.");
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      fetchExpenseDetails();
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully!");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // handle download expense details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense details. Please try again.");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <ExpenseOverview
            transactions={expenseData}
            onAddExpense={() => setOpenAddExpenseModal(true)}
          />
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) =>
              setOpenDeleteAlert({ show: true, data: { id } })
            }
            onDownload={handleDownloadExpenseDetails}
          />
        </div>
      </div>

      <Modal
        isOpen={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title="Add Expense"
      >
        <AddExpenseForm onAddExpense={handleAddExpense} />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Expense"
      >
        <DeleteAlert
          content="Are you sure you want to delete this expense?"
          onDelete={() => deleteExpense(openDeleteAlert.data.id)}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Expense;
