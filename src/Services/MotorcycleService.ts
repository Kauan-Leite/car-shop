import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private dataMotorcycle(infos: IMotorcycle): Motorcycle {
    return new Motorcycle({
      id: infos.id,
      model: infos.model,
      year: infos.year,
      color: infos.color,
      status: infos.status,
      buyValue: infos.buyValue,
      category: infos.category,
      engineCapacity: infos.engineCapacity,
    });
  }

  public async create(data: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMoto = await motorcycleODM.create(data);

    return this.dataMotorcycle(newMoto);
  }

  public async getAll() {
    const motorcycleODM = new MotorcycleODM();
    const allMotos = await motorcycleODM.findAll();

    return allMotos.map((moto) => this.dataMotorcycle(moto));
  }

  public async getByID(id: string) {
    const motorcycleODM = new MotorcycleODM();
    
    try {
      const moto = await motorcycleODM.findByID(id);

      if (moto !== null) {
        return this.dataMotorcycle(moto);
      }
      return 'NOT_FOUND';
    } catch (error) {
      return 'NOT_FOUND';
    }
  }

  public async updateByID(id: string, dataMoto: IMotorcycle) {
    const motoODM = new MotorcycleODM();

    try {
      const moto = await motoODM.update(id, dataMoto);

      if (moto !== null) {
        return this.dataMotorcycle(moto);
      }
      return 'NOT_FOUND';
    } catch (error) {
      return 'NOT_FOUND';
    }
  }
}

export default MotorcycleService;