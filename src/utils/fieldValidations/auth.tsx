import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

/*** Change Passworsd */
export const changePassValidationSchema = Yup.object({
  newPassword: Yup.string().required("Password is required"),
  oldPassword: Yup.string().required("Password is required"),
  // confirmNewPassword: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .required("Password is required"),
  // transactionPassword: Yup.string().required(
  //   "Transaction Password is required"
  // ),
});
