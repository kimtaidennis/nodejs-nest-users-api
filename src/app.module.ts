import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';
import { DatabaseModule } from './database/database.module';
import { MyLoggerModule } from './my-logger/my-logger.module';

@Module({
	imports: [UsersModule, EmployeesModule, DatabaseModule, MyLoggerModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
