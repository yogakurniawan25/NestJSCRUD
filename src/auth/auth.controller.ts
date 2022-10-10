import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { GetUser } from "./dto/get-user.decorator";
import { User } from "./user.entity";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
        return this.authService.signIn(authCredentialsDto);
    }

    // @Post()
    // @UseGuards(AuthGuard())
    // login(@Body() authCredentialsDto: AuthCredentialsDto,
    // @GetUser() user:User,){
    //     return this.authService.signIn(authCredentialsDto, user);
    // }

    
}