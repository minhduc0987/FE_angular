import { BaseModel } from '../../_base/crud';

export class CustomerModel  extends BaseModel {
  id: number;
  username: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  idCardNumber: string;
  dateOfBbirth: string;
  gender: string;
  status: number; // 0 = Active | 1 = Suspended | Pending = 2
  type: number; // 0 = Business | 1 = Individual


  clear() {
    this.email = '';
    this.username = '';
    this.fullname = '';
    this.email = '';
    this.phone = '';
    this.address = '';
    this.idCardNumber = '';
    this.dateOfBbirth = '';
    this.gender = '';
    this.status = 1;
    this.type = 2;
  }
}
