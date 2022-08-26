import React,{useContext,useState} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes, Route } from "react-router-dom";

import Home from './Home';
import DataEntry from './DataEntry';
import Bar_chart from './components/Bar_chart';
import Box_plot from './components/Box_plot';
import Box_plot_2 from './components/Box_plot_2';
import Daily_line_chart from './components/Daily_line_chart';
import Division_daily_chart from './components/Division_daily_chart';
import Division_time_line from './components/Division_time_line';
import Login from './Login';
// import Map_stuff from './Map_stuff';
import Comments_and_report from './Comments_and_report';
import Navbar from './Navbar';
import Season_box_plot from './components/Season_box_plot';
import { LoginContext } from './Context';

function App() {
    // const {loggedin,set_logged_in}=useContext(LoginContext)
    const [loggedin,set_logged_in]=useState({})
    // const handleLogin=()=>{
    //     set_logged_in(true)
    // }
    return (
    <LoginContext.Provider value={{loggedin,set_logged_in}}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar/>}>
                    {/* <Route path='/home' element={<Home/>}/> */}
                    <Route index element={<Home />}/>
                    <Route path='/data_entry' element={<DataEntry/>}/>
                    <Route path='/bar_chart' element={<Bar_chart/>}/>
                    <Route path='/box_plot' element={<Box_plot/>}/>
                    <Route path='/box_plot_2' element={<Box_plot_2/>}/>
                    <Route path='/division_time_line' element={<Division_time_line/>}/>
                    <Route path='/daily_line_chart' element={<Daily_line_chart/>}/>
                    <Route path='/season_box_plot' element={<Season_box_plot/>}/>
                    <Route path='/division_daily_chart' element={<Division_daily_chart/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/comments_and_report' element={<Comments_and_report/>}/>
                </Route>
                {/* <Route path='/login' element={<Login/>}/> */}
                {/* <Route path='/bar_chart' element={<Bar_chart/>}/> */}
            </Routes>
        </BrowserRouter>
    </LoginContext.Provider>
    )
}

export default App