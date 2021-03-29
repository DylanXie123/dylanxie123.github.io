import React from "react";
import { AppBar, Tab, Tabs } from '@material-ui/core';

export default function Home() {
  return (
    <>
      <AppBar>
        <Tabs>
          <Tab label="计算器" href="/calc"></Tab>
          <Tab label="演示" href="/demo"></Tab>
        </Tabs>
      </AppBar>
    </>
  );
}