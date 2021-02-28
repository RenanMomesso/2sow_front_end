import {
  BrowserRouter,
  BrowserRouterProps,
  Route,
  Switch,
  SwitchProps,
} from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Container from "./components/Container";
import Users from "./pages/Users";
import User from "./pages/User";
import FormUser from "./pages/FormUser";
import PrivateROute from './components/PrivateRoute'
import ScrollToTop from "./utils/scrollToTop";

const Routes = () => {
  return (
    <BrowserRouter>
      <Container />
        <ScrollToTop/>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateROute exact path="/users" component={Users} isPrivate />
        <PrivateROute exact path="/user/:id" component={User}  isPrivate/>
        <PrivateROute exact path="/formulary" component={FormUser} isPrivate />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
