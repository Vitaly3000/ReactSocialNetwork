import React from 'react';

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
  };
  toggleEditMode = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
  };
  render() {
    return (
      <div>
        {this.state.editMode ? (
          <input autoFocus onBlur={this.toggleEditMode} value={this.props.status} />
        ) : (
          <span onDoubleClick={this.toggleEditMode}> {this.props.status}</span>
        )}
      </div>
    );
  }
}
export default ProfileStatus;
