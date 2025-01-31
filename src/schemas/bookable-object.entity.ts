import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Order } from './order.entity';

@Table({ tableName: 'bookable_objects' })
export class BookableObject extends Model {
  @Column({ allowNull: false })
  name: string;

  @Column({ type: 'TEXT' })
  description: string;

  @Column({ allowNull: false })
  availableUnits: number;

  @Column({ type: 'DECIMAL(10,2)', allowNull: false })
  pricePerUnit: number;

  @HasMany(() => Order)
  orders: Order[];
}