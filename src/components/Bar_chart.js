import React,{useEffect,useState} from 'react'

import Plot from 'react-plotly.js';
import Axios from 'axios';
import { LoginContext} from '../Context'

function Bar_chart() {
  let [years,setyears]=useState([])
  let [averages,setaverages]=useState([])
  
  useEffect(()=>{Axios.get('http://localhost:3005/get_bar_chart_info')
  .then((response)=>{
      let dummy_years=[]
      let dummy_averages=[]
      response.data.map((row)=>{
        dummy_years.push(row.year_name)
        dummy_averages.push(row.average)
      })
      setyears(dummy_years)
      setaverages(dummy_averages)
  })},[])
  
  return (
    <div className='graph_container'>
        <Plot
            data={[
                {
                    x:years,
                    y:averages,
                    title:'Yearly average AQI data visualization using Bar Charts',
                    marker:{color:'blue'},
                    type:'bar'
                }
            ]
            }
            layout={{width:2000,height:1400,font: {size:27},xaxis:{type:'category',title:'Yearly'},yaxis:{title:'Average of AQI'}}}
            // config = {{responsive: true}
        />
    </div>
  )
}
export default Bar_chart
