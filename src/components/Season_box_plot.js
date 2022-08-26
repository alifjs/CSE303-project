import React,{useEffect,useState} from 'react'

import Plot from 'react-plotly.js';
import Axios from 'axios';

function Season_box_plot() {
    let [season_aqi_values,set_season_aqi_values]=useState([])

    useEffect(()=>{Axios.get('http://localhost:3005/get_season_box_plot_info')
    .then((response)=>{
        let dummy_season_aqi_values=[[],[],[],[]]
        response.data.map((row)=>{
            if(row.season =="Winter"){
                dummy_season_aqi_values[0].push(row.AQI) 
            }else if(row.season =="Spring"){
                dummy_season_aqi_values[1].push(row.AQI) 
            }else if(row.season =="Summer"){
                dummy_season_aqi_values[2].push(row.AQI) 
            }else if(row.season =="Autumn"){
                dummy_season_aqi_values[3].push(row.AQI) 
            }
        })
        set_season_aqi_values(dummy_season_aqi_values)
    })},[])
    return (
        <div className='graph_container'>
            <Plot data={season_aqi_values.map((aqi_values_list,index)=>{
                return {
                    y: aqi_values_list,
                    type:'box',
                    name:['Winter','Spring','Summer','Autumn'][index],
                    boxpoints:'Outliers',
                    boxmean:true
                }
            })} layout={{width:2000,height:1400,font: {size:27},xaxis:{type:'category',title:'Season'},yaxis:{title:'AQI'}}}

            />
        </div>
    )
}

export default Season_box_plot