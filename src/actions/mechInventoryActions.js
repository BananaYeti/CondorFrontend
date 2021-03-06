export const actionTypes = {
    MECH_SWAP_PART:'MECH_SWAP_PART',
    MECH_RMV_PART:'MECH_RMV_PART',
    MECH_INST_PART:'MECH_INST_PART',
    SET_MECH:'SET_MECH'  
}

export const swapPart = (startPoint, endPoint) => ({
    type:actionTypes.MECH_SWAP_PART,
    startPoint,
    endPoint
});

export const removePart = (point) => ({
    type:actionTypes.MECH_RMV_PART,
    point
});

export const installPart = (inventorySlot, endPoint) => ({
    type:actionTypes.MECH_INST_PART,
    inventorySlot,
    endPoint
});

export const setMech = (mechInventory) => ({
    type:actionTypes.SET_MECH,
    mechInventory
});