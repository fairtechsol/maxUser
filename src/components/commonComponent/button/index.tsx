import { Button, Spinner } from 'react-bootstrap';
import { MdOutlineLogin } from "react-icons/md";
function CustomButton({ children, loading, ...rest }: any) {
  return (
    <Button disabled={loading} {...rest}>
      {loading ? <Spinner animation="border" size="sm" role="status" /> : <MdOutlineLogin />}
      {children}
    </Button>
  );
}

export default CustomButton;
