import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres", // 데이터베이스 종류
      host: "localhost", // DB 호스트
      port: 5432, // PostgreSQL 기본 포트
      username: "choeeunchong", // DB 사용자명
      password: "choeeunchong", // DB 비밀번호
      database: "piledtime", // DB 이름
      entities: [join(__dirname, "**", "*.entity.{ts,js}")],
      synchronize: true, // 개발 환경에서는 true (자동으로 테이블 생성)
    }),
    UserModule,
  ],
})
export class AppModule {}
