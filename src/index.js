import React from "react";
import ReactDOM from 'react-dom';
import SeasonDisplay from "./SeasonDisplay";
import './SeasonDisplay.css';
import Spinner from './spinner';

class App extends React.Component {
    state = { lat: null, eMessage: '' };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ eMessage: err.message })
        );
    }

    renderMethod() {
        if (this.state.eMessage && !this.state.lat) {
            return <div>Error: {this.state.eMessage}</div>
        }
        if (!this.state.eMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        }

        return <Spinner message='We try to get your current location, please, accept'/>
    }

    render() {
        return (
            <div>
                {this.renderMethod()}
            </div>
            )
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);