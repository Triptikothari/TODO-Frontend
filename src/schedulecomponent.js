import React from "react";
import Scheduler , {SchedulerData , ViewTypes , DATE_FORMAT}  from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import moment from "moment";

moment.locale('zh-cn');
SchedulerData.setLocaleMoment(moment);

let resource = [
    {
        id:"r1",
        name:"klsmx",
    },
    {
        id:"r2",
        name:"asbdjh",
    }     
];

SchedulerData.setResources(resource);

let events = [
    {
     id: 1,
     start:'2017-12-18 09:30:00',
     end:'2017-12-19 23:30:00',
     resourceid: 'r1',
     title:'task1'
    },
    {
        id: 2,
        start: '2017-12-18 12:30:00',
        end: '2017-12-26 23:30:00',
        resourceId: 'r2',
        title: 'I am not resizable',
    }
];
SchedulerData.setEvents(events);

const {SchedulerData} = this.props;

<Scheduler 
schedulerData={ScheduleData}
prevClick ={this.prevClick}
nextClick={this.nextClick}
onSelectDate={this.onSelectDate}
onViewChange={this.onViewChange}
eventItemClick={this.eventItemClick}>

</Scheduler>


