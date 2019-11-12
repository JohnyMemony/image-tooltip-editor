import {Action} from './action';
import {Image} from "../models/images";

const TYPES = {
    DATA_UPDATE: 'DATA_UPDATE'
};

export interface ServerDataState {
    images: Image[]
}

export const initialState: ServerDataState = {
    images: []
};

export const rServerData = (state = initialState, action: Action): ServerDataState => {
    let newState = {...state};

    switch (action.type) {
        case TYPES.DATA_UPDATE: {
            newState = {
                ...newState,
                [action.data.key]: action.data.payload
            };

            return newState;
        }
        default:
            return state;
    }
};

export const updateServerData = (key: string, payload: any): Action => {
    return {
        type: TYPES.DATA_UPDATE,
        data: {
            key,
            payload
        }
    }
};
