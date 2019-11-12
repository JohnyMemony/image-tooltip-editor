import React from 'react';
import DropZone from '../../shared/controls/DropZone/DropZone';
import CommonInput from '../../shared/controls/CommonInput/CommonInput';
import CommonSelect from '../../shared/controls/CommonSelect/CommonSelect';
import CommonButton from '../../shared/controls/CommonButton/CommonButton';
import {getFileBase64} from '../../../utils/utils';
import {Image, ImageFormData} from '../../../models/images';

import './ImageForm.scss';

interface PropsModel {
    data: Image | undefined;
    onSubmit(data: ImageFormData): void;
}

const PLACEMENTS_LIST = ['top', 'bottom', 'left', 'right'];

export default function ImageForm(props: PropsModel) {
    const {onSubmit, data} = props;

    const initialFormData: ImageFormData = {
        tooltip: '',
        tooltipColor: '#c0c0c0',
        tooltipPosition: 'top',
    };

    const [formData, setFormData] = React.useState<ImageFormData>(initialFormData);
    const [imageBase64, setImageBase64] = React.useState<string>('');
    const disabled = !imageBase64;
    const buttonTitle = data ? 'Save' : 'Add';

    React.useEffect(() => {
        if (data) {
            setFormData({
                tooltip: data.tooltip,
                tooltipColor: data.tooltipColor,
                tooltipPosition: data.tooltipPosition
            });

            setImageBase64(data.url);
        } else {
            setFormData(initialFormData);
            setImageBase64('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleImageDrop = async (files: File[]) => {
        const uploadedBase64 = await getFileBase64(files[0]);

        setFormData({
            ...formData,
            file: files[0],
        });
        setImageBase64(uploadedBase64);
    };

    const handleFieldChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        onSubmit(formData);
    };

    return (
        <form className="image-form" onSubmit={handleSubmit}>
            <div className="image-form__preview">
                <img src={imageBase64} alt=""/>
            </div>
            <div className="image-form__wrap">
                <DropZone
                    label="Drag 'n' drop some image here, or click to select image"
                    onFilesDrop={handleImageDrop}
                    multiple={false}
                />
            </div>
            <div className="image-form__wrap">
                <CommonInput
                    value={formData.tooltip}
                    name="tooltip"
                    placeholder="Tooltip text"
                    onChange={handleFieldChange}
                />
            </div>
            <div className="image-form__wrap">
                <CommonInput
                    value={formData.tooltipColor}
                    type="color"
                    name="tooltipColor"
                    placeholder="Tooltip color"
                    onChange={handleFieldChange}
                />
            </div>
            <div className="image-form__wrap">
                <CommonSelect
                    value={formData.tooltipPosition}
                    name="tooltipPosition"
                    placeholder="Tooltip position"
                    onChange={handleFieldChange}
                    options={PLACEMENTS_LIST}
                />
            </div>
            <div className="image-form__actions">
                <CommonButton title={buttonTitle} type="submit" onClick={handleSubmit} disabled={disabled}/>
            </div>
        </form>
    )
}
