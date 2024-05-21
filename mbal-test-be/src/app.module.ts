import { Module } from "@nestjs/common";
import { InfoController } from "./info-controller/info.controller";

@Module({
  imports: [],
  controllers: [InfoController],
  providers: [],
})
export class AppModule {}
