import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: 'postgresql://bd_todo_ya_user:LRIJ8cTFh86xf4vFT8T0pHMcfSpVwDjf@dpg-d2n7h77diees73c9ic3g-a.oregon-postgres.render.com:5432/bd_todo_ya',
  autoLoadEntities: true,
  synchronize: true,
  //dropSchema:true,
  ssl: {
    rejectUnauthorized: false,
  },
};
