import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="Home">
      <h1>主页</h1>
      <Link to="/calc">计算器</Link>
      <p></p>
      <Link to="/demo">演示</Link>
    </div>
  );
}