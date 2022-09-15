import classes from './Category.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa'; 

const Category = (props) => {
  
  const onDelete = () => {
    props.onDelete(props.id);
  }

  const onEdit = () => {
    props.onEdit(props.id);
  }

  return (
    <li className="col-12 mb-4">
      <div className={`row ${classes['category-box']}`}>
        <div className={`col-3 ${classes['category-img']}`} style={{backgroundImage:`url(${props.image})`}}></div>
        <div className="col-9">
          <h5>{props.name}</h5>
          <p>{props.description}</p>
          <button className={classes.editbtn} onClick={onEdit}>Edit <FaEdit /></button>
          <button className={classes.deletebtn} onClick={onDelete}>Delete <FaTrash /></button>
        </div>
      </div>
    </li>
  );
};

export default Category;
