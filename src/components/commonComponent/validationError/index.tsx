import "./style.scss";
const ValidationError = ({ touched, errors }: any) => {
  return (
    <>
      {touched && errors && (
        <p className="validationError p-0">{errors as string}</p>
      )}
    </>
  );
};

export default ValidationError;
