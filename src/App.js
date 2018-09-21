import React, {Component} from 'react';
import './App.css';
import DefectenoverzichtContainer from "./components/defectenoverzicht/DefectenoverzichtContainer";
import MaterieelWerklijnenDiagramContainer
    from "./components/materieelwerklijnendiagram/MaterieelWerklijnenDiagramContainer";

class App extends Component {
    render() {
        return (
            <div className="App">
                <MaterieelWerklijnenDiagramContainer/>
                <DefectenoverzichtContainer/>
            </div>
        );
    }
}

export default App;
