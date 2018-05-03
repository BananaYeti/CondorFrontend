export const actionTypes = {
    SEND_MESSAGE:'SEND_MESSAGE',
    RECIEVE_MESSAGE:'RECIEVE_MESSAGE',
    SWITCH_ROOM:'SWITCH_ROOM'
}

export const sendMessage = (username, text) => ({
    type:actionTypes.SEND_MESSAGE,
    username,
    text
})

export const recieveMessage = (username, text) => ({
    type:actionTypes.RECIEVE_MESSAGE,
    username,
    text
})

export const switchRoom = (room) => ({
    type:actionTypes.SWITCH_ROOM,
    room
});