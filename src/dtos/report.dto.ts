import {IsNotEmpty, IsNumber, IsString, IsPositive, IsOptional} from "class-validator";
import {Exclude, Expose} from "class-transformer";
import { ReportType } from "src/data";

export class ReportDto {
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsString()
    @IsNotEmpty()
    source: string;
}

export class UpdateReportDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    source: string;
}

export class ReportResponseDto {
    id: string;
    source: string;
    amount: number;
    @Exclude()
    created_at: Date;
    @Exclude()
    updated_at: Date;
    type: ReportType

    @Expose({name: "createdAt"})
    transformCreateAt() {
        return this.created_at;
    }
    
    constructor(partial: Partial<ReportResponseDto>) {
        Object.assign(this, partial);
    }
}