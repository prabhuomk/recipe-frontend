import { useState } from "react";
import { useHistory } from "react-router-dom";
export function Recipe({ title, src, list, prep, id }) {
  const [expand, setExpand] = useState(false);
  const history = useHistory();
  return (
    <div
      className="MyApp"
      style={{
        backgroundImage:
          "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
        width: "350px",

        margin: "50px",
        borderRadius: "10px",
        color: "white"
      }}
    >
      <h3
        style={{ color: "black", cursor: "pointer" }}
        onClick={() => history.push(`/${id}`)}
      >
        {title}
      </h3>
      <img
        src={src}
        alt={"not found"}
        height={"130px"}
        style={{ borderRadius: "10px" }}
      />
      <h4 style={{ color: "black" }}>Ingredients</h4>

      <ul style={{ listStyleType: "circle" }}>
        {list.map((steps) => (
          <li>{steps}</li>
        ))}
      </ul>

      <h4 style={{ color: "black" }}>How to Make</h4>
      <button
        onClick={() => setExpand(!expand)}
        style={{ backgroundColor: "yellow", fontWeight: "bold" }}
      >
        Show{expand ? "less" : "more"}
      </button>
      {expand ? (
        <ul style={{ listStyleType: "circle" }}>
          {prep.map((steps) => (
            <li>{steps}</li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}
