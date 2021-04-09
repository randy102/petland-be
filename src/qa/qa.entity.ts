import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({name: 'Qa'})
export default class QaEntity extends BaseEntity<QaEntity>{
    @ApiProperty()
    @Column()
    @Expose()
    detail: string;

    @ApiProperty()
    @Column()
    @Expose()
    postID: string;

    constructor(qa: Partial<QaEntity>){
        super(qa, QaEntity);
    }
}
