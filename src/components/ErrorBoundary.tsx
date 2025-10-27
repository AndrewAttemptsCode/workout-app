import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let message = "Unknown Error";

  if (isRouteErrorResponse(error)) {
    message = `${error.status} - ${error.statusText}`;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div>
      <h1>Oops!</h1>
      <p>{message}</p>
      <button onClick={() => navigate("/")}>Back to safety</button>
    </div>
  );

};

export default ErrorBoundary;