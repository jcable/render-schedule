import React, { useState } from 'react';
import './App.css';
import Schedule from './Schedule/Schedule';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import TimezonePicker from 'react-timezone';
import moment from 'moment-timezone';

function App() {
  const [selectedDate, handleDateChange] = useState(moment.tz('2018-10-28', 'UTC'));
  const [selectedTimezone, handleTimezoneChange] = useState('Europe/London');

  return (
    <div className="App">
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <TimezonePicker
      value={selectedTimezone}
      onChange={handleTimezoneChange}
      inputProps={{ placeholder: 'Select Timezone...', name: 'timezone' }}
      />
      <DatePicker value={selectedDate} onChange={handleDateChange} />
      <Schedule
        date={selectedDate}
        onDateChange={handleDateChange}
        zone={selectedTimezone}
        onZoneChange={handleTimezoneChange}
      />
    </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
