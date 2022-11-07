export class ConvertData {
  amount = 0;
  currency: CurrencyCode;

  constructor(code?: CurrencyCode) {
    this.currency = code ? code : 'UAH';
  }
}

type CurrencyCode = 'UAH' | 'EUR' | 'USD'

export interface CurrencyData {
  success: boolean;
  query: Query;
  info: Info;
  result: number;
}

interface Query {
    from: string;
    to: string;
    amount: number;
}

interface Info {
    timestamp: number;
    quote: number;
}



export interface LiveCurrencyData {
  success: boolean;
  timestamp: number;
  source: string;
  quotes: Quotes;
}

interface Quotes {
  USDUAH?: number;
  EURUAH?: number;
}
