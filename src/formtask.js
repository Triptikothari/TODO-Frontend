import React from "react";

const displaytask = ({taskid,taskname,Alottedtime,remaintime,tasktime,taskendtime}) =>{

    return(
        <div>
            <h3>{taskid}</h3>
            <h3>{taskname}</h3>
            <h3>{Alottedtime}</h3>
            <h3>{remaintime}</h3>
            <h3>{taskweek}</h3>
            <h3>{tasktime}</h3>
            <h3>{taskendtime}</h3>
        </div>
    );
}
export default displaytask