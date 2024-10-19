import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CustomerDto } from './dto/customer';

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

  async createCharge({
    card,
    amount,
  }: CreateChargeDto): Promise<{ url: string }> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      client_reference_id: '123',
      customer: 'cus_R3lXRLQWH4ortM', //cliente id stripe
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      line_items: [
        {
          price: 'prod_R3lbJ9rmjwK77l', //produto id stripe
          quantity: 1,
        },
      ],
    });
    console.log(session);
    return {
      url: session.url,
    };

    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });

    // const paymentIntent = await this.stripe.paymentIntents.create({
    //   payment_method: paymentMethod.id,
    //   amount: amount * 100,
    //   confirm: true,
    //   currency: 'BRL',
    //   automatic_payment_methods: {
    //     enabled: true,
    //     allow_redirects: 'never',
    //   },
    //   // payment_method_types: ['card'],
    // });

    // return paymentIntent;
  }
}
