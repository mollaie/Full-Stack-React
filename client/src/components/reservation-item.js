import "../assets/styles/reservation.css";
import Button from "react-bootstrap/Button";

const ReservationItem = (props) => {
  const data = props.data;

  const handleDelete = () => {
    props.onDelete(data.id);
  };
  return (
    <div className="reservation-item">
      <p className="title">{data.name}</p>
      <p className="status">{data.status}</p>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default ReservationItem;
