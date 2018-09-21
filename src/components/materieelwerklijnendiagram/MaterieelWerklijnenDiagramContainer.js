import {connect} from 'react-redux';
import {MaterieelWerklijnenDiagramComponent} from './MaterieelWerklijnenDiagram';

const mapStateToProps = (state) => {
  return {
    userName: state.firstname
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export const MaterieelWerklijnenDiagramContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterieelWerklijnenDiagramComponent);
