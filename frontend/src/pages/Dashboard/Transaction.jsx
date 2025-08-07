import React, { use, useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import AllTransactions from '../../components/Income/AllTransactions';
import { useUserAuth } from '../../hooks/useUserAuth';

const Transactions = () => {
    useUserAuth();
   

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error)
    } finally {
      setLoading(false);
    }
  };
  
useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="AllTransactions">
        <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6 ">
         
           <AllTransactions 
            transactions={dashboardData?.recentTransactions}
           
          />
        </div>
      </div>
     
    </DashboardLayout>
  );
};

export default Transactions;
