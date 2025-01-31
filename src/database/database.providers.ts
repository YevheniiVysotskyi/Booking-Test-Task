
import { Sequelize } from 'sequelize-typescript';
import { BookableObject } from 'src/schemas/bookable-object.entity';
import { Order } from 'src/schemas/order.entity';
import { ConfigService } from 'src/services/config.service';

export const databaseProviders = [
    {
      provide: 'SEQUELIZE',
      useFactory: async (configService: ConfigService) => {
        const sequelize = new Sequelize(configService.sequelizeOrmConfig);
        sequelize.addModels([BookableObject, Order]);
        await sequelize.sync();
        return sequelize;
      },
      inject: [ConfigService],
    },
  ];
