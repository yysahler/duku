import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import "./App.css";
import Settings from "./components/Settings/Settings";
import Board from "./components/Board/Board";
import NumperPad from "./components/NumberPad/NumberPad";

const App: React.FC = () => {
    return (
        <>
            <Provider store={store}>
                <div className="app">
                    <Settings />
                    <Board />
                    <NumperPad />
                </div>
            </Provider>
        </>
    );
};



export default App;
