import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Building } from '../building/building.entity'

@Entity()
export class FarmUnit {
	constructor(id ){
    if(id!=undefined)
		this.buildingID = id;
		this.isEnable = false;
		this.health = Math.floor(Math.random() * (100 - 50) + 50);
	}

	@PrimaryGeneratedColumn()
  		id: number;

  	@Column()
  		isEnable: boolean;

  	@Column()
  		buildingID: number;

  	@Column()
  		health: number;
}