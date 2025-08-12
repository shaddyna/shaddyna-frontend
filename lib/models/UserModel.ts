/*import mongoose from 'mongoose';

export type UserRole = 'user' | 'vendor' | 'superAdmin';

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  shop?: mongoose.Schema.Types.ObjectId; 
};

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'vendor', 'superAdmin'],
      default: 'user',
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.models?.User || mongoose.model('User', UserSchema);

export default UserModel;*/

// lib/models/UserModel.ts
import mongoose from 'mongoose';

export type UserRole = 'user' | 'vendor' | 'superAdmin';

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  shop?: mongoose.Schema.Types.ObjectId;
  referralCode: string;
  referredBy?: string;
  referralCount: number;  
};

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'vendor', 'superAdmin'],
      default: 'user',
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
    },
    referralCode: {
      type: String,
      required: true,
      unique: true,
    },
    referredBy: {
      type: String,
      required: false,
    },
    referralCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.models?.User || mongoose.model('User', UserSchema);

export default UserModel;