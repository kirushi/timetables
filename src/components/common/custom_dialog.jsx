import React, { Component } from 'react';
import {
  Dialog,
  Button,
  Intent
} from '@blueprintjs/core';

class CustomDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleConfirm() {
    this.props.onConfirm(this.props.id);
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <div>
        <Button
          className="pt-minimal"
          iconName={this.props.iconName}
          onClick={() => this.setState({ isOpen: !this.state.isOpen })} />
        <Dialog
          iconName={this.props.iconName}
          isOpen={this.state.isOpen}
          onClose={() => this.setState({ isOpen: false })}
          title={`Are you sure you want to delete ${this.props.itemName}`}
          >
          <div className="pt-dialog-body">
            { this.props.warning }
          </div>
          <div className="pt-dialog-footer">
            <div className="pt-dialog-footer-actions">
              <Button
                className="pt-minimal"
                onClick={() => this.setState({ isOpen: false })}
                text="No" />
              <Button
                intent={Intent.PRIMARY}
                onClick={this.handleConfirm}
                text="Yes, I'm sure"
                />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default CustomDialog;
