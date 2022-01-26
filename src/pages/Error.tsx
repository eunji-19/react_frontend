import React from "react";

const Error = () => {
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
        <p style={{ fontSize: 42, fontWeight: "bold" }}>Error Page</p>
        <h3>This page could not be found</h3>
      </div>
      <div>
        <img
          src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg"
          alt="NotFound"
          style={{ display: "block", margin: "0px auto" }}
        />
      </div>
    </div>
  );
};

export default Error;
