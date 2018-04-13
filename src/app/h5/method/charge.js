import action from 'action';
import store from 'store';
export function pop(){
    const history=store.getState().charge.history;
    if(history.length>1){
        store.dispatch(action.charge.creator.pop_history());
    }
}