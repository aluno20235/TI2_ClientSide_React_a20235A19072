import React from "react";
import RouterComponent from "./Router";
import AuthComponent from "./Auth";

export default class App extends React.Component {
  render() {
    return (
      <AuthComponent>
        <RouterComponent />
      </AuthComponent>
    );
  }
}
