import {connect} from 'react-redux';
import {MaterieelWerklijnenDiagramComponent} from './MaterieelWerklijnenDiagram';
import React from "react";
import {updateWerklijnen} from "../../actions/werklijnenActions";

class MaterieelWerklijnenDiagramContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                width: '100vw',
                height: '100vh',
                format: {
                    minorLabels: {
                        minute: 'HH:mm',
                        hour: 'HH'
                    },
                },
            },
            items: [],
            groups: []
        }
    }

    componentDidMount() {
        fetch('https://raw.githubusercontent.com/NS-HACKATHON/bam-web-edition/master/samples/werklijnen-voorbeeld.json')
            .then(response => response.json())
            .then(json => this.props.updateWerklijnen(json));
    }

    convertResponsWerklijn(responseWerklijn) {
        return responseWerklijn.inzetten.map((inzet) => {
                return {
                    start: new Date(inzet.beginTijd),
                    end: new Date(inzet.eindTijd),
                    content: inzet.naam,
                    // group: responseWerklijn.id
                };
            });
    }

    render() {
        if (this.props.werklijnen.length > 0) {
            return (
                <MaterieelWerklijnenDiagramComponent groups={this.state.groups} items={this.convertResponsWerklijn(this.props.werklijnen[0])}
                                                     options={this.state.options}/>
            );
        }
        return (
            <div>Loading MWD</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        werklijnen: state.werklijnen
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateWerklijnen: (werklijnen) => dispatch(updateWerklijnen(werklijnen))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MaterieelWerklijnenDiagramContainer);
