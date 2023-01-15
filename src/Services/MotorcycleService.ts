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
}

export default MotorcycleService;