import { push } from 'connected-react-router';
import {Action} from './action';
import {Image, ImageFormData} from "../models/images";
import {updateServerData} from './ServerDataStore';
import {saveImage} from '../api/images';
import {AppState} from './index';
import {getFileBase64} from "../utils/utils";
import constants from '../constants';

const {ROUTES} = constants;

const TYPES = {
    SET_IMAGES: 'SET_IMAGES',
    SET_ACTIVE_IMAGE: 'SET_ACTIVE_IMAGE',
};

export interface ImagesState {
    imagesList: Image[],
    activeImage: Image | undefined,
}

export const initialState = {
    imagesList: [],
    activeImage: undefined
};

export const rImages = (state = initialState, action: Action) => {
    let newState: ImagesState = {...state};

    switch (action.type) {
        case TYPES.SET_IMAGES: {
            newState = {
                ...newState,
                imagesList: action.data
            };

            return newState;
        }
        case TYPES.SET_ACTIVE_IMAGE: {
            newState = {
                ...newState,
                activeImage: action.data
            };

            return newState;
        }
        default:
            return state;
    }
};

export const addNewImage = (data: ImageFormData) => {
    return async (dispatch: Function, getState: Function) => {
        const state: AppState = getState();
        const imagesList = [...state.rServerData.images];

        const savedImage = await saveImage(data);

        imagesList.push(savedImage);

        dispatch(updateServerData('images', imagesList));
        dispatch(push(ROUTES.ROOT));
    }
};

export const updateImage = (data: ImageFormData, id: string) => {
    return async (dispatch: Function, getState: Function) => {
        const state: AppState = getState();
        const imagesList = [...state.rServerData.images];

        const editedImageIndex = imagesList.findIndex((item: Image) => {
            return item.id === id;
        });

        const imageUrl = data.file ? await getFileBase64(data.file) : imagesList[editedImageIndex].url;

        imagesList[editedImageIndex] = {
          tooltipColor: data.tooltipColor,
          tooltipPosition: data.tooltipPosition,
          tooltip: data.tooltip,
          url: imageUrl,
          id,
        };

        dispatch(updateServerData('images', imagesList));
        dispatch(push(ROUTES.ROOT));
    }
};

export const deleteImage = (id: string) => {
    return async (dispatch: Function, getState: Function) => {
        const state: AppState = getState();
        const imagesList = [...state.rServerData.images];

        const updatedImagesList = imagesList.filter((item: Image) => {
            return item.id !== id;
        });

        dispatch(updateServerData('images', updatedImagesList));
        dispatch({
            type: TYPES.SET_IMAGES,
            data: updatedImagesList,
        });
    }
};

export const getImages = () => {
    return async (dispatch: Function, getState: Function) => {
        const state: AppState = getState();
        const loadedImages = state.rServerData.images;

        // load images

        dispatch({
            type: TYPES.SET_IMAGES,
            data: loadedImages,
        });
    };
};

export const getImageById = (id: string) => {
    return async (dispatch: Function, getState: Function) => {
        const state: AppState = getState();
        const loadedImages = state.rServerData.images;

        const loadedImage = loadedImages.find((item: Image) => {
            return item.id === id;
        });

        dispatch({
            type: TYPES.SET_ACTIVE_IMAGE,
            data: loadedImage,
        });
    };
};

export const clearActiveImage = () => {
    return async (dispatch: Function) => {
        dispatch({
            type: TYPES.SET_ACTIVE_IMAGE,
            data: undefined,
        });
    };
};
