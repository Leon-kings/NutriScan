import React from "react";
import "./App.css";
import { Menu } from "./components/menu/Menu";
import { Footer } from "./components/footer/Footer";

export default function App() {
  return (
    <>
      <div className="w-full sm:w-full xl:w-full 2xl:w-full md:w-full lg:w-full">
        <Menu />
        <Footer/>
      </div>
    </>
  );
}
