const express=require('express')
const app=express()
const cors=require('cors')
const mysql=require('mysql2')
const db=mysql.createConnection({
    user : 'root',
    host:'localhost',
    password:'1234',
    database:'aqi_project'
})

app.use(cors())
app.use(express.json())

app.post('/form_submission',(request,response)=>{
    const organization_name=request.body.organization_name
    const time=request.body.time
    const AQI=parseFloat(request.body.AQI)
    const avg_temp=parseFloat(request.body.avg_temp)
    const rain_precipitation=parseFloat(request.body.rain_precipitation)
    const wind_speed=parseFloat(request.body.wind_speed)
    const visibility=parseFloat(request.body.visibility)
    const cloud_cover=parseFloat(request.body.cloud_cover)
    const relative_humidity=parseFloat(request.body.relative_humidity)
    const station_no=parseInt(request.body.station_no)
    const division=request.body.division
    const season=request.body.season

    let sql='INSERT INTO air_quality_data VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
    db.query(sql,[time,AQI,avg_temp,rain_precipitation,wind_speed,visibility,
        cloud_cover,relative_humidity,station_no,division,organization_name,
    season],
    (error,results)=>{
        if(error){
            throw error
        }
    })
})

app.get('/get_bar_chart_info',(request,response)=>{
    // let sql='SELECT SUBSTRING(date_of_entry,1,4) AS year_name,avg(data_value) AS average FROM air_quality_data GROUP BY substring(date_of_entry,1,4) ORDER BY SUBSTRING(date_of_entry,1,4) '
    let sql='SELECT SUBSTR(time,-4) AS year_name,avg(AQI) AS average FROM air_quality_data GROUP BY SUBSTR(time,-4) ORDER BY SUBSTR(time,-4)'
    db.query(sql,(error,results)=>{
        if (error){
            throw error
        }else{
            response.send(results)
        }
    })
})

app.get('/get_box_plot_info',(request,response)=>{
    let sql='select AQI,division,station from air_quality_data order by division,station;'
    db.query(sql,(error,results)=>{
        if (error){
            throw error
        }else{
            response.send(results)
        }
    })
})

app.get('/get_box_plot_2_info',(request,response)=>{
    let sql="select substr(str_to_date(time, '%m/%d/%Y'),6,2) as month_no,concat(division,' ',station) as station_name,AQI from air_quality_data order by division,station,substr(str_to_date(time, '%m/%d/%Y'),6);"
    db.query(sql,(error,results)=>{
        if (error){
            throw error
        }else{
            response.send(results)
        }
    })
})

app.get('/get_division_time_line_info',(request,response)=>{
    let sql='select division,substr(time,-4) as year_name,avg(AQI) as average from air_quality_data group by division,substr(time,-4) order by division,substr(time,-4);'
    db.query(sql,(error,results)=>{
        if (error){
            throw error
        }else{
            response.send(results)
        }
    })
})
app.get('/get_daily_line_chart_info',(request,response)=>{
    let sql="select time,organization,AQI from air_quality_data order by organization,str_to_date(time, '%m/%d/%Y') asc;"
    db.query(sql,(error,results)=>{
        if (error){
            throw error
        }else{
            response.send(results)
        }
    })
})
app.get('/get_season_box_plot_info',(request,response)=>{
    let sql='select season,AQI from air_quality_data order by season;'
    db.query(sql,(error,results)=>{
        if (error){
            throw error
        }else{
            response.send(results)
        }
    })
})
let today=new Date()
let year=today.getFullYear()
let month=today.getMonth()
let day=today.getDate()
let date_of_today=(month+1)+'/'+day+'/'+year

app.get('/get_division_daily_chart_info',(request,response)=>{
    let sql="select avg(AQI) as average_AQI,division,time from air_quality_data  group by time,division having time=?;"
    db.query(sql,[date_of_today],(error,results)=>{
        if (error){
            throw error
        }else{
            response.send(results)
        }
    })
})

app.get('/get_user_info',(request,response)=>{
    let sql="select * from users"
    db.query(sql,(error,results)=>{
        if (error){
            throw error
        }else{
            response.send(results)
        }
    })
})
app.get('/get_aqi_data',(request,response)=>{
    let sql=`SELECT * FROM air_quality_data where division='${request.query.place}' ORDER BY str_to_date(time, '%m/%d/%Y') desc limit 1;`
    db.query(sql,(error,results)=>{
        if (error){
            throw error
        }else{
            response.send(results)
        }
    })
})
app.get('/get_comments',(request,response)=>{
    let sql='SELECT * from comments;'
    db.query(sql,(error,results)=>{
        if (error){
            throw error
        }else{
            response.send(results)
        }
    })
})
app.post('/post_comment',(request,response)=>{
    console.log('hi')
    const username=request.body.username
    const comment=request.body.comment
    let sql=
    'INSERT INTO comments VALUES (?,?)'
    db.query(sql,[username,comment],
    (error,results)=>{
        if(error){
            throw error
        }
    })
})

app.listen(3005,()=>{
    console.log('hijdk')
})
app.get('/',(req,res)=>{
    res.send('Hello The server is running')
})
