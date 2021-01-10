export interface User {
  email: string
  password: string
}

export interface LoginResponseToken {
  token: string
}

export interface Category {
  name: string
  imageSrc?: string
  user?: string
  _id?: string
}

export interface Position {
  _id?: string
  name: string
  cost: number
  category: string
  user?: string
  quantity?: number
}

export interface Message {
  message: string
}

export interface Order {
  list: OrderPosition[]
  _id?: string
  date?: Date
  order?: number
  user?: string
}

export interface OrderPosition {
  name: string
  cost: number
  quantity: number
  _id?: string
}
