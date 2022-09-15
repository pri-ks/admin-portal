import classes from './LeftNavigation.module.css';
import logo from '../assets/images/logo.png';
import { NavLink } from 'react-router-dom';
import { FaHome, FaHotel, FaList, FaShoppingCart, FaPercent } from 'react-icons/fa';

function LeftNavigation() {
    return (
        <div className={`${classes['left-nav-wrap']}`}>
            <div className={classes['logo-wrap']}>
                <img src={logo} alt='SBA' />
                <h3>SBA</h3>
            </div>
            <ul>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? classes.active : null )}><FaHome />Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/branch" className={({ isActive }) => (isActive ? classes.active : null )}><FaHotel />Branch</NavLink>
                </li>
                <li> 
                    <NavLink to="/inventory" className={({ isActive }) => (isActive ? classes.active : null )}><FaList />Inventory</NavLink>
                    <ul className={classes.sublist}>
                        <li>
                            <NavLink to="/inventory/categories" className={({ isActive }) => (isActive ? classes.active : null )}>Category</NavLink>
                        </li>
                        <li>
                            <NavLink to="/inventory/products" className={({ isActive }) => (isActive ? classes.active : null )}>Products</NavLink>
                        </li>
                        <li>
                            <NavLink to="/inventory/selections" className={({ isActive }) => (isActive ? classes.active : null )}>Selections</NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <NavLink to="/promotions" className={({ isActive }) => (isActive ? classes.active : null )}><FaPercent />Promotions</NavLink>
                </li>
                <li>
                    <NavLink to="/orders" className={({ isActive }) => (isActive ? classes.active : null )}><FaShoppingCart />Orders</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default LeftNavigation;