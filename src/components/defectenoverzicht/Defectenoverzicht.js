import * as React from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'

export const DefectenoverzichtComponent = (props) => {

  // const data = [{
  //   name: 'Tanner Linsley',
  //   age: 26,
  //   friend: {
  //     name: 'Jason Maurer',
  //     age: 23,
  //   }
  // }]

    const data = [{
        matEenheid: '1',
        soort: 'soort 1',
        beginTijd: '2012-04-23T18:25:43.511Z',
        eindTijd: '2012-04-23T19:25:43.511Z',
        toelichting: 'toelichting 1',
        hersteldOp: '2012-04-23T19:25:43.511Z',
        naInzet: 'inzet x',
    }]


  const columns = [{
      Header: 'Materieel eenheid',
      accessor: 'matEenheid' // String-based value accessors!
  },{
      Header: 'Soort',
      accessor: 'soort' // String-based value accessors!
  }, {
    Header: 'Begintijd',
    accessor: 'beginTijd'
    // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    // id: 'friendName', // Required because our accessor is not a string
    Header: 'Eindtijd', 
    accessor: 'eindTijd'
      // accessor: d => d.friend.name // Custom value accessors!
  }, {
      // Header: props => <span>Friend Age</span>, // Custom header components!
      Header: 'Toelichting',
      accessor: 'toelichting'
  }, {
      Header: 'Na Inzet',
      accessor: 'naInzet'
  }, {
      Header: 'Hersteld op',
      accessor: 'hersteldOp'
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
