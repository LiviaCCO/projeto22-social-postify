import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicationModule } from './publication/publication.module';
import { PostsModule } from './posts/posts.module';
import { MediasModule } from './medias/medias.module';

@Module({
  imports: [PublicationModule, PostsModule, MediasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
