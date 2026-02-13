import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
        <img src="../src/assets/img/adinkra.png"/>
        <p>404</p>
      <h1>Odo Nyera Fie Kwan</h1>
      <p>Love does not lose its way home</p>
      <Link to="/">Kɔ fie/Go home</Link>
    </div>
  );
}
