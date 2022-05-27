import React from "react";
import { getBezierPath, getEdgeCenter } from "react-flow-renderer";

//import "./index.css";

const foreignObjectSize = 40;

export default function CustomEdge(props) {
  const edgePath = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition
  });
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY
  });
  const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
    if (typeof props.data === "function") {
      props.data(id);
    } else {
      console.log("x");
    }
    //alert(`remove ${id}`);
  };
  return (
    <>
      <path
        id={props.id}
        style={props.style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={props.markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <button
          className="edgebutton"
          onClick={(event) => onEdgeClick(event, props.id)}
        >
          ×
        </button>
      </foreignObject>
    </>
  );
}