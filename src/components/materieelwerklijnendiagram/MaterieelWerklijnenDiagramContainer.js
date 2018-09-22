import {connect} from 'react-redux';
import {MaterieelWerklijnenDiagramComponent} from './MaterieelWerklijnenDiagramComponent';
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

    doFilter() {
        let eenheidVan = prompt("Eenheid van", "");
        let eenheidTot = prompt("Eenheid tot", "");

        fetch('https://raw.githubusercontent.com/NS-HACKATHON/bam-web-edition/master/samples/werklijnen-voorbeeld.json')
            .then(response => response.json())
            .then(json => this.props.updateWerklijnen(json));
    }

    makeGroupsAndItems(responseWerklijnen) {
        let groups = [];
        let convertedInzetten = [];
        for (let responseWerklijnIndex in responseWerklijnen) {
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
                content: this.generateContent(inzet),
                group: groupIndex,
                className: (responseWerklijn.eenheid === undefined) ? 'manco' : ''
            };
        });
    }

    generateContent(inzet) {
        return '<div class="super">' + inzet.naam + '</div>' +
            '<div class="lijn ' + this.getInzetColor(inzet) + '"></div>' +
            '<div class="sub">' + inzet.beginLocatie + '</div>'
    }

    getInzetColor(inzet) {
        let color = 'inzetgroen';
        if (inzet.inzetType === 'ritclaim') {
            color = 'inzetlongdash';
        } else if (inzet.inzetType === 'matclaim') {
            color = 'inzetshortdash';
        }
        return color;
    }

    render() {
        if (this.props.werklijnen.length > 0) {
            let groupsAndItems = this.makeGroupsAndItems(this.props.werklijnen);
            return (
                <MaterieelWerklijnenDiagramComponent
                    groups={groupsAndItems.groups}
                    items={groupsAndItems.items}
                    options={this.state.options}/>
            );
        }
        return (
            <div>
                <button onClick={() => this.doFilter()}>Filteren</button>
            </div>
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
