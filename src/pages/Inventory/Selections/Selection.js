import classes from './Selection.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa'; 

const Selection = (props) => {
  
  const onDelete = () => {
    props.onDelete(props.id);
  }

  const onEdit = () => {
    props.onEdit(props.id);
  }


  return (
    <li className="col col-6 mb-4">
      <div className={classes['selection-box']}>
        <div className='row'>
          <div className={`col col-4 ${classes['selection-img']}`} style={{backgroundImage:`url(${props.image})`}}></div>
          <div className="col col-8">
            <h5>{props.name}</h5>
            <p>{props.description}</p>
            <h6>{props.currency}&nbsp;{props.price}</h6>
            <button className={classes.editbtn} onClick={onEdit}>Edit <FaEdit /></button>
            <button className={classes.deletebtn} onClick={onDelete}>Delete <FaTrash /></button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Selection;
