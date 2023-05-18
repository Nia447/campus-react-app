import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <div className="d-flex align-items-center justify-content-center"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    }}>
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default Loading;
