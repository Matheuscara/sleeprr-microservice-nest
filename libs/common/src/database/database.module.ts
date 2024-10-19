import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

// DOCUMENTATION -> CONFIG DE CONEXAO COM O BANCO DE DADOS
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (ConfigService: ConfigService) => ({
        uri: ConfigService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  // DOCUMENTATION -> IMPLEMENTA O FOR FEATURE DO
  //  MONGOOSE PARA SETAR NO MONGO OS MODELS REQUERIDOS NO MICROSSERVICES
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
