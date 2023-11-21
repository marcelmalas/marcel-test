export enum UserRole {
  Viewer = "Viewer",
  Editor = "Editor",
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
}
