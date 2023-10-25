import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import mongoose from 'mongoose';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRespoitory: ReservationsRepository,
  ) {}

  create(createReservationDto: CreateReservationDto) {
    return this.reservationsRespoitory.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: '123',
    });
  }

  findAll() {
    return this.reservationsRespoitory.find({});
  }

  // findOne(id: string) {
  //   return this.reservationsRespoitory.findById(id);
  // }

  findOne(id: string) {
    return this.reservationsRespoitory.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    this.reservationsRespoitory.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: updateReservationDto },
    );
  }

  remove(_id: string) {
    return this.reservationsRespoitory.findOneAndDelete({ _id });
  }
}
