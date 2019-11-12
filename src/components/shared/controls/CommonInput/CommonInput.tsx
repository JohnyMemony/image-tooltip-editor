import React from 'react';

import './CommonInput.scss';

interface PropsModel {
    value: string;
    type?: string;
    name?: string;
    placeholder?: string;
    onChange(e: React.FormEvent<HTMLInputElement>): void;
}

export default function CommonInput(props: PropsModel) {
    const {value, placeholder, type, name, onChange} = props;

    return (
        <div className="common-input">
            <div className="common-input__placeholder">{placeholder}:</div>
            <input
                name={name}
                type={type || 'text'}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
