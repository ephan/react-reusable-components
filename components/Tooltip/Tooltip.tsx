import React, { useState } from 'react';

type Props = {
  content: string;
  children: React.ReactNode;
};

const Tooltip: React.FC<Props> = ({ content, children }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div className="relative inline-block">
      <div
        className="bg-gray-800 text-white rounded py-2 px-4 absolute z-10 bottom-full left-1/2 transform -translate-x-1/2"
        style={{ display: isTooltipVisible ? 'block' : 'none' }}
      >
        {content}
      </div>
      <div
        className="inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
