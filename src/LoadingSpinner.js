import React from "react";
import "./spinner.css";

export default function LoadingSpinner({ level }) {
  //   return (
  //     <div className="spinner-container">
  //       <div className="loading-spinner">Loading Level</div>
  //     </div>
  //   );

  return (
    <div className="content">
      <h2 className="text_shadows">Level {level}</h2>
    </div>
  );
}
