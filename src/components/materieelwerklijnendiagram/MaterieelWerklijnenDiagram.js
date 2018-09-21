import * as React from 'react';
import Timeline from 'react-visjs-timeline'

export const MaterieelWerklijnenDiagramComponent = (props) => {
    return (
        <div>
            <h2>Hello Mr. {props.userName}!</h2>
            <Timeline options={props.options} items={props.items}/>
        </div>
    );
}