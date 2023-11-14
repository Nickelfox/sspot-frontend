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
import "./BigScheduler/css/style.css";
import Calender from "./components/Scheuler2";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { defaultTheme } from "./themes/defaultTheme";

function App() {
  const currentTheme = createTheme(defaultTheme);

  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <DndProvider backend={HTML5Backend}>
          <Calender />
        </DndProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
