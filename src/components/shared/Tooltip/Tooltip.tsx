import React from "react";
import ReactDOM from 'react-dom';

import './Tooltip.scss';

const POSITIONS = {
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right',
};

interface PropsModel {
    text: string;
    color: string;
    position: string;
    children: any;
}

export default function Tooltip(props: PropsModel) {
    const {text, children, position, color} = props;

    const childRef = React.createRef();
    const [tooltipClass, setTooltipClass] = React.useState<string>('');
    const [active, setActiveState] = React.useState<boolean>(false);
    const [tooltipPos, setTooltipPos] = React.useState({
        x: 0,
        y: 0
    });

    React.useEffect(() => {
        setTooltipPosition();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setTooltipPosition = () => {
        const childEl = childRef.current as any;
        const childRect = childEl.getBoundingClientRect();

        const yPos = childRect.top + window.scrollY;

        switch (position) {
            case POSITIONS.TOP: {
                setTooltipPos({
                    x: childRect.x + childRect.width / 2,
                    y: yPos
                });

                setTooltipClass('tooltip--top');

                break;
            }
            case POSITIONS.BOTTOM: {
                setTooltipPos({
                    x: childRect.x + childRect.width / 2,
                    y: yPos + childRect.height
                });

                setTooltipClass('tooltip--bottom');

                break;
            }
            case POSITIONS.LEFT: {
                setTooltipPos({
                    x: childRect.x,
                    y: yPos + childRect.height / 2
                });

                setTooltipClass('tooltip--left');

                break;
            }
            case POSITIONS.RIGHT: {
                setTooltipPos({
                    x: childRect.x + childRect.width,
                    y: yPos + childRect.height / 2
                });

                setTooltipClass('tooltip--right');

                break;
            }
        }
    };

    const handleMouseOver = () => {
        setActiveState(true);
    };

    const handleMouseLeave = () => {
        setActiveState(false);
    };

    return (
        <>
            {React.cloneElement(children, {
                ref: childRef,
                onMouseOver: handleMouseOver,
                onMouseLeave: handleMouseLeave
            })}
            {active && text &&
            ReactDOM.createPortal(
                (
                    <div className="tooltip-wrap">
                        <div
                            className={`tooltip ${tooltipClass}`}
                            style={{top: tooltipPos.y, left: tooltipPos.x, color: color}}>
                            <div className="tooltip__message">{text}</div>
                        </div>
                    </div>
                ),
                document.getElementsByTagName('body')[0],
            )
            }
        </>
    );
}
