import App from "./App";
import * as React from "react";
// import RenderDom from "react-dom";

import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);

// RenderDom.render(<App/>, document.getElementById("app"));