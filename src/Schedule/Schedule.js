import { useState, useEffect } from "react";
import axios from 'axios';
import convert from 'xml-js';
import moment from 'moment-timezone';
import template from "./Schedule.jsx";
import bbc_world_service_2018_10_28 from "../bbc_world_service_2018_10_28";

const api_key = "";
const sid = "bbc_world_service";

function Schedule(props) {
  useEffect(() => {
    const d = moment.tz(props.date, "UTC").format("YYYY-MM-DD");
    async function fetchData() {
      let sched = [];
      let schedule = [];
      if(d === '2018-10-28') {
        const xmldata = bbc_world_service_2018_10_28;
        const jsonstring = convert.xml2json(xmldata, {compact: true});
        const jsondata = JSON.parse(jsonstring);
        sched = jsondata['p:pips']['p:schedule']['p:schedule_services']['p:schedule_service']['p:items']['p:item'];
      }
      else {
        const result = await axios(
          `https://programmes.api.bbc.com/schedule?api_key=${api_key}&sid=${sid}&date=${d}`,
        );
        const xmldata = result.data;
        const jsonstring = convert.xml2json(xmldata, {compact: true});
        const jsondata = JSON.parse(jsonstring);
        sched = jsondata['p:schedule']['p:item'];
    }
    for(const row of sched) {
      const start = row["p:broadcast"]["p:accurate_time"]["_attributes"]["broadcast_start"]
      let title = row["p:brand"]["p:title"]["_text"]+': ';
      if(row["p:episode"]["p:title"]["_text"]===undefined) {
        title += row["p:episode"]["p:presentation_title"]["_text"];
      }
      else {
        title += row["p:episode"]["p:title"]["_text"];
      }
      schedule.push({
        local: moment.tz(start, props.zone).format("HH:mm"),
        utc: moment.tz(start, 'UTC').format("HH:mm"),
        title: title,
        synopsis: row["p:brand"]["p:synopses"]["p:synopsis"][0]["_text"],
        start: moment.tz(start, 'UTC').format("HH:mm").valueOf()
      });
      } 
      setData(schedule);
    };
    fetchData();
  }, [props.date, props.zone]);
    const [data, setData] = useState({ hits: [] });
    return template(props, data);
}

export default Schedule;
