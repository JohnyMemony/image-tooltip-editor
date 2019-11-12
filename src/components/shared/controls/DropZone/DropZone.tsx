import React from 'react';
import Dropzone from 'react-dropzone';

import './DropZone.scss';

interface PropsModel {
    label: string;
    multiple?: boolean;
    onFilesDrop(files: File[]): void;
}

export default function DropZone(props: PropsModel) {
    const {label, onFilesDrop, multiple} = props;

    const handleDrop = (acceptedFiles: File[]) => {
        onFilesDrop(acceptedFiles);
    };

    const handleRejected = (acceptedFiles: File[]) => {
        console.log(acceptedFiles);
    };

    return (
        <div className="drop">
            <Dropzone onDropAccepted={handleDrop} onDropRejected={handleRejected} multiple={multiple}>
                {({getRootProps, getInputProps}) => (
                    <div {...getRootProps()} className="drop__area">
                        <input {...getInputProps()} />
                        <p>{label}</p>
                    </div>
                )}
            </Dropzone>
        </div>
    );
}
