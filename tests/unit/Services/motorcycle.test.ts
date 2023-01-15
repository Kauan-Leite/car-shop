import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { motoInput, motoInputUpdated, motoOutput, motoOutputUpdated } from '../../utils/Motorcycle';

describe('Motorcycle', function () {
  it('Create Motorcycle in DB', async function () {
    sinon.stub(Model, 'create').resolves(motoOutput);

    const service = new MotorcycleService();
    const result = await service.create(motoInput);

    expect(result).to.be.deep.equal(motoOutput);

    sinon.restore();
  });

  it('List All Motorcycles in DB', async function () {
    sinon.stub(Model, 'find').resolves([motoOutput]);

    const service = new MotorcycleService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal([motoOutput]);

    sinon.restore();
  });

  it('List Cars in DB by ID with SUCCESS', async function () {
    sinon.stub(Model, 'findById').resolves(motoOutput);

    const service = new MotorcycleService();
    const result = await service.getByID('63c1c10301249251caccc688');

    expect(result).to.be.deep.equal(motoOutput);

    sinon.restore();
  });

  it('List Cars in DB by ID with FAILED', async function () {
    sinon.stub(Model, 'findById').resolves();

    const service = new MotorcycleService();
    const resultA = await service.getByID('63c1c10301249251caccc688');

    expect(resultA).to.be.deep.equal('NOT_FOUND');

    sinon.restore();

    sinon.stub(Model, 'findById').resolves(null);
    const resultB = await service.getByID('63c1c10301249251caccc688');
    expect(resultB).to.be.deep.equal('NOT_FOUND');

    sinon.restore();
  });

  it('Update Car in DB with SUCCESS', async function () {
    sinon.stub(Model, 'create').resolves(motoOutput);

    const service = new MotorcycleService();
    const result = await service.create(motoInput);

    expect(result).to.be.deep.equal(motoOutput);

    sinon.stub(Model, 'findByIdAndUpdate').resolves(motoOutputUpdated);

    const resultUpdated = await service.updateByID('63c1c10301249251caccc688', motoInputUpdated);

    expect(resultUpdated).to.be.deep.equal(motoOutputUpdated);

    sinon.restore();
  });

  it('Update Car in DB with FAILED', async function () {
    sinon.stub(Model, 'create').resolves(motoOutput);

    const service = new MotorcycleService();
    const result = await service.create(motoInput);

    expect(result).to.be.deep.equal(motoOutput);

    sinon.stub(Model, 'findByIdAndUpdate').resolves();

    const resultUpdatedA = await service.updateByID('63c1c10301249251caccc688', motoInputUpdated);

    expect(resultUpdatedA).to.be.deep.equal('NOT_FOUND');

    sinon.restore();

    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    const resultUpdatedB = await service.updateByID('63c1c10301249251caccc688', motoInputUpdated);

    expect(resultUpdatedB).to.be.deep.equal('NOT_FOUND');

    sinon.restore();
  });
});