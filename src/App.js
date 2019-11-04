import React, {Component} from 'react';
import './App.css';
import Homepage from "./pages/homepage/Homepage.component";
import {Route, Switch} from "react-router-dom";
import Header from "./components/Header/Header.component";
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route path='/' component={Homepage}/>
            </Switch>
        </div>
    );
  }
}

export default App;
