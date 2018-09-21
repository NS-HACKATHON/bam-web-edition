import * as React from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'

export const DefectenoverzichtComponent = (props) => {

  const data = [{
    name: 'Tanner Linsley',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    }
  }]

  const columns = [{
    Header: 'Name',
    accessor: 'name' // String-based value accessors!
  }, {
    Header: 'Age',
    accessor: 'age',
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    id: 'friendName', // Required because our accessor is not a string
    Header: 'Friend Name',
    accessor: d => d.friend.name // Custom value accessors!
  }, {
    Header: props => <span>Friend Age</span>, // Custom header components!
    accessor: 'friend.age'
  }]

  return (
    // <div>
    //   <label>Update Name:</label>
    //   <input
    //     value={props.userName}
    //     onChange={(e) => props.onChange(e.target.value)}
    //     />
    // </div>
    <ReactTable
      data={data}
      columns={columns}
    />
  );
}