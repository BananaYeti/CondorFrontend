export const submitCommand = (lineText, command, args) => ({
    type:'SUBMIT_COMMAND',
    lineText,
    command,
    args
})

export const printLine = (lineText) => ({
    type:'PRINT_LINE',
    lineText
})