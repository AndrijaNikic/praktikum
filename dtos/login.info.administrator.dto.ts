export class LoginInfoAdministratorDto {
    administratorId: number;
    username: string;
    token: string;
    refreshToken: string;
    refreshTokenExpiresAt: string;

    constructor(id: number, username: string, jwt: string, refreshToken: string, refreshTokenExpiresAt: string){
        this.administratorId = id;
        this.username = username;
        this.token = jwt;
        this.refreshToken = refreshToken;
        this.refreshTokenExpiresAt = refreshTokenExpiresAt; 
    }
}