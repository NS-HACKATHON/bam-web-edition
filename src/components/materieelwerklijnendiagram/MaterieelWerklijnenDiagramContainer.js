import {connect} from 'react-redux';
import {MaterieelWerklijnenDiagramComponent} from './MaterieelWerklijnenDiagram';
import React from "react";

class MaterieelWerklijnenDiagramContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        options: {
            width: '100%',
            height: '100px',
            stack: false,
            showMajorLabels: true,
            showCurrentTime: true,
            zoomMin: 1000000,
            type: 'background',
            format: {
                minorLabels: {
                    minute: 'h:mma',
                    hour: 'ha'
                }
            }
        },
        items: [{
            start: new Date(2010, 7, 15),
            end: new Date(2010, 8, 2),  // end is optional
            content: 'Trajectory A',
        }, {
            start: new Date(2010, 7, 16),
            end: new Date(2010, 8, 3),  // end is optional
            content: 'Trajectory A',
        }]
    }
  }
    render() {
        return (
            <MaterieelWerklijnenDiagramComponent userName={this.props.userName} options={this.state.options} items={this.state.items} />
        );
    }
}

const mapStateToProps = (state) => {
  return {
    userName: state.firstname
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MaterieelWerklijnenDiagramContainer);
