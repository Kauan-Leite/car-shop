import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const moto: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMoto = await this.service.create(moto);
      return this.res.status(201).json(newMoto);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    const motos = await this.service.getAll();
    return this.res.status(200).json(motos);
  }

  public async getByID() {
    const { id } = this.req.params;

    if (id.length !== 24) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }

    const moto = await this.service.getByID(id);

    if (typeof moto === 'string') {
      return this.res.status(404).json({ message: 'Motorcycle not found' });
    }
    
    return this.res.status(200).json(moto);
  }

  public async updateByID() {
    const { id } = this.req.params;
    const moto: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    if (id.length !== 24 || !id) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }

    const motos = await this.service.updateByID(id, moto);

    if (typeof motos === 'string') {
      return this.res.status(404).json({ message: 'Motorcycle not found' });
    }

    return this.res.status(200).json(motos);
  }
}

export default MotorcycleController;