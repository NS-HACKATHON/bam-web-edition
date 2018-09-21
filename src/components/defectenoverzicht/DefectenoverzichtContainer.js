import { connect } from 'react-redux';
import { DefectenoverzichtComponent } from './Defectenoverzicht';
import {updateUserProfileName} from '../../actions/updateUserProfileName';

const mapStateToProps = (state) => {
  return {
    userName: state.firstname
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (name) => dispatch(updateUserProfileName(name))
  }
}

export const DefectenoverzichtContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DefectenoverzichtComponent);
