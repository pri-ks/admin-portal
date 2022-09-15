import { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';

function EditBranch(props) {
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
            formData.set('image', props.branchData.image);
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
                        <div className="modal-header">Edit Branch Details</div>
                        <form name="AddBranchForm" onSubmit={onEdit}>
                            <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label required">Name</label>
                                        <input type="text" name="name" className="form-control" defaultValue={props.branchData.name} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label required">Location</label>
                                        <input type="text" name="location" className="form-control" defaultValue={props.branchData.location} required />
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

export default EditBranch;