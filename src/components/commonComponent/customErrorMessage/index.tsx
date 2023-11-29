const CustomErrorMessage = (props: any) => {
    return (
      <>
        {props?.touched && props?.errors ? (
          <div className="text-danger">{props?.errors}</div>
        ) : null}
      </>
    );
  };
  
  export default CustomErrorMessage;
  