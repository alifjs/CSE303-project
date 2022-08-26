import './App.css'
import {useState} from 'react'
import Axios from 'axios';
import Plot from 'react-plotly.js';


function DataEntry() {
  const [organization,set_organization]=useState('')
  const [time,set_time]=useState('')
  const [AQI,set_AQI]=useState('')
  const [avg_temp,set_avg_temp]=useState('')
  const [rain_precipitation,set_rain_precipitation]=useState('')
  const [wind_speed,set_wind_speed]=useState('')
  const [visibility,set_visibility]=useState('')
  const [cloud_cover,set_cloud_cover]=useState('')
  const [relative_humidity,set_relative_humidity]=useState('')
  const [station_no,set_station_no]=useState('')
  const [division,set_division]=useState('')
  const [season,set_season]=useState('')

  const handleSubmit=()=>{
    Axios.post('http://localhost:3005/form_submission',{
      organization_name : organization,
      time: time,
      AQI: AQI,
      avg_temp :avg_temp,
      rain_precipitation:rain_precipitation,
      wind_speed:wind_speed,
      visibility:visibility,
      cloud_cover:cloud_cover,
      relative_humidity:relative_humidity,
      station_no:station_no,
      division:division,
      season:season
    }).then(()=>
    {
      console.log("heyyyy it's the axios then")
    })
    console.log('after the axios stuff')
  }
  return (
    <div className='whole_page_container'>
      <div className='form_container'>
        <div className='individual_input_field'>
          <label>Time :</label>
          <input type='text' onChange={(e)=>{set_time(e.target.value)}}/>
        </div>
        <div className='individual_input_field'>
          <label>AQI :</label>
          <input type='text' onChange={(e)=>{set_AQI(e.target.value)}}/>
        </div>
        <div className='individual_input_field'>
          <label>Average temperature :</label>
          <input type='text' onChange={(e)=>{set_avg_temp(e.target.value)}}/>
        </div>
        <div className='individual_input_field'>
          <label>Rain precipitation :</label>
          <input type='text' onChange={(e)=>{set_rain_precipitation(e.target.value)}}/>
        </div>
        <div className='individual_input_field'>
          <label>Wind speed :</label>
          <input type='text' onChange={(e)=>{set_wind_speed(e.target.value)}}/>
        </div>
        <div className='individual_input_field'>
          <label>Visibility :</label>
          <input type='text' onChange={(e)=>{set_visibility(e.target.value)}}/>
        </div>
        <div className='individual_input_field'>
          <label>Cloud cover :</label>
          <input type='text' onChange={(e)=>{set_cloud_cover(e.target.value)}}/>
        </div>
        <div className='individual_input_field'>
          <label>Relative humidity :</label>
          <input type='text' onChange={(e)=>{set_relative_humidity(e.target.value)}}/>
        </div>
        <div className='individual_input_field'>
          <label>Station number :</label>
          <input type='text' onChange={(e)=>{set_station_no(e.target.value)}}/>
        </div>
        <div className='individual_input_field'>
          <label>Division :</label>
          <input type='text' onChange={(e)=>{set_division(e.target.value)}}/>
        </div>
        <div className='individual_input_field'>
          <label>Organization name :</label>
          <input type='text' onChange={(e)=>{set_organization(e.target.value)}}/>
        </div>
        <div className='individual_input_field'>
          <label>Season :</label>
          <input type='text' onChange={(e)=>{set_season(e.target.value)}}/>
        </div>
        <div className='button'>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default DataEntry;
