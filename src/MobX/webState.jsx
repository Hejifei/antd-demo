import {action,observable} from 'mobx';

var WebState = observable({
    timer: 0,
    Url:''
});

WebState.resetTimer = action(function reset() {
    WebState.timer = 0;
});

setInterval(action(function tick() {
    WebState.timer += 1;
}), 1000);

let state ={
    Url:{}
}

export {WebState,state};