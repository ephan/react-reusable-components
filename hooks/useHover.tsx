import { useState, useEffect, useRef } from "react";

type HoverState = [React.MutableRefObject<any>, boolean];

const useHover = (): HoverState => {
  const [value, setValue] = useState(false);

  const ref = useRef<HTMLElement>(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);

        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseout", handleMouseOut);
        };
      }
    },
    [ref.current] // only re-run if ref changes
  );

  return [ref, value];
};

export default useHover;
