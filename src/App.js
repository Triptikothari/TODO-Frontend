import logo from './logo.svg';
import './App.css';
import MyCalendar from './calendar';
import { CalendarProvider } from './calendarcontext';
import Events from './big calendar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Component } from 'react';


class App extends Component{

render(){
  return (
    
    <Router>

    <div>
      <CalendarProvider>

       <div className="App">
        <ul>
          <li>
            <Link to="/">Calendar</Link>
          </li>
          <li>
            <Link to="/adddata">Add Details</Link>
          </li>
        </ul>
     </div>

      <Routes>
             <Route exact path='/' element={< Events />}></Route>
              <Route exact path='/adddata' element={< MyCalendar />}></Route>
      </Routes>

      {/* <Events/>
      <MyCalendar/>
         */}

        </CalendarProvider>
      </div> 

    </Router>
    
  );

}
  
}

export default App;
