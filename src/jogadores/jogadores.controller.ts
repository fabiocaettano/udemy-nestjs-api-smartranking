import { Body, Controller , Get, Post, Query, Delete, Put, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { ValidacaoParametrosPipes } from '../common/pipes/validacao-parametros-pipes';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService){}

    @Post()
    @UsePipes(ValidationPipe)
    async criar(
        @Body() criarJogadorDto: CriarJogadorDto
    ){
        await this.jogadoresService.criarJogador(criarJogadorDto)
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizar(
        @Body() atualizarJogadorDto: AtualizarJogadorDto,
        @Param('_id',ValidacaoParametrosPipes) _id: string
    ): Promise<void>{

        await this.jogadoresService.atualizarJogador(_id,atualizarJogadorDto)

    }

    @Get()
    async consultarJogadores(): Promise<Jogador[]>{                 
        
        return this.jogadoresService.consultarTodosJogadores()       

    } 

    @Get('/:_id')
    async consultarJogadorPeloId(
        @Param('_id') _id: string): Promise<Jogador>{       

        return await this.jogadoresService.consultarJogadorPeloId(_id)
        
    }
    
    @Delete('/:_id')
    async deletarJogador(@Param('_id', ValidacaoParametrosPipes) _id : string ) : Promise<void>{

        this.jogadoresService.deletarJogador(_id)

    }
}