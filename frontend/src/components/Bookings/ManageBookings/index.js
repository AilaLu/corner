import "./ManageBookings.css";
import BookingDetail from "../BookingDetail/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserBookingsThunk } from "../../../store/bookings";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function ManageBookings() {
  let bookings = useSelector((state) =>
    state.bookings.user ? state.bookings.user : []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserBookingsThunk());
  }, [dispatch]);

  if (bookings) bookings = Object.values(bookings);
  if (!bookings) return null;
  return (
    <div className="components-border">
      <h1 className="manage-spots">Manage Bookings</h1>
        {bookings.map((booking, index) => (
          <div
            key={booking.id}
          >
            <BookingDetail booking={booking} index={index} />
          </div>
        ))}

      </div>
  );
}

export default ManageBookings;
