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
import { Box, Button, Typography } from "@mui/material";
import Popup from "../PopUp";
import AddResource from "../AddResource";
import PrimaryButton from "../PrimaryButton";
import AddEvent from "../AddEventForm";
import { convertArrayToMap } from "../../helpers/conversionFunctions/resourceMap";
import { convertEventsToMap } from "../../helpers/conversionFunctions/eventsMap";

let resources = [
  {
    id: "r2",
    name: "Staff_Tom",
    weeklyAvailability: 40,
    expanded: false,
    workDays: [],
    editPopup: false,
    projects: [
      {
        id: "r1",
        name: "Staff_Val",
        parentId: "r2",
        expanded: false,
        workDays: [],
        hoursAssigned: 4
      },
      {
        id: "r7",
        name: "Manager_C",
        expanded: false,
        workDays: [],
        editPopup: false,
        parentId: "r2",
        hoursAssigned: 6
      }
    ]
  },
  {
    id: "r4",
    name: "Manager_B",
    weeklyAvailability: 40,
    expanded: false,
    workDays: [],
    editPopup: false
  },

  {
    id: "r8",
    name: "Manager_D",
    weeklyAvailability: 40,
    expanded: false,
    workDays: [],
    editPopup: false,
    projectsAssigned: []
  },
  {
    id: "r9",
    name: "Manager_D",
    weeklyAvailability: 40,
    expanded: false,
    workDays: [],
    editPopup: false,
    projectsAssigned: []
  }
];
let events = [
  {
    id: 1,
    start: "2023-11-24 09:30:00",
    end: "2023-11-29 23:30:00",
    resourceId: "r1",
    title: "A1",
    bgColor: "#488FAB",
    type: "parent"
  },
  {
    id: 3,
    start: "2023-11-24 12:30:00",
    end: "2023-11-29 23:30:00",
    resourceId: "r7",
    title: "Fixed",
    movable: true,
    bgColor: "#d7d5a2"
  },
  {
    id: 4,
    start: "2023-11-24 14:30:00",
    end: "2023-11-24 23:30:00",
    resourceId: "r4",
    title: "Try",
    startResizable: true,
    bgColor: "#9C48AB",
    rrule: "FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,TH" //this is going to be used for availability
  },
  {
    id: 5,
    start: "2023-11-24 00:00:00",
    end: "2023-11-30 23:59:00",
    resourceId: "r2",
    title: "R2",
    // rrule: "FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR", //this is going to be used for availability
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
  const [resoureMap, setResourceMap] = useState(new Map());
  const [eventsMap, setEventsMap] = useState(new Map());
  const [selectedObject, setSelectedObject] = useState(null);
  useEffect(() => {
    getSchedulerData();
  }, []);
  useEffect(() => {
    triggerRerender(render + 1);
  }, [triger]);

  useEffect(() => {
    setEventsMap(convertEventsToMap(events));
  }, []);
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
    let titleText = schedulerData.behaviors.getEventTextFunc(
      schedulerData,
      event
    );
    const resourceObjectForEvent = resoureMap.get(event?.resourceId);
    const eventsObject = eventsMap.get(event?.resourceId);
    const resourceChildArray = resources?.map((item) => item?.projects);
    const resourceFlatArray = resourceChildArray.flat();
    const filteredArray = resourceFlatArray.filter(
      (item) => item !== undefined
    );
    const resourceChildObject = filteredArray.filter(
      (item) => item?.parentId === event?.resourceId
    );
    const requiredData = resourceChildObject.map((child) => {
      const parentObj = eventsMap.get(child?.id);
      const date1 = dayjs(parentObj?.end);
      const date2 = dayjs(parentObj?.start);
      return {
        diff: child?.hoursAssigned * date1.diff(date2, "d")
      };
    });

    const weeklyAvailability =
      requiredData?.length > 0 &&
      requiredData.map((childResource) => childResource?.diff);
    // create a variable for the sum and initialize it
    let sum = 0;
    // iterate over each item in the array
    for (let i = 0; i < weeklyAvailability.length; i++) {
      sum += weeklyAvailability[i];
    }
    let bColor;
    if (sum > resourceObjectForEvent?.weeklyAvailability) {
      bColor = "rgba(255, 0, 0, 0.5)";
    } else {
      bColor = "rgba(131, 192, 120, 0.5)";
    }
    const sumPercent = (sum / resourceObjectForEvent?.weeklyAvailability) * 100;
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
    const hex = event?.bgColor;
    let opacity = "0.7";
    // Convert each hex character pair into an integer
    let red = parseInt(hex?.substring(1, 3), 16);
    let green = parseInt(hex?.substring(3, 5), 16);
    let blue = parseInt(hex?.substring(5, 7), 16);
    let rgba = ` rgba(${red}, ${green}, ${blue}, ${opacity})`;
    let divStyle = {
      //   borderLeft: borderWidth + "px solid " + borderColor,
      // backgroundColor: event?.bgColor,
      background:
        resourceObjectForEvent?.parentId === undefined ? bColor : rgba,
      minHeight: "4rem",
      height: "4rem",
      borderRadius: 4
    };
    if (!!agendaMaxEventWidth)
      divStyle = {
        ...divStyle,
        maxWidth: agendaMaxEventWidth
      };
    return (
      <div key={event.id} className={mustAddCssClass} style={divStyle}>
        <span
          style={{
            lineHeight: `${mustBeHeight}px`
          }}
        >
          <Typography
            variant="p4"
            color="#fff"
            fontWeight={600}
            paddingLeft={"1rem"}
          >
            {resourceObjectForEvent?.parentId
              ? `${resourceObjectForEvent?.hoursAssigned} h/day`
              : isNaN(sumPercent)
              ? "0%"
              : `${sumPercent.toFixed(0)} %`}
          </Typography>
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
        checkConflict: true,
        // tableHeaderHeight: 60,
        // dayCellWidth: 100,
        parentView: parentViewArray,
        views: [
          {
            viewName: "Resource View",
            viewType: ViewType.Month,
            showAgenda: false,
            isEventPerspective: true,
            checkConflict: true
          }
        ]
      }
    );
    const filteredArray = resources.map((item) => item?.projects);
    const projectsArray = filteredArray.filter((item) => item !== undefined);
    const newArray = [...resources, ...projectsArray];
    const requiredArray = newArray.flat();
    sd.setResources(requiredArray);
    setResourceMap(convertArrayToMap(requiredArray));

    sd.setEvents(events);
    setSchedulerData(sd);
  };
  const prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(DemoData.events);
    triggerRerender(rerender + 1);
  };
  const closePopUp = (schedulerData) => {
    getRenderSd(schedulerData);
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
  const showResourceEditPopup = (schedulerData, itemToEdit) => {
    const { renderData } = schedulerData;
    const requiredArray = renderData.map((item) => {
      return {
        id: item?.slotId,
        name: item?.slotName,
        weeklyAvailability: 40,
        expanded: item?.expanded,
        parentId: item?.parentId,
        workDays: item?.workDays,
        editPopup:
          item?.slotId === itemToEdit?.slotId ? !item?.editPopup : false
      };
    });
    // getRenderSd(schedulerData)
    schedulerData.setResources(requiredArray);
    triggerRerender(rerender + 1);
  };
  const onSelectDate = (schedulerData, date) => {
    getRenderSd(schedulerData);
    schedulerData.setDate(date);
    schedulerData.setEvents([]);
    triggerRerender(rerender + 1);
  };
  const onThisWeekCick = (schedulerData) => {
    const date = new Date();
    getRenderSd(schedulerData);
    schedulerData.setDate(date);
    schedulerData.setEvents(events);
    triggerRerender(rerender + 1);
  };

  const eventClicked = (schedulerData, event) => {};

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
    const childObject = resoureMap.get(slotId);
    const requiredObject = resoureMap.get(childObject?.parentId);
    console.log(requiredObject, "Required");
    setSelectedObject(requiredObject);
    setId(slotName);
    if (slotName) {
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
        getRenderSd(schedulerData);
        schedulerData.addEvent(newEvent);
        triggerRerender(rerender + 1);
      }
    } else {
      alert("Event in progress");
    }
  };
  const newEventfromResource = (schedulerData, slotId, start, end) => {
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
    getRenderSd(schedulerData);
    schedulerData.updateEventStart(event, newStart);
    // triggerRerender(render + 1);
  };

  const updateEventEnd = (schedulerData, event, newEnd) => {
    getRenderSd(schedulerData);
    schedulerData.updateEventEnd(event, newEnd);
    // triggerRerender(render + 1);
  };
  const moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    if (slotId === event?.resourceId) {
      getRenderSd(schedulerData);
      schedulerData.moveEvent(event, slotId, slotName, start, end);
      triggerRerender(render + 1);
      setRetrigger((prev) => !prev);
    } else return;
  };
  const getTimeMaps = (eventsArr, id) => {
    const timeMap = new Map();
    const requiredArray = eventsArr.filter((event) => event?.resourceId === id);
    requiredArray.forEach((item) => {
      if (!timeMap.has(item?.start)) timeMap.set(item?.start, item);
    });
    return timeMap;
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
        workDays: i.workDays,
        editPopup: false
      };
    });
    schedulerData.setResources(replaceArr);
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
            showResourceEditPopup={showResourceEditPopup}
            closePopUp={closePopUp}
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
        <PrimaryButton
          style={{ width: "fit-content", padding: "2rem", fontSize: "2rem" }}
          onClick={handleAddEventPopUp.bind(null, "addEvent")}
        >
          Create Event
        </PrimaryButton>
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
