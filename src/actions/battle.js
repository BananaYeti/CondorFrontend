export const actionTypes = {
    MATCH_BEGIN:'MATCH_BEGIN',
    MATCH_END:'MATCH_END',

    PRINT_LINE_BATTLE:'PRINT_LINE_BATTLE',
    CLEAR_MATCH_LOG:'CLEAR_MATCH_LOG',

    TAKE_TURN:'TAKE_TURN',
    TOOK_TURN:'TOOK_TURN',

    UPDATE_ENEMY:'UPDATE_ENEMY',
}

export const beginMatch = () => ({
    type:actionTypes.MATCH_BEGIN,
});

export const endMatch = () => ({
    type:actionTypes.MATCH_END,
});

export const takeTurn = (callback) => ({
    type:actionTypes.TAKE_TURN,
    callback
});

export const tookTurn = () => ({
    type:actionTypes.TOOK_TURN
});

export const updateEnemy = (enemy) => ({
    type:actionTypes.UPDATE_ENEMY,
    enemy
});

export const battleLog = (text) => ({
    type:actionTypes.PRINT_LINE_BATTLE,
    text
})

export const clearBattleLog = () => ({
    type:actionTypes.CLEAR_MATCH_LOG
})