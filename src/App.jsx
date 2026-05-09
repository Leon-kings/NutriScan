import React from "react";
import "./App.css";
import { Menu } from "./components/menu/Menu";
import { Footer } from "./components/footer/Footer";

export default function App() {
  return (
    <>
      <div className="w-full">
        <Menu />
        <Footer/>
      </div>
    </>
  );
}
