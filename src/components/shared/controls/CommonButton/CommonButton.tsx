import React from 'react';

import './CommonButton.scss';

interface PropsModel {
    title: string;
    type?: 'submit' | 'button' | 'reset';
    disabled?: boolean;
    onClick(e: React.MouseEvent<HTMLElement>): void;
}

export default function CommonButton(props: PropsModel) {
    const {title, type, disabled, onClick} = props;

    return (
        <button
            className="common-btn"
            type={type || 'button'}
            onClick={onClick}
            disabled={disabled}
        >
            {title}
        </button>
    );
}
