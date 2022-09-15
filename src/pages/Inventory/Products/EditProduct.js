import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';

function EditProduct(props) {
    const [CategoryId, setCategoryId] = useState();
    const modalRef = useRef();

    const showModal = () => {
        const bsModal = new Modal(modalRef.current, {
            backdrop: 'static',
            keyboard: false
        });
        bsModal.show();
    }

    const onCancel = () => {
        const bsModal= Modal.getInstance(modalRef.current);
        bsModal.hide();
        props.onCancel();
    }

    const onEdit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        if(formData.get('image').size === 0) {
            formData.set('image', props.productData.image);
        }
        const bsModal= Modal.getInstance(modalRef.current);
        bsModal.hide();
        props.onConfirm(formData);
    }

    const setCategory = () => {
        const selectedCategory = props.categories.filter(c => c.id === props.productData.itemCategory.id);
        setCategoryId(selectedCategory[0].id);
    }

    useEffect(() => {
        showModal();
        setCategory();
    },[]);
    
    return (
            <div className="modal fade" ref={modalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">Edit Product Details</div>
                        <form name="AddProductForm" onSubmit={onEdit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label required">Name</label>
                                    <input type="text" name="name" className="form-control" defaultValue={props.productData.name} required/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea name="description" className="form-control" defaultValue={props.productData.description} rows="3"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label required">Category</label>
                                    <select className="form-control" name="itemCategoryId" value={CategoryId} required>
                                        <option disabled>Choose Category</option>
                                        {props.categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3 row">
                                    <div className='col-4'>
                                        <label className="form-label required">Currency</label>
                                        <input type="text" name="currency" className="form-control" defaultValue={props.productData.currency} required/>
                                    </div>
                                    <div className='col-8'>
                                        <label className="form-label required">Price</label>
                                        <input type="number" name="price" min="0.1" step="0.01" className="form-control" defaultValue={props.productData.price} required/>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input type="file" accepts="image/*" className="form-control" name="image"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <input type="submit" className="btn btn-info w-25" value="Update" />
                                <button className="btn btn-outline-info w-25" onClick={onCancel}>Cancel</button>
                            </div>
                        </form>  
                    </div>
                </div>
            </div>
    )
}

export default EditProduct;