import ServiceCategory from "./ServiceCategory";
import ServiceSubcategory from "./ServiceSubcategory";

export default interface User {
  _id: string;
  name: string;
  address: {
    zip: string;
    street: string;
    number: string;
    complement: string;
  };
  contact: {
    cellphone: string;
    email: string;
  };
  service: {
    description: string;
    category: ServiceCategory;
    subcategory: ServiceSubcategory;
  };
  picture: {
    base64: string;
    mimeType: string;
  };
  gender: string;
  verified: boolean;
}
