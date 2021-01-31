import googleCalendarApi from "../utils/googleCalendarApi";

export default async function bookMeetingRoom({
  meetingRoom,
  username,
  meetingDescription: description,
  selectedDate,
  selectedSlot,
  attendeesEmail,
}) {
  const dateObj = new Date(selectedDate);
  const selectedSlotArr = selectedSlot.match(/(\d+):(\d+) (AM|PM)/);
  if (!selectedSlot) return;
  selectedSlotArr[1] = parseInt(selectedSlotArr[1]);
  selectedSlotArr[2] = parseInt(selectedSlotArr[2]);
  if (selectedSlotArr[3] === "PM" && selectedSlotArr[1] < 12)
    selectedSlotArr[1] += 12;
  dateObj.setHours(selectedSlotArr[1], selectedSlotArr[2], 0, 0);

  const attendeesEmailArrr = attendeesEmail.split(",");
  const attendees = [];
  attendeesEmailArrr.forEach((email) => attendees.push({ email }));

  const summary = `Seminar by ${username}`;
  const location = `Affle's ${meetingRoom}`;

  const calendarEvent = { dateObj, summary, location, description, attendees };

  if (!attendees[0].email) {
    delete calendarEvent.attendees;
  }

  const result = await googleCalendarApi.createEventForSlot(calendarEvent);
  return result;
}
