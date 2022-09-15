import { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';

function EditCategory(props) {
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
            formData.set('image', props.categoryData.image);
        }
        const bsModal= Modal.getInstance(modalRef.current);
        bsModal.hide();
        props.onConfirm(formData);
    }

    useEffect(() => {
        showModal();
    },[]);
    
    return (
            <div className="modal fade" ref={modalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">Edit Category Details</div>
                        <form name="AddCategoryForm" onSubmit={onEdit}>
                            <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" name="name" className="form-control required" defaultValue={props.categoryData.name} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea name="description" className="form-control" defaultValue={props.categoryData.description} rows="4"></textarea>
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

export default EditCategory;