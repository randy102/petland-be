import { Controller, Get, HttpStatus } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/roles.guard";
import { UserRole } from "src/user/user.entity";
import CityEntity from "./city.entity";
import { CityService } from "./city.service";

@Controller('api/city')
@ApiTags('City')
export class CityController {
    constructor( private readonly cityService: CityService){}

    @Get()
    @ApiResponse({type: CityEntity, status: HttpStatus.OK})
    @Roles(UserRole.USER)
    getCity(): Promise<CityEntity[]>{
        return this.cityService.getCity();
    }
}
