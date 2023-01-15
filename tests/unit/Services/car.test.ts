import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import { carInput, carOutput, carOutputUpdated, carUpdated } from '../../utils/Car';

describe('Car', function () {
  it('Create Car in DB', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.create(carInput);

    expect(result).to.be.deep.equal(carOutput);

    sinon.restore();
  });

  it('List All Cars in DB', async function () {
    sinon.stub(Model, 'find').resolves([carOutput]);

    const service = new CarService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal([carOutput]);

    sinon.restore();
  });

  it('List Cars in DB by ID with SUCCESS', async function () {
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

  it('Update Car in DB with SUCCESS', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.create(carInput);

    expect(result).to.be.deep.equal(carOutput);

    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutputUpdated);

    const resultUpdated = await service.updateByID('63c1c10301249251caccc688', carUpdated);

    expect(resultUpdated).to.be.deep.equal(carOutputUpdated);

    sinon.restore();
  });

  it('Update Car in DB with FAILED', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.create(carInput);

    expect(result).to.be.deep.equal(carOutput);

    sinon.stub(Model, 'findByIdAndUpdate').resolves();

    const resultUpdatedA = await service.updateByID('63c1c10301249251caccc688', carUpdated);

    expect(resultUpdatedA).to.be.deep.equal('NOT_FOUND');

    sinon.restore();

    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    const resultUpdatedB = await service.updateByID('63c1c10301249251caccc688', carUpdated);

    expect(resultUpdatedB).to.be.deep.equal('NOT_FOUND');

    sinon.restore();
  });
});