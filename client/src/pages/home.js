import React, { useCallback, useEffect, useState } from "react";
import "../assets/styles/home.css";
import { useSelector, useDispatch } from "react-redux";

import Lottie from "react-lottie";
import spinnerData from "../assets/lottie/spinner.json";

import * as Actions from "../stores/actions";

import ReservationList from "../components/reservation-list";
import Modal from "../components/modal";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const data = useSelector((state) => state.reservations);

  const dispatch = useDispatch();

  const loadReservations = useCallback(() => {
    async function callBack() {
      await dispatch(Actions.fetchReservations());
    }
    callBack();
  }, [dispatch]);

  useEffect(() => {
    async function callBack() {
      setLoading(true);
      setTimeout(async () => {
        await loadReservations();
        setLoading(false);
      }, 1000);
    }
    callBack();
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
    setLoading(true);
    await dispatch(Actions.removeReservation(deleteId));

    await loadReservations();

    setDeleteId("");
    setDisplayModal(false);
    setLoading(false);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: spinnerData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
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
      {!loading && (
        <ReservationList
          reservations={data.reservations}
          onDelete={(id) => handleDelete(id)}
        />
      )}
      {loading && <Lottie options={defaultOptions} height={250} width={250} />}
    </div>
  );
};

export default Home;
