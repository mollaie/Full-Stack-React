import "../assets/styles/reservation.css";
import ReservationItem from "./reservation-item";

const ReservationList = (props) => {
  const items = props.reservations;
  const handleDelete = (id) => {
    props.onDelete(id);
  };
  return (
    <div className="reservation-container">
      {items?.map((item, i) => (
        <ReservationItem
          key={i}
          data={item}
          onDelete={(id) => handleDelete(id)}
        />
      ))}
    </div>
  );
};

export default ReservationList;
