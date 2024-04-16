import * as Yup from "yup";

const bangladeshiMobileRegex = "^(?:\\+88|88)?(01[3-9]\\d{8})$";

export const signUpSchema = Yup.object({
  mobile: Yup.string()
  .matches(bangladeshiMobileRegex, {
    message: "Invalid Bangladeshi number",
    excludeEmptyString: false,
  })
  .required(),
  password: Yup.string().min(8).required("Password is a required field"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const customerSchema = Yup.object({
  customerMobile: Yup.string()
  .matches(bangladeshiMobileRegex, {
    message: "Invalid Bangladeshi number",
    excludeEmptyString: false,
  })
  .required(),
  customerName: Yup.string().min(2).required("Customer Name is a required field"),
  customerAddress: Yup.string().required("Customer Address is a required field"),
});

export const productSchema = Yup.object({
  productName: Yup.string().required("Product Name is a required field"),
  productCompany: Yup.string().required("Product Company is a required field"),
  madeIn: Yup.string().required("Product Country is a required field"),
});