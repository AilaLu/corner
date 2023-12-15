import BookingDetail from "../BookingDetail/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserBookingsThunk } from "../../../store/bookings";
import "../ManageBookings/ManageBookings.css";

function BookingHistory() {
  const sessionUser = useSelector((state) =>
    state.session.user ? state.session.user : null
  );
  let bookings = useSelector((state) =>
    state.bookings.user ? state.bookings.user : []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserBookingsThunk());
  }, [dispatch]);

  if (bookings) bookings = Object.values(bookings);
  let pastBookings = bookings.filter(
    (booking) => new Date() > new Date(booking.endDate)
  );
  if (!bookings) return null;
  return (
    <div className="components-border">
      <h3 className="manage-bookings">
        Hello {sessionUser.username}, View Past Booking History
      </h3>

      <div className="bookings">
        {pastBookings.map((booking, index) => (
          <div key={booking.id}>
            <BookingDetail booking={booking} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingHistory;
