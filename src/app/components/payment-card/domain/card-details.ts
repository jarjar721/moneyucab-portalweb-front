import { ICardDetails } from './i-card-details';

export class CardDetails implements ICardDetails {
  public cardHolder: string;
  public cardNumber: string;
  public ccv: number;
  public expirationMonth: string;
  public expirationYear: string;
  public tipoTarjeta: number;
  public bancoEmisor: number;

  constructor(cardHolder: string, cardNumber: string, ccv: number, expirationMonth: string, expirationYear: string, tipoTarjeta: number, bancoEmisor: number) {
    this.cardHolder = cardHolder;
    this.cardNumber = cardNumber;
    this.ccv = ccv;
    this.expirationYear = expirationYear;
    this.expirationMonth = expirationMonth;
    this.tipoTarjeta = tipoTarjeta;
    this.bancoEmisor = bancoEmisor;
  }
}
