"use client"
import MainCompo from "@/components/MainCompo";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Root = () => {
  return (
    <div className="flex flex-col select-none bg-slate-300 h-screen">
      <ToastContainer />
      <Navbar />
      <MainCompo />
    </div>
  );
}

export default Root;