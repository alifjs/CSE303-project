import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes, Route } from "react-router-dom";

import App from './App';
// import Bar_chart from './Bar_chart';
// import Box_plot from './Box_plot';
// import Box_plot_2 from './components/Box_plot_2';
// import Daily_line_chart from './Daily_line_chart';
// import Division_daily_chart from './Division_daily_chart';
// import Division_time_line from './Division_time_line';
// import Login from './Login';
// import Map_stuff from './Map_stuff';
// import My_pdf from './my_pdf';
// import Navbar from './Navbar';
// import Season_box_plot from './Season_box_plot';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

