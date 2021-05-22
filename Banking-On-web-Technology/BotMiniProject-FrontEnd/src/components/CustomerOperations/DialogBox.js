import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';

class DialogBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      shouldRedirect: false,
    }

    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel = () => {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {this.props.isRedirectToHome &&
              <a href="/"><Button onClick={this.handleCancel} color="primary">
                {this.props.buttonText}
              </Button></a>}
            {!this.props.isRedirectToHome &&
              <Button onClick={this.handleCancel} color="primary">
                {this.props.buttonText}
              </Button>}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DialogBox;