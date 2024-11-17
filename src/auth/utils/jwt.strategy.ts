import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from "dotenv";
import { TokenPayloadDto } from "../dtos/token-payload.dto";

dotenv.config();

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.TOKEN_SECRET
        })
    }

    async validate(payload: TokenPayloadDto) {
        return {
            user_id: payload.sub,
            email: payload.email
        }
    }
}
