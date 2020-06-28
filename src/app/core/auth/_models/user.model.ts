import { BaseModel } from '../../_base/crud';

export class User extends BaseModel {
  id: number;
  username: string;
  fullname: string;
  phone: string;
  birthday: string;
  email: string;
  avatar: string;
  roles: any[];
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
    this.gender = '';
    this.image = '';
    this.idCardNumber = '';
  }
}
