import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import Logout from "./pages/Auth/Logout";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import Transactions from "./pages/Dashboard/Transaction";
import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";

// ✅ PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* 🔁 Redirect root to dashboard if logged in, else to login */}
          <Route
            path="/"
            element={
              !!localStorage.getItem("token") ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/income"
            element={
              <PrivateRoute>
                <Income />
              </PrivateRoute>
            }
          />
          <Route
            path="/expense"
            element={
              <PrivateRoute>
                <Expense />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <Transactions />
              </PrivateRoute>
            }
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>

        {/* ✅ Toast Notification */}
        <Toaster
          toastOptions={{
            style: {
              fontSize: "13px",
              background: "#363636",
              color: "#fff",
            },
          }}
        />
      </Router>
    </UserProvider>
  );
};

export default App;
