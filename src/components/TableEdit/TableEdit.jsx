import React, { Component } from 'react';
import { Button  } from 'antd';
import {Link} from 'react-router-dom';
import './TableEdit.css';

export default class TableEdit extends Component {
    render() {
      return (
          <div className='tabBtnC'>
              <Link to={this.props.editHref}><Button icon="edit" /></Link>
              <Button icon="delete" onClick={this.props.delClick} />
          </div>
      );
    }
  }

