import { Controller } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargeDto } from '@app/common';
import { CustomerDto } from './dto/customer';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('createCharge')
  async createCharge(@Payload() data: CreateChargeDto) {
    return this.paymentsService.createCharge(data);
  }

  @MessagePattern('createCostumer')
  async createCostumer(@Payload() data: CustomerDto) {
    return this.paymentsService.createCustomer(data);
  }
}
