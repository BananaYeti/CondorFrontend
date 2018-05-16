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
        return Object.assign({},state,{
            commands:[...state.commands, command],
            commandToBeProcessed:command,
            stdOut:[...state.stdOut, action.lineText]
        });
        case 'PRINT_LINE':
        return Object.assign({},state,{
            stdOut:[...state.stdOut, action.lineText]
        });
        case 'CLEAR':
        return Object.assign({},state,{
            stdOut:[]
        });
        default:
           return state;
    }
}

export default commandLine;