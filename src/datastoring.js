import React, { useEffect } from "react";

const Datastoring = ()  => {

useEffect (() => {

    const requestoption = {
        method :'POST',
        headers :{'Content-Type' : 'application/json'},
        body : JSON.stringify(data)
    };

    fetch('http://127.0.0.1:8000/api/tododetails/',requestoption)
    .then(response => response.json())
    .then((data) =>{settaskdetails(data)})


});

};
export default Datastoring;

