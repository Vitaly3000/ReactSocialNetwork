import React from 'react';

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };
  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };
  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };
  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };
  render() {
    return (
      <div>
        {this.state.editMode ? (
          <input
            autoFocus
            onChange={this.onStatusChange}
            onBlur={this.deactivateEditMode}
            value={this.state.status}
          />
        ) : (
          <span onClick={this.activateEditMode}>
            {this.props.status ? this.props.status : 'Введите статус'}
          </span>
        )}
      </div>
    );
  }
}
export default ProfileStatus;
