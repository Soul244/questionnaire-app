import React, { Component } from 'react';

class SelectableLastMessage extends Component {
  render() {
    const { selectableLastMessages, result } = this.props;
    if (selectableLastMessages[0] === undefined) return;
    if (result <= 24) {
      return (
        <div>
          {selectableLastMessages[0].content}
        </div>
      );
    }
    if (result > 24 && result <= 49) {
      return (
        <div>
          {selectableLastMessages[1].content}
        </div>
      );
    }
    if (result > 49 && result <= 75) {
      return (
        <div>
          {selectableLastMessages[2].content}
        </div>
      );
    }
    if (result > 75) {
      return (
        <div>
          {selectableLastMessages[3].content}
        </div>
      );
    }
  }
}

export default SelectableLastMessage;
