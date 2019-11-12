import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ImageCard from '../../components/image/ImageCard/ImageCard';
import ImagesView from '../../components/image/ImagesView/ImagesView';
import {AppState} from "../../store";
import {getImages, ImagesState} from '../../store/ImagesStore';
import {Image} from "../../models/images";

import './DashboardPage.scss';

export default function DashboardPage() {
    const imagesState = useSelector<AppState, ImagesState>(state => state.rImages);
    const dispatch = useDispatch();

    const [activeImage, setActiveImage] = React.useState<Image | undefined>();

    React.useEffect(() => {
        dispatch(getImages());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const activateImage = (data: Image) => {
        setActiveImage(data);
    };

    const deactivateImage = () => {
        setActiveImage(undefined);
    };

    const renderImages = () => {
        return imagesState.imagesList.map((item: Image) => {
            return (
                <div className="dashboard__col" key={item.id}>
                    <ImageCard data={item} onClick={activateImage} />
                </div>
            );
        });
    };

    return (
        <>
            <div className="dashboard">
                <div className="container">
                    <div className="dashboard__row">
                        {renderImages()}
                    </div>
                </div>
            </div>
            <ImagesView data={activeImage} onClose={deactivateImage} />
        </>
    );
}
