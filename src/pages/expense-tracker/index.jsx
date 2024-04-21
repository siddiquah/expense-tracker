import React, { useState } from "react";
import "./style.css";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const { transactions } = useGetTransactions();
  const [showNotification, setShowNotification] = useState(false);
  const { name, profilePhoto } = useGetUserInfo();
  const { balance, income, expenses } = useGetTransactions().transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      alert("Description is required");
      return;
    }
    if (!transactionAmount) {
      alert("Transaction amount is required");
      return;
    }
    addTransactionAndUpdate({
      description,
      transactionAmount,
      transactionType,
    });
  };

  const addTransactionAndUpdate = async ({
    description,
    transactionAmount,
    transactionType,
  }) => {
    addTransaction({ description, transactionAmount, transactionType });
    setDescription("");
    setTransactionAmount(0);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const Notification = ({ show }) => {
    if (!show) return null;
    return (
      <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg fade-in-out">
        Transaction Added
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg p-6">
          <header className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">
              {name}'s Expense Tracker
            </h1>
            {profilePhoto && (
              <div className="flex items-center space-x-4">
                <img
                  className="h-12 w-12 rounded-full"
                  src={profilePhoto}
                  alt="Profile"
                />
                <button
                  className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  onClick={signUserOut}
                >
                  Sign Out
                </button>
              </div>
            )}
          </header>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-green-100 rounded p-4">
              <h3 className="font-semibold text-green-800">Income</h3>
              <p className="text-green-800">${income}</p>
            </div>
            <div className="bg-red-100 rounded p-4">
              <h3 className="font-semibold text-red-800">Expenses</h3>
              <p className="text-red-800">${expenses}</p>
            </div>
          </div>
          <section className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Add Transaction
            </h2>
            <form className="space-y-4" onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Description"
                value={description}
                required
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount"
                value={transactionAmount}
                required
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setTransactionAmount(e.target.value)}
              />
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    id="expense"
                    value="expense"
                    checked={transactionType === "expense"}
                    onChange={() => setTransactionType("expense")}
                    className="form-radio"
                  />
                  <span className="ml-2">Expense</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    id="income"
                    value="income"
                    checked={transactionType === "income"}
                    onChange={() => setTransactionType("income")}
                    className="form-radio"
                  />
                  <span className="ml-2">Income</span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Add Transaction
              </button>
            </form>
          </section>
          <div className="bg-white shadow sm:rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Transactions
            </h3>
            <ul className="mt-4 space-y-3">
              {transactions.map(
                (
                  { description, transactionAmount, transactionType },
                  index
                ) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{description}</span>
                    <span
                      className={`font-bold ${
                        transactionType === "expense"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      ${transactionAmount} • {transactionType}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
      <Notification show={showNotification} />
    </div>
  );
};
