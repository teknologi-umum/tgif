import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import solidCounterWrapper from "solid/Counter/wrapper";
import vueCounterWrapper from "vue/Counter/wrapper";
import { useStore } from "host/counterStore";

import "./index.css";

const App = () => {
  const { add, subtract } = useStore();
  const solidContainerRef = useRef(null);
  const vueContainerRef = useRef(null);

  useEffect(() => {
    solidCounterWrapper(solidContainerRef.current);
    vueCounterWrapper(vueContainerRef.current);
  }, []);

  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="title">React Host</h1>
        <div className="button-wrapper">
          <button className="button" onClick={add}>
            +
          </button>
          <button className="button" onClick={subtract}>
            -
          </button>
        </div>
      </div>
      <div className="child-container">
        <div className="solid" ref={solidContainerRef}></div>
        <div className="vue" ref={vueContainerRef}></div>
      </div>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
