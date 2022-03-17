import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'flog-project',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mysql',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'scr/common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
