import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getData, postData, deleteData } from '../../../utilities/HttpMethods';
import classes from './Selections.module.css';
import Selection from './Selection';
import ConfirmModal from '../../../UI/ConfirmModal';
import AddSelection from './AddSelection';
import EditSelection from './EditSelection';
import NoDataFound from '../../../UI/NoDataFound';
import ErrorMessage from '../../../UI/ErrorMessage';
import Loader from '../../../UI/Loader';

function Selections() {
    const [selections, setSelections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [addSelection, setAddSelection] = useState(false);
    const [editSelection, setEditSelection] = useState(false);
    const [SelectionId, setSelectionId] = useState();
    const [selection, setSelectionData] = useState({});

    const getSelections = async () => {
        try {
          const response = await getData('/itemSelection/findAll');
          const selectionData = [];
          for (const item of response.data) {
            selectionData.push({
              id: item.id,
              image: item.image,
              name: item.name,
              description: item.description,
              price: item.price,
              currency: item.currency
            });
          }
          setSelections(selectionData);
          setIsLoading(false);
        } 
        catch (error) {
          setIsLoading(false);
          setHttpError(error.message);
        }
    }

    useEffect(() => {
        getSelections();
     },[]);

    if (isLoading) {
        return (
          <Loader />
        );
    }
    
    if (httpError) {
        return (
         <ErrorMessage/>
        );
    }

    const base64Encoded = (file) => {
      return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    const closeModal = () => {
      setAddSelection(false);
      setEditSelection(false);
      setDeleteModalOpen(false);
    }

    const openEditSelection = (id) => {
      setSelectionId(id);
      const selectionData = selections.filter(b => b.id === id);
      setSelectionData(selectionData[0]);
      setEditSelection(true);
    }

    const onEditSelection = (formData) => {
      let updatedData = {};
      for (const [key, value] of formData) {
        updatedData[`${key}`] = value;
      }
      (async (updatedSelection) => {
        setEditSelection(false);
        try {
          if(typeof(updatedSelection.image) === 'object'){
            const encodedFile = await base64Encoded(updatedSelection.image);
            updatedSelection.image = encodedFile;
          }
          updatedSelection.id = SelectionId;
          await postData('/itemSelection/updateItemSelection', updatedSelection);
          const editedSelection = selections.find(b => b.id === SelectionId);
          Object.assign(editedSelection, updatedSelection);
          toast.warn('Selection updated successfully');
        } 
        catch (err) {
          setHttpError(err.error);
        }
      })(updatedData);
    }
    
    const openDeleteSelection = (id) => {
      setSelectionId(id);
      setDeleteModalOpen(true);
    }
    
    const onDeleteSelection = async () => {
      setDeleteModalOpen(false);
      try {
        await deleteData(`/itemSelection/deleteItemSelection/${SelectionId}`);
        const selectionData = selections.filter(b => b.id !== SelectionId);
        setSelections(selectionData);
        toast.error('Selection deleted successfully');
      }
      catch (err){
        setHttpError(err.error);
      }
    }

    const openAddSelection = () => {
      setAddSelection(true);
    }

    const onAddSelection = (formData) => {
      let newSelection = {} ;
      for (const [key, value] of formData) {
        newSelection[`${key}`] = value;
      }
      (async (selectionData) => {
        setAddSelection(false);
          try {
            const encodedFile = await base64Encoded(selectionData.image);
            selectionData.image = encodedFile;
            const response = await postData('/itemSelection/createItemSelection', selectionData);
            selectionData.id = response.data.id;
            selections.push(selectionData);
            setSelections(selections);
            toast.success('New Selection added successfully');
          } 
          catch (err) {
            setHttpError(err.error);
          }
      })(newSelection);
    }
    
    const selectionList = selections.map((selection) => (
      <Selection
        key={selection.id}
        id={selection.id}
        name={selection.name}
        description={selection.description}
        price={selection.price}
        currency={selection.currency}
        image={selection.image}
        onEdit={openEditSelection}
        onDelete={openDeleteSelection}
      />
    ));

    return (
        <div className={`clearfix ${classes['section-wrap']}`}>
            <button className='float-end' onClick={openAddSelection}><FaPlus />&nbsp;&nbsp;Add Selection</button>
            { addSelection && <AddSelection onCancel={closeModal} onConfirm={onAddSelection} /> }
            <ul className='row'>
              { selections.length < 1 && <NoDataFound/> }
              { selectionList }
            </ul>
            { editSelection && <EditSelection onCancel={closeModal} onConfirm={onEditSelection} selectionData={selection} /> }
            { isDeleteModalOpen && 
              <ConfirmModal 
                onCancel={closeModal} 
                onConfirm={onDeleteSelection} 
                title='Are you sure you want to delete this selection?'/> 
            }
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
        </div>
    )
}

export default Selections;