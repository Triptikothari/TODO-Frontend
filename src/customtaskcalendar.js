import React from 'react'
import {useState} from 'react'

//days of calendar 
const daysShortArr = [
    'Monday','Tuesday','Wednesday','Friday','Saturday','Sunday'
]

const monthNamesArr =[
    'January','February','March','April','May','June','July','August',
    'September','October','November','December'
]

const custombutton = [
    'week'
]

const useCalendar = (daysShort = daysShortArr, monthNames = monthNamesArr, custombuttons = custombutton) => {
   const today = new Date();
   const todayformatted = `${today.getDate()} - ${today.getMonth() + 1} - ${today.getFullYear}`;
   const dayInWeek = [1,2,3,4,5,6,7,0]
   const [selectedDate, setSelectedDate]  = useState(today);
   const selectedMonthLastDate = new Date(selectedDate.getFullYear, selectedDate.getMonth() +1, 0);
   const prevMonthLastDate = new Date(selectedDate.getFullYear, selectedDate.getMonth(), 0);
   const daysInMonth = selectedMonthLastDate.getDate();
   const firstDayInMonth = new Date(selectedDate.getFullYear, selectedDate.getMonth(),1).getDay();
   const startingPoint = dayInWeek.indexOf(firstDayInMonth) + 1;
   

   let prevMonthStartingPoint = prevMonthLastDate.getDate() - dayInWeek.indexOf(firstDayInMonth) +1;
   let currentMOnthCounter = 1;
   let nextMonthCounter = 1;

   const rows = 6;
   const cols = 7;
   const calendarRows = {};

   for(let i = 1; i < rows +1; i++)
   {
       for(let j = 1; j < cols +1; j++){
        if(!calendarRows[i]){
            calendarRows[i] = [];
        }

        if(i === 1){
            if (j < startingPoint){
                calendarRows[i] = [...calendarRows[i],{
                    classes: 'in-prev-month',
                    date: `${prevMonthStartingPoint} - ${selectedDate.getMonth() === 0?12: selectedDate.getMonth()}-${selectedDate.getMonth() === 0 ? selectedDate.getFullYear() - 1 : selectedDate.getFullYear()} `,
                    value : prevMonthStartingPoint
                }];
                prevMonthStartingPoint++;
            }
            else{
                calendarRows[i] = [...calendarRows[i],{
                    classes: '',
                    date: `${currentMOnthCounter} - ${selectedDate.getMonth() + 1} - ${selectedDate.getFullYear()}`,
                    value: currentMOnthCounter
                }];
                currentMOnthCounter++;
            }

        }

        else if(i > 1 && currentMOnthCounter < daysInMonth +1 ){
           calendarRows[i] = [...calendarRows[i],{
            classes: '',
            date:`${currentMOnthCounter}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`,
            value: currentMOnthCounter
           }];
           currentMOnthCounter++;
        } 

        else {
            calendarRows[i] = [...calendarRows[i],{
                classes: 'in-next-month',
                date:`${nextMonthCounter}-${selectedDate.getMonth() + 2 === 13 ? 1: selectedDate.getMonth() + 2} - ${selectedDate.getMonth() + 2 === 13 ? selectedDate.getFullYear() + 1 : selectedDate.getFullYear()}`
               }];
               nextMonthCounter++;
        }

       }

    }

    const getPrevMonth = () => {
        setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth() -1,1));
    }

    const getNextMonth = () => {
        setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth() -1,1));
    }

    const week = () =>{
        //time grid should be open 
        // '12 AM','1','2','3','4','5'
    }



    return {
        daysShort,
        custombuttons,
        monthNames,
        todayformatted,
        calendarRows,
        selectedDate,
        getPrevMonth,
        getNextMonth
    }


}

export default useCalendar;

