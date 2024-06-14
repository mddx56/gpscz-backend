import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Polygon,
} from 'typeorm';
import { Geofence } from './geofence.entity';

@Entity()
export class Poligon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Polygon',
    srid: 4326,
    nullable: true,
  })
  polygon: Polygon;

  @Column('uuid')
  geofence_id: string;

  @ManyToOne(() => Geofence, (geo) => geo.polygons)
  @JoinColumn({ name: 'geofence_id' })
  geofence: Geofence;
}
