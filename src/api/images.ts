import uniqid from 'uniqid';
import {Image, ImageFormData} from "../models/images";
import {getFileBase64} from '../utils/utils';

export const saveImage = async (data: ImageFormData): Promise<Image> => {
    const id = uniqid();
    const url = await getFileBase64(data.file as File);

    const newImage: Image = {
        id,
        url: url,
        tooltipPosition: data.tooltipPosition,
        tooltip: data.tooltip,
        tooltipColor: data.tooltipColor,
    };

    return await newImage;
};
