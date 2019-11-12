import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Tooltip from '../../shared/Tooltip/Tooltip';
import {Image} from "../../../models/images";
import constants from '../../../constants';
import {deleteImage} from '../../../store/ImagesStore';

import './ImagesView.scss';

const {ROUTES} = constants;

interface PropsModel {
    data: Image | undefined;
    onClose(e?: React.MouseEvent<HTMLElement>): void;
}

export default function ImagesView(props: PropsModel) {
    const {data, onClose} = props;
    const dispatch = useDispatch();

    const handleDelete = () => {
        if (data) {
            dispatch(deleteImage(data.id));

            onClose();
        }
    };

    if (!data) {
        return null;
    }

    return (
        <div className="image-view">
            <Tooltip text={data.tooltip} position={data.tooltipPosition} color={data.tooltipColor}>
                <div className="image-view__wrap">
                    <div className="image-view__image">
                        <img src={data.url} alt=""/>
                    </div>
                </div>
            </Tooltip>
            <div className="image-view__actions">
                <button type="button" onClick={handleDelete} className="image-view__delete">Delete</button>
                <Link to={`${ROUTES.IMAGES}?id=${data.id}`} className="image-view__edit">Edit</Link>
            </div>
            <button type="button" onClick={onClose} className="image-view__close"/>
        </div>
    );
}
