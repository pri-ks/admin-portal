import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getData, postData, deleteData } from '../../../utilities/HttpMethods';
import classes from './Categories.module.css';
import Category from './Category';
import ConfirmModal from '../../../UI/ConfirmModal';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
import NoDataFound from '../../../UI/NoDataFound';
import ErrorMessage from '../../../UI/ErrorMessage';
import Loader from '../../../UI/Loader';
import { allCategories } from '../../../JSON/categoryData';

function Categories() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [addCategory, setAddCategory] = useState(false);
    const [editCategory, setEditCategory] = useState(false);
    const [CategoryId, setCategoryId] = useState();
    const [category, setCategoryData] = useState({});

    const getCategories = async () => {
        try {
          //const response = await getData('/itemCategory/findAll');
          const response = allCategories;
          const categoryData = [];
          for (const item of response.data) {
            categoryData.push({
              id: item.id,
              image: item.image,
              name: item.name,
              description: item.description
            });
          }
          setCategories(categoryData);
          setIsLoading(false);
        } 
        catch (error) {
          setIsLoading(false);
          setHttpError(error.message);
        }
    }

    useEffect(() => {
        getCategories();
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
      setAddCategory(false);
      setEditCategory(false);
      setDeleteModalOpen(false);
    }

    const openEditCategory = (id) => {
      setCategoryId(id);
      const categoryData = categories.filter(b => b.id === id);
      setCategoryData(categoryData[0]);
      setEditCategory(true);
    }

    const onEditCategory = (formData) => {
      let updatedData = {};
      for (const [key, value] of formData) {
        updatedData[`${key}`] = value;
      }
      (async (updatedCategory) => {
        setEditCategory(false);
        try {
          if(typeof(updatedCategory.image) === 'object'){
            const encodedFile = await base64Encoded(updatedCategory.image);
            updatedCategory.image = encodedFile;
          }
          updatedCategory.id = CategoryId;
          //await postData('/itemCategory/updateItemCategory', updatedCategory);
          const editedCategory = categories.find(b => b.id === CategoryId);
          Object.assign(editedCategory, updatedCategory);
          toast.warn('Category updated successfully');
        } 
        catch (err) {
          setHttpError(err.error);
        }
      })(updatedData);
    }
    
    const openDeleteCategory = (id) => {
      setCategoryId(id);
      setDeleteModalOpen(true);
    }
    
    const onDeleteCategory = async () => {
      setDeleteModalOpen(false);
      try {
        //await deleteData(`/itemCategory/deleteItemCategory/${CategoryId}`);
        const categoryData = categories.filter(b => b.id !== CategoryId);
        setCategories(categoryData);
        toast.error('Category deleted successfully');
      }
      catch (err){
        setHttpError(err.error);
      }
    }

    const openAddCategory = () => {
      setAddCategory(true);
    }

    const onAddCategory = (formData) => {
      let newCategory = {} ;
      for (const [key, value] of formData) {
        newCategory[`${key}`] = value;
      }
      (async (categoryData) => {
        setAddCategory(false);
          try {
            const encodedFile = await base64Encoded(categoryData.image);
            categoryData.image = encodedFile;
            //const response = await postData('/itemCategory/createItemCategory', categoryData);
            //categoryData.id = response.data.id;
            categoryData.id = Math.floor(Math.random() * 100);
            categories.push(categoryData);
            setCategories(categories);
            toast.success('New Category added successfully');
          } 
          catch (err) {
            setHttpError(err.error);
          }
      })(newCategory);
    }
    
    const categoryList = categories.map((category) => (
      <Category
        key={category.id}
        id={category.id}
        name={category.name}
        description={category.description}
        image={category.image}
        onEdit={openEditCategory}
        onDelete={openDeleteCategory}
      />
    ));

    return (
        <div className={`clearfix ${classes['section-wrap']}`}>
            <button className='float-end' onClick={openAddCategory}><FaPlus />&nbsp;&nbsp;Add Category</button>
            { addCategory && <AddCategory onCancel={closeModal} onConfirm={onAddCategory} /> }
            <ul className='row'>
              { categories.length < 1 && <NoDataFound/> }
              { categoryList }
            </ul>
            { editCategory && <EditCategory onCancel={closeModal} onConfirm={onEditCategory} categoryData={category} /> }
            { isDeleteModalOpen && 
              <ConfirmModal 
                onCancel={closeModal} 
                onConfirm={onDeleteCategory} 
                title='Are you sure you want to delete this category?'/> 
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

export default Categories;