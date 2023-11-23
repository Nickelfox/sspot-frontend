import "./App.css";
import "./BigScheduler/css/style.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { defaultTheme } from "./themes/defaultTheme";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import AppRouter from "./routes/index";
function App() {
  const currentTheme = createTheme(defaultTheme);

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={currentTheme}>
          <AppRouter />
          {/* <DndProvider backend={HTML5Backend}>
            <LoginForm />
            <Calender />
          </DndProvider> */}
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
