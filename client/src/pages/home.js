import React, { useCallback, useEffect, useState } from "react";
import "../assets/styles/home.css";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../stores/actions";

import ReservationList from "../components/reservation-list";
import Modal from "../components/modal";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const data = useSelector((state) => state.reservations);

  const dispatch = useDispatch();

  const loadReservations = useCallback(async () => {
    await dispatch(Actions.fetchReservations());
  }, [dispatch, setLoading]);

  useEffect(async () => {
    setLoading(true);
    await loadReservations();
    setLoading(false);
  }, [dispatch, loadReservations]);

  const handleDelete = (id) => {
    setDeleteId(id);
    let item = data.reservations.find((item) => item.id === id);
    setDeleteMessage(
      `You are about to delete the reservation '${item.name}'. If you proceed with this action the item will be permanently deleted.`
    );
    setDisplayModal(true);
  };

  const handleCancel = () => {
    setDeleteId("");
    setDisplayModal(false);
  };

  const handleConfirmDelete = async () => {
    console.log(deleteId);
    setLoading(true);
    await dispatch(Actions.removeReservation(deleteId));

    await loadReservations();

    setDeleteId("");
    setDisplayModal(false);
    setLoading(false);
  };

  return (
    <div className="home-container">
      {displayModal && (
        <Modal
          show={displayModal}
          handleCancel={handleCancel}
          handleOk={handleConfirmDelete}
          message={deleteMessage}
        />
      )}

      <ReservationList
        reservations={data.reservations}
        onDelete={(id) => handleDelete(id)}
      />
    </div>
  );
};

export default Home;
