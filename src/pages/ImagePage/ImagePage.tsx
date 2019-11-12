import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ImageForm from '../../components/image/ImageForm/ImageForm';
import {ImageFormData} from '../../models/images';
import {addNewImage, getImageById, ImagesState, updateImage, clearActiveImage} from '../../store/ImagesStore';
import {getSearchParamByName} from '../../utils/utils';

import './ImagePage.scss';
import {AppState} from "../../store";
import {useHistory} from "react-router";

export default function ImagePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const imagesState = useSelector<AppState, ImagesState>(state => state.rImages);
    const imageId = getSearchParamByName('id');

    React.useEffect(() => {
        if (imageId) {
            dispatch(getImageById(imageId));
        } else {
            dispatch(clearActiveImage());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history.location.search]);

    const handleImageAdd = (data: ImageFormData) => {
        if (imageId) {
            dispatch(updateImage(data, imageId))
        } else {
            dispatch(addNewImage(data));
        }
    };

    return (
        <div className="image-page">
            <div className="container">
                <div className="image-page__content">
                    <ImageForm onSubmit={handleImageAdd} data={imagesState.activeImage}/>
                </div>
            </div>
        </div>
    );
}
