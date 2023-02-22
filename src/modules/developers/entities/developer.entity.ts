import { UserEntity } from 'src/core/entities';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../../core/entities/base.entity';
import { TechnologyEntity } from './technology.entity';

@Entity({ name: 'developers' })
export class DeveloperEntity extends BaseEntity {
  @Column({ default: false })
  acceptedRemoteWork: boolean;

  @Column()
  monthsOfExperience: number;

  @Column()
  user_id: number;

  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  @ManyToMany(() => TechnologyEntity)
  @JoinTable({ name: 'developers_technologies' })
  technologies: TechnologyEntity[];
}
