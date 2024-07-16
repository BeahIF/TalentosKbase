import { Module } from '@nestjs/common';
import { DependenteController } from './dependente.controller';
// import { DependenteRepository } from './dependente.repository';
import { EmailUnicoValidator } from '../validacao/email-unico.validator';
import { CPFUnicoValidator } from '../validacao/cpf-unico.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DependenteEntity } from './dependente.entity';
import { DependenteService } from './dependente.service';
import { ColaboradorRepository } from 'src/colaborador/colaborador.repository';
import { ColaboradorEntity } from 'src/colaborador/colaborador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DependenteEntity, ColaboradorEntity])],
  controllers: [DependenteController],
  providers: [
    DependenteService,
    ColaboradorRepository,
    // DependenteRepository,
    EmailUnicoValidator,
    CPFUnicoValidator,
  ],
})
export class DependenteModule {}
