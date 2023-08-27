import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  //Deve receber (pelo corpo da requisição), os parâmetros: mediaId, postId e date:
  //Na ausência de campos obrigatórios, retorne o status code `400 Bad Request`.
  //Se não existirem registros compatíveis com o `mediaId` e o `postId`, retornar o status code `404 Not Found`.
  @Post('/publications')
  create(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationService.create(createPublicationDto);
  }
  //Caso não exista nenhuma publicação cadastrada, retornar um array vazio.
  //Filtros especiais:
  //published (true/false): publicações que já foram pro ar ou não.
  //after (date): publicações depois de determinada data.
  @Get('/publications')
  findAll() {
    return this.publicationService.findAll();
  }
  //Se não houver nenhum registro compatível, retornar status code 404 Not Found.
  @Get('/publications:id')
  findOne(@Param('id') id: string) {
    return this.publicationService.findOne(+id);
  }
  //Não deve ser possível alterar as informações de um registro de uma publicação que já foi publicada, somente as agendadas. Neste caso, retornar o status code `403 Forbidden`.
  //Se não houver nenhum registro compatível, retornar status code `404 Not Found`.
  //Se não existirem registros compatíveis com o `mediaId` e o `postId`, retornar o status code `404 Not Found`.
  @Patch('/publications:id')
  update(@Param('id') id: string, @Body() updatePublicationDto: UpdatePublicationDto) {
    return this.publicationService.update(+id, updatePublicationDto);
  }
  //Deve deletar o registro compatível com o id fornecido.
  //Se não houver nenhum registro compatível, retornar status code `404 Not Found`.
  @Delete('/publications:id')
  remove(@Param('id') id: string) {
    return this.publicationService.remove(+id);
  }
}
