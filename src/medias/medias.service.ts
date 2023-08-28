import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {

  constructor(private mediasRepository: MediasRepository) { }

  async create(body: CreateMediaDto) {
    //const {title, username} = body;
    return this.mediasRepository.createMedia(body)
  }

  async findAll() {
    return this.mediasRepository.findAll();
  }

  async findOne(id: number) {
    return this.mediasRepository.findOne(id);
  }

  async update(id: number, body: UpdateMediaDto) {
    return this.mediasRepository.update(id, body);
  }

  async remove(id: number) {
    return this.mediasRepository.remove(id);
  }
}
