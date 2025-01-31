import { Order } from "src/schemas/order.entity";

export const ordersProviders = [{ provide: 'OrdersRepository', useValue: Order }];
