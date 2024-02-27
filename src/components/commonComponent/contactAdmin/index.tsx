import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // Assuming you're using React Router for routing

function ContactAdmin() {
  return (
    <Container className="mt-5 pt-5 text-center d-flex flex-column justify-content-center align-items-center">
      <h1>Contact Admin</h1>
      <Link to="home">
        <Button variant="primary">Back to Home</Button>
      </Link>
    </Container>
  );
}

export default ContactAdmin;
