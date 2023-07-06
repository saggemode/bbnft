
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";


const Layout = ({  children }) => {
  return (
    <>

  
      <div className="flex min-h-screen flex-col justify-between  ">
        <div className=" top-0 z-40">
          <Navbar />
        </div>

        <main className="container m-auto mt-4 px-4">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
