import React, { useState, useEffect } from "react";
import NavBar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import BrandLogo from "../assets/images/reservation.png";
const Nav = (props) => {
  const [title, setTitle] = useState("Reservation");

  useEffect(() => {
    if (!props.isCreate) setTitle("Reservation");
    else setTitle("Create Reservation");
  }, [props.isCreate]);

  return (
    <div>
      <NavBar.Brand href="/" className="d-flex p-4 pb-0">
        <Image src={BrandLogo} width="30" height="30" className="align-top" />
        <p className="p-3 pt-0 pb-0 text-dark info">{title}</p>
      </NavBar.Brand>
    </div>
  );
};

export default Nav;
