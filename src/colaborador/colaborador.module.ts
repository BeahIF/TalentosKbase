import { Module } from '@nestjs/common';
import { ColaboradorController } from './colaborador.controller';
import { ColaboradorRepository } from './colaborador.repository';
import { EmailUnicoValidator } from '../validacao/email-unico.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColaboradorEntity } from './colaborador.entity';
import { ColaboradorService } from './colaborador.service';

@Module({
  imports: [TypeOrmModule.forFeature([ColaboradorEntity])],
  controllers: [ColaboradorController],
  providers: [ColaboradorService, ColaboradorRepository, EmailUnicoValidator],
})
export class ColaboradorModule {}
