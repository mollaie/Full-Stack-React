const Modal = ({ handleCancel, handleOk, message }) => {
  return (
    <div className="modal-main">
      <div className="modal-header">
        <p>Delete Reservation</p>
        <button type="button" onClick={handleCancel} className="close">
          X
        </button>
      </div>
      <div className="modal-body">
        <p>{message}</p>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Close
        </button>
        <button type="button" className="btn btn-primary" onClick={handleOk}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default Modal;
