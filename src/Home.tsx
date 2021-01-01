import React from "react";
import { AppBar, Tab, Tabs } from '@material-ui/core';

export default function Home() {
  return (
<<<<<<< HEAD
    <AppBar>
      <Tabs>
        <Tab label="计算器" href="/calc"></Tab>
        <Tab label="演示" href="/demo"></Tab>
      </Tabs>
    </AppBar>
=======
    <div className="Home">
      <h1>主页</h1>
      <Link to="/calc">计算器</Link>
      <p></p>
      <Link to="/demo">演示</Link>
      <p></p>
      <a href="https://dylanxie123.github.io/blog/">
        Blog
      </a>
    </div>
>>>>>>> 02a7fbde26d978d5e6cf83e41b0a73158226f993
  );
}