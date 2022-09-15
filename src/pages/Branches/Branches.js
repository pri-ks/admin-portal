import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getData, postData, deleteData } from '../../utilities/HttpMethods';
import classes from './Branches.module.css';
import Branch from './Branch';
import ConfirmModal from '../../UI/ConfirmModal';
import AddBranch from './AddBranch';
import EditBranch from './EditBranch';
import NoDataFound from '../../UI/NoDataFound';
import ErrorMessage from '../../UI/ErrorMessage';
import Loader from '../../UI/Loader';

function Branches() {
    const [branches, setBranches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [addBranch, setAddBranch] = useState(false);
    const [editBranch, setEditBranch] = useState(false);
    const [BranchId, setBranchId] = useState();
    const [branch, setBranchData] = useState({});

    const getBranches = async () => {
        try {
          const response = await getData('/branch/findAll');
          const branchData = [];
          for (const item of response.data) {
            branchData.push({
              id: item.id,
              image: item.image,
              name: item.name,
              location: item.location
            });
          }
          setBranches(branchData);
          setIsLoading(false);
        } 
        catch (error) {
          setIsLoading(false);
          setHttpError(error.message);
        }
    }

    useEffect(() => {
        getBranches();
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
      setAddBranch(false);
      setEditBranch(false);
      setDeleteModalOpen(false);
    }

    const openEditBranch = (id) => {
      setBranchId(id);
      const branchData = branches.filter(b => b.id === id);
      setBranchData(branchData[0]);
      setEditBranch(true);
    }

    const onEditBranch = (formData) => {
      let updatedData = {};
      for (const [key, value] of formData) {
        updatedData[`${key}`] = value;
      }
      (async (updatedBranch) => {
        setEditBranch(false);
        try {
          if(typeof(updatedBranch.image) === 'object'){
            const encodedFile = await base64Encoded(updatedBranch.image);
            updatedBranch.image = encodedFile;
          }
          updatedBranch.id = BranchId;
          await postData('/branch/updateBranch', updatedBranch);
          const editedBranch = branches.find(b => b.id === BranchId);
          Object.assign(editedBranch, updatedBranch);
          toast.warn('Branch edited successfully');
        } 
        catch (err) {
          setHttpError(err.error);
        }
      })(updatedData);
    }
    
    const openDeleteBranch = (id) => {
      setBranchId(id);
      setDeleteModalOpen(true);
    }
    
    const onDeleteBranch = async () => {
      setDeleteModalOpen(false);
      try {
        await deleteData(`/branch/deleteBranch/${BranchId}`);
        const branchData = branches.filter(b => b.id !== BranchId);
        setBranches(branchData);
        toast.error('Branch deleted successfully');
      }
      catch (err){
        setHttpError(err.error);
      }
    }

    const openAddBranch = () => {
      setAddBranch(true);
    }

    const onAddBranch = (formData) => {
      let newBranch = {} ;
      for (const [key, value] of formData) {
        newBranch[`${key}`] = value;
      }
      (async (branchData) => {
        setAddBranch(false);
          try {
            const encodedFile = await base64Encoded(branchData.image);
            branchData.image = encodedFile;
            const response = await postData('/branch/createBranch', branchData);
            branchData.id = response.data.id;
            branches.push(branchData);
            setBranches(branches);
            toast.success('New Branch added successfully');
          } 
          catch (err) {
            setHttpError(err.error);
          }
      })(newBranch);
    }
    
    const branchList = branches.map((branch) => (
      <Branch
        key={branch.id}
        id={branch.id}
        image={branch.image}
        name={branch.name}
        location={branch.location}
        onEdit={openEditBranch}
        onDelete={openDeleteBranch}
      />
    ));

    return (
        <div className={`clearfix ${classes['section-wrap']}`}>
            <button className='float-end' onClick={openAddBranch}><FaPlus />&nbsp;&nbsp;Add Branch</button>
            { addBranch && <AddBranch onCancel={closeModal} onConfirm={onAddBranch} /> }
            <ul className='row'>
              { branches.length < 1 && <NoDataFound/> }
              { branchList }
            </ul>
            { editBranch && <EditBranch onCancel={closeModal} onConfirm={onEditBranch} branchData={branch} /> }
            { isDeleteModalOpen && 
              <ConfirmModal 
                onCancel={closeModal} 
                onConfirm={onDeleteBranch} 
                title='Are you sure you want to delete the selected branch?'/> 
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

export default Branches;