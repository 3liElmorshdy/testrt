import { useTranslation } from "react-i18next";

function PaymentStep({ register, errors }) {
  const { t } = useTranslation();
  
  return (
    <div className="shadow p-6 rounded-lg pt-20 pb-20">
      <div className="relative w-full">
        <div>
          <label htmlFor="cardNumber">{t('payment.form.cardNumber')}</label>
          <input
            type="text"
            className="input input-bordered w-full pr-20"
            {...register("cardNumber", {
              required: t('payment.validation.cardNumberRequired'),
              pattern: {
                value: /^\d{16}$/,
                message: t('payment.validation.cardNumberInvalid'),
              },
            })}
          />
        </div>
        <div className="absolute bottom-1 right-3 flex items-center gap-2 pointer-events-none text-2xl text-gray-400">
          <i className="fa-brands fa-cc-visa" />
          <i className="fa-brands fa-cc-amex" />
          <i className="fa-brands fa-cc-mastercard" />
        </div>
      </div>
      {errors.cardNumber && (
        <span className="text-[var(--error-color)] text-sm mb-3 mt-1">
          {errors.cardNumber.message}
        </span>
      )}

      {/* CVV and Expiry date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col w-full">
          <label htmlFor="cvv">{t('payment.form.cvv')}</label>
          <input
            type="text"
            className="input input-bordered"
            {...register("cvv", {
              required: t('payment.validation.cvvRequired'),
              pattern: {
                value: /^\d{3}$/,
                message: t('payment.validation.cvvInvalid'),
              },
            })}
          />
          {errors.cvv && (
            <span className="text-[var(--error-color)] text-sm mb-3 mt-1">
              {errors.cvv.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="expiry">{t('payment.form.expiryDate')}</label>
          <input
            type="text"
            placeholder={t('payment.form.expiryPlaceholder')}
            className="input input-bordered"
            {...register("expiry", {
              required: t('payment.validation.expiryRequired'),
              pattern: {
                value: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
                message: t('payment.validation.expiryInvalid'),
              },
            })}
          />
          {errors.expiry && (
            <span className="text-[var(--error-color)] text-sm mb-3 mt-1">
              {errors.expiry.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full mt-4">
        <label htmlFor="cardHolder">{t('payment.form.cardHolder')}</label>
        <input
          type="text"
          className="input input-bordered w-full"
          {...register("cardHolder", {
            required: t('payment.validation.cardHolderRequired'),
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: t('payment.validation.cardHolderInvalid'),
            },
          })}
        />
        {errors.cardHolder && (
          <span className="text-[var(--error-color)] text-sm mb-3 mt-1">
            {errors.cardHolder.message}
          </span>
        )}
      </div>
    </div>
  );
}

export default PaymentStep;
