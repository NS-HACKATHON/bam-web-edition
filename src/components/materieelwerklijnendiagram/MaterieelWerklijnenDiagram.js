import * as React from 'react';
import Timeline from 'react-visjs-timeline'

const options = {
    width: '100%',
    height: '100px',
    stack: false,
    showMajorLabels: true,
    showCurrentTime: true,
    zoomMin: 1000000,
    type: 'background',
    format: {
        minorLabels: {
            minute: 'h:mma',
            hour: 'ha'
        }
    }
}

const items = [{
    start: new Date(2010, 7, 15),
    end: new Date(2010, 8, 2),  // end is optional
    content: 'Trajectory A',
}, {
    start: new Date(2010, 7, 16),
    end: new Date(2010, 8, 3),  // end is optional
    content: 'Trajectory A',
}]

export const MaterieelWerklijnenDiagramComponent = (props) => {
    return (
        <div>
            <h2>Hello Mr. {props.userName}!</h2>
            <Timeline options={options} items={items}/>
        </div>
    );
}