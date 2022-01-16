import { ArgumentMetadata, BadGatewayException, BadRequestException, PipeTransform } from "@nestjs/common";

export class ValidacaoParametrosPipes implements PipeTransform{

    transform(value:any,metadata:ArgumentMetadata){

        console.log(`value: ${value} | metadata: ${metadata}`)

        if(!value){
            throw new BadRequestException(`O Valor do parametro ${metadata.data} deve ser informado`)
        }

        return value

    }
}