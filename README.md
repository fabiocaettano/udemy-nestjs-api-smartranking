## Node.js Microservices: NestJS, RabbitMQ and Cloud Services

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


## v0002

Instalação da Biblioteca uuid:
```bash
$ npm install uuid
```

Implanttação:
1. Entidade Jogadores
2. Persistência em memôria.


## v0003

Instalação da Biblioteca mongoose:
```bash
$ npm install @nestjs/mongoose mongoose
```

Aviso importante, se a versão do mongoose for inferior a 5.11.0 é necessário instalar a biblioteca:
```bash
$ npm install –save-dev @types/mongoose
```

Implantação:
1. Configuração da conexão com o MongoDb (src>>app.module.ts);
2. Criação do JogadorSchema;
3. Refatoração da interface Jogador, inclusão do Document do mongoose.


## v0004

Instalação da Biblioteca dotenv:
```bash
$ npm install dotenv
```

Implantação:
1. Registrar JogadorSchema na classe JogadoresModule (src>>jogadores>>jogadores.module.ts);
2. Incluir na importação da classe JogadoresService a classe 
InjectModel do nestjs/mongoose e a classe Model do mongoose;
3. Incluir o construtor:
```
constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}
```
4. Refatorar metódos para realizar a persistência na coleção Jogadores.

## v0005

Instalação da biblioteca de validação:
```bash
npm install class-validator
npm install class-transformer
```
Implantação:
1. Incluir validação utilizando a biblioteca class-validator
   Refatorar a classe CriarJogadorDto inserindo as anotações @IsNotEmpty e @IsEmail

2. Criado a classe AtualizarJogadorDto com as mesmas anotações

3. Criado a classe JogadoresValidacaoParametrosPipes (src >> jogadores >> pipes)


## v0006

Implantação:
1. Refatoração do Controler e Service da entidade Jogadores para persistência de dados.


## v0007
Implantação:
1. Arquivo Dockerfile
2. Arquivo Kubernetes


## v0008
Configuração da entidade Categorias:
```
$ nest g module categorias
$ nest g controller categorias
$ nest g service categorias
```

## v0009 e v0010
Implantação:
1. Criar Categorias
2. Consultar todas as categorias

## v0011
Implantação:
1. Consultar categorias pelo ID

## v0012
Implantação:
1. Atribuir Categoria a Jogadores

## v0013
Implantação:
1. Comunicação entre os serviços.

Exportar a classe JogadoresService:
```
@Module({
  imports: [MongooseModule.forFeature([{name:'Jogador',schema: JogadorSchema}])],
  controllers: [JogadoresController],
  providers: [JogadoresService],
  exports:[JogadoresService]
})
```

Para utilizá-la basta importá-la e declará-la no construtor da classe que necessit utilizá-la:
```
import { JogadoresService } from 'src/jogadores/jogadores.service';

constructor(@InjectModel('Categoria') 
        private readonly categoriaModel: Model<Categoria>,
        private readonly jogadoresService: JogadoresService){}    

///dentro de um metódo
await this.jogadoresService.consultarJogadorPeloId(_id)
```

## v0014
Implantar:
1. Tratamento global para tratar as exceções;
2. Interceptar as exceçẽs em toda aplicação e tratar nesta classe AllExceptionsFilter que implementa a classe do Nest ExcpetionFilter.

Mas para classe AllExcpetionFilter funcione é necessário declará-la no arquivo main.ts:
```
app.useGlobalFilters(new AllExceptionFilter());
``'


## v0015
Implantar:
1. Configurar classe desafios:
```
$ nest g module desafios
$ nest g controller desafios
$ nest g service desafios
```


## Referência

- Website - [https://nestjs.com](https://nestjs.com/)