import { Button, Spinner } from "react-bootstrap";
function CustomButton({ children, loading, ...rest }: any) {
  return (
    <Button disabled={loading} {...rest} style={{border:0}}>
      {loading ? <Spinner animation="border" size="sm" role="status" /> : null}
      {children}
    </Button>
  );
}

export default CustomButton;
