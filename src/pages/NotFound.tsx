import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        // display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div>
        <p style={{ fontSize: 42, fontWeight: "bold" }}>Not Found Page</p>
        <h3>This page could not be found</h3>
      </div>
      <div>
        <img
          src="https://i.imgur.com/qIufhof.png"
          alt="NotFound"
          style={{ display: "block", margin: "0px auto" }}
        />
      </div>
    </div>
  );
};

export default NotFound;
