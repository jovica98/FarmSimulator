import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { FarmUnit } from '../farmUnit/farmUnit.entity'


@Entity()
export class Building {
  constructor(name,unitName){
    this.name = name;
    this.unitName = unitName;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  unitName: string;

}