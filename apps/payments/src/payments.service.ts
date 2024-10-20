import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CustomerDto } from './dto/customer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
      {
        httpClient: Stripe.createFetchHttpClient(),
      },
    );
  }

  async getCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
    const customers = await this.stripe.customers.list({
      email,
    });

    return customers.data[0] || null;
  }

  async createCustomer({ email, name }: CustomerDto): Promise<Stripe.Customer> {
    const customer = await this.getCustomerByEmail(email);

    if (customer) return customer;

    return await this.stripe.customers.create({
      email,
      name: name || email,
    });
  }

  // async generateCheckout() {
  //   await this.stripe.checkout.sessions.create();
  // }

  async createCharge({ amount }: CreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      confirm: true,
      currency: 'usd',
      payment_method: 'pm_card_visa',
      payment_method_types: ['card'],
    });

    return paymentIntent;
  }
}
