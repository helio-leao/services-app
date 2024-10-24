export default interface ServiceSubcategory {
  _id: string;
  name: string;
  serviceCategory: {
    _id: string;
    name: string;
    pictureUrl: string;
  };
}
