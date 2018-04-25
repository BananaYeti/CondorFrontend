import chat from '../modules/chat';

const defaultState = {
    messages:[],
    room:'global'
}

const messages = (state = defaultState, action) => {
    switch (action.type){
        case 'SEND_MESSAGE':
            return Object.assign({},state,{
                messages:[...(state.messages), {
                    username:action.username,
                    text:action.text
                }]
            });
        case 'RECIEVE_MESSAGE':
            return Object.assign({},state,{
                messages:[...state.messages, {
                    username:action.username,
                    text:action.text
                }]
            });
        case 'SWITCH_ROOM':
            return Object.assign({},state,{
                room:action.room,
                messages:[]
            });
        default:
           return state;
    }
}

export default messages;