import React, {Component} from 'react';
import {observer} from 'mobx-react';
import WebState from '../../MobX/webState';

@observer
class TimerView extends React.Component {
    render() {
        return (<button onClick={this.onReset.bind(this)}>
                Seconds passed: {this.props.appState.timer}
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