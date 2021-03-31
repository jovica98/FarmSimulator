import { Controller, Get, Post, Param, Body, HttpCode, Header, Delete } from '@nestjs/common';
import { BuildingService} from './building.service';
import {Building} from './building.entity'

class PostBody{
	name: string;
	unitName: string
}

@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Get()
  getAllBuildings(): Promise<Building[]>  {
    return this.buildingService.findAll();
  }

  @Get(':id')
  getBuilding(@Param('id') id: number): Promise<Building>  {
    return this.buildingService.findOne(id);
  }

  @Post()
  @Header('Access-Control-Allow-Origin', '*')
  @HttpCode(200)
    create(@Body() postBody: PostBody) {
        return this.buildingService.post(postBody.name,postBody.unitName);
    }


  @Delete()
  async delete(): Promise<string>{
    return await this.buildingService.removeAll();
  }
}


