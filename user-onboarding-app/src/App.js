import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import OnboardingForm from "./components/Form";

function App() {
  return (
    <div className="App">
      <div className="identity">
        Colby's Totally Not Stealing Your Identity Form
      </div>
      <OnboardingForm />
    </div>
  );
}

export default App;
