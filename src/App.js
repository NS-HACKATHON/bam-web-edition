import React, {Component} from 'react';
import './App.css';
import DefectenoverzichtContainer from "./components/defectenoverzicht/DefectenoverzichtContainer";
import MaterieelWerklijnenDiagramContainer
    from "./components/materieelwerklijnendiagram/MaterieelWerklijnenDiagramContainer";

class App extends Component {
    render() {
        return (
            <div className="app">
                <div className="col">
                    <DefectenoverzichtContainer/>
                </div>
                <div className="col dark">
                    <MaterieelWerklijnenDiagramContainer/>
                </div>
            </div>
        );
    }
}

export default App;
