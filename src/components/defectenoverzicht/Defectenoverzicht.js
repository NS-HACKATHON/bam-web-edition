import * as React from 'react';

export const DefectenoverzichtComponent = (props) => {
  return (
    <div>
      <label>Update Name:</label>
      <input
        value={props.userName}
        onChange={(e) => props.onChange(e.target.value)}
        />
    </div>
  );
}