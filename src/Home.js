import React,{useState,useEffect,useRef} from 'react'
import Axios from 'axios';

function Home() {
    const [place_name,set_place_name]=useState('')
    const [aqi_data,set_aqi_data]=useState({})
    const searched_area=useRef(null)
    const handleSearch=()=>{
        let divisions=['Barishal','Chittagong','Dhaka','Khulna','Mymensingh','Rajshahi','Rangpur','Sylhet']
        if(divisions.indexOf(searched_area.current.value)!=-1){
            set_place_name(searched_area.current.value)
        }else{
            alert('Please enter a valid division name.')
        }
    }
    useEffect(()=>{Axios.get(`http://localhost:3005/get_aqi_data?place=${place_name}`)
    .then((response)=>{
        // console.log(response.data)
        let dummy_aqi_data={}
        if(response.data[0].AQI<=50){
            dummy_aqi_data.status='Good'
        }else if(response.data[0].AQI<=100){
            dummy_aqi_data.status='Moderate'
        }else if(response.data[0].AQI<=150){
            dummy_aqi_data.status='Unhealthy for sensitive groups'
        }else if(response.data[0].AQI<=200){
            dummy_aqi_data.status='Unhealthy'
        }else if(response.data[0].AQI<=300){
            dummy_aqi_data.status='Very Unhealthy'
        }else if(response.data[0].AQI<=500){
            dummy_aqi_data.status='Hazardous'
        }
        dummy_aqi_data.aqi=response.data[0].AQI
        dummy_aqi_data.average_temp=response.data[0].Average_temp
        dummy_aqi_data.rain_precipitation=response.data[0].rain_precipitation
        dummy_aqi_data.windspeed=response.data[0].wind_speed
        dummy_aqi_data.visibility=response.data[0].visibility
        dummy_aqi_data.cloud_cover=response.data[0].cloud_cover
        dummy_aqi_data.relative_humidity=response.data[0].relative_humidity
        dummy_aqi_data.organization=response.data[0].organization
        set_aqi_data(dummy_aqi_data)
    })},[place_name])

    return (
    <div className='home_whole_page_container'>
        <div className='search_bar'>
            <input ref={searched_area} type='text' placeholder='Search for a division' />
            <div className='search_button'onClick={handleSearch}><p>Search</p></div>
        </div>
        {place_name !='' &&
        <div className='air_quality_table'>
            <div className='first_row'>
                <h1>Air quality in {place_name}</h1>
                <p>Air quality index (AQI) and PM2.5 air pollution in {place_name}</p>
            </div>
            <div className='second_row'>
                <p className='organization_and_aqi'>{aqi_data.organization} {aqi_data.aqi}</p>
                <h1>{aqi_data.status}</h1>
            </div>
            <div className='third_row'>
                <h1>Overview</h1>
                <p>What is the current air quality in {place_name}?</p>
                <div className='aqi_data_flexbox'>
                    <div className='grey'>
                        <p>Air pollution level</p>
                    </div>
                    <div className='grey'>
                        <p>Air quality index</p>
                    </div>
                    <div className='grey'>
                        <p>Main pollutant</p>
                    </div>
                    <div>
                        <p>{aqi_data.status}</p>
                    </div>
                    <div>
                        <p>{aqi_data.aqi}</p>
                    </div>
                    <div>
                        <p>PM2.5</p>
                    </div>
                    {/* ggvjhvjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj */}
                    <div className='grey'>
                        <p>Average Temperature</p>
                    </div>
                    <div className='grey'>
                        <p>Rain precipitation</p>
                    </div>
                    <div className='grey'>
                        <p>Wind Speed</p>
                    </div>
                    <div>
                        <p>{aqi_data.average_temp}  </p>
                    </div>
                    <div>
                        <p>{aqi_data.rain_precipitation }</p>
                    </div>
                    <div>
                        <p>{aqi_data.windspeed } </p>
                    </div>
                    {/* ggvjhvjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj */}
                    <div className='grey'>
                        <p>Visibility</p>
                    </div>
                    <div className='grey'>
                        <p>Cloud cover</p>
                    </div>
                    <div className='grey'>
                        <p>Relative humidity</p>
                    </div>
                    <div>
                        <p>{ aqi_data.visibility  }</p>
                    </div>
                    <div>
                        <p>{ aqi_data.cloud_cover } </p>
                    </div>
                    <div>
                        <p> {aqi_data.relative_humidity } </p>
                    </div>

                </div>
            </div>
        </div>
        }
    </div>
    )
}

export default Home