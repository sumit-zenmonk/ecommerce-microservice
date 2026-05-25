import { BadRequestException, Injectable, } from "@nestjs/common";
import { UserRepository } from "src/module/finance-server/infrastructure/repository/user.repo";

@Injectable()
export class UserRegisterService {
    constructor(
        private readonly userRepo: UserRepository,
    ) { }

    async userRegister(payload: any) {
        const isUserExists = await this.userRepo.findByEmail(payload.email);
        if (isUserExists.length) {
           console.warn(`Duplicate skipped: ${isUserExists[0].email}`);
            return;
        }

        await this.userRepo.register(payload);
        return;
    }
}