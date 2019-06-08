import React from "react";
// import Airtable from "airtable";

import "./styles.css";

export default function Air() {
  const Airtable = require("airtable");
  const base = new Airtable({ apiKey: "keyRL9YkOf6JiR5g7" }).base(
    "apphmvOI4gNN3O8ch"
  );

  const arr = [];

  const b = base("Books")
    .select({
      maxRecords: 100
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function(record) {
          arr.push(record.get("Name"));
          console.log(arr);
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );

  return (
    <>
      {arr.map((station, i) => (
        <div className="station" key={i}>
          {station}
        </div>
      ))}
    </>
  );
}
