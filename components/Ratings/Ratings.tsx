import React, { FC, useState } from "react";
import Star from "../Star/Star";

const COLORS = {inactive: "#ddd", active: "#FFED76", hoverColor: "#FFEDDD"};


export interface Props {
  maxStars?: number;
  value?: number;
  onChange?: (newStar: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  hoverColor?: string;
  size?: number | string;
  gap?: number | string;
  editable?: boolean;
  hideInactive?: boolean;
}

const Ratings = ({
  maxStars = 5,
  value = 0,
  onChange,
  activeColor = COLORS.active,
  inactiveColor = COLORS.inactive,
  hoverColor = COLORS.hoverColor,
  size = 20,
  editable = true,
  gap = 0,
  hideInactive = false,
} : Props) => {
    const [hoverArr, setHoverArr] = useState(Array(maxStars+1).fill(0));

    const [isHovering, setIsHovering] = useState(false);

    const handleSetHover = (value:number) => {
        const newHoverArr = Array(maxStars+1).fill(0);

        for (let i = 1; i <= maxStars; i++) {
            if (i <= value) {
                newHoverArr[i] = 1;
            }
        }

        setHoverArr(newHoverArr);
        setIsHovering(true);
    }

    const handleStopHover = () => {
        const newHoverArr = Array(maxStars+1).fill(0);
        setHoverArr(newHoverArr);
        setIsHovering(false);
    }

    return (
  <ul
    style={{
      color: inactiveColor,
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "flex",
    }}
  >
    {Array(hideInactive ? value : maxStars)
      .fill(null)
      .map((_, i) => i + 1)
      .map((starNumber) => (
        <li
          title={`${starNumber} star`}
          key={starNumber}
          onClick={() => {
            if (onChange && editable) onChange(starNumber);
          }}
          style={{
            cursor: "pointer",
            position: "relative",
            marginRight: starNumber !== maxStars ? gap : 0,
          }}
          onMouseEnter={(e) => {
            handleSetHover(starNumber);
          }}
          onMouseLeave={(e) => handleStopHover()}
        >
          <Star
            selected={starNumber <= value}
            activeColor={activeColor}
            hoverColor={hoverColor}
            showHover={hoverArr[starNumber] === 1}
            isHovering={isHovering}
            inactiveColor={inactiveColor}
            size={size}
          />
        </li>
      ))}
  </ul>
)};
export default Ratings;