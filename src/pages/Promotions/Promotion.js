import classes from './Promotion.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa'; 

const Promotion = (props) => {
  
  const onDelete = () => {
    props.onDelete(props.id);
  }

  const onEdit = () => {
    props.onEdit(props.id);
  }

  return (
    <li className="col-12 mb-4">
      <div className={`row ${classes['promotion-box']}`}>
        <div className={`col-3 ${classes['promotion-img']}`} style={{backgroundImage:`url(${props.image})`}}></div>
        <div className="col-9">
          <h5>{props.title}</h5>
          <p>{props.description}</p>
          <h6>{props.couponCode}</h6>
          <button className={classes.editbtn} onClick={onEdit}>Edit <FaEdit /></button>
          <button className={classes.deletebtn} onClick={onDelete}>Delete <FaTrash /></button>
        </div>
      </div>
    </li>
  );
};

export default Promotion;
