import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import mongoose from 'mongoose';
import { PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRespoitory: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) paymentsService: ClientProxy,
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    return this.reservationsRespoitory.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: '123',
    });
  }

  async findAll() {
    return this.reservationsRespoitory.find({});
  }

  async findOne(id: string) {
    return this.reservationsRespoitory.findById(id);
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    this.reservationsRespoitory.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string) {
    return this.reservationsRespoitory.findOneAndDelete({ _id });
  }
}
