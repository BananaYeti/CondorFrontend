import commands from '../modules/commands';

const defaultState = {
    commands:[],
    stdOut:[],
    commandToBeProcessed:null
}

const commandLine = (state = defaultState
    , action) => {
    switch (action.type){
        case 'SUBMIT_COMMAND':
        var command = {
            command: action.command,
            args: action.args
        }
        state = Object.assign({},state,{
            commands:[...state.commands, command],
            commandToBeProcessed:command
        });
        case 'PRINT_LINE':
        return Object.assign({},state,{
            stdOut:[...state.stdOut, action.lineText]
        });
        default:
           return state;
    }
}

export default commandLine;