import Car from '../../src/Domains/Car';
import ICar from '../../src/Interfaces/ICar';

export const carInput: ICar = {
  model: 'Corsa',
  year: 2001,
  color: 'gray',
  status: true,
  buyValue: 10000,
  doorsQty: 2,
  seatsQty: 5,
};

export const carOutput: Car = new Car({
  id: '63c1c10301249251caccc688',
  model: 'Corsa',
  year: 2001,
  color: 'gray',
  status: true,
  buyValue: 10000,
  doorsQty: 2,
  seatsQty: 5,
});

export const carUpdated: ICar = {
  model: 'Corsa',
  year: 2001,
  color: 'red',
  status: true,
  buyValue: 10000,
  doorsQty: 2,
  seatsQty: 5,
};

export const carOutputUpdated: Car = new Car({
  id: '63c1c10301249251caccc688',
  model: 'Corsa',
  year: 2001,
  color: 'red',
  status: true,
  buyValue: 10000,
  doorsQty: 2,
  seatsQty: 5,
});