import React from 'react';
import {Image} from "../../../models/images";

import './ImageCard.scss';

interface PropsModel {
    data: Image;
    onClick(data: Image): void;
}

export default function ImageCard(props: PropsModel) {
    const {data, onClick} = props;

    const handleClick = () => {
        onClick(data);
    };

    return (
        <div className="image-card" onClick={handleClick}>
            <div className="image-card__image">
                <img src={data.url} alt=""/>
            </div>
        </div>
    );
}
