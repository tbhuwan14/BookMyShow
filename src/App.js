import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./components/Navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import MeetingForm from "./components/MeetingForm";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Switch>
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signout" exact component={SignOut} />
          <Route path="/" exact component={MeetingForm} />
          <Route path="/notfound" component={NotFound} />
          <Redirect to="/notfound" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
