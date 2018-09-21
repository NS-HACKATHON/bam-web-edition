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
                height: '100%',
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
        let eenheidnummerStart = prompt("Eenheidnummer start", "");
        let eenheidnummerEind = prompt("Eenheidnummer eind", "");

        fetch(`http://localhost:7104/webclient/mwd/${eenheidnummerStart}/${eenheidnummerEind}`)
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
                    group: groupIndex
                };
            });
    }

    generateContent(inzet) {
        return '<div class="super">' + inzet.naam + '</div>' +
            '<div class="lijn ' + this.getInzetColor(inzet) + '"></div>' +
        '<div class="sub">' + inzet.beginLocatie + '</div>'
    }

    getInzetColor(inzet) {
        var color = 'inzetgroen';
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
                <div>
                    <MaterieelWerklijnenDiagramComponent groups={groupsAndItems.groups} items={groupsAndItems.items}
                                                         options={this.state.options}/>
                    <button onClick={this.doFilter.bind(this)}>Filteren</button>
                </div>
            );
        }
        return (
            <div>
                <div>Druk eerst op filteren.</div>
                <div><button onClick={this.doFilter.bind(this)}>Filteren</button></div>
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
