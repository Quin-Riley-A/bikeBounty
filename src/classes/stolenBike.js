import getBounty from './../utility/bounty.js';

export default class StolenBike {
  constructor(currentBike) {
    this.bike = currentBike.manufacturer_name;
    this.colors = currentBike['frame_colors'].map((colors) => colors).join(', ');
    this.status = currentBike.status;
    this.serial = currentBike.serial;
    this.location = currentBike.stolen_location;
    this.image = currentBike.large_img;
    this.bounty = getBounty(currentBike.manufacturer_name);
  }

  getBikeImg(currentBike) {
    if (currentBike.large_img === null) {
      return './../assets/img/penny-farthing.png'
    } else {
      return currentBike.large_img;
    }
  }
}