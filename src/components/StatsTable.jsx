import React from "react";

const StatsTable = ({ lost, helped }) => {
  return (
    <div className="table">
      <table>
        <tr>
          <th>We've Lost Number of Item</th>
          <th>We've helped Number of People</th>
        </tr>
        <tr>
          <td>0 - {lost}</td>
          <td>0 - {helped}</td>
        </tr>
      </table>
    </div>
  );
};

export default StatsTable;