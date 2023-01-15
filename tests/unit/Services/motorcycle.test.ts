import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Motorcycle', function () {
  it('Create Motorcycle in DB', async function () {
    const motoInput: IMotorcycle = {
      model: 'CB 250F Twister',
      year: 2022,
      color: 'red',
      status: true,
      buyValue: 19500,
      category: 'Street',
      engineCapacity: 250,
    };

    const motoOutput: Motorcycle = new Motorcycle({
      id: '63c1c10301249251caccc688',
      model: 'CB 250F Twister',
      year: 2022,
      color: 'red',
      status: true,
      buyValue: 19500,
      category: 'Street',
      engineCapacity: 250,
    });

    sinon.stub(Model, 'create').resolves(motoOutput);

    const service = new MotorcycleService();
    const result = await service.create(motoInput);

    expect(result).to.be.deep.equal(motoOutput);

    sinon.restore();
  });
});