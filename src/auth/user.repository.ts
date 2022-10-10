import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common"
import { DataSource, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(private dataSource: DataSource){
        super(User, dataSource.createEntityManager());
    }
    //untk signup
    async createUser(authCredentialDto: AuthCredentialsDto): Promise<void>{
            const {username, password} = authCredentialDto;
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = this.create({username, password : hashedPassword});
            try{
                await this.save(user);
            }catch(error){
                if(error.code == '23505'){
                    //duplicate username
                    throw new ConflictException('username already exists');
                }else{
                    throw new InternalServerErrorException()
                }
            }
    }
}