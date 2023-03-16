import React from "react";

const Results = ({ NOI, CoC }) => {
  return (
    <div>
      <h2>Results</h2>
      <p>
        Net Operating Income (NOI): <strong>${NOI.toFixed(2)}</strong>
      </p>
      <p>
        Cash on Cash Return (CoC): <strong>{(CoC * 100).toFixed(2)}%</strong>
      </p>
    </div>
  );
};

export default Results;
