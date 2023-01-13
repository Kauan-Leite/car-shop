import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';

describe('Car', function () {
  it('Create Car in DB', async function () {
    const carInput: ICar = {
      model: 'Corsa',
      year: 2001,
      color: 'gray',
      status: true,
      buyValue: 10000,
      doorsQty: 2,
      seatsQty: 5,
    };

    const carOutput: Car = new Car({
      id: '63c1c10301249251caccc688',
      model: 'Corsa',
      year: 2001,
      color: 'gray',
      status: true,
      buyValue: 10000,
      doorsQty: 2,
      seatsQty: 5,
    });

    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.create(carInput);

    expect(result).to.be.deep.equal(carOutput);

    sinon.restore();
  });

  it('List All Cars in DB', async function () {
    const carOutput: Car = new Car({
      id: '63c1c10301249251caccc688',
      model: 'Corsa',
      year: 2001,
      color: 'gray',
      status: true,
      buyValue: 10000,
      doorsQty: 2,
      seatsQty: 5,
    });

    sinon.stub(Model, 'find').resolves([carOutput]);

    const service = new CarService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal([carOutput]);

    sinon.restore();
  });

  it('List Cars in DB by ID with SUCCESS', async function () {
    const carOutput: Car = new Car({
      id: '63c1c10301249251caccc688',
      model: 'Corsa',
      year: 2001,
      color: 'gray',
      status: true,
      buyValue: 10000,
      doorsQty: 2,
      seatsQty: 5,
    });

    sinon.stub(Model, 'findById').resolves(carOutput);

    const service = new CarService();
    const result = await service.getByID('63c1c10301249251caccc688');

    expect(result).to.be.deep.equal(carOutput);

    sinon.restore();
  });

  it('List Cars in DB by ID with FAILED', async function () {
    sinon.stub(Model, 'findById').resolves();

    const service = new CarService();
    const resultA = await service.getByID('63c1c10301249251caccc688');

    expect(resultA).to.be.deep.equal('NOT_FOUND');

    sinon.restore();

    sinon.stub(Model, 'findById').resolves(null);
    const resultB = await service.getByID('63c1c10301249251caccc688');
    expect(resultB).to.be.deep.equal('NOT_FOUND');

    sinon.restore();
  });
});