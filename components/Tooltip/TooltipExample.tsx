import React from 'react';
import Tooltip from './Tooltip';

const TooltipExample: React.FC = () => {
  return (
    <div className="py-8 px-4">
      <Tooltip content="This is a tooltip">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Hover over me
        </button>
      </Tooltip>
    </div>
  );
};

export default TooltipExample;
