import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../core/entities/base.entity';
import { CityEntity } from '../../cities/entities/city.entity';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ nullable: false })
  salt: string; // Para definir um padrão para o HASH da senha

  @Column({ default: false })
  active: boolean;

  @Column()
  city_id: number;

  @ManyToOne(() => CityEntity, (city) => city.id)
  @JoinColumn({
    name: 'city_id',
  })
  city: CityEntity;

  @Column({ nullable: false })
  password: string;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
