import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './building.entity';


@Injectable()
export class BuildingService {
   constructor(
    @InjectRepository(Building)
    private buildingsRepository: Repository<Building>,
  ) {}

  findAll(): Promise<Building[]> {
    return this.buildingsRepository.find();
  }

  findOne(id: number): Promise<Building> {
    return this.buildingsRepository.findOne(id);
  }

  async post(name: string, unitName: string): Promise<string>{
  	await this.buildingsRepository.save(new Building(name,unitName));
    return 'OK'
  }
}
