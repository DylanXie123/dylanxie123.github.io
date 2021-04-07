import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import App from "./movie/App";
import Calculator from "./calculator";

export default function Router() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/calc" exact component={Calculator} />
      <Route path="/movie" exact component={App} />f
      <Route component={Home} />
    </Switch>
  );
}