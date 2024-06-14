import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Model } from './model.entity';

@Entity()
export class Make {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  make_name: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Model, (model) => model.make)
  models: Model[];
}
