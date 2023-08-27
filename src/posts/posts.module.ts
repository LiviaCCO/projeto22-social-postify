import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

/* Os posts representam os conteúdos que serão postados nas redes sociais (medias) por meio de uma publicação (publication): */
@Module({
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
