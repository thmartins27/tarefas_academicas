import React from 'react';
import './index.css';
import {render} from "react-dom"
import Rota from './router';

const rootElement = document.getElementById("root")
render(
  <Rota/>,
  rootElement
);
