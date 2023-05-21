import { FunctionComponent, useRef, useState } from "react";
import { Layer, Line, Stage } from "react-konva";
import styles from "./signature.module.css";
import { useFormikContext } from "formik";

interface SignatureComponentProps {
  height: number;
  width: number;
  label: string;
  errors?: string;
  name: string;
}

export const SignatureComponent: FunctionComponent<SignatureComponentProps> = ({
  height,
  label,
  width,
  errors,
  name,
}) => {
  const isDrawing = useRef<boolean>(false);
  const { setFieldValue } = useFormikContext();
  const [lines, setLines] = useState<any[]>([]);
  const [tool] = useState("pen");
  const stageRef = useRef<any>();
  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleMouseMove = (e: any) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    if (!stageRef || !stageRef.current) return;
    const uri = stageRef.current.toDataURL();
    setFieldValue(name, uri);
  };

  const handleOnReset = () => {
    setLines([]);
  };

  return (
    <div className={styles.signatureWowo}>
      <div>
        {label}
        {errors && <span className={styles.errorMessage}>: {errors}</span>}
      </div>
      <Stage
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        className={styles.stageContainer}
        ref={stageRef}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="black"
              strokeWidth={2}
              tension={0.2}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={"source-over"}
            />
          ))}
        </Layer>
      </Stage>
      <button onClick={handleOnReset}>reset</button>
    </div>
  );
};
