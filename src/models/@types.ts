import { Document } from 'mongoose';

export interface User {
  name: string;
  lastName: string;
  email: string;
  password: string;
  deleted: boolean;
}

export interface UserDocument extends Document, User {

}

export interface New {
  title: string;
  content: string;
  userId: string;
  imageUrl?: string;

  createdAt: Date;
  updatedAt: Date;
  deleteAt: Date;
  deleted: boolean;
}

export interface NewDocument extends Document, New {

}