import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleLogoutWindow } from '../../../actions';

const mapDispatchToProps = dispatch => ({
  onCloseLogoutWindow: () => {
    dispatch(toggleLogoutWindow());
  }
});
const mapStateToProps = (ownProps) => ({
  ...ownProps,
});

class LogOut extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleClickEvent = this.handleClickEvent.bind(this);
  }
  componentWillMount() {
    document.addEventListener('click', this.handleClickEvent, false);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickEvent, false);
  }
  handleClickEvent($event) {
    if (!ReactDOM.findDOMNode(this).contains($event.target)) {
      this.props.onCloseLogoutWindow();
    }
  }
  render() {
    return (
      <div className="dropdown small" >
        <button className="button green logout" onClick={this.props.onLogoutClick} >Log Out</button>
      </div>
    )
  }
}

LogOut.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);
