import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { BookableObject } from './bookable-object.entity';

@Table({ tableName: 'orders' })
export class Order extends Model {
  @ForeignKey(() => BookableObject)
  @Column({ allowNull: false })
  bookingObjectId: number;

  @BelongsTo(() => BookableObject)
  bookingObject: BookableObject;

  @Column({ allowNull: false })
  quantity: number;

  @Column({ allowNull: false })
  startDate: Date;

  @Column({ allowNull: false })
  endDate: Date;
}