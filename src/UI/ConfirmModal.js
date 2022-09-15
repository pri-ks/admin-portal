import { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';

function ConfirmModal(props) {
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

    const onConfirm = () => {
        const bsModal= Modal.getInstance(modalRef.current);
        bsModal.hide();
        props.onConfirm();
    }

    useEffect(() => {
        showModal();
    }, []);
    
    return (
            <div className="modal fade" ref={modalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">Confirm Action</div>
                        <p className="modal-body">{props.title}</p>
                        <div className="modal-footer">
                            <button className="btn btn-outline-info" onClick={onCancel}>Cancel</button>
                            <button className="btn btn-danger" onClick={onConfirm}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ConfirmModal;