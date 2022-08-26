import React,{useEffect,useState} from 'react'

import Plot from 'react-plotly.js';
import Axios from 'axios';

function is_left_date_smaller_or_equal(left_date,right_date){
    left_date=left_date.split('/')
    right_date=right_date.split('/')
    //first check if both are equal
    if(left_date.join('')==right_date.join('')){
        return true
    }
    //then check the years
    if(parseInt(left_date[2])< parseInt(right_date[2])){
        return true
    }else if(parseInt(left_date[2])> parseInt(right_date[2])){
        return false
    }
    //then check the months
    if(parseInt(left_date[0])< parseInt(right_date[0])){
        return true
    }else if(parseInt(left_date[0])> parseInt(right_date[0])){
        return false
    }
    //then check the days
    if(parseInt(left_date[1])< parseInt(right_date[1])){
        return true
    }else if(parseInt(left_date[1])> parseInt(right_date[1])){
        return false
    }   
}

function sort_days_and_aqi(days,aqi){
    for(let i=0;i< days.length-1;i++){
        if(is_left_date_smaller_or_equal(days[i],days[i+1])== false){
            let temp=days[i]
            days[i]=days[i+1]
            days[i+1]=temp
            //////////////////////
            let temp2=aqi[i]
            aqi[i]=aqi[i+1]
            aqi[i+1]=temp2
        }
    }
    return [days,aqi]
}


function Daily_line_chart() {
    let [organization_objects,set_organization_objects]=useState([])
    let [AQI_all_organizations,set_AQI_all_organizations]=useState([])
    useEffect(()=>{Axios.get('http://localhost:3005/get_daily_line_chart_info')
    .then((response)=>{
        let dummy_organization_objects=[]
        let included_organizations=[]
        let present_organization=response.data[0].organization
        let days=[]
        let AQI_values=[]
        let dummy_AQI_all_organizations=[]
        // console.log(response.data)
        response.data.map((row,index)=>{
            dummy_AQI_all_organizations.push(row.AQI)
            if(included_organizations.indexOf(row.organization)==-1){
                if(present_organization==row.organization){
                    days.push(row.time)
                    AQI_values.push(row.AQI)
                    if(index==response.data.length-1){
                        dummy_organization_objects.push(
                            {
                                name : present_organization,
                                days: days,
                                AQI_values : AQI_values
                            }
                        )
                    }
                }else{
                    //sort days and AQI_values here
                    // [days,AQI_values]=sort_days_and_aqi(days,AQI_values)
                    dummy_organization_objects.push(
                        {
                            name : present_organization,
                            days: days,
                            AQI_values : AQI_values
                        }
                    )
                    included_organizations.push(present_organization)
                    present_organization = row.organization
                    days=[]
                    days.push(row.time)
                    AQI_values=[]
                    AQI_values.push(row.AQI)
                }
            }
        })
        set_organization_objects(dummy_organization_objects)
        set_AQI_all_organizations(dummy_AQI_all_organizations)
    })},[])
    
    return (
        <div className='graph_container'>
            <Plot
                data={organization_objects.map((organization)=>{
                    return {
                        x : organization.days.map((date)=>{
                            let year=date.split('/')[2]
                            let month=(date.split('/')[0].length==2)? date.split('/')[0] : '0'+ date.split('/')[0]
                            let day=(date.split('/')[1].length==2)? date.split('/')[1] : '0'+ date.split('/')[1]
                            return year+'-'+month+'-'+day
                        }),
                        y : organization.AQI_values,
                        mode: 'lines',
                        name : organization.name,
                        line: {
                            dash: 'dashdot',
                            width: 3
                        }
                    }
                })
                }
                layout={{title:'Daily Air Quality Index (AQI) of all organizations',width:2000,height:1000,font: {size:23},xaxis:{title:'Daily'},yaxis:{title:'Daily average AQI'}}}
            />
            <Plot data={organization_objects.map((organization)=>{
                return {
                    y: organization.AQI_values,
                    type:'box',
                    name:organization.name,
                    boxpoints:'Outliers',
                    boxmean:true
                }
            }).concat([
                {
                    y: AQI_all_organizations,
                    type:'box',
                    name:'All organizations',
                    boxpoints:'Outliers',
                    boxmean:true
                }
            ])} 
            
            layout={{width:1000,height:800,font: {size:23},xaxis:{type:'category'},yaxis:{title:'Daily average AQI'}}}

            />
        </div>
    )
}
export default Daily_line_chart;
