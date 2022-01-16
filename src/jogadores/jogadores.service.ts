import { BadRequestException, Injectable , Logger, NotFoundException } from '@nestjs/common';
import { Jogador } from './interfaces/jogador.interface';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}    

    private readonly logger = new Logger(JogadoresService.name)

    async criarJogador(criarJogadorDto: CriarJogadorDto) : Promise<Jogador>{        

        this.logger.log(`criarJogadorDto: ${criarJogadorDto}`)        

        const { email } = criarJogadorDto
        
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if (jogadorEncontrado){
            throw new BadRequestException(`Jogador com email ${email} já cadastrado.`)
        }

        const jogadorCriado = new this.jogadorModel(criarJogadorDto)

        return await jogadorCriado.save()
    }

    async atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto) : Promise<void>{        

        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

        if (!jogadorEncontrado){
            throw new BadRequestException(`Jogador com id ${_id} já cadastrado`)
        }

        await this.jogadorModel.findOneAndUpdate({_id},{$set: atualizarJogadorDto})
    }

    async consultarTodosJogadores():Promise<Jogador[]>{

        return await this.jogadorModel.find().exec()

    }

    async consultarJogadorPeloId(_id: string): Promise<Jogador>{

        console.log(`ID: ${_id}`)
        
        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();
        
        
        if(!jogadorEncontrado){
           throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
        }             

        return jogadorEncontrado
    }

    async deletarJogador(_id: string ): Promise<any>{

        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com id ${_id} não encontrado.`)
        }

        return await this.jogadorModel.deleteOne({_id}).exec();
        
    }    
}