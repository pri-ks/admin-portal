import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getData, postData, deleteData } from '../../utilities/HttpMethods';
import classes from './Promotions.module.css';
import Promotion from './Promotion';
import ConfirmModal from '../../UI/ConfirmModal';
import AddPromotion from './AddPromotion';
import EditPromotion from './EditPromotion';
import NoDataFound from '../../UI/NoDataFound';
import ErrorMessage from '../../UI/ErrorMessage';
import Loader from '../../UI/Loader';

function Promotions() {
    const [promotions, setPromotions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [addPromotion, setAddPromotion] = useState(false);
    const [editPromotion, setEditPromotion] = useState(false);
    const [PromotionId, setPromotionId] = useState();
    const [promotion, setPromotionData] = useState({});

    const getPromotions = async () => {
        try {
          const response = await getData('/promotion/findAll');
          const promotionData = [];
          for (const item of response.data) {
            promotionData.push({
              id: item.id,
              image: item.image,
              title: item.title,
              description: item.description,
              couponCode: item.couponCode
            });
          }
          setPromotions(promotionData);
          setIsLoading(false);
        } 
        catch (error) {
          setIsLoading(false);
          setHttpError(error.message);
        }
    }

    useEffect(() => {
        getPromotions();
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
      setAddPromotion(false);
      setEditPromotion(false);
      setDeleteModalOpen(false);
    }

    const openEditPromotion = (id) => {
      setPromotionId(id);
      const promotionData = promotions.filter(b => b.id === id);
      setPromotionData(promotionData[0]);
      setEditPromotion(true);
    }

    const onEditPromotion = (formData) => {
      let updatedData = {};
      for (const [key, value] of formData) {
        updatedData[`${key}`] = value;
      }
      (async (updatedPromotion) => {
        setEditPromotion(false);
        try {
          if(typeof(updatedPromotion.image) === 'object'){
            const encodedFile = await base64Encoded(updatedPromotion.image);
            updatedPromotion.image = encodedFile;
          }
          updatedPromotion.id = PromotionId;
          await postData('/promotion/updatePromotion', updatedPromotion);
          const editedPromotion = promotions.find(b => b.id === PromotionId);
          Object.assign(editedPromotion, updatedPromotion);
          toast.warn('Promotion updated successfully');
        } 
        catch (err) {
          setHttpError(err.error);
        }
      })(updatedData);
    }
    
    const openDeletePromotion = (id) => {
      setPromotionId(id);
      setDeleteModalOpen(true);
    }
    
    const onDeletePromotion = async () => {
      setDeleteModalOpen(false);
      try {
        await deleteData(`/promotion/deletePromotion/${PromotionId}`);
        const promotionData = promotions.filter(b => b.id !== PromotionId);
        setPromotions(promotionData);
        toast.error('Promotion deleted successfully');
      }
      catch (err){
        setHttpError(err.error);
      }
    }

    const openAddPromotion = () => {
      setAddPromotion(true);
    }

    const onAddPromotion = (formData) => {
      let newPromotion = {} ;
      for (const [key, value] of formData) {
        newPromotion[`${key}`] = value;
      }
      (async (promotionData) => {
        setAddPromotion(false);
          try {
            const encodedFile = await base64Encoded(promotionData.image);
            promotionData.image = encodedFile;
            const response = await postData('/promotion/createPromotion', promotionData);
            promotionData.id = response.data.id;
            promotions.push(promotionData);
            setPromotions(promotions);
            toast.success('New Promotion added successfully');
          } 
          catch (err) {
            setHttpError(err.error);
          }
      })(newPromotion);
    }
    
    const promotionList = promotions.map((promotion) => (
      <Promotion
        key={promotion.id}
        id={promotion.id}
        title={promotion.title}
        description={promotion.description}
        couponCode={promotion.couponCode}
        image={promotion.image}
        onEdit={openEditPromotion}
        onDelete={openDeletePromotion}
      />
    ));

    return (
        <div className={`clearfix ${classes['section-wrap']}`}>
            <button className='float-end' onClick={openAddPromotion}><FaPlus />&nbsp;&nbsp;Add Promotion</button>
            { addPromotion && <AddPromotion onCancel={closeModal} onConfirm={onAddPromotion} /> }
            <ul className='row'>
              { promotions.length < 1 && <NoDataFound/> }
              { promotionList }
            </ul>
            { editPromotion && <EditPromotion onCancel={closeModal} onConfirm={onEditPromotion} promotionData={promotion} /> }
            { isDeleteModalOpen && 
              <ConfirmModal 
                onCancel={closeModal} 
                onConfirm={onDeletePromotion} 
                title='Are you sure you want to delete this promotion?'/> 
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

export default Promotions;