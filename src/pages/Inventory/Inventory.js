import { Routes, Route, Navigate } from 'react-router-dom';
import Categories from './Categories/Categories';
import Products from './Products/Products';
import Selections from './Selections/Selections';

function Inventory() {
    return (
        <Routes>
            <Route path='/' element={<Categories />}></Route>
            <Route path='categories' element={<Categories />}></Route>
            <Route path='products' element={<Products />}></Route>
            <Route path='selections' element={<Selections />}></Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default Inventory;