export type PostType = {
  text: string;
  id: number;
  likesCount: number;
  img: string;
};
export type ContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};
export type PhotosType = {
  small: string;
  large: string;
};
export type ProfyleType = {
  userId: number;
  lookingForAJobDescription: string;
  lookingForAJob: boolean;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
};
export type UserType = {
  name: string;
  id: number;
  status: string;
  photos: PhotosType;
  followed:boolean
};
