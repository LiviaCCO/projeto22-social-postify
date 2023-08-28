import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, ValidationPipe, UsePipes, ParseIntPipe, HttpCode } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  //Na ausência de campos obrigatórios, retorne o status code 400 Bad Request.
  //Impeça a criação de um novo registro com a mesma combinação de title e username (caso exista, retornar status code 409 Conflict).
  @Post('/medias')
  @UsePipes(ValidationPipe)
  create(@Body() body: CreateMediaDto) {
    try{
      return this.mediasService.create(body);
    } catch (error){
      console.log(error); //HttpException
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }
  //retornar todas as medias
  // ou [] para vazio
  @Get('/medias')
  findAll() {
    return this.mediasService.findAll();
  }
  //retornar o registro compatível com o id fornecido:
  //Se não houver nenhum registro compatível, retornar status code 404 Not Found.
  @Get('/medias:id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.mediasService.findOne(+id);
  }
  //Deve atualizar o registro compatível com o id fornecido:
  //Se não houver nenhum registro compatível, retornar status code 404 Not Found.
  //A mudança não pode violar a regra de title e username únicos. Se isso acontecer, retorne o status code 409 Conflict.
  @Patch('/medias:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id', ParseIntPipe) id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediasService.update(+id, updateMediaDto);
  }
  //Deve deletar o registro compatível com o id fornecido.
  //Se não houver nenhum registro compatível, retornar status code `404 Not Found`.
  //A media só pode ser deletada se não estiver fazendo parte de nenhuma publicação (agendada ou publicada). Neste caso, retornar o status code `403 Forbidden`.
  @Delete('/medias:id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.mediasService.remove(+id);
  }
}
