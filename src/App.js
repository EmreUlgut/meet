import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import EventGenre from './EventGenre';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { OfflineAlert } from './Alert';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: '24',
    currentLocation: "all",
    infoText: ''
  }

  updateEvents = (location, eventCount) => {
    if (!navigator.onLine) {
      this.setState({
        infoText: "You are OFFLINE. But you can use the app, without events update"
      });
    } else {
      this.setState({
        infoText: ""
      })
    }
    const { currentLocation, numberOfEvents } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        const filteredEvents = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: filteredEvents,
          currentLocation: location,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          currentLocation === "all"
            ? events
            : events.filter((event) => event.location === currentLocation);
        const filteredEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: filteredEvents,
          numberOfEvents: eventCount,
        });
      });
    }
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events,
          locations: extractLocations(events),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(' ').shift()
      return { city, number };
    })
    return data;
  };

  render() {
    return (
      <div className="App">
        <div id="header-container">
          <h1 id="header"><span id="devel">WebDev</span><span id="for">for</span><span id="Everybody">Everybody</span></h1>
          <div className="error-alert-offline" ><OfflineAlert text={this.state.infoText} /></div>
        </div>
        <br></br><br></br>
        <p id="subheader">Want to improve your web development skills?<br /><br />Explore upcoming events in <span id="webdev-header">Web Development</span> from around the world!</p>
        <br /><br />
        <label id="city-label">Select your city:
          <br /><br /><br />
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents}
          />
        </label>
        <br /><br />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateEvents={this.updateEvents}
        />
        <br></br>
        <h4>Events in each city</h4>
        <div className="data-vis-wrapper">
          <EventGenre
            locations={this.state.locations}
            events={this.state.events}
          />
          <ResponsiveContainer height={400} >
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis
                allowDecimals={false}
                type="number"
                dataKey="number"
                name="number of events"
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;