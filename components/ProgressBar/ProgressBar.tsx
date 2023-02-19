import { useSpring, animated } from "react-spring";
export const ProgressBar = () => {
  //use useSpring hook to describe the animation
  //we  start with 0 --value and end with 75, while --size remains constant
  const styles = useSpring({
    from: {
      "--value": 0,
      "--size": "12rem",
    },
    to: {
      "--value": 75,
    },
  });
  console.log (styles);
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">Daisy UI Progress Demo</h1>
      <div className="flex items-center gap-4 p-16">
        <div>
          {/* use animated.div and use the styles from useSpring hook */}
          <animated.div className="radial-progress text-primary" style={styles}>
            {/* animate the value by using .to() method */}
            {styles["--value"].to((v: number) => v.toFixed(1) + "%")}
          </animated.div>
        </div>
      </div>
    </div>
  );
};