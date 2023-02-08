import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/core/entities/base.entity';
import { StateEntity } from 'src/modules/states/entities/state.entity';

@Entity({ name: 'cities' })
export class CityEntity extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column()
  state_id: number;

  @ManyToOne(() => StateEntity, (state) => state.id)
  @JoinColumn({ name: 'state_id' })
  state: StateEntity;
}
