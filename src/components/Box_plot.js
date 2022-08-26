import React,{useEffect,useState} from 'react'

import Plot from 'react-plotly.js';
import Axios from 'axios';

function Box_plot() {
    let [list_of_station_no,set_list_of_station_no]=useState([])
    let [list_of_values,set_list_of_values]=useState([])
    // let s=[1,2,3]
    // let values=[[43,45,6,7,89],[3,34,69,12,4],[1,23,24,25,26,27,28,29,30,80,]]

    useEffect(()=>{
        Axios.get('http://localhost:3005/get_box_plot_info')
        .then((response)=>{
            let dummy_list_of_stations=[]
            response.data.map((row)=>{
                if(dummy_list_of_stations.indexOf(row.station+' '+ row.division)==-1){//if the year hasn't been included yet
                    dummy_list_of_stations.push(row.station+' '+ row.division)
                }
            })
            let dummy_list_of_values=dummy_list_of_stations.map((item)=>{
                let values_of_individual_station=response.data.map((row)=>{
                    if(row.station+' '+ row.division==item){
                        return row.AQI
                    }
                })
                return values_of_individual_station
            })
            set_list_of_station_no(dummy_list_of_stations)
            set_list_of_values(dummy_list_of_values)
            // console.log(list_of_values)
            // console.log('sajkxjsa')
            // console.log(dummy_list_of_stations)
        })},[])
    return (
    <div className='graph_container'>
        {/* <Plot data={[{
            y: [0.75, 5.25, 5.5, 6, 6.2, 6.6, 6.80, 7.0, 7.2, 7.5, 7.5, 7.75, 8.15, 8.15, 8.65, 8.93, 9.2, 9.5, 10, 10.25, 11.5, 12, 16, 20.90, 22.3, 23.25],
            type:'box',
            boxpoints:'Outliers',
            boxmean: true
        }]}

        /> */}
        <Plot data={list_of_station_no.map((item,index)=>{
            return {
                y: list_of_values[index],
                type:'box',
                name:item,
                boxpoints:'Outliers',
                boxmean:true
            }
        })} layout={{width:2500,height:600,xaxis:{type:'category'}}}

        />
    </div>
    )
}
export default Box_plot;
