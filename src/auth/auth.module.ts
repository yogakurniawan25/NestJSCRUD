import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Module({
    imports: [PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: 'topSecret51',
            signOptions: {
                expiresIn: 3600 //dalam hitungan detik
            }
        }),
        TypeOrmModule.forFeature([User])],
        controllers: [AuthController],
        providers: [AuthService, UserRepository, JwtStrategy],
        exports: [JwtStrategy, PassportModule]
  })
  export class AuthModule {}