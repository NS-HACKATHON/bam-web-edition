import * as React from 'react';
import Timeline from 'react-visjs-timeline'

export const MaterieelWerklijnenDiagramComponent = (props) => {
    console.log(props)
    return (
        <div>
            <Timeline groups={props.groups} options={props.options} items={props.items}/>
        </div>
    );
}