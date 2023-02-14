import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../core/entities/base.entity';

@Entity({ name: 'countries' })
export class CountryEntity extends BaseEntity {
  @Column({ length: 100, unique: true })
  name: string;

  @Column({ length: 100 })
  language: string;
}
