import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Form from "./components/Form";
import Cards from "./components/Cards";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Form} />
        <Route exact path="/cards" component={Cards} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
