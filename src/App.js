import React, {Component} from 'react';
import './App.css';
import DefectenoverzichtContainer from "./components/defectenoverzicht/DefectenoverzichtContainer";
import MaterieelWerklijnenDiagramContainer
    from "./components/materieelwerklijnendiagram/MaterieelWerklijnenDiagramContainer";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            darkMode: false
        }
    }

    toggleDarkMode() {
        this.setState({
            darkMode: !this.state.darkMode
        });
    }

    render() {
        let mode = this.state.darkMode ? ' dark' : ' light';
        return (
            <div className={`app ${mode}`}>
                <button className="toggle-dark-mode" onClick={() => this.toggleDarkMode()}>{`Join the ${mode} side`}</button>
                <div className="col">
                    <DefectenoverzichtContainer/>
                </div>
                <div className="col">
                    <MaterieelWerklijnenDiagramContainer/>
                </div>
            </div>
        );
    }

}

export default App;
