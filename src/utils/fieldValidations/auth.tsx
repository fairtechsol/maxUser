import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

/*** Change Passworsd */
export const changePassValidationSchema = Yup.object({
  newPassword: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      /^(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])/,
      "Password must contain at least four alphabet letters"
    )
    .matches(
      /^(?=.*\d.*\d.*\d.*\d)/,
      "Password must contain at least four numbers"
    ),
  oldPassword: Yup.string().required("Password is required"),
  // confirmNewPassword: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .required("Password is required"),
  // transactionPassword: Yup.string().required(
  //   "Transaction Password is required"
  // ),
});

export const changePasswordValidation = (item: any) => {
  return Yup.object({
    oldPassword: Yup.string()
      .required("Old Password is required")
      .test({
        name: "oldPassword",
        message: "Old Password Does Not Match",
        test: async function (value: any) {
          try {
            if (value) {
              return item;
            }
            return true;
          } catch (error: any) {
            console.log(error);
          }
        },
      }),
    newPassword: Yup.string()
      .required("New password is required")
      .matches(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .matches(
        /^(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])/,
        "Password must contain at least four alphabet letters"
      )
      .matches(
        /^(?=.*\d.*\d.*\d.*\d)/,
        "Password must contain at least four numbers"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
      .required("Confirm password is required"),
  });
};
