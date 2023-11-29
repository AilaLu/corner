import "./ManageBookings.css";
// import ManageSpotcard from "../ManageSpotcard";
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
      {/* <div className="manage-spots-grid-container"> */}
        {bookings.map((booking, index) => (
          <div
            key={booking.id}
          >
          <div>{index + 1}</div>
          {booking.Spot.name}
        <div>{booking.startDate}</div>
        <div>{booking.endDate}</div>

            {/* <BookingDetail spot={spot} /> */}
          </div>
        ))}

      </div>
    // </div>
  );
}

export default ManageBookings;
