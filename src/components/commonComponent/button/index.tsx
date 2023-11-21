import { Button } from "react-bootstrap";

function CustomButton(props: any) {
  return <Button {...props}> {props?.children} </Button>;
}

export default CustomButton;
