export enum EnumStatus {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
}

export interface IUser {
  _id: string
  fullName: string
  avatarUrl: string
  // email: string
}

export interface IComment {
  user: IUser
  text: string
}

export interface IPost {
  _id: string
  title: string
  text: string
  tags: string[]
  viewsCount: number
  imageUrl: string
  user: {
    _id: string
    fullName: string
    email: string
    passwordHash: string
    createdAt: string
    updatedAt: string
  }
  createdAt: string
  updatedAt: string
}
