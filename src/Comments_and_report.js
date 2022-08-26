import React,{useEffect,useState,useContext} from 'react'
import Axios from 'axios';

import ReactDOMServer from "react-dom/server";
import Bar_chart from './components/Bar_chart';
import Box_plot from './components/Box_plot';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { LoginContext } from './Context';
import Box_plot_2 from './components/Box_plot_2';
import Division_time_line from './components/Division_time_line';
import Daily_line_chart from './components/Daily_line_chart';
import Season_box_plot from './components/Season_box_plot';
import Division_daily_chart from './components/Division_daily_chart';

function Comments_and_report({element}) {
    const printRef = React.useRef();
    const [all_comments,set_all_comments]=useState([])
    const [comment,setcomment]=useState('')
    const {loggedin,set_logged_in}=useContext(LoginContext)
    // const handleDownloadPdf = async () => {
    //     const element =printRef.current;
    //     // console.log(element);
    //     const canvas = await html2canvas(element);
    //     const data = canvas.toDataURL('image/png');

    //     const pdf = new jsPDF();
    //     const imgProperties = pdf.getImageProperties(data);
    //     // const pdfWidth = pdf.internal.pageSize.getWidth();
    //     const pdfWidth = pdf.internal.pageSize.getWidth()*0.9
    //     // const pdfHeight =
    //     // (imgProperties.height * pdfWidth) / imgProperties.width;
    //     const pdfHeight =
    //     ((imgProperties.height * pdfWidth) / imgProperties.width)*0.5;
    //     pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    //     pdf.save('print.pdf');
    // };
    ///experiment downwards//////////////////////////////////////////////////////
    const handleDownloadPdf = async () => {
        const element =printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');
        let position=0
        const pdf = new jsPDF();
        let pageHeight = 295; 
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =(imgProperties.height * pdfWidth) / imgProperties.width;
        let heightLeft = pdfHeight
        while (heightLeft >= 0) {
            position = heightLeft - pdfHeight;
            // doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            pdf.addImage(data, 'PNG', 0,position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;
            if(heightLeft<0){
                break
            }
            pdf.addPage();
        }
        pdf.save('print.pdf');
    };


    ///////////////////////////////////////////////////////////////////////
    useEffect(()=>{Axios.get('http://localhost:3005/get_comments')
    .then((response)=>{
        set_all_comments(response.data)
    })},[])
    const handlePost=()=>{
        set_all_comments([...all_comments,{username:loggedin.username,comment : comment}])
        Axios.post('http://localhost:3005/post_comment',{
            username:loggedin.username,
            comment : comment
        }).then(()=>
        {})}
    return (
        // <>
        // <div>
        //     <button onClick={handleDownloadPdf}>Save pdf</button>
        // </div>
        // <div ref={printRef}>
        //     <Bar_chart/>
        //     <Box_plot/>
        // </div>
        // </>
        <div className='comment_and_report_whole_page_container'>
            <div className='container_of_comments_container'>
                <h1>Comments</h1>
                <hr></hr>
                <div className='comments_container'>
                        {all_comments.map((item)=>(
                            <div className='comment'>
                                <p>user : {item.username}</p>
                                <p>{item.comment}</p>
                            </div>
                        ))}
                        {/* <input type='text' onChange={(e)=>{setcomment(e.target.value)}}/> */}
                        <textarea placeholder='Type a comment' onChange={(e)=>{setcomment(e.target.value)}}/>
                        <div className='comment_post_button'>
                            <button onClick={handlePost}>Post</button>
                        </div>
                </div>
                <h1>Generate report</h1>
                <hr></hr>
                <div>
                    <button onClick={handleDownloadPdf}>Save pdf</button>
                </div>
                <div ref={printRef}>
                    <Bar_chart/>
                    <Box_plot/>
                    {/* <Box_plot_2/> */}
                    <Division_time_line/>
                    <Daily_line_chart/>
                    <Season_box_plot/>
                    <Division_daily_chart/>
                </div>
           </div>

        </div>
    );
}

export default Comments_and_report
