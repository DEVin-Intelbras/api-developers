import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../core/entities/base.entity';

@Entity({ name: 'technologies' })
export class TechnologyEntity extends BaseEntity {
  @Column({ length: 100, unique: true })
  name: string;
}
