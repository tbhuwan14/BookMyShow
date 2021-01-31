import Joi from "joi-browser";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { validate, validateProperty } from "../utils/validation";
import Input from "./common/Input";
import Select from "./common/Select";
import TimeSlots from "./common/TimeSlots";
import "react-calendar/dist/Calendar.css";
import { isSignedIn } from "../services/auth";
import bookMeetingRoom from "../services/book";

function MeetingForm() {
  const [meetingData, setMeetingData] = useState({
    username: "",
    meetingRoom: "",
    meetingDescription: "",
    selectedDate: new Date().setHours(0, 0, 0, 0),
    selectedSlot: "",
    attendeesEmail: "",
  });
  const [errors, setErrors] = useState({});

  const slotArr = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
  ];

  const schema = {
    meetingRoom: Joi.string().required().label("Meeting Room"),
    username: Joi.string().required().label("Name"),
    meetingDescription: Joi.string().required().label("Meeting Description"),
    selectedSlot: Joi.string().required().label("Slot"),
    selectedDate: Joi.number(),
    attendeesEmail: Joi,
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    const newErrors = { ...errors };
    const errorMessage = validateProperty(target, schema);
    if (errorMessage) {
      newErrors[name] = errorMessage;
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);

    const newMeetingData = { ...meetingData };
    newMeetingData[name] = value;
    setMeetingData(newMeetingData);
  };

  const handleSlotSelection = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    const newMeetingData = { ...meetingData };
    newMeetingData[name] = value;
    setMeetingData(newMeetingData);
  };

  const bookSlot = async () => {
    try {
      await bookMeetingRoom(meetingData);
      alert("Congrats, Your meeting Room booked.");
      window.location = "/";
    } catch ({ result }) {
      alert(result.error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(meetingData, schema);
    setErrors(newErrors || {});
    console.log(newErrors);
    if (newErrors) return;

    bookSlot();
  };

  const handleCalendar = (selectedDate) => {
    const newMeetingData = { ...meetingData };
    newMeetingData.selectedDate = selectedDate;
    newMeetingData.selectedSlot = "";
    setMeetingData(newMeetingData);
  };

  if (!isSignedIn())
    return (
      <h2 className="text-center">Please Sign-In To Book Meeting Room.</h2>
    );

  return (
    <div className="mx-auto">
      <h3 className="text-center">Meeting Room Booking</h3>
      <form onSubmit={handleSubmit}>
        <Select
          name={"meetingRoom"}
          value={meetingData.meetingRoom}
          label={"Meeting Room"}
          options={["Training Room", "Presentation Room"]}
          onChange={handleChange}
          error={errors.meetingRoom}
        />
        <Input
          name={"username"}
          type={"text"}
          placeholder={"Enter Your Name"}
          label={"Name"}
          value={meetingData.username}
          onChange={handleChange}
          error={errors.username}
        />
        <Input
          name={"meetingDescription"}
          type={"text"}
          placeholder={"Enter Meeting Description"}
          label={"Meeting Description"}
          value={meetingData.meetingDescription}
          onChange={handleChange}
          error={errors.meetingDescription}
        />
        <Input
          name={"attendeesEmail"}
          type={"text"}
          placeholder={"Enter Email Id Separated By Comma(,)"}
          label={"Attendees Email (Optional)"}
          value={meetingData.attendeesEmail}
          onChange={handleChange}
          error={errors.attendeesEmail}
        />
        <div className="d-flex justify-content-center mb-3">
          <Calendar onChange={handleCalendar} />
        </div>
        <h6 className="text-center">
          {new Date(meetingData.selectedDate).toDateString()}
        </h6>
        {meetingData.meetingRoom && (
          <TimeSlots
            slotArr={slotArr}
            name={"selectedSlot"}
            selectedDate={meetingData.selectedDate}
            error={errors.selectedSlot}
            onClick={handleSlotSelection}
            selectedSlot={meetingData.selectedSlot}
          />
        )}
        <div className="text-center">
          <button className="btn btn-primary">BOOK APPOINTMENT</button>
        </div>
      </form>
    </div>
  );
}

export default MeetingForm;
