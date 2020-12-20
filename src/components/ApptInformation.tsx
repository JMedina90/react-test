import React from "react";
import timeFormat from "date-fns/format";
import {
  confirmAppointment,
  rescheduleAppointment,
} from "../app/appointmentSlice";
import { useDispatch } from "react-redux";
import "./Styles.css";

interface Appts {
  animal: {
    animalId: number;
    breed: string | null;
    firstName: string;
    species: string | null;
  };
  animal_AnimalId: number;
  appointmentId: number;
  appointmentType: string;
  createDateTime: Date;
  requestedDateTimeOffset: Date;
  user: {
    firstName: string;
    lastName: string;
    userId: number;
    vetDataId: string;
  };
  user_UserId: number;
  confirm?: boolean;
}

const ApptInformation: React.FC<{
  appt: Appts;
  openModal: (id: number) => void;
  confirmAppointment: (id: number, type: string) => void;
}> = (props) => {
  const {
    animal,
    animal_AnimalId,
    appointmentId,
    appointmentType,
    createDateTime,
    requestedDateTimeOffset,
    user,
    user_UserId,
    confirm,
  } = props.appt;

  const requestedTime = new Date(requestedDateTimeOffset);

  const appointmentTime = timeFormat(requestedTime, "HH:mm:ss");
  const appointmentDate = timeFormat(requestedTime, "MM-dd-yyyy");

  return (
    <>
      <div className={`${confirm === true ? 'appointment-card appointment-card-confirm' : ' appointment-card appointment-card-danger'}`}>
        <div className="appointment-card-info">
          <div className="appointment-card-user-info">
            <div>
              <strong>Patient name: </strong> {user.firstName} {user.lastName}
            </div>
            <div>
              <strong>Pet name: </strong> {animal.firstName}
            </div>
            <div>
              <strong>Species: </strong> {animal.species || "N/A"}
            </div>
            <div>
              <strong>Breed: </strong> {animal.breed || "N/A"}
            </div>
            <div>
              <strong>Appointment Type: </strong> {appointmentType}
            </div>
          </div>
          <div className="appointment-card-date-info">
            <div>
              <strong>Requested Date: </strong>
              {appointmentDate}
            </div>
            <div>
              <strong>Time: </strong> {appointmentTime}
            </div>
            <div>
              <strong>status: </strong>
              {confirm ? (
                <span className="text-success">confirmed</span>
              ) : (
                <span className="text-danger">unconfirm</span>
              )}
            </div>
            {/* <div><strong>Ap:</strong> {animal.firstName}</div> */}
          </div>
        </div>
        <div className="appointment-card-buttons">
          {confirm === true ? (
            <>
              <button
                className="btn btn-blueish"
                onClick={() =>
                  props.confirmAppointment(appointmentId, "unconfirm")
                }
              >
                Unconfirm
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => alert("You must unconfirm to change the date.")}
              >
                Reschedule
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-primary"
                onClick={() =>
                  props.confirmAppointment(appointmentId, "confirm")
                }
              >
                Confirm
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => props.openModal(appointmentId)}
              >
                Reschedule
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ApptInformation;
