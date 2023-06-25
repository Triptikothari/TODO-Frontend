import React, { createContext } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

import { useContext } from "react";
import { CalendarContext } from "./calendarcontext";



 const MyCalendar = () =>{
    
    const [alltask,setassigntask] = useContext(CalendarContext);
    
    const [error, seterror] = useState(null);
    const [value, onchange] = useState(new Date());
    const [show, toggleshow] = useState(false);
    const [taskname,settask] = useState(null);
    const [taskid,setid] = useState(null);
    const [Allotedtime, setAllotedtime] = useState(null);
    const [remaintime, setremaintime] = useState(null);
    const [lefttaskdisplay, setlefttaskdisplay] = useState(null);
    const [taskweek, setweekno] = useState(null);
    const [alltaskweek,setalltaskweek] = useState([]);
    const [tasktime,settasktime] = useState("");
    const [taskendtime, settaskendtime] = useState("");
    const [ac, setac] = useState([]);



    const onChangedate = (value,show) =>{

        onchange(value);
        setremaintime(12);
        toggleshow(show);
        setid(1);
        

        //setting the week
        let date = new Date (value.toString());
        let  week = new Date(date.getFullYear(),0,1);
        let noofdays = Math.floor((date - week)/(24 * 60 * 60 * 1000));
        setweekno(Math.ceil((date.getDay() + 1 + noofdays) / 7));

    }

 
    const updatetask = (e) => {
        settask (e.target.value);
    }

    const updatetime = (e) => {
        console.log(e.target.value)
        if(e.target.value.match("[0-9]"))
        {
            if(e.target.value < 13 && remaintime>=e.target.value)
            {
                settasktime(e.target.value);
            }
        }
        else
        {
            seterror("please write numeric value");
        }
        
    }

    const changetime = (e) => {
         setAllotedtime(e.target.value)
        let d = parseInt(tasktime.substring(0,2));
        let t = parseInt(Allotedtime);
        let endtime = d+ t;
        settaskendtime(endtime + ":"  + "00");
        console.log("ddd",d);
        console.log("sdfff",t,d+t)
        console.log(tasktime.substring(3,5)) 
    }

    
    const addtask = (e) => {
        e.preventDefault();

        
        if (taskname != null && Allotedtime != null && tasktime != null)
        {
            if(remaintime > 0)
            {
                if (taskid > 24)
                {
                    seterror(" task can be only 24 not more then that");
                }
                else
                {
                    if(remaintime > Allotedtime)
                    {

                        setid (taskid + 1);    
                        let c  = remaintime - Allotedtime; 
                        setremaintime(Math.abs(c));

                        const today = new Date();
                        console.log(today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
                        
                        setassigntask(previoustask => [...previoustask,{taskname:taskname, taskid:taskid, Allotedtime:Allotedtime, remaintime:c, taskweek:taskweek, tasktime:tasktime, taskendtime:taskendtime}]);
                        console.log(alltask);

                        
                        const  date = new Date (value.toString());
                        const month = "0"+ (Number(date.getMonth()) + 1).toString();
                        const day = date.getDate();
                        const year = date.getFullYear();

                        // console.log(year+"-"+month+"-"+day);
                        const taskdate = year+"-"+month+"-"+day;

                        fetch("http://127.0.0.1:8000/api/tododetails/",{
                            method: 'GET'
                        })  // from this all the data is coming 
                        .then((response) => response.json())
                        .then((data) => {
                             console.log(data)
                             console.log(data.length)
                            const senddata = {id:data.length,taskname,taskid,taskdate,taskweek,tasktime,taskendtime}; // id for the primary and the auto increment 
                             console.log(senddata)
                            const requestoption = {
                                method :'POST',
                            headers :{
                                    'Content-Type' : 'application/json; charset=UTF-8',
                                },
                                body : JSON.stringify(senddata)
                            };
                            
                            fetch('http://127.0.0.1:8000/api/tododetails/',requestoption)
                            .then(request => request.json())
                            .then(() =>{console.log()})
                        })

                    }
                    else
                    {
                        seterror("time limit has complete");
                    }
                        
                }
            }
            else
            {
            seterror("no hours left no task can be added");
            }
        }
        else
        {
            seterror("please fill all the blank");
        }  
    }

    const removetask = (itemtobedelete) => {
        console.log(itemtobedelete);

        const a = alltask.filter((item) =>{
            return (item !== itemtobedelete);
        });

        const array=[].concat.apply([],a);
        setassigntask(array);

    }


    const displayremain = (lefttaskdisplay) =>{
        console.log("left",lefttaskdisplay)
    }

    const updateremaintimes =(e) =>{
        settaskendtime(e.target.value)
     }
 

    const lefttask = (taskname,taskid,id) => {

        const nextday = new Date(value.toString());
        console.log(nextday)
        const a = nextday.setDate(nextday.getDate() + 1 );
        console.log(nextday)
    
        const  date = new Date (nextday.toString());
        const month = "0"+ (Number(date.getMonth()) + 1).toString();
        const day = date.getDate();
        const year = date.getFullYear();

        // console.log(year+"-"+month+"-"+day);
        const taskdate = year+"-"+month+"-"+day;
        
        console.log(taskid,id)
        console.log(taskdate,taskname)

        // fetch("http://127.0.0.1:8000/api/tododetails/")  // from this all the data is coming 
        // .then((response) => response.json())
        // .then((data) => {

            const senddata = {taskid,taskdate,taskname};

            const requestoption = {
                method :'PUT',
                headers :{
                    'Content-Type' : 'application/json; charset=UTF-8',
                },
                body : JSON.stringify(senddata)
            };
            
            fetch(`http://127.0.0.1:8000/api/tododetails/${taskid}`,requestoption)
            .then(request => request.json())
            .then(() =>{console.log()})

        // })


    }


    const weektask = (e) =>{
      
        const search = e.target.value;
        console.log(e.target.value);
  
            fetch("http://127.0.0.1:8000/api/tododetails/?search="+search,{
                method:'GET'
            })
            .then((response) => response.json())
            .then((data) => {
                 console.log(data)
                setalltaskweek(data);
            
              // console.log(alltaskweek)
          })
    }

    function getUser() {
        fetch("http://127.0.0.1:8000/api/tododetails/")
        .then((response) => response.json())
        .then((data) => {
          if (data.length !== ac.length) {
            setac(data)
          }
        })    
    }
   

    const deleteuserdetails = (id) =>{

            console.log(id);
            fetch(`http://127.0.0.1:8000/api/tododetails/${id}`,{
                method : 'DELETE'
            })
            .then(request => request.json())
            .then((data) =>{console.log(data) 
                setalltaskweek(getUser())
            })
       
    }




    
    return(


        <div className="displaytodoapplication">    
            <Calendar showWeekNumbers  value={value} onChange={onChangedate} minDate={new Date()} >  
            toggle: {show ? 'show' : 'hide'} </Calendar>

            {/* min date is for from the current date we can select not from the past date */}
            
             {show && <form method="POST"> 
                   
                 <h1>{value.toString().substring(0,10)}</h1> 
                 <input type="hidden" value={value.toString().substring(0,10)}/>
                 <input type="text"  onChange={updatetask}  placeholder="enter your task" value={taskname}  />  
                 <input type="text"  onChange={updatetime}   placeholder="Alloted time" value={tasktime} /> 
                 <input type="text"  onChange={changetime} pattern="[0-9]" placeholder="time" value={Allotedtime} /> 
                 <input type="submit"   id="btn" value="Add the task"  onClick={addtask}/> 
                 <span id ="displayerror">{error}</span>
                 <div>
                   {alltask.map((t) => (
                        <ul  key ={t.id}>
                            <span > Task  {t.id} {t.taskid}</span>   
                            <li>
                                <span>  {t.taskname}  </span>  
                                <span>  {t.Allotedtime} hrs</span>  
                                <span>  remining time left {t.remaintime} hrs  </span> 
                                <span> week task is  {t.taskweek} </span>
                                <span> task time {t.tasktime} </span>
                                
                                <a href="#"  onClick={() => {removetask(t)}}> Add</a>
                                <a href="#"  onClick= {() => {lefttask(t.taskname,t.taskid)}}> Remaining  Task</a> 

        

                                    {/* 
                                    // setlefttaskdisplay(!lefttaskdisplay);
                                    {t.taskid == lefttaskdisplay &&
                                                <form>
                                                <div>
                                                    <input type="text"  placeholder="remain time"  value={taskendtime} onChange={updateremaintimes}/>
                                                    <a href="#"  placeholder="remianing time"  onClick= {() => {lefttask(t.taskid)}}  > update</a>                       
                                                </div>
                                                </form>
                                    }
                                
                                 */}
                            </li>
                        </ul>
                   ))}



                      <a> get the number of task according the week</a>
                    
                    <input type="text" placeholder="write week" onChange={weektask}/>
                    <br></br>
                    
                    <span >
                      <table>
                         <thead>
                          <tr>
                              <th>ID</th>
                              <th>Task ID</th>
                              <th>Task Name</th>
                              <th>Task Date</th>
                              <th>Task Week</th>
                              <th>Task Time</th>
                              <th>Delete Task</th>
                          </tr>
                          </thead>
                      
                            {alltaskweek.map((d) =>(
                             <tbody>
                                 <tr>
                                  <td> {d.id} </td>
                                  <td> {d.taskid} </td>
                                  <td> {d.taskname} </td>
                                  <td> {d.taskdate} </td>
                                  <td> {d.taskweek} </td>   
                                  <td> {d.tasktime} </td>
                                  <td><a  href="#" onClick={() => {deleteuserdetails(d.id)}}>Delete</a></td>        
                                  </tr>
                              </tbody>
                             ))}
                         </table>
                    </span>

                   </div>
                 
                 
                 </form>
                 }

        </div>


    );
}

export default MyCalendar;



        // left task will be display here
        // const b = alltask.add(setlefttaskdisplay(lefttaskdisplay))

        // like this date  has come in which week how much task has been there 

