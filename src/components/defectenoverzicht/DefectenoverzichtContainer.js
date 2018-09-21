import React from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { connect } from "react-redux";
import "react-table/react-table.css";
import { DefectenButtonBarComponent } from "./DefectenButtonBar";
import { updateDefecten } from '../../actions/defectenActions';

class DefectenoverzichtContainer extends React.Component {
  wsEndPoint = new WebSocket('ws://localhost:7104/defectenoverzicht/defect');

  constructor(props) {
    super(props);
    this.setupWebSocket();
  }

  setupWebSocket() {
    this.wsEndPoint.onopen = () => {
      console.log('Open DefectenWebSocket.');
    }

    this.wsEndPoint.onmessage = (defecten) => {
      console.log(JSON.parse(defecten.data));
      this.props.updateDefecten(JSON.parse(defecten.data));
    }

    this.wsEndPoint.onclose = () => {
      console.log('Sluit DefectenWebSocket');
    }
  }

  render() {
    const columns = [
      {
        Header: "Materieel eenheid",
        accessor: "eenheidNummer" // String-based value accessors!
      },
      {
        Header: "Soort",
        accessor: "soort" // String-based value accessors!
      },
      {
        Header: "Begintijd",
        accessor: "beginTijd"
        // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      },
      {
        // Header: props => <span>Friend Age</span>, // Custom header components!
        Header: "Toelichting",
        accessor: "toelichting"
      },
      {
        id: "naInzetNaam",
        Header: "Na Inzet",
        accessor: d => {
          if (d.naInzet !== null) {
            return d.naInzet.naam + " " + d.naInzet.dienstregelpunt;
          }
          return "";
        }
      },
      {
        Header: "Hersteld op",
        accessor: "eindTijd"
      }
    ];

    return (
      <div>
        <ReactTable
          data={this.props.defecten}
          columns={columns}
          filterable={true}
          defaultPageSize={20}
        />
        <DefectenButtonBarComponent />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    defecten: state.defecten
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      updateDefecten: (defecten) => dispatch(updateDefecten(defecten))
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefectenoverzichtContainer);
