import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Scheduler, {
  SchedulerData,
  ViewType,
  AddMorePopover,
  DemoData,
  DATE_FORMAT
} from "./BigScheduler";
import dayjs from "dayjs";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./BigScheduler/css/style.css"
function App() {
  const [schedulerData, setSchedulerData] = useState(null);
  useEffect(() => {
    getSchedulerData();
  }, []);
  const getSchedulerData = () => {
    const sd = new SchedulerData(
      new dayjs(new Date()).format(DATE_FORMAT),
      ViewType.Month,
      false,
      false,
      {
        displayWeekend: true,
        eventItemPopoverEnabled: false,
        schedulerMaxHeight: 380,
        // tableHeaderHeight: 60,
        // dayCellWidth: 100,
        views: [
          {
            viewName: "Team View",
            viewType: ViewType.Month,
            showAgenda: false,
            isEventPerspective: false
          }
        ]
      }
    );
    sd.setResources(DemoData.resources);
    sd.setEvents(DemoData.events);
    setSchedulerData(sd);
  };
  return (
    <>
      {schedulerData && (
        <DndProvider backend={HTML5Backend}>
          <Scheduler schedulerData={schedulerData} />
        </DndProvider>
      )}
    </>
  );
}

export default App;
