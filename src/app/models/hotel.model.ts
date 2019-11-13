export class HotelModel{
    code: String;
    name: String;
    address: String;
    phone: String;
    email: String;
    category: Number; //stars
    image: String;
    cityId: String;
    countryId?: String;
    cityName?: String;
    countryName?: String;
}