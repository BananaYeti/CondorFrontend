export const actionTypes = {
    SUBMIT_COMMAND:'SUBMIT_COMMAND',
    PRINT_LINE:'PRINT_LINE'
}

export const submitCommand = (lineText, command, args) => ({
    type:actionTypes.SUBMIT_COMMAND,
    lineText,
    command,
    args
})

export const printLine = (lineText) => ({
    type:actionTypes.PRINT_LINE,
    lineText
})