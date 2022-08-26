import React,{useEffect,useState} from 'react'

import Plot from 'react-plotly.js';
import Axios from 'axios';

function Box_plot_2() {
    // let station_numbers=[1,2]
    // let data_values=[[[1,3,4,5],[9,2,4],[8,9,14],[],[2,3,4]],[[1,6,7],[3,6,8],[7,9,14]]]
    let [station_names,set_station_names]=useState([])
    let [data_values,set_data_values]=useState([])

    useEffect(()=>{Axios.get('http://localhost:3005/get_box_plot_2_info')
    .then((response)=>{
        let dummy_station_names=[]
        let dummy_data_values=[]
        let list_of_stations_added=[]
        let current_station=response.data[0].station_name
        let data_values_of_one_station=[[],[],[],[],[],[],[],[],[],[],[],[]]
        response.data.map((row,index)=>{
            if(row.station_name==current_station){
                data_values_of_one_station[row.month_no-1].push(row.AQI)
            }else{
                dummy_station_names.push(current_station) 
                dummy_data_values.push(data_values_of_one_station)
                current_station=row.station_name
                data_values_of_one_station=[[],[],[],[],[],[],[],[],[],[],[],[]]
                data_values_of_one_station[row.month_no-1].push(row.AQI)
            }
            if(index==response.data.length-1){
                dummy_station_names.push(current_station) 
                dummy_data_values.push(data_values_of_one_station)
            }
        })
        set_station_names(dummy_station_names)
        set_data_values(dummy_data_values)
        // console.log(response.data)
    })},[])

    return (
    <div className='graph_container'>
        {
        station_names.map((station_name,station_index)=>{
            return (
                <Plot data={data_values[station_index].map((single_month_data,month_no)=>{
                    return {
                        y: single_month_data,
                        type:'box',
                        name:month_no+1,
                        boxpoints:'Outliers',
                        boxmean:true
                    }
                })} layout={{width:1000,height:700,font: {size:27},title:`Station ${station_name} data`,xaxis:{type:'category',title:'Month'},yaxis:{title:'AQI'}}}
                />
            )
        })
        }
    </div>
    )
}
export default Box_plot_2