import React,{useEffect,useState} from 'react'

import Plot from 'react-plotly.js';
import Axios from 'axios';

function Division_time_line() {
    let [division_objects,set_division_objects]=useState([])

    useEffect(()=>{Axios.get('http://localhost:3005/get_division_time_line_info')
    .then((response)=>{
        let dummy_division_objects=[]
        let included_divisions=[]
        let present_division=response.data[0].division
        let years=[]
        let averages=[]
        console.log(response.data)
        response.data.map((row,index)=>{
            if(included_divisions.indexOf(row.division)==-1){
                if(present_division==row.division){
                    years.push(row.year_name)
                    averages.push(row.average)
                    if(index==response.data.length-1){
                        dummy_division_objects.push(
                            {
                                name : present_division,
                                years: years,
                                averages : averages
                            }
                        )
                    }
                }else{
                    dummy_division_objects.push(
                        {
                            name : present_division,
                            years: years,
                            averages : averages
                        }
                    )
                    included_divisions.push(present_division)
                    present_division = row.division
                    years=[]
                    years.push(row.year_name)
                    averages=[]
                    averages.push(row.average)
                }
            }
        })
        set_division_objects(dummy_division_objects)
    })},[])
    console.log(division_objects)
    return (
        <div className='graph_container'>
            <Plot
                data={division_objects.map((division)=>{
                    return {
                        x : division.years,
                        y : division.averages,
                        type : 'scatter',
                        name : division.name
                    }
                })
                }
                layout={{width:2000,height:1400,font: {size:27},title:'Division-Wise Time-based Air Quality Index (AQI)',width:2000,height:1400,font: {size:27},xaxis:{type:'category',title:'Year'},yaxis:{title:'AQI'}}}
            />
        </div>
    )
}
export default Division_time_line;
