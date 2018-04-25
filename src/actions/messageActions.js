export const sendMessage = (username, text) => ({
    type:'SEND_MESSAGE',
    username,
    text
})

export const recieveMessage = (username, text) => ({
    type:'RECIEVE_MESSAGE',
    username,
    text
})

export const switchRoom = (room) => ({
    type:'SWITCH_ROOM',
    room
});