import {action,observable} from 'mobx';
// import {observer} from 'mobx-react';

let WebState = observable({
    timer: 0,
    Url:''
})

WebState.resetTimer = action(function reset() {
    WebState.timer = 0;
});
setInterval(action(function tick() {
    WebState.timer += 1;
}), 1000);

export {WebState};