export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_PATHS = {
   AUTH: {
      LOGIN: "/api/users/login",
      REGISTER: "/api/users/register",
      GET_USER_INFO: "/api/users/getUser",

   },
   INCOME: {
      GET_ALL_INCOME: "/api/income/get",
      ADD_INCOME: "/api/income/add",
      DELETE_INCOME: (incomeID) => `/api/income/${incomeID}`,
      DOWNLOAD_INCOME: "/api/income/downloadexcel",
   },
   EXPENSE: {
      GET_ALL_EXPENSE: "/api/expense/get",
      ADD_EXPENSE: "/api/expense/add",
      DELETE_EXPENSE: (expenseID) => `/api/expense/${expenseID}`,
      DOWNLOAD_EXPENSE: "/api/expense/downloadexcel",
   },
   DASHBOARD: {
      GET_DATA: "/api/dashboard",
   }
};