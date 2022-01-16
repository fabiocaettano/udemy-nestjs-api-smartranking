import { Body, Post, Get, Put, Controller, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { Categoria } from './interfaces/categoria.interface';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {
    
    constructor(private readonly categoriaService: CategoriasService){}

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(
        @Body()criarCategoriaDto : CriarCategoriaDto): Promise<Categoria>{
        return await this.categoriaService.criarCategoria(criarCategoriaDto)
    }

    @Get()
    async consultarCategoria(): Promise<Array<Categoria>>{
        return await this.categoriaService.consultarTodasCategorias();
    }

    @Get('/:categoria')
    async consultarCategoriaPeloId(
        @Param('categoria') categoria: string): Promise<Categoria>{
            return await this.categoriaService.consultarCategoriaPeloId(categoria);

    }

    @Put('/:categoria')
    async atualizarCategoria(
        @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
        @Param('categoria') categoria: string): Promise<void>{
            await this.categoriaService.atualizarCategoria(categoria, atualizarCategoriaDto)        
    }

    @Post('/:categoria/jogadores/:_id')
    async atribuirCategoriaJogador(
        @Param() params: string[]): Promise<void>{
            console.log(`params: ${params}`)
            return await this.categoriaService.atribuirCategoriaJogador(params)
            
    }

    
}
