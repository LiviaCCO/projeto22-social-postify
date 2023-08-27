import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  //Deve receber (pelo corpo da requisição), os parâmetros: title, text e image, sendo o último opcional.
  //Na ausência de campos obrigatórios, retorne o status code 400 Bad Request.
  @Post("/posts")
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }
  //Caso não exista nenhum post cadastrado, retornar um array vazio.
  @Get("/posts")
  findAll() {
    return this.postsService.findAll();
  }
  //Deve retornar o registro compatível com o id fornecido:
  //Se não houver nenhum registro compatível, retornar status code 404 Not Found.
  @Get("/posts:id")
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }
  //Deve atualizar o registro compatível com o id fornecido:
  //Se não houver nenhum registro compatível, retornar status code 404 Not Found.
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }
  //eve deletar o registro compatível com o id fornecido.
  //Se não houver nenhum registro compatível, retornar status code `404 Not Found`.
  //O post só pode ser deletado se não estiver fazendo parte de nenhuma publicação (agendada ou publicada). Neste caso, retornar o status code `403 Forbidden`.
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
