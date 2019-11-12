import React from 'react';

import './CommonSelect.scss';

interface PropsModel {
    value: string;
    options: string[];
    name?: string;
    placeholder?: string;
    onChange(e: React.FormEvent<HTMLSelectElement>): void;
}

export default function CommonInput(props: PropsModel) {
    const {value, placeholder, options, name, onChange} = props;

    const renderOptions = () => {
        return options.map((item: string, index: number) => {
            return (
                <option key={index} value={item}>{item}</option>
            )
        })
    };

    return (
        <div className="common-select">
            <div className="common-select__placeholder">{placeholder}:</div>
            <select
                name={name}
                value={value}
                onChange={onChange}
            >
                {renderOptions()}
            </select>
        </div>
    );
}
