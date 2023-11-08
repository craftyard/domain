import { ErrorDod } from 'rilata2/src/domain/domain-object-data/common-types';
import { Locale } from 'rilata2/src/domain/locale';

export type AuthentificationUserError<LOCALE extends Locale> =
  ErrorDod<LOCALE, 'AuthentificationUserError', 'domain-error'>;
