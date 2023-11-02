import { ErrorDod, GeneralErrorDod } from 'rilata2/src/domain/domain-object-data/common-types';
import { Locale } from 'rilata2/src/domain/locale';

export type AuthentificationInvalidUserErrorName = 'AuthentificationInvalidUserError';

export type AuthentificationInvalidUserError = ErrorDod<Locale, string, 'domain-error'>;
