import { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';

function AddSelection(props) {
    const modalRef = useRef();
    
    const showModal = () => {
        const bsModal = new Modal(modalRef.current, {
            backdrop: 'static',
            keyboard: false
        });
        bsModal.show();
    }

    const onCancel = () => {
        const bsModal = Modal.getInstance(modalRef.current);
        bsModal.hide();
        props.onCancel();
    }

    const onAdd = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const bsModal = Modal.getInstance(modalRef.current);
        bsModal.hide();
        props.onConfirm(formData);
    }

    useEffect(() => {
        showModal();
    }, []);
    
    return (
        <div className="modal fade" ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">Add Selection Details</div>
                    <form name="AddSelectionForm" onSubmit={onAdd}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label required">Name</label>
                                <input type="text" name="name" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea name="description" className="form-control" rows="3"></textarea>
                            </div>
                            <div className="mb-3 row">
                                <div className='col-4'>
                                    <label className="form-label required">Currency</label>
                                    <input type="text" name="currency" className="form-control" required />
                                </div>
                                <div className='col-8'>
                                    <label className="form-label required">Price</label>
                                    <input type="number" name="price" min="0.1" step="0.01" className="form-control" required />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label required">Image</label>
                                <input type="file" accepts="image/*" className="form-control" name="image" required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <input type="submit" className="btn btn-info w-25" value="Add" />
                            <button className="btn btn-outline-info w-25" onClick={onCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddSelection;