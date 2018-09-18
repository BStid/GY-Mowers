import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Modal.css'

class Modal extends Component {
  render() {
    if(!this.props.show) {
      return null;
    }


    return (
      <div className="backdrop">
        <div className="modal">
          {this.props.children}
            <button className='close_modal' onClick={this.props.onClose}>
              X
            </button>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;