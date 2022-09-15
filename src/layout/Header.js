import { FaUserCircle, FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getData } from '../utilities/HttpMethods';
import classes from './Header.module.css';
import { ToastContainer, toast } from 'react-toastify';

function Header() {
    let navigate = useNavigate();

    const logout = async () => {
        try {
            const resp = await getData('https://foodbukka.herokuapp.com/api/v1/auth/logout');
            toast.success(resp.message);
            navigate("login", { replace: true });
        } 
        catch (error) {
            toast.error('Unable to logout.');
        }
    }
    return (
        <header className='clearfix'>
           <ul className={`float-end ${classes['icon-wrap']}`}>
            <li><FaBell /></li>
            <li className={classes.userprofile}>
                <FaUserCircle />
                <div className={classes.sublist}>
                    <div onClick={logout}>Logout</div>
                </div>
                </li>
           </ul>
           <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover
                theme="colored"
            />
        </header>
        
    )
}

export default Header;