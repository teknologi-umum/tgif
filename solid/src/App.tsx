import { render } from "solid-js/web";

import "./index.css";

const App = () => (
  <div class="container">
    <div>Name: solid</div>
    <div>Framework: solid-js</div>
    <div>Language: TypeScript</div>
    <div>CSS: Empty CSS</div>
  </div>
);
render(App, document.getElementById("app"));
