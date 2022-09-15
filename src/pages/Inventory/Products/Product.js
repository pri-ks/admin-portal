import classes from './Product.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa'; 

const Product = (props) => {
  
  const onDelete = () => {
    props.onDelete(props.id);
  }

  const onEdit = () => {
    props.onEdit(props.id);
  }


  return (
    <li className="col col-6 mb-4">
      <div className={classes['product-box']}>
        <div className='row'>
          <div className={`col col-4 ${classes['product-img']}`} style={{backgroundImage:`url(${props.image})`}}></div>
          <div className="col col-8">
            <h5>{props.name}</h5>
            <p>{props.description}</p>
            <span>{props.itemCategory.name}</span>
            <h6>{props.currency}&nbsp;{props.price}</h6>
            <button className={classes.editbtn} onClick={onEdit}>Edit <FaEdit /></button>
            <button className={classes.deletebtn} onClick={onDelete}>Delete <FaTrash /></button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Product;
