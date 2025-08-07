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
import UserProvider from "./context/UserContext";
import Transactions from "./pages/Dashboard/Transaction";
import { Toaster } from "react-hot-toast";

// ✅ PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// ✅ Optional: redirect "/" to either /dashboard or /login
const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route
              path="/dashboard"
              exact
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/income"
              exact
              element={
                <PrivateRoute>
                  <Income />
                </PrivateRoute>
              }
            />
            <Route
              path="/expense"
              exact
              element={
                <PrivateRoute>
                  <Expense />
                </PrivateRoute>
              }
            />
            <Route
              path="/transactions"
              exact
              element={
                <PrivateRoute>
                  <Transactions />
                </PrivateRoute>
              }
            />
            <Route path="/logout" exact element={<Logout />} />
          </Routes>
        </Router>
      </div>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "13px",
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </UserProvider>
  );
};

export default App;
