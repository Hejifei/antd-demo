import React from 'react';
import {WebState} from '../../MobX/webState';
import PublicFun from '../publicFun/publicFun';
import {observer} from 'mobx-react';
@observer
class BaseClass extends React.Component {
    constructor(props) {
        super(props);
        this.PublicFun=PublicFun
    }
    componentWillMount() {
        // console.log(this.props)
        if(this.props.location){
            WebState.Url = this.props.location.pathname;
        }
        // console.log(WebState.Url)
    }
    // componentDidUpdate(){
    //     console.log(this.props.location.pathname)
    // }
    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps.location.pathname)
    // }
    // componentWillUpdata(nextProps, nextState){
    //     console.log('nextProps='+nextProps)
    //     console.log('nextState='+nextState)        
    // }
    render() {
        return (
            ''
        );
    }
}
export default BaseClass;