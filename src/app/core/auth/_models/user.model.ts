import { BaseModel } from '../../_base/crud';
import { Address } from './address.model';
import { SocialNetworks } from './social-networks.model';

export class User extends BaseModel {
  id: number;
  username: string;
  fullname: string;
  phone: string;
  birthday: string;
  email: string;
  avatar: string;
  address: Address;
  roles: number[];
  companyName: string;
  accessToken: string;
  refreshToken: string;
  password: string;
  gender: string;
  image: string;
  idCardNumber: string;

  clear(): void {
    this.id = undefined;
    this.username = '';
    this.password = '';
    this.email = '';
    this.roles = [];
    this.fullname = '';
    this.accessToken = 'access-token-' + Math.random();
    this.refreshToken = 'access-token-' + Math.random();
    this.avatar = './assets/media/users/default.jpg';
    this.companyName = '';
    this.phone = '';
    this.address = new Address();
    this.address.clear();
    this.gender = '';
    this.image = '';
    this.idCardNumber = '';
  }
}
