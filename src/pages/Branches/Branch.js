import classes from './Branch.module.css';
import { FaEdit, FaTrash, FaMapMarkerAlt } from 'react-icons/fa'; 

const Branch = (props) => {

  const onDelete = () => {
    props.onDelete(props.id);
  }

  const onEdit = () => {
    props.onEdit(props.id);
  }

  return (
    <li className="col-4 mb-4">
      <div className={classes['branch-box']}>
        <div className={classes['branch-img']} style={{backgroundImage:`url(${props.image})`}}></div>
        <h5>{props.name}</h5>
        <p><FaMapMarkerAlt />{props.location}</p>
        <button className={classes.editbtn} onClick={onEdit}><FaEdit /></button>
        <button className={classes.deletebtn} onClick={onDelete}><FaTrash /></button>
      </div>
    </li>
  );
};

export default Branch;
