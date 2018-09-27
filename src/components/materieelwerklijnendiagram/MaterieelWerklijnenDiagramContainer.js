import {connect} from 'react-redux';
import {MaterieelWerklijnenDiagramComponent} from './MaterieelWerklijnenDiagramComponent';
import React from "react";
import {updateWerklijnen} from "../../actions/werklijnenActions";
import './MaterieelWerklijnenDiagram.css';

class MaterieelWerklijnenDiagramContainer extends React.Component {
    wsEndPoint = new WebSocket('ws://localhost:7104/webclient/mwd');

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
        this.setupWebSocket();
    }

    setupWebSocket() {
        this.wsEndPoint.onopen = () => {
            console.log('Open Mwd WebSocket.');
        }

        this.wsEndPoint.onmessage = (werklijnen) => {
            console.log(JSON.parse(werklijnen.data));
            this.props.updateWerklijnen(JSON.parse(werklijnen.data));
        }

        this.wsEndPoint.onclose = () => {
            console.log('Sluit MwD WebSocket');
        }
    }

    doFilter() {
        let eenheidVan = prompt("Eenheid van", "");
        let eenheidTot = prompt("Eenheid tot", "");

        fetch(`http://localhost:7104/webclient/mwd/${eenheidVan}/${eenheidTot}`)
            .then(response => response.json())
            .then(json => this.props.updateWerklijnen(json));
    }

    maakDate(dateString) {
        var d = new Date(dateString)
        d.setHours(d.getHours() - 2);

        return d;
    }

    makeGroupsAndItems(responseWerklijnen) {
        let groups = [];
        let convertedInzetten = [];
        for (let responseWerklijnIndex in responseWerklijnen) {
            let responseWerklijn = responseWerklijnen[responseWerklijnIndex];
            groups.push({
                id: responseWerklijnIndex,
                content: geefWerklijnNaam(responseWerklijn),
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
                start: this.maakDate(inzet.beginTijd),
                end: this.maakDate(inzet.eindTijd),
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

/*
 * Geeft een "naam" voor een werklijn:
 *   - als de werklijn manco is, dan is de naam het geplande type van de eerste inzet
 *   - anders is de naam het eenheidnummer
 */
function geefWerklijnNaam(werklijn) {
    return werklijn.eenheid != null ? werklijn.eenheid.nummer : werklijn.inzetten[0].geplandType;
}

function comparing(extractor) {
    return (a, b) => extractor(a) >= extractor(b)
}

const mapStateToProps = (state) => {
    return {
        werklijnen: [...state.werklijnen].sort(comparing(geefWerklijnNaam))
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
