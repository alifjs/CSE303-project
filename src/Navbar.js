import React,{useContext} from 'react'
import { Outlet, Link } from "react-router-dom";
import { LoginContext } from './Context';
import { useNavigate } from "react-router-dom";

function Navbar() {
    let navigate = useNavigate();
    const {loggedin,set_logged_in}=useContext(LoginContext)

    const handleLogout=()=>{
        set_logged_in({})
        navigate('/')
    }
    const handleLogin=()=>{
        navigate('/login') 
    }
    return (
    <>
    <div className='navbar_container' >
        <div className='login_and_navbar_container'>
            <div className='login_link_container'>
                {/* <p>/ Log out</p> */}
                {/* <Link to="/login">Login</Link> */}
                {loggedin.user_type!=null &&
                    <p className='login_or_logout_button' onClick={handleLogout}>Log out</p>
                }
                {loggedin.user_type==null &&
                    <p className='login_or_logout_button' onClick={handleLogin}>Log in</p>
                }
            </div>
            <div className='navbar'>
                <div >
                    <Link to="/">Home</Link>
                </div>
                {loggedin.user_type =='Data entry' &&
                    <div>
                        <Link to="/data_entry">Data entry</Link>
                    </div>
                }
                {loggedin.user_type =='Municipality' &&
                    <div>
                        <Link to="/comments_and_report">Comments and report</Link>
                    </div>
                }
                <div >
                    <Link to="/bar_chart">Bar chart</Link>
                </div>
                <div>
                    <Link to="/box_plot">Box plot</Link>
                </div>
                <div>
                    <Link to="/box_plot_2">Box plot 2</Link>
                </div>
                <div>
                    <Link to="/division_time_line">Division time line</Link>
                </div>
                <div >
                    <Link to="/daily_line_chart">Daily line chart</Link>
                </div>
                <div>
                    <Link to="/season_box_plot">Season box plot</Link>
                </div>
                <div>
                    <Link to="/division_daily_chart">Division daily chart</Link>
                </div>
            </div>
        </div>
    </div>
    <Outlet/>
    </>
    )
}

export default Navbar