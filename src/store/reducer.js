import * as actionTypes from './actions';
const initialState = {
    activeRoomName : null,
    activeRoomKey : null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_ACTIVE_ROOM_NAME:
            return {
                ...state,
                activeRoomName: {
                     
                }
            };
        case actionTypes.GET_ACTIVE_ROOM_KEY:
            return {
                ...state,
                activeRoomKey: {
                    ...state.activeRoomKey,
                    [action.activeRoomKey]: state.activeRoomKey[action.activeRoomKey] 
                }

            };
        case actionTypes.DELETE_ACTIVE_ROOM_NAME:
            return {
                ...state,
                activeRoomName: {
                    ...state.activeRoomName,
                    [action.activeRoomName]: null
                }
            };
        case actionTypes.DELETE_ACTIVE_ROOM_KEY:
            return {
                ...state,
                activeRoomKey: {
                    ...state.activeRoomKey,
                    [action.activeRoomKey]: null
                }
            };
        default: 
            return state;
    }
};

export default reducer;