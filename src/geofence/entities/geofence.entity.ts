import { User } from 'src/auth/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Circle } from './circle.entity';
import { Poligon } from './polygon.entity';

@Entity()
export class Geofence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, (us) => us.geofences)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Circle, (circle) => circle.geofence)
  circles: Circle[];

  @OneToMany(() => Poligon, (poly) => poly.geofence)
  polygons: Poligon[];
}
