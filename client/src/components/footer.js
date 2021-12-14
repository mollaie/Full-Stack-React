import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../assets/styles/footer.css";

const Footer = (props) => {
  const navigate = useNavigate();

  const createReservationHandler = (e) => {
    e.preventDefault();

    navigate("/Create");
  };

  const cancelReservation = (e) => {
    e.preventDefault();

    navigate("/");
  };

  const submitReservation = (e) => {
    e.preventDefault();

    props.onCreateClick();
  };

  const DefaultFooter = () => {
    return (
      <div className="footer">
        <button className="btn btn-primary" onClick={createReservationHandler}>
          Create Reservation
        </button>
      </div>
    );
  };

  const CreateFooter = () => {
    return (
      <div className="footer">
        <div className="create-action-bar">
          <button className="btn btn-secondary" onClick={cancelReservation}>
            Cancel
          </button>
          <button
            className="btn btn-success"
            onClick={submitReservation}
            type="button"
          >
            Create
          </button>
        </div>
      </div>
    );
  };

  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    setIsCreate(props.isCreate);
  }, [props.isCreate]);

  return !isCreate ? <DefaultFooter /> : <CreateFooter />;
};

export default Footer;
