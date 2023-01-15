import Motorcycle from '../../src/Domains/Motorcycle';
import IMotorcycle from '../../src/Interfaces/IMotorcycle';

export const motoInput: IMotorcycle = {
  model: 'CB 250F Twister',
  year: 2022,
  color: 'red',
  status: true,
  buyValue: 19500,
  category: 'Street',
  engineCapacity: 250,
};

export const motoOutput: Motorcycle = new Motorcycle({
  id: '63c1c10301249251caccc688',
  model: 'CB 250F Twister',
  year: 2022,
  color: 'red',
  status: true,
  buyValue: 19500,
  category: 'Street',
  engineCapacity: 250,
});

export const motoInputUpdated: IMotorcycle = {
  model: 'Suzuki GSX-R1000',
  year: 2001,
  color: 'black',
  status: true,
  buyValue: 57000,
  category: 'Street',
  engineCapacity: 300,
};

export const motoOutputUpdated: Motorcycle = new Motorcycle({
  id: '63c1c10301249251caccc688',
  model: 'Suzuki GSX-R1000',
  year: 2001,
  color: 'black',
  status: true,
  buyValue: 57000,
  category: 'Street',
  engineCapacity: 999,
});