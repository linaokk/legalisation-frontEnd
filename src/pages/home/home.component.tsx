import { FunctionComponent, useRef, useState } from "react";
import { Layer, Line, Stage, Text } from "react-konva";
import { useNavigate } from "react-router-dom";
import "./home.style.css";
import { ROOT_SIGNUP } from "../../constant/root.constant";

export const HomeComponent: FunctionComponent = () => {
  const navigate = useNavigate();

  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState<any[]>([]);
  const isDrawing = useRef<boolean>(false);
  const stageRef = useRef<any>();

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
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

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleExport = () => {
    if (!stageRef || !stageRef.current) return;
    const uri = stageRef.current.toDataURL();
    console.log(uri);
    // we also can save uri as file
    // but in the demo on Konva website it will not work
    // because of iframe restrictions
    // but feel free to use it in your apps:
    // downloadURI(uri, 'stage.png');
  };

  return (
    <>
      bienvenue flapage
      <button
        onClick={() => {
          navigate(ROOT_SIGNUP);
          handleExport();
        }}
      >
        sinscrire
      </button>
      <Stage
        width={200}
        height={100}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        className="stage-container"
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
    </>
  );
};
