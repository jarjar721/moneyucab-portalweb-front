import { Component, EventEmitter, OnInit, Output, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CardValidator } from './validator/card-validator';
import { ICardDetails } from './domain/i-card-details';
import { CardDetails } from './domain/card-details';
import { PaymentCardService } from './service/payment-card.service';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { Banco } from 'src/app/models/Banco.model';
import { TipoTarjeta } from 'src/app/models/TipoTarjeta.model';

/**
 * NgPaymentCard without any dependencies other then ReactiveFormsModule
 */
@Component({
  selector: 'ng-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentCardComponent implements OnInit {

  @Input() PaycardBancosArray: Array<Banco>;
  @Input() PayCardTipoTarjetaArray: Array<TipoTarjeta>;
  
  /**
   * FormGroup available publicly
   */
  public ccForm: FormGroup;

  /**
   * List of months
   */
  public months: Array<string> = [];

  /**
   * List of years
   */
  public years: Array<number> = [];

  /**
   * Validation message for missing payment card number
   */
  @Input()
  public ccNumMissingTxt? = 'Se requiere el número de tarjeta';

  /**
   * Validation message for too short payment card number
   */
  @Input()
  public ccNumTooShortTxt? = 'Número de tarjeta muy corto';

  /**
   * Validation message for too long payment card number
   */
  @Input()
  public ccNumTooLongTxt? = 'Número de tarjeta muy largo';

  /**
   * Validation message for payment card number that contains characters other than digits
   */
  @Input()
  public ccNumContainsLettersTxt? = 'Número de tarjeta solo debe tener dígitos';

  /**
   * Validation message for invalid payment card  number (Luhn's validation)
   */
  @Input()
  public ccNumChecksumInvalidTxt? = 'Número de tarjeta inválido';

  /**
   * Validation message for missing card holder name
   */
  @Input()
  public cardHolderMissingTxt? = 'Se requiere el nombre del titular';

  /**
   * Validation message for too long card holder name
   */
  @Input()
  public cardHolderTooLongTxt? = 'Nombre del titular muy largo';

  /**
   * Validation message for missing expiration month
   */
  @Input()
  public expirationMonthMissingTxt? = 'Se requiere el mes de vencimiento';

  /**
   * Validation message for missing expiration year
   */
  @Input()
  public expirationYearMissingTxt? = 'Se requiere el año de vencimiento';

  /**
   * Validation message for missing CCV number
   */
  @Input()
  public ccvMissingTxt? = 'Se requiere el código de seguridad (CCV)';

  /**
   * Validation message for too short CCV number
   */
  @Input()
  public ccvNumTooShortTxt? = 'Código de seguridad (CCV) muy corto';

  /**
   * Validation message for too long CCV number
   */
  @Input()
  public ccvNumTooLongTxt? = 'Código de seguridad (CCV) muy largo';

  /**
   * Validation message for incorrect CCV number containing characters other than digits
   */
  @Input()
  public ccvContainsLettersTxt? = 'Código de seguridad (CCV) solo debe tener dígitos';

  /**
   * Validation message for expired card
   */
  @Input()
  public cardExpiredTxt? = 'Tarjeta vencida';

  /**
   * Switch validation of the payment card number
   */
  @Input()
  public validateCCNum? = true;

  /**
   * Switch validation of the payment card holder
   */
  @Input()
  public validateCardHolder? = true;

  /**
   * Switch validation of the payment card expiration month
   */
  @Input()
  public validateExpirationMonth? = true;

  /**
   * Switch validation of the payment card expiration year
   */
  @Input()
  public validateExpirationYear? = true;

  /**
   * Switch validation of the payment card expiration
   */
  @Input()
  public validateCardExpiration? = true;

  /**
   * Switch validation of the payment card CCV number
   */
  @Input()
  public validateCCV? = true;

  /**
   * EventEmitter for payment card object
   */
  @Output()
  public formSaved: EventEmitter<ICardDetails> = new EventEmitter<CardDetails>();

  constructor(
    private _ccService: PaymentCardService,
    private _fb: FormBuilder,
    private service: DashboardService
    ) {}

  public ngOnInit(): void {
    this.buildForm();
    this.assignDateValues();
  }

  /**
   * Populate months and years
   */
  private assignDateValues(): void {
    this.months = PaymentCardService.getMonths();
    this.years = PaymentCardService.getYears();
  }

  /**
   * Build reactive form
   */
  private buildForm(): void {
    this.ccForm = this._fb.group(
      {
        cardNumber: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(12),
            Validators.maxLength(19),
            CardValidator.numbersOnly,
            CardValidator.checksum,
          ]),
        ],
        cardHolder: ['', Validators.compose([Validators.required, Validators.maxLength(22)])],
        expirationMonth: ['', Validators.required],
        expirationYear: ['', Validators.required],
        tipoTarjeta: ['', Validators.required],
        bancoEmisor: ['', Validators.required],
        ccv: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(4),
            CardValidator.numbersOnly,
          ]),
        ],
      },
      {
        validator: CardValidator.expiration,
      }
    );
  }

  /**
   * Returns payment card type based on payment card number
   */
  public getCardType(ccNum: string): string | null {
    return PaymentCardService.getCardType(ccNum);
  }

  /**
   * Callback function that emits payment card details after user clicks submit, or press enter
   */
  public emitSavedCard(): void {
    const cardDetails: ICardDetails = <CardDetails>this.ccForm.value;

    var body = {
      idUsuario: parseInt(localStorage.getItem('userIntID')),
		  idTipoTarjeta: parseInt(cardDetails.tipoTarjeta.toString()),
		  idBanco: parseInt(cardDetails.bancoEmisor.toString()),
		  numero: parseInt(cardDetails.cardNumber),
		  ano: parseInt(cardDetails.expirationYear),
		  mes: parseInt(cardDetails.expirationMonth),
		  dia: 1,
		  cvc: parseInt(cardDetails.ccv.toString()),
		  estatus: 1 
    }
    console.log(body);

    this.service.createTarjeta(body).subscribe(
      (res:any) => {
        console.log(res); // res JSON
        this.formSaved.emit(cardDetails);
      },
      err => {
        console.log(err); // error JSON
      }
    );
  }
  
}
