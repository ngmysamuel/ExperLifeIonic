import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class GetLocationService {

  address: string;
  unculturedString: any;

  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, private sessionService:SessionService) { }

  async getPosition(): Promise<any> {
    console.log("getPosition()")
    return this.geolocation.getCurrentPosition();
  }


  reverse(latitude: number, longitude: number) {
    console.log("reverse()");
    return this.nativeGeocoder.reverseGeocode(latitude, longitude, this.options);
  }

  marhshallString(str: any) {
      let country = (str.locality!=undefined) ? str.locality : "";
      let sublocal = (str.subLocality!=undefined) ? str.subLocality : "";
      let street = (str.thoroughfare!=undefined) ? str.thoroughfare : "";
      let block = (str.subThoroughfare!=undefined) ? str.subThoroughfare : "";
      let postalCode = (str.postalCode!=undefined) ? str.postalCode : "";
      this.address = sublocal+" "+street+" "+block+", "+country+" "+postalCode
      console.log("exiting marhshallString");
      this.sessionService.setAddress(this.address);
  }
}
