import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';

require('dotenv').config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI,{useNewUrlParser: true}),
    JogadoresModule,
    CategoriasModule,
    DesafiosModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}