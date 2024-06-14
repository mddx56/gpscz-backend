import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WebHookEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  data: string;

  @Column()
  state: number;

  @Column()
  processiong_error: string;

  @Column()
  external_id: string;
}
