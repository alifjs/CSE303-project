import React,{useEffect,useState} from 'react'

import Plot from 'react-plotly.js';
import Axios from 'axios';

function Division_daily_chart() {
    let [divisions,set_divisions]=useState([])
    let [daily_avg_AQI,set_daily_avg_AQI]=useState([])

    useEffect(()=>{Axios.get('http://localhost:3005/get_division_daily_chart_info')
    .then((response)=>{
        // console.log(response.data)
        let dummy_divisions=[]
        let dummy_daily_avg_AQI=[]
        response.data.map((row)=>{
            dummy_divisions.push(row.division)
            dummy_daily_avg_AQI.push(row.average_AQI)
        })
        set_divisions(dummy_divisions)
        set_daily_avg_AQI(dummy_daily_avg_AQI)
    })},[])
    return (
        <div className='graph_container'>
        <Plot
            data=
            {[{
                x: divisions,
                y: daily_avg_AQI,
                mode: 'lines'
            }]}
            layout={{width:2000,height:1400,font: {size:27},xaxis:{type:'category',title:'Divisions'},yaxis:{title:'AQI'}}}
        />
    </div>
    )
}

export default Division_daily_chart