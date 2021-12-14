import "../assets/styles/reservation.css";
import Button from "react-bootstrap/Button";

const ReservationItem = (props) => {
  const data = props.data;

  const handleDelete = () => {
    props.onDelete(data.id);
  };

  const statusClass = data.status === "Ready" ? "status green" : "status red";

  return (
    <div className="reservation-item">
      <p className="title">{data.name}</p>
      <p className={statusClass}>{data.status}</p>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default ReservationItem;
