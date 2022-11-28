import React from 'react';

const DeleteConfirmationModal = ({ deleteTitle, message, successButtonName, closeModal, modalData, successAction }) => {
    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="confirmation_modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">{deleteTitle}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={() => successAction(modalData)} htmlFor="confirmation_modal" className="bg-gradient-to-r from-secondary to-primary text-white btn">{successButtonName}</label>
                        <button onClick={closeModal} className='text-white btn btn-error' >cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;