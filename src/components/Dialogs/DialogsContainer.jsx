import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { actions } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';


let mapStateToProps = (state) => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
  };
};

const DialogsContainer = compose(
  withAuthRedirect,
  connect(mapStateToProps, { sendMessage:actions.sendMessage }),
)(Dialogs);
export default DialogsContainer;
