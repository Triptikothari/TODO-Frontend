import React from "react";
import { useState } from "react";
import { useEffect } from "react"
import Calendar from "react-calendar";


function Datafetching() {

  const [ac, setac] = useState([]);

  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/tododetails/",{
      method : 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.length !== ac.length) {
          setac(data)
        }
      })

  });

  const deleteuserdetails = (id) =>{

    console.log(id);
    fetch(`http://127.0.0.1:8000/api/tododetails/${id}`,{
        method : 'DELETE'
    })
    .then(request => request.json())
    .then((data) =>{
      console.log(data) 
          
    })

}

  return (

    <div className="displaytodoapplication">
      <table className="displaytodoapplication">
        <thead>
          <tr>
            <th>ID</th>
            <th>Task ID</th>
            <th>Task Name</th>
            <th>Task Date</th>
            <th>Task Week</th>
            <th>Task Time</th>
            <th>Delete</th>
          </tr>
        </thead>
    
        {
          ac.map((fetchdata) => {
            return (   
              <tbody key={fetchdata.id}>
                <tr>
                  <td> {fetchdata.id} </td>
                  <td> {fetchdata.taskid} </td>
                  <td> {fetchdata.taskname} </td>
                  <td> {fetchdata.taskdate} </td>
                  <td> {fetchdata.taskweek} </td>   
                  <td> {fetchdata.tasktime} </td>  
                  <td><a href="#"  onClick={() => {deleteuserdetails(fetchdata.id)}} >delete task</a></td>
                </tr>
              </tbody>
            )
          })
        }
      </table>
    </div>
  );
}

export default Datafetching;


// ,{
//     method: 'POST', 
//     body: JSON.stringify({
//        taskid: "3",
//        taskname: "palavi",
//        taskdate: "2022-01-11"
//     })
// }
