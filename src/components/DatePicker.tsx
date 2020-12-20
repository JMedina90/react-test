import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = (props: any) => {
  const [startDate, setStartDate] = useState(new Date());

  const onDateChange = (date: Date) => {
    setStartDate(date);
  };

  return (
    <div>
      <div style={{fontSize: '1.2em'}}>Please insert a new date for the appointment:</div>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => onDateChange(date)}
        timeInputLabel="Time:"
        dateFormat="MM/dd/yyyy h:mm aa"
        showTimeInput
      />
      <div>
        <button onClick={() => props.onPressRescheduleButton(startDate)}>
          Save
        </button>
      </div>
    </div>
  );
};

export default DatePickerComponent;
