import { connect } from 'react-redux';
import {updateUserProfileName} from '../../actions/updateUserProfileName';
import React from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css'



class DefectenoverzichtContainer extends React.Component {

    
    constructor(props) {
      super(props) 
    }

    render() {
        const data = [
          {
              "id": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
              "soort": "inzetbaar",
              "beginTijd": "2020-01-01T00:11",
              "eindTijd": null,
              "toelichting": "Deze eenheid gaat over ruim een jaar gewoon kapot!",
              "naInzet": {
                  "naam": "3310-V",
                  "dienstregelpunt": "Ut"
              }
          },
          {
              "id": "11111111-2222-3333-4444-5555555555555",
              "soort": "beperkt inzetbaar",
              "beginTijd": "2018-01-01T00:11",
              "eindTijd": "2020-01-01T00:11",
              "toelichting": "De monteur heeft het zo druk...",
              "naInzet": null
          },
          {
              "id": "66666666-7777-8888-9999-0000000000000",
              "soort": "niet inzetbaar",
              "beginTijd": "2018-01-01T00:11",
              "eindTijd": "2020-01-01T00:11",
              "toelichting": "De monteur heeft het zo druk...",
              "naInzet": null
          }
      ]


        const columns = [{
            Header: 'Materieel eenheid',
            accessor: 'id' // String-based value accessors!
        },{
            Header: 'Soort',
            accessor: 'soort' // String-based value accessors!
        }, {
          Header: 'Begintijd',
          accessor: 'beginTijd',
            // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            // Header: props => <span>Friend Age</span>, // Custom header components!
            Header: 'Toelichting',
            accessor: 'toelichting'
        }, {
            id: 'naInzetNaam',
            Header: 'Na Inzet',
            accessor: d => {
              if (d.naInzet !== null) {
                return d.naInzet.naam + ' ' + d.naInzet.dienstregelpunt
              }
              return ''
            }
        }, {
            Header: 'Hersteld op',
            accessor: 'eindTijd'
        }]

        return (
            <ReactTable
                data={data}
                columns={columns}
                filterable={true}
                defaultPageSize={10}
            />
        )
    }
}





const mapStateToProps = (state) => {
  return {
    userName: state.firstname
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (name) => dispatch(updateUserProfileName(name))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefectenoverzichtContainer);
