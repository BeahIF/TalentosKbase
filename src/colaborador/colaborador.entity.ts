import { DependenteEntity } from '../dependente/dependente.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'beatriz_colaborador' })
export class ColaboradorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'email', length: 70, nullable: false })
  email: string;

  @Column({ name: 'usuario', length: 70, nullable: false })
  usuario: string;

  @Column({ name: 'cpf', length: 11, nullable: false })
  cpf: string;

  @Column({ name: 'data_nascimento', length: 12, nullable: false })
  data_nascimento: string;

  @Column({ name: 'data_admissao', length: 100, nullable: false })
  data_admissao: string;

  @Column({ name: 'data_demissao', length: 100, nullable: true })
  data_demissao: string;

  @Column({ name: 'motivo_demissao', length: 100, nullable: true })
  motivo_demissao: string;

  @OneToMany(
    () => DependenteEntity,
    (dependeteEntity) => dependeteEntity.colaborador_id,
  )
  dependentes: DependenteEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
  
  
}
