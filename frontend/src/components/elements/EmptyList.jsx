import React from "react";

export const EmptyList = ({ make, bodyType }) => {
  return (
    <div>
      {bodyType ? (
        <h1>{`${bodyType} type of cars not available !!`}</h1>
      ) : (
        <h1>{`${make} cars not available !!`}</h1>
      )}
    </div>
  );
};
