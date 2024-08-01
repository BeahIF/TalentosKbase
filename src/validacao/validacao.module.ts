import { Module } from '@nestjs/common';
import { EmailUnicoValidator } from './email-unico.validator';
import { CPFUnicoValidator } from './cpf-unico.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColaboradorService } from 'src/colaborador/colaborador.service';
import { ColaboradorController } from 'src/colaborador/colaborador.controller';
import { ColaboradorEntity } from 'src/colaborador/colaborador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColaboradorEntity])],
  controllers: [ColaboradorController],
  providers: [ColaboradorService, EmailUnicoValidator, CPFUnicoValidator],
})
export class ValidacaoModule {}
