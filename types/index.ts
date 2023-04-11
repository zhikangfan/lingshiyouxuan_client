export interface Product {
  product_name: string
  total: number
  count: number
}
export enum OrderType {
  SHIPPING_ADDRESS = 'shipping-address',
  TO_THE_STORE = 'to-the-store',
  APPOINTED_TIME = 'appointed-time'
}
export enum OrderStatus {
  QUEUE = 'queue',
  DONE = 'done',
  CANCEL = 'cancel'
}
export interface Order {
  status: 'queue' | 'done' | 'cancel'
  total_amount: number
  order_id: string
  type_title: string
  ctime: string
  address: string
  addressee: string
  phone_number: string
  time: string
  remarks: string
  isShowDetail: boolean
  type: 'shipping-address' | 'to-the-store' | 'appointed-time'
  order_products: Array<Product>
}
