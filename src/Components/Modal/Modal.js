import React , { Component } from 'react';
import ReactDOM from 'react-dom';

const $ = require('jquery');
require('bootstrap');

class Modal extends Component {
  componentDidMount(){
    $(ReactDOM.findDOMNode(this)).modal('show');
    $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.hideModal);
  }

  render(){
    const { title, poster_path } = this.props.movie
    const imageURL = 'https://image.tmdb.org/t/p/w500/'

    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{title}</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div className="modal-body">
              <p>
                <img src={imageURL + poster_path} style={{maxHeight: '50vmax', maxWidth: '350px'}} alt={title}></img>
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;