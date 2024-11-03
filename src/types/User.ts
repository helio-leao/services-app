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
    title: string;
    description: string;
    category: ServiceCategory;
    subcategory: ServiceSubcategory;
  };
  gender: string;
  photoUrl: string;
}
