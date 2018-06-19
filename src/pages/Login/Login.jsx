
import {WebState} from '../../MobX/webState';
import {observer} from 'mobx-react';
import React, {Component} from 'react';


@observer
class TimerView extends React.Component {
    render() {
        return (<button onClick={this.onReset.bind(this)}>
                Seconds passed: {this.props.WebState.timer}
            </button>);
    }

    onReset () {
        this.props.WebState.resetTimer();
    }
};

export default class Home extends Component {
    render() {
        return (
            <TimerView WebState={WebState} />
        )
    }
}