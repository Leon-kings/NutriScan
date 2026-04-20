import React from "react";
import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { Hero } from "./components/hero/Hero";
import { About } from "./pages/about/About";
import { Services } from "./pages/services/Services";
import { Menu } from "./components/menu/Menu";

export default function App() {
  return (
    <>
      <div className="w-full">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Menu/>
      </div>
    </>
  );
}
