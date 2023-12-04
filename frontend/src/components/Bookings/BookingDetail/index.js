import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBookingThunk } from "../../../store/bookings";
import OpenModalButton from "../../OpenModalButton";
import DeleteBookingModal from "../DeleteBookingModal";
import "./BookingDetail.css";

import 'react-calendar/dist/Calendar.css';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
// import "./datepicker.css"

export default function BookingDetail({booking, index}) {
 const [value, onChange] = useState([booking.startDate, booking.endDate]);
 const startDate = value[0]
 const endDate = value[1]
 const dispatch = useDispatch();

const updateBooking = async (e)=>{
 e.preventDefault();
 
 const backendResponse = await dispatch(updateBookingThunk({startDate: startDate, endDate: endDate}, booking?.id))
 // if booking conflicted return 403 errors
 if(backendResponse?.errors){
   alert(`${backendResponse.message}`)
 }
 //no errors
 else if(!backendResponse?.errors){
   alert(`You have reserved ${booking.Spot.name} from ${startDate?.toISOString().split("T")[0]} to ${endDate?.toISOString().split("T")[0]}.`)
 }
}

// Past bookings can't be modified 
// hide the dateRangePicker edit button/ delete button

let bookingHasStarted  = ""
if(new Date() > new Date(booking.endDate)) bookingHasStarted = "hidden"

  if (!booking) return null;
  return (
    <>
      <section className="components-border">
        {/* <h1>{review.id}</h1> */}
        <div className="review padding-bottom">
<h3>Booking {index + 1}</h3>
{booking.Spot.name}
<div>Start Date: {booking.startDate.split("T")[0]}</div>
<div>End Date: {booking.endDate.split("T")[0]}</div>
        </div>
        <div className={`edit-booking ${bookingHasStarted}`}>
        <div> <DateRangePicker
            locale="en-GB"
            isOpen={false}
            autoFocus={true}
            dayPlaceholder="dd"
            monthPlaceholder="mm"
            yearPlaceholder="yyyy"
            format="y-MM-dd"
            calendarClassName="calendar"
            className="date-picker"
            // onCalendarClose={() => alert(value)}
            onChange={onChange}
            required={true}
            value={value}
            / ></div>
              <div className="buttons-container reserve-btn">
            <button
              onClick={updateBooking}
              className="small grey button hover-cursor-pointer"
            >
              Update Booking
            </button>
          </div>
        </div>
        <div className={`delete-booking ${bookingHasStarted}`}>
          <OpenModalButton
            buttonStyle="small grey button"
            buttonText="Delete"
            modalComponent={<DeleteBookingModal bookingId={booking.id} />}
          />
        </div>
      </section>
    </>
  );
}
