// Render a pop up to see if you want to delete or not
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteBookingThunk } from "../../../store/bookings";
export default function DeleteBookingModal({ bookingId }) {
  const dispatch = useDispatch();

  const { closeModal } = useModal();
  const handleYes = (e) => {
    e.preventDefault();
    dispatch(deleteBookingThunk(bookingId)).then(closeModal);
  };

  return (
    <div className="center-children modal">
      <h1>Confirm Delete</h1>
      <div className="padding-bottom">
        <p>Are you sure you want to delete this booking?</p>
      </div>
      <div className="flex-column-centered">
        <div className="padding-bottom">
          <button className="big red button" type="submit" onClick={handleYes}>
            Yes(Delete Booking)
          </button>
        </div>
        <div>
          <button className="big grey button" onClick={closeModal}>
            No(Keep Booking)
          </button>
        </div>
      </div>
    </div>
  );
}
