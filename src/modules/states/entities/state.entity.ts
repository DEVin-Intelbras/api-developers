import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../core/entities/base.entity';
import { CountryEntity } from '../../countries/entities/country.entity';

@Entity({ name: 'states' })
export class StateEntity extends BaseEntity {
  @Column({ length: 100, unique: true })
  name: string;

  @Column({ length: 2, unique: true })
  initials: string;

  @Column()
  country_id: number;

  @ManyToOne(() => CountryEntity, (country) => country.id)
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;
}
