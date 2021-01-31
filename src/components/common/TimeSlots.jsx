import React from "react";

function TimeSlots({ selectedDate, selectedSlot, slotArr, error, ...rest }) {
  function toDisable(selectedDate, slot) {
    // if (preBookedSlot.includes(slot)) {
    //   return true;
    // }

    const splitedSlot = slot.match(/(\d+):(\d+) (AM|PM)/);
    splitedSlot[1] = parseInt(splitedSlot[1]);
    splitedSlot[2] = parseInt(splitedSlot[2]);

    if (splitedSlot[3] === "PM" && splitedSlot[1] < 12) {
      splitedSlot[1] += 12;
    }

    const currentDateObj = new Date();
    const selectedDateObj = new Date(selectedDate);
    selectedDateObj.setHours(splitedSlot[1], splitedSlot[2]);

    return selectedDateObj.valueOf() < currentDateObj.valueOf();
  }

  const btnClassName = "btn btn-";

  return (
    <div className="container mb-2 mt-2 ">
      <h3 className="text-center"> Please select your preferred slot </h3>
      <div className="row text-center justify-content-around">
        {slotArr.map((slot) => (
          <div key={slot} className="col-xs-4 col-sm-6 col-md-4 col-lg-2 mb-2 ">
            <button
              {...rest}
              value={slot}
              disabled={slot === selectedSlot || toDisable(selectedDate, slot)}
              className={
                slot === selectedSlot
                  ? `${btnClassName}success`
                  : toDisable(selectedDate, slot)
                  ? `${btnClassName}outline-danger`
                  : `${btnClassName}secondary`
              }
            >
              {slot}
            </button>
          </div>
        ))}
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default TimeSlots;
