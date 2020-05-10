// import { Injectable } from "@nestjs/common";
// import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
// import { InjectRepository } from "@nestjs/typeorm";
// import { UserRegistrationDto } from "dtos/user/user.registration.dto";
// import { ApiResponse } from "misc/api.response.class";
// import { Repository } from "typeorm";
// import * as crypto from 'crypto';

// @Injectable()
// export class UserService extends TypeOrmCrudService<UserRegistrationDto>{
//     constructor(@InjectRepository(User) private readonly user: Repository<UserRegistrationDto>){
//         super(user);
//     }

//     async register(data: UserRegistrationDto){
//         const passwordHash = crypto.createHash('sha512');
//         passwordHash.update(data.password);
//         const passwordHashString = passwordHash.digest('hex').toUpperCase();

//         const newUser: User = new User();
//         newUser.email = data.email;
//         newUser.passwordHash = passwordHashString;
//         newUser.forename = data.forename;
//         newUser.surname = data.surname;
//         newUser.phoneNumber = data.phoneNumber;
//         newUser.address = data.address;

//         try {
//             const savedUser = await this.user.save(newUser);

//             if(!savedUser){
//                 return new ApiResponse('error', -6001, 'Cannot register this user.');
//             }

//             return new ApiResponse('ok', 0, 'User account created.');

//         } catch (e) {
//             return new ApiResponse('error', -6001, 'Cannot register this user.');
//         }

//     }
// }
