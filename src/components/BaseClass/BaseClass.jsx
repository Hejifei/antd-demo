import React, { Component } from 'react';
import {WebState} from '../../MobX/webState';
import {observer} from 'mobx-react';
@observer
class BaseClass extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(11111111)
        console.log(this.props.location.pathname)
        WebState.Url = this.props.location.pathname;
        console.log(22222222)
    }
    render() {
        return (
            ''
        );
    }
}
export default BaseClass;