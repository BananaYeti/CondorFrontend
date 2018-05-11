export const actionTypes = {
    MATCH_BEGIN:'MATCH_BEGIN',
    MATCH_END:'MATCH_END'
}

export const beginMatch = () => ({
    type:actionTypes.MATCH_BEGIN,
});

export const endMatch = () => ({
    type:actionTypes.MATCH_END,
});