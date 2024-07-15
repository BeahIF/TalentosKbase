import { ColaboradorEntity } from 'src/colaborador/colaborador.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// CREATE TABLE beatriz_dependente (
//   id uuid NOT NULL PRIMARY KEY,
//   nome VARCHAR(100) NOT NULL,
//   cpf VARCHAR(11) NOT NULL,
//   data_nascimento DATE NOT NULL,
//   parentesco VARCHAR(100) NOT NULL,
//   colaborador_id VARCHAR(36),
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   deleted_at TIMESTAMP NULL,
//   CONSTRAINT FK_colaborador
//       FOREIGN KEY (colaborador_id)
//       REFERENCES beatriz_colaborador(id)
// );
@Entity({ name: 'beatriz_dependente' })
export class DependenteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'cpf', length: 11, nullable: false })
  cpf: string;

  @Column({ name: 'data_nascimento', length: 12, nullable: false })
  data_nascimento: string;

  @Column({ name: 'parentesco', length: 100, nullable: false })
  parentesco: string;

  //   @Column({ name: 'colaborador_id', length: 100, nullable: false })
  //   colaborador_id: string;

  @ManyToOne(
    () => ColaboradorEntity,
    (colaboradorEntity) => colaboradorEntity.dependentes,
  )
  @JoinColumn({ name: 'colaborador_id' })
  colaborador_id: ColaboradorEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
