import React from 'react';
import './Section.css';

const SIZE = ["section--medium", "section--large", "section--small", "section--medium--flex"];
const STYLES = ["section--validate", "title--left"];

export const Section = ({
    children,
    style,
    title,
    sectionSize,
    sectionStyle
}) => {
    const checkSectionSize = SIZE.includes(sectionSize) ? sectionSize : SIZE[1];
    const checkSectionTitle = STYLES.includes(sectionStyle) ? sectionStyle :STYLES[1];
    return (
        <div className={`section ${checkSectionSize} ${checkSectionTitle}`} style={style}>
            <h3>{title}</h3>
            {children}
        </div>
    )
}

export default Section
