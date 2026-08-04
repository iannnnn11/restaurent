export interface Employee {

  id: number;

  companyId: string;

  name: string;

  password: string;

  role: 'Admin' | 'Manager' | 'Chef' | 'Waiter' | 'Cashier';

  phone: string;

  department: string;

  branch: string;

  joiningDate: string;

  status: 'Active' | 'Inactive';

}