import { Module } from '@nestjs/common';
import { ColaboradorModule } from './colaborador/colaborador.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLConfigService } from './config/mysql.config.service';
import { ConfigModule } from '@nestjs/config';
import { DependenteModule } from './dependente/dependente.module';

@Module({
  imports: [
    ColaboradorModule,
    DependenteModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: MySQLConfigService,
      inject: [MySQLConfigService],
    }),
  ],
})
export class AppModule {}
