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
  let futureBookings = bookings.filter((booking)=> new Date() <= new Date(booking.endDate))
  if (!bookings) return null;
  return (
    <div className="components-border">
      <h1 className="manage-bookings">Manage Future Bookings</h1>

        <div className="bookings">
          {futureBookings.map((booking, index) => (
            <div
              key={booking.id}
            >
              <BookingDetail booking={booking} index={index} />
            </div>
          ))}
        </div>

      </div>
  );
}

export default ManageBookings;
