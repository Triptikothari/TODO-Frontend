import React from "react";
import { Fragment } from "react";

import useCalendar from "./customtaskcalendar";

const Calendars = () => {
    const {daysShort,
        custombuttons,
        monthNames,
        todayformatted,
        calendarRows,
        selectedDate,
        getPrevMonth,
        getNextMonth} = useCalendar();

        const dateClickHandler = date => {
            console.log(date);
        }

        return (
            <Fragment>
                <button className="button"> Week </button>
                <p></p>
                <table className="table">
                    <thead>
                        <tr>
                            {daysShort.map(day => (
                                <th key ={day}>{day}</th>
                            ))}
                        </tr>
                    </thead>
                </table>

                <button className="button" onClick={getPrevMonth}> Previous</button>
                <button className="button" onClick={getNextMonth}> Next</button>
            </Fragment>
        )
} 

export default Calendars;