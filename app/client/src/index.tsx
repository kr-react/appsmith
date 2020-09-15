import React from "react";
import "./wdyr";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import { ThemeProvider } from "constants/DefaultTheme";
import { appInitializer } from "utils/AppsmithUtils";
import { Slide, ToastContainer } from "react-toastify";
import store from "./store";
import { LayersContext, Layers } from "constants/Layers";
import AppRouter from "./AppRouter";
import * as Sentry from "@sentry/react";
import { getThemeDetails } from "selectors/themeSelectors";
import { connect } from "react-redux";
import { AppState } from "reducers";

appInitializer();

const App = () => {
  return (
    <Sentry.ErrorBoundary fallback={"An error has occured"}>
      <Provider store={store}>
        <LayersContext.Provider value={Layers}>
          <ThemedAppWithProps />
        </LayersContext.Provider>
      </Provider>
    </Sentry.ErrorBoundary>
  );
};

class ThemedApp extends React.Component<{
  currentTheme: any;
}> {
  render() {
    if (
      window.location.pathname === "/applications" ||
      window.location.pathname.indexOf("/settings/") !== -1
    ) {
      document.body.style.backgroundColor = this.props.currentTheme.colors.homepageBackground;
    } else {
      document.body.style.backgroundColor = "#efefef";
    }
    return (
      <ThemeProvider theme={this.props.currentTheme}>
        <ToastContainer
          hideProgressBar
          draggable={false}
          transition={Slide}
          autoClose={5000}
          closeButton={false}
        />
        <AppRouter />
      </ThemeProvider>
    );
  }
}
const mapStateToProps = (state: AppState) => ({
  currentTheme: getThemeDetails(state).theme,
});

const ThemedAppWithProps = connect(mapStateToProps)(ThemedApp);

ReactDOM.render(<App />, document.getElementById("root"));
