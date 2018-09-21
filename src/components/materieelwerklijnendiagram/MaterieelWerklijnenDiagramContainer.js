import {connect} from 'react-redux';
import {MaterieelWerklijnenDiagramComponent} from './MaterieelWerklijnenDiagram';
import React from "react";
import {updateWerklijnen} from "../../actions/werklijnenActions";
import './MaterieelWerklijnenDiagram.css';

class MaterieelWerklijnenDiagramContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                width: '100%',
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
    
    makeGroupsAndItems(responseWerklijnen) {
        let groups = [];
        let convertedInzetten = [];
        for(let responseWerklijnIndex in responseWerklijnen) {
            let responseWerklijn = responseWerklijnen[responseWerklijnIndex];
            groups.push({
                id: responseWerklijnIndex,
                content: (responseWerklijn.eenheid != null) ? responseWerklijn.eenheid.nummer : responseWerklijn.inzetten[0].geplandType,
                title: (responseWerklijn.eenheid != null) ? responseWerklijn.eenheid.type : ''
            });
            convertedInzetten = convertedInzetten.concat(this.convertResponsWerklijn(responseWerklijn, responseWerklijnIndex));
        }
        return {
            groups: groups,
            items: convertedInzetten
        }
    }

    convertResponsWerklijn(responseWerklijn, groupIndex) {
        return responseWerklijn.inzetten.map((inzet) => {
                return {
                    start: new Date(inzet.beginTijd),
                    end: new Date(inzet.eindTijd),
                    content: inzet.naam,
                    group: groupIndex
                };
            });
    }

    render() {
        if (this.props.werklijnen.length > 0) {
            let groupsAndItems = this.makeGroupsAndItems(this.props.werklijnen);
            return (
                <MaterieelWerklijnenDiagramComponent groups={groupsAndItems.groups} items={groupsAndItems.items}
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
