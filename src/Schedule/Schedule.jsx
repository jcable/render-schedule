import "./Schedule.scss";
import React from "react";
import moment from 'moment-timezone';
import { DataGrid, ToolbarOptions } from 'tubular-react';
import { ColumnModel, ColumnSortDirection } from 'tubular-common';

const columns = [
  new ColumnModel('start', {Visible:false,IsKey:true,SortDirection:ColumnSortDirection.ASCENDING}),
  new ColumnModel('local', {Label:'local'}),
  new ColumnModel('utc', {Label:'GMT'}),
  new ColumnModel('title'),
  new ColumnModel('synopsis')
];

let options = new ToolbarOptions();
options.advancePagination = false;
options.topPager = false;
options.bottomPager = false;
options.exportButton = false;
options.printButton = false;
options.searchText = false;
options.itemsPerPage = 100;

function template(props, data) {
  const d = moment.tz(props.date, props.zone.zoneName).format("Do MMM, YYYY");
  return (
    <div className="schedule">
      <h1>Schedule for {d} in {props.zone.zoneName}</h1>
      <DataGrid
        columns={columns}
        dataSource={data}
        gridName='Grid'
        toolbarOptions = {options}
     />
    </div>
  );
};

export default template;
