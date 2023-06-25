import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useRef} from 'react';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import  enUS  from "date-fns/locale/en-US";
import Datafetching from "./datafetching";
import {Overlay} from "react-bootstrap";

const locales = {
    "en-US": enUS,
}

const localizer = dateFnsLocalizer({

    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})




const Events = () => {
    
  const [show, setShow] = useState(null);
  const [visible,setvisible]=useState(false);
  const target = useRef(null);
  const [display,setdisplay] = useState(false);
  const [taskname,setName] = useState([]);
  const [taskdate,setDate] = useState("");
  const [tasktime,setTime] = useState("");
  const [taskweek, setweekno] = useState(null);
  const [taskendtime,setendtaskTime] = useState("");
  const [ac, setac] = useState([]);
  let e= [];
  let a = "";
  let b = "";

    fetch("http://127.0.0.1:8000/api/tododetails/",{
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.length !== ac.length) {
          setac(data)
        }
      })
  

  ac.map((t) => (
       console.log(t),
       a = t.taskdate+" "+t.tasktime,
       b = t.taskdate+" "+t.taskendtime,
      //  console.log(a),
      e.push({
        title:t.taskname,
        allday: true,
        start:new Date(a),
        end: new Date(b)
      })

   ))

   const Updatename =(e) =>{
     setName(e.target.value);
   }
   const Updatedate =(e) =>{
    setDate(e.target.value);
    let date = new Date (taskdate.toString());
    let  week = new Date(date.getFullYear(),0,1);
    let noofdays = Math.floor((date - week)/(24 * 60 * 60 * 1000));
    setweekno(Math.ceil((date.getDay() + 1 + noofdays) / 7));

  }
  const Updatetime =(e) =>{
      setTime(e.target.value);
  }


   const Updatevalue = (id) =>{

    // console.log(id)
    // console.log(taskname)
     console.log(taskdate)
    let date = new Date (taskdate.toString());
    let  week = new Date(date.getFullYear(),0,1);
    let noofdays = Math.floor((date - week)/(24 * 60 * 60 * 1000));
    setweekno(Math.ceil((date.getDay() + 1 + noofdays) / 7));
    console.log(taskweek)


    const senddata = {taskname,taskdate,tasktime,taskweek}; 
    const requestoption = {
        method :'PUT',
        headers :{
            'Content-Type' : 'application/json; charset=UTF-8',
        },
        body : JSON.stringify(senddata)
    };
    
    fetch(`http://127.0.0.1:8000/api/tododetails/${id}`,requestoption)
    .then(request => request.json())
    .then((data) =>{console.log(data) })
   }

      return(
          <div>
                
                <Calendar 
                localizer={localizer} 
                events={e} 
                startAccessor="start" 
                endAccessor="end"
                style={{height: 500, margin: "50px"}}
                onSelectEvent={(e) => {
                  setShow(e.title);
                  setvisible(!visible);
                }} ref={target} />
               

                    <Overlay target={target.current} show={visible} placement="right">
                      
                          <span>
                            {e.map((a) => (
                                      show==a.title && 
                                      <span id="overlay-example">{a.title}<br></br> <button id="btn" onClick={() => { setdisplay(!display) }}>Edit</button> 
                                      {display && 
                                      <form>
                                        {ac.map((data) => ( 
                                         a.title == data.taskname && 
                                          <table>
                                          <tr>
                                          <input type="text" value={data.id} />
                                          </tr>
                                          <tr>
                                          <input type="text" value={taskname} onChange={Updatename}/> <small>taskname</small>
                                          </tr> 
                                          <tr>
                                          <input type="date" value={taskdate} onChange={Updatedate}/><small>taskdate</small>
                                          </tr>
                                          <tr>
                                          <input type="text" value={tasktime} onChange={Updatetime}/><small>tasktime pattern hh:mm:ss</small>
                                          </tr>
                                          <tr>
                                          <a onClick={() => {Updatevalue(data.id)}}>update the value</a>
                                          </tr>
                                          </table>

                                        
                                        ))}
                                      </form>
                                      }
                                      </span>   
                                                  
                            ))}
                          </span>     
                      
                    </Overlay>

                <Datafetching/>

                
         
          </div>

          
      )
}

export default Events;














// let taskname = [];
//   function getUser() {
//     fetch("http://127.0.0.1:8000/api/tododetails/")
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.length !== ac.length) {
//         setac(data)
//       }
//     })    
// }


{/* <span>
{
  setName(data.taskname),
  console.log(taskname)
}
</span> */}

    // const date = new Date (taskdate.toString());
    // const month = "0"+ (Number(date.getMonth()) + 1).toString();
    // const day = date.getDate();
    // const year = date.getFullYear();

    // // console.log(year+"-"+month+"-"+day);
    // const taskdate = year+"-"+month+"-"+day;
    // console.log(taskdate)

// <span>
//   {abc(a.title == e.title ) }
//   {console.log(a.title)}
//   {console.log(e.title)}
// </span>,

// const a =  [

//   {
//     title: "hgfg",
//     allday: true,
//     start: new Date(2022,2,2),
//     end: new Date(2022,2,2)
//   },
//   {
//     title: "hjggjh",
//     allday: true,
//     start: new Date(2022,2,2),
//     end: new Date(2022,2,2)
//   },
//   {
//     title: "hjggjh",
//     allday: true,
//     start: new Date(2022,2,2),
//     end: new Date(2022,2,2)
//   },
// ]

// const abc =() => {
//   return(
//       <div>
//         {/* <p>{console.log(title)}</p> */}
//         {/* <Modal show={true}>
//           <Modal.Header> model head part </Modal.Header>
//           <Modal.Body>hi react model</Modal.Body>
//         </Modal> */}

//         <Overlay target={target.current} show={show} placement="right">
//                       {(props) => (
//                         <Tooltip id="overlay-example" {...props}>
//                           My Tooltip
//                         </Tooltip>
//                       )}
//                     </Overlay>
//       </div>

//   );
// }

{/* 
                onSelectEvent={(event) => {abc(e.filter((t)=>(t.title) == event.title));setShow(!show)}} ref={target}/>

                <Button  onClick={() => setShow(!show)}>
                        Click me!
                 </Button>
                      */}

{/*                  
                <Overlay show={true}>
                  <div>jgy</div>
                </Overlay> */}

// {show && 
//   <Overlay target={target.current} show={show} >
//      {({ arrowProps, show: _show, popper, ...props }) => (
//        <div
//          {...props}
//          style={{
//            backgroundColor: 'rgba(255, 100, 100, 0.85)',
//            padding: '2px 10px',
//            color: 'white',
//            borderRadius: 3,
//            ...props.style,
//          }}
//        >
//    hbhj
//        </div>
//      )}
//    </Overlay>
// }