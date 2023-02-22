import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../core/entities/base.entity';
import { UserEntity } from 'src/core/entities';

@Entity({ name: 'recruiters' })
export class RecruiterEntity extends BaseEntity {
  @Column()
  user_id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;
}
