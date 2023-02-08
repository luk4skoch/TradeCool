import React from "react";
import { useRouteError } from "react-router";

export default function ErrorBoundary() {
  const error = React.useState(useRouteError());

  return <>{error && <p>{error}</p>}</>;
}
