import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './apis/user/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { PointTransactionModule } from './apis/pointTranscation/pointTransaction.module';
import { JwtRefreshStrategy } from './common/auth/jwt-refresh.stategy';
import { JwtGoogleStrategy } from './common/auth/jwt-social-google.stategy';
import { PointHisoryModule } from './apis/pointHistory/pointHistory.module';
import { BudgetModule } from './apis/budget/budget.module';
import { BannerImageModule } from './apis/bannerImage/bannerImage.module';
import { ScheduleModule } from './apis/schedule/schedule.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoneyBookModule } from './apis/moneyBook/moneyBook.module';
import { DetailScheduleModule } from './apis/detailSchedule/detailSchedule.module';
import { BoardModule } from './apis/board/board.module';
import { ShareScheduleModule } from './apis/sharedList/sharedList.module';
import { MainCategoryModule } from './apis/mainCategory/mainCategory.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    BudgetModule,
    PointHisoryModule,
    PointTransactionModule,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    BannerImageModule,
    ScheduleModule,
    MoneyBookModule,
    DetailScheduleModule,
    BoardModule,
    ShareScheduleModule,
    MainCategoryModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    }), //
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'flog_database',
      // host: '10.63.130.161',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'flog',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
      timezone: 'Asia/Seoul',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://flog_redis:6379',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
