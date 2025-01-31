import { BookableObject } from "src/schemas/bookable-object.entity";

export const bookingProviders = [{ provide: 'BookingRepository', useValue: BookableObject }];