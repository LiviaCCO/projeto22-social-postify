import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';

//As publicações são os agendamentos dos posts nas redes sociais (medias).
@Module({
  controllers: [PublicationController],
  providers: [PublicationService],
})
export class PublicationModule {}
