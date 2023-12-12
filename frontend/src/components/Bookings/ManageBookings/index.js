import "./ManageBookings.css";
import BookingDetail from "../BookingDetail/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserBookingsThunk } from "../../../store/bookings";

function ManageBookings() {
  const sessionUser = useSelector((state) => state.session.user);

  let bookings = useSelector((state) =>
    state.bookings.user ? state.bookings.user : []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserBookingsThunk());
  }, [dispatch]);

  if (bookings) bookings = Object.values(bookings);
  // sorted by the startDate of the bookings
  let futureBookings = bookings
    .filter((booking) => new Date() <= new Date(booking.endDate))
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  if (!bookings) return null;
  return (
    <div className="components-border">
      <h3 className="manage-bookings">
        Hello {sessionUser.username}, Manage Future Bookings
      </h3>

      <div className="bookings">
        {futureBookings.map((booking, index) => (
          <div key={booking.id}>
            <BookingDetail booking={booking} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageBookings;
