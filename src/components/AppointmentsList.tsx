import React, { useEffect, useState, useRef } from "react";
import AppointmentInformation from "./AppointmentInformation";
import apptsData from "../data.json";
import Modal from "../shared/Modal";
import DatePicker from "./DatePicker";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  initData,
  confirmAppointment,
} from "../app/appointmentSlice";
import "./Styles.css";
import timeFormat from "date-fns/format";



const AppointmentsList: React.FC = () => {
  // This is the modal reference. Includes its many functions (such as open and close);
  const modalRef = useRef();

  const dispatch = useDispatch();

  const appointmentsData = useSelector(
    (state: RootStateOrAny) => state.appointments.appointmentData
  );

  const [apptData, setApptData] = useState<any[]>([]);
  const [paginationPage, setPaginationPage] = useState<number>(0);
  const [paginationLimit] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [reAppointmentId, setReAppointmentId] = useState<number>(0);

  useEffect(() => {
    // Simulates FETCH data from local file.
    // Can't fetch from URL as the API does not allow CORS.

    setTimeout(() => {
      dispatch(initData(apptsData));
    }, 1000);

  }, []);

  useEffect(() => {

    if (apptData.length === 0 && appointmentsData != null) {
      const totalPages = Math.ceil(appointmentsData.length / paginationLimit);
      setTotalPages(totalPages);
    }

    if (appointmentsData != null) {
      setApptData(appointmentsData);
      paginateList();
    }

  }, [appointmentsData]);


  useEffect(() => {
    if (appointmentsData != null) {
      paginateList();
    }
  }, [paginationPage, paginationLimit]);


  // begin: Pagination functions
  const paginateList = () => {
    const page = paginationPage;
    const limit = page !== 0 ? paginationLimit * (page + 1) : paginationLimit;
    const offset = limit - paginationLimit;

    const data = appointmentsData.slice(offset, limit);
    setApptData(data);
  };

  const prevPage = () => {
    let prevPage = paginationPage - 1;

    if (prevPage <= 0) {
      prevPage = 0;
      setPaginationPage(prevPage);
    } else {
      setPaginationPage(prevPage);
    }
  };

  const nextPage = () => {
    const nextPage = paginationPage + 1;
    if (nextPage <= totalPages - 1) {
      setPaginationPage(nextPage);
    }
  };
  // end: pagination functions

  // start: Confirm / Reschedule appointments

  const onPressConfirmButton = (id: number, type: string) => {
    const alertMessage =
      type === "confirm"
        ? "Would you like to confirm this schedule?"
        : "Would you like to unconfirm this schedule?";
    const confirmation = type === "confirm" ? true : false;
    const r = window.confirm(alertMessage);
  
    // If use cancels the action, it won't go further than here.
    if (!r) return;

    // create a new array of appointments to manipulate the data and send it back to the store.
    const _appt = appointmentsData.slice();

    const findIndex = _appt.findIndex((i: any) => i.appointmentId === id);
    const findAppt = _appt.find((i: any) => i.appointmentId === id);
    const data = { ...findAppt, confirm: confirmation };
    _appt[findIndex] = data;

    dispatch(confirmAppointment(_appt));
  };

  const onPressRescheduleButton = (date: Date) => {
    const alertMessage = "Are you sure you want to reschedule ?";
    const r = window.confirm(alertMessage);
    if (!r) return;

    const ref = modalRef.current as any;

    const id = reAppointmentId;
    const newAppointmentDate = timeFormat(date, "yyyy-MM-dd:HH:mm:ss");

    const _appt = appointmentsData.slice();

    const findIndex = _appt.findIndex((i: any) => i.appointmentId === id);
    const findAppt = _appt.find((i: any) => i.appointmentId === id);
    const data = { ...findAppt, requestedDateTimeOffset: newAppointmentDate };
    _appt[findIndex] = data;

    dispatch(confirmAppointment(_appt));
    ref.closeModal();
  };
  // end: Confirm / Reschedule appointments

  const openModal = (id: number) => {
    setReAppointmentId(id);

    //from the modal reference, open the modal.
    const ref = modalRef.current as any;
    ref.openModal();
  };

  const onSearchAppointment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value.toLowerCase();

    const _appt = appointmentsData.slice();
    const search = _appt.filter(
      (i: any) =>
        i.user.firstName.toLowerCase() === name ||
        i.animal.firstName.toLowerCase() === name
    );
    if (name !== "" && search.length !== 0) {
      setApptData(search);
    } else {
      setApptData(appointmentsData);
      paginateList();
    }
  };

  if (apptData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal ref={modalRef}>
        <DatePicker onPressRescheduleButton={onPressRescheduleButton} />
      </Modal>

      <div className="appointment-container">
        <div>
          <input
            type="search"
            name="search"
            id=""
            onChange={onSearchAppointment}
            placeholder="Search by patient name"
          />
        </div>
        <div>
          {apptData.map((appt) => {
            return (
              <AppointmentInformation
                appt={appt}
                key={appt.appointmentId}
                openModal={openModal}
                confirmAppointment={onPressConfirmButton}
              />
            );
          })}
        </div>
        <button
          className="btn btn-primary"
          style={{ marginRight: "5px" }}
          onClick={prevPage}
        >
          Prev
        </button>
        <button
          className="btn btn-primary"
          style={{ marginRight: "5px" }}
          onClick={nextPage}
        >
          Next
        </button>
        {paginationPage + 1} / {totalPages}
      </div>
    </>
  );
};

export default AppointmentsList;
