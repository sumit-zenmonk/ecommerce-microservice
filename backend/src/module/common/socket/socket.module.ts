import { Global, Module } from "@nestjs/common";
import { SocketService } from "./socket.service";
import { UserRepository } from "src/module/user-module/infrastructure/repository/user.repo";
import { JwtHelperService } from "src/module/user-module/infrastructure/services/jwt.service";

@Global()
@Module({
    providers: [SocketService, JwtHelperService, UserRepository],
    exports: [SocketService],
})
export class SocketModule { }
