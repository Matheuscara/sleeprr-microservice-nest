import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { ReservationDocument } from './models/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
// DOCUMENTATION: CRIA UM REPOSITÓRIO PARA RESERVAS HERDANDO O REPOSITÓRIO ABSTRATO
//  REPARE QUE O REPOSITÓRIO ABSTRATO JÁ POSSUI MÉTODOS DE CRUD E
//  O REPOSITÓRIO DE RESERVAS HERDA ESSES MÉTODOS
export class ReservationsRepository extends AbstractRepository<ReservationDocument> {
  protected readonly logger = new Logger(ReservationsRepository.name);

  constructor(
    // DOCUMENTATION: INJETA O MODELO DE RESERVATION NO MONGO
    @InjectModel(ReservationDocument.name)
    reservationModel: Model<ReservationDocument>,
  ) {
    // DOCUMENTATION: CHAMA O CONSTRUTOR DO REPOSITÓRIO ABSTRATO PARA
    //  INICIAR COM O MODELO DESEJADO
    super(reservationModel);
  }
}
