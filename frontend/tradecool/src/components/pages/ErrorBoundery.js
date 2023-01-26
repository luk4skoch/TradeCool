import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError();
  console.log(error);
  if (error) {
    return (
      <div>
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data ? <p>{error.data.message}</p> : <br />}
      </div>
    );
  }
}

export default ErrorBoundary;
