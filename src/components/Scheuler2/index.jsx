import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Scheduler, {
  EventItem,
  Resource,
  SchedulerData,
  SchedulerDataBehaviors,
  SchedulerDataConfig,
  View,
  DemoData,
  ViewType,
  DATE_FORMAT
} from "../../BigScheduler";
// import "react-big-scheduler-stch/lib/css/style.css";
// import withDndContext from "../Scheduler/withDndContext";
import { render } from "@testing-library/react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Box, Button } from "@mui/material";
import Popup from "../PopUp";
import AddResource from "../AddResource";
import PrimaryButton from "../PrimaryButton";
import AddEvent from "../AddEventForm";

let resources = [
  {
    id: "r1",
    name: "Staff_Val",
    weeklyAvailability: 40,
    parentId: "r2",
    expanded: false,
    workDays: [1, 3, 4]
  },
  {
    id: "r2",
    name: "Staff_Tom",
    weeklyAvailability: 40,
    expanded: false,
    workDays: [1, 3, 4]
  },
  // {
  //   id: "r5",
  //   name: "Staff_Ben",
  //   weeklyAvailability: 40
  // },
  // {
  //   id: "r6",
  //   name: "Staff_Lee",
  //   weeklyAvailability: 40
  // },
  // {
  //   id: "r3",
  //   name: "Manager_A",
  //   weeklyAvailability: 40
  // },
  {
    id: "r4",
    name: "Manager_B",
    weeklyAvailability: 40,
    expanded: false,
    workDays: [5, 3]
  },
  {
    id: "r7",
    name: "Manager_C",
    weeklyAvailability: 40,
    expanded: false,
    workDays: [2, 4]
  },
  {
    id: "r8",
    name: "Manager_D",
    weeklyAvailability: 40,
    expanded: false,
    workDays: [1, 3]
  },
  {
    id: "r9",
    name: "Manager_D",
    weeklyAvailability: 40,
    expanded: false,
    workDays: []
  }
];
let events = [
  {
    id: 1,
    start: "2023-11-18 09:30:00",
    end: "2023-11-19 23:30:00",
    resourceId: "r1",
    title: "A1",
    bgColor: "#488FAB",
    type: "parent"
  },
  {
    id: 3,
    start: "2023-11-19 12:30:00",
    end: "2023-11-20 23:30:00",
    resourceId: "r3",
    title: "Fixed",
    movable: true
  },
  {
    id: 4,
    start: "2023-11-24 14:30:00",
    end: "2023-11-26 23:30:00",
    resourceId: "r1",
    title: "Try",
    startResizable: true,
    bgColor: "#9C48AB"
    // rrule: "FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR", //this is going to be used for availability
  },
  {
    id: 5,
    start: "2023-11-19 15:30:00",
    end: "2023-11-20 23:30:00",
    resourceId: "r2",
    title: "R2",
    rrule: "FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR", //this is going to be used for availability
    bgColor: "#DCC36B"
  }
];
const parentViewArray = [
  { name: "Projects", value: 0 },
  { name: "Team", value: 1 }
];
const Calender = (props) => {
  const [rerender, triggerRerender] = useState(1);
  const [schedulerData, setSchedulerData] = useState(null);
  const [triger, setRetrigger] = useState(false);
  const [popupChild, setPopupChild] = useState("");
  const [openPopUp, setOpenPopup] = useState(false);
  const [view, setView] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    getSchedulerData();
  }, []);
  useEffect(() => {
    triggerRerender(render + 1);
  }, [triger]);
  const eventItemTemplateResolver = (
    schedulerData,
    event,
    bgColor,
    isStart,
    isEnd,
    mustAddCssClass,
    mustBeHeight,
    agendaMaxEventWidth
  ) => {
    // const isWeekend = getWeekends(event?.start, event?.end);
    let borderWidth = isStart ? "4" : "0";
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    // let borderColor = "rgba(0,139,236,1)",
    //   backgroundColor = "#80C5F6";
    let titleText = schedulerData.behaviors.getEventTextFunc(
      schedulerData,
      event
    );
    // if (!!event.type) {
    //   borderColor =
    //     event.type == 1
    //       ? "rgba(0,139,236,1)"
    //       : event.type == 3
    //       ? "rgba(245,60,43,1)"
    //       : "#999";
    //   backgroundColor =
    //     event.type == 1 ? "#80C5F6" : event.type == 3 ? "#FA9E95" : "#D9D9D9";
    // }
    let divStyle = {
      //   borderLeft: borderWidth + "px solid " + borderColor,
      backgroundColor: event?.bgColor
    };
    if (!!agendaMaxEventWidth)
      divStyle = { ...divStyle, maxWidth: agendaMaxEventWidth };

    return (
      <div key={event.id} className={mustAddCssClass} style={divStyle}>
        <span style={{ marginLeft: "4px", lineHeight: `${mustBeHeight}px` }}>
          {titleText}
        </span>
      </div>
    );
  };

  const getSchedulerData = () => {
    const sd = new SchedulerData(
      new dayjs(new Date()).format(DATE_FORMAT),
      ViewType.Month,
      false,
      false,
      {
        displayWeekend: true,
        eventItemPopoverEnabled: false,
        schedulerMaxHeight: 700,
        tableHeaderHeight: 60,
        availability: ["Day", "Week"],
        // tableHeaderHeight: 60,
        // dayCellWidth: 100,
        parentView: parentViewArray,
        views: [
          {
            viewName: "Resource View",
            viewType: ViewType.Month,
            showAgenda: false,
            isEventPerspective: true
          }
        ]
      }
    );
    // if(!id){
    //   console.log("Please provide id")
    // }
    sd.setResources(resources);
    sd.setEvents(events);
    setSchedulerData(sd);
  };
  const prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(DemoData.events);
    triggerRerender(rerender + 1);
  };

  const nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(DemoData.events);
    triggerRerender(rerender + 1);
  };

  const onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    schedulerData.next();
    schedulerData.setEvents(DemoData.events);
    triggerRerender(rerender + 1);
    setRetrigger((prev) => !prev);

    schedulerContent.scrollLeft = maxScrollLeft - 10;
  };
  const onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(events);
    triggerRerender(rerender + 1);
  };
  const onParentViewChange = () => {
    schedulerData.setParentViewType("Team");
  };

  const onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents([]);
    triggerRerender(rerender + 1);
  };
  const onThisWeekCick = (schedulerData) => {
    const date = new Date();
    schedulerData.setDate(date);
    schedulerData.setEvents(events);
    triggerRerender(rerender + 1);
  };

  const eventClicked = (schedulerData, event) => {
    // console.log(event);
  };

  const toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    triggerRerender(rerender + 1);
  };
  const expandAllItems = (schedulerData) => {
    const { resources } = schedulerData;
    const newResources = resources.map((resource) => {
      return {
        ...resource,
        expanded: !resource?.expanded
      };
    });
    schedulerData.setResources(newResources);
    triggerRerender(rerender + 1);
  };

  const newEvent = (
    schedulerData,
    slotId,
    slotName,
    start,
    end,
    type,
    item
  ) => {
    setId(slotName);
    const replaceArr = getRenderSd(schedulerData);
    // if (slotName) {
    if (
      window.confirm(
        `Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`
      )
    ) {
      let newFreshId = 0;
      schedulerData.events.forEach((item) => {
        if (item.id >= newFreshId) newFreshId = item.id + 1;
      });
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      let newEvent = {
        id: newFreshId,
        title: "New Event",
        start: start,
        end: end,
        resourceId: slotId,
        bgColor: `#${randomColor}`
      };
      schedulerData.setResources(replaceArr);
      schedulerData.addEvent(newEvent);
      triggerRerender(rerender + 1);
    }
    // }
  };
  const newEventfromResource = (schedulerData, slotId, start, end) => {
    // console.log("fired", end);
    let newFreshId = 0;
    schedulerData.events.forEach((item) => {
      if (item.id >= newFreshId) newFreshId = item.id + 1;
    });
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    let newEvent = {
      id: newFreshId,
      title: "New Event",
      start: start,
      end: end,
      resourceId: slotId,
      bgColor: `#${randomColor}`
    };
    schedulerData.addEvent(newEvent);
    triggerRerender(rerender + 1);
  };
  const onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    schedulerData.prev();
    schedulerData.setEvents(schedulerData.events);
    triggerRerender(render + 1);
    setRetrigger((prev) => !prev);

    schedulerContent.scrollLeft = 10;
  };
  const updateEventStart = (schedulerData, event, newStart) => {
    const replaceArr = getRenderSd(schedulerData);
    schedulerData?.setResources(replaceArr);
    schedulerData.updateEventStart(event, newStart);
    triggerRerender(render + 1);
  };

  const updateEventEnd = (schedulerData, event, newEnd) => {
    const replaceArr = getRenderSd(schedulerData);
    schedulerData?.setResources(replaceArr);
    schedulerData.updateEventEnd(event, newEnd);
    triggerRerender(render + 1);
  };
  const moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    const requiredSchedulerData = getRenderSd(schedulerData);
    schedulerData.setResources(requiredSchedulerData);
    schedulerData.moveEvent(event, slotId, slotName, start, end);
    triggerRerender(render + 1);
    setRetrigger((prev) => !prev);
  };
  const handleAddEventPopUp = (key) => {
    setPopupChild(key);
    setOpenPopup(true);
  };

  const handlePopUpClose = () => {
    setOpenPopup(false);
    setPopupChild("");
  };
  const addResorceInScheduler = (values) => {
    const startDate = new Date();
    const convertedStartDate = dayjs(startDate).format("YYYY-MM-DD hh:mm:ss");
    const endDate = dayjs().day(5).endOf("day").format("YYYY-MM-DD hh:mm:ss");
    schedulerData.addResource(values);
    triggerRerender(rerender + 1);
    handlePopUpClose();
    newEventfromResource(
      schedulerData,
      values?.id,
      convertedStartDate,
      endDate
    );
  };
  const getRenderSd = (schedulerData) => {
    /**@MehranSiddiqui
     * @function
     * This Function is responsible for not rerendering scheduler Data and collapsing all Divs
     */
    const { renderData } = schedulerData;
    let displayRenderData = renderData.filter((o) => o.render);
    const replaceArr = displayRenderData.map((i) => {
      return {
        id: i.slotId,
        name: i.slotName,
        weeklyAvailability: 40,
        expanded: i.expanded,
        parentId: i.parentId,
        workDays: i.workDays
      };
    });
    return replaceArr;
  };
  const popUpChildren = {
    addEvent: <AddEvent handleClose={handlePopUpClose} resources={resources} />,
    addResource: (
      <AddResource
        handleClose={handlePopUpClose}
        addResorceInScheduler={addResorceInScheduler}
        resourceLength={schedulerData?.resources?.length}
      />
    )
  };
  return (
    <div
      style={{
        maxHeight: "100vh",
        maxWidth: "100vw",
        overflowX: "hidden",
        overflowY: "auto"
      }}
    >
      {/* {console.log(schedulerData)} */}
      <Box
        style={{
          minHeight: "7rem",
          minWidth: "100vw",
          backgroundColor: "#666666"
        }}
      ></Box>
      <DndProvider backend={HTML5Backend}>
        {schedulerData && (
          <Scheduler
            //   parentRef={props.parentRef}
            prevClick={prevClick}
            nextClick={nextClick}
            onSelectDate={onSelectDate}
            onThisWeekClick={onThisWeekCick}
            onViewChange={onViewChange}
            toggleExpandFunc={toggleExpandFunc}
            eventItemClick={eventClicked}
            schedulerData={schedulerData}
            newEvent={newEvent}
            moveEvent={moveEvent}
            eventItemTemplateResolver={eventItemTemplateResolver}
            // onScrollRight={onScrollRight}
            // onScrollLeft={onScrollLeft}
            updateEventStart={updateEventStart}
            updateEventEnd={updateEventEnd}
            expandAllItems={expandAllItems}
            // {...props}
          />
        )}{" "}
      </DndProvider>
      <Box className="flex flex-col py-12">
        <PrimaryButton
          style={{
            width: "fit-content",
            padding: "2rem",
            fontSize: "2rem",
            marginBottom: "1rem"
          }}
          onClick={handleAddEventPopUp.bind(null, "addResource")}
        >
          Add Person
        </PrimaryButton>
        {/* <PrimaryButton
          style={{ width: "fit-content", padding: "2rem", fontSize: "2rem" }}
          onClick={handleAddEventPopUp.bind(null, "addEvent")}
        >
          Create Event
        </PrimaryButton> */}
      </Box>

      <Popup
        open={openPopUp}
        handleClose={handlePopUpClose}
        styles={{
          width: "70vw",
          maxHeight: "90vh",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        {popUpChildren[popupChild]}
      </Popup>
    </div>
  );
};

export default Calender;
