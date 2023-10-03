import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {FaSpinner} from "react-icons/fa"

import Login from "./pages/Login";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "./pages/Dashboard";
import AddDoctor from "./pages/AddDoctor";

function App() {
  return (
    <section>
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen bg-light-2 text-center text-4xl font-bold">
            <FaSpinner className="text-primary-dark" />
          </div>
        }
      >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/AddDoctor" element={<AddDoctor />} />

        <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/AddDoctor" element={<AddDoctor />} />
        </Route>
      </Routes>
      </Suspense>
      <ToastContainer />
    </section>
  );
}

export default App;
