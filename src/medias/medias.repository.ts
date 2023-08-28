import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Injectable()
export class MediasRepository {

  constructor(private prisma: PrismaService) { }

  async createMedia(media: CreateMediaDto) {
    // Há registro com a mesma combinação de title e username?
    const localizationMedia = await this.prisma.media.findFirst({
        where: {
          title: media.title,
          username: media.username,
        },
      });
  
      if (localizationMedia) {
        // Se existir, retorne um status code 409 Conflict
        throw new ConflictException('Media with the same title and username already exists');
      }
  
      // Se não existir, crie o novo registro
      return this.prisma.media.create({
        data: media
      });
  }

  async findAll() {
    return await this.prisma.media.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.media.findFirst({
        where: { id },
    });
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    return await this.prisma.media.update({
        where: { id },
        data: updateMediaDto,
    })
  }
  async remove(id: number) {
    return await this.prisma.media.delete({
        where: { id },
    });
  }
}