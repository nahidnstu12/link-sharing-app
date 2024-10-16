"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function ToastProvider() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
