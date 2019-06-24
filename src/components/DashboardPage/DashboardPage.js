import React, { Component } from 'react';
import DashboardTable from '../DashboardTable/DashboardTable';

class DashboardPage extends Component {
render () {
    return (
        <div>
        <p>WELCOME TO DASHBOARD</p>
        <p> Job Pipeline + </p>
                  <div>
                   <table>
                       <tbody>
                         <tr>
                       <th>Company</th>
                         <th>Position</th>
                         <th>Stage</th>
                         <th>Next Touch Point</th>
                         <th>Notes</th>
                         </tr>
                         </tbody>
                         </table>
                         </div>
                         <DashboardTable />
                         </div>

    )
}
}

export default DashboardPage;