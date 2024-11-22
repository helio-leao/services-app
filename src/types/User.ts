import ServiceCategory from "./ServiceCategory";
import ServiceSubcategory from "./ServiceSubcategory";

export default interface User {
  _id: string;
  name: string;
  address: {
    zip: string;
    street: string;
    district: string;
    number: string;
    complement: string;
  };
  contact: {
    cellphone: string;
    email: string;
  };
  service: {
    description: string;
    price: string;
    category: ServiceCategory;
    subcategory: ServiceSubcategory;
  };
  picture: {
    base64: string;
    mimeType: string;
  };
  gender: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
