export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  lastLogin: Date;
}

export interface AuthData {
  userId: string;
  pinHash: string;
  salt: string;
}