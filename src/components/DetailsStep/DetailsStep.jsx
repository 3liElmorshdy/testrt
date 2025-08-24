import { useTranslation } from "react-i18next";

function DetailsStep({ register, errors }) {
  const { t } = useTranslation();
  
  return (
    <div className="shadow p-6 rounded-lg pt-20 pb-20">
      <div className="flex gap-8 mb-4">
        {/* First Name input */}
        <div className="flex flex-col w-full">
          <label htmlFor="firstName">{t('payment.form.firstName')}</label>
          <input
            type="text"
            className="input input-bordered"
            {...register("firstName", {
              required: t('payment.validation.firstNameRequired'),
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: t('payment.validation.firstNameInvalid'),
              },
            })}
          />
          {errors.firstName && (
            <p className="text-[var(--error-color)] text-sm mb-4 mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        {/* Last Name input */}
        <div className="flex flex-col w-full">
          <label htmlFor="lastName">{t('payment.form.lastName')}</label>
          <input
            type="text"
            className="input input-bordered"
            {...register("lastName", {
              required: t('payment.validation.lastNameRequired'),
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: t('payment.validation.lastNameInvalid'),
              },
            })}
          />
          {errors.lastName && (
            <span className="text-[var(--error-color)] text-sm mb-4 mt-1">
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>
      {/* Email and Mobile inputs */}
      <div className="flex gap-8 mt-10">
        <div className="flex flex-col w-full">
          <label htmlFor="email">{t('payment.form.email')}</label>
          <input
            type="email"
            className="input input-bordered"
            {...register("email", {
              required: t('payment.validation.emailRequired'),
              pattern: {
                value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])/,
                message: t('payment.validation.emailInvalid'),
              },
            })}
          />
          {errors.email && (
            <span className="text-[var(--error-color)] text-sm mb-4 mt-1">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="mobile">{t('payment.form.mobile')}</label>
          <input
            type="tel"
            className="input input-bordered"
            {...register("mobile", {
              required: t('payment.validation.mobileRequired'),
              pattern: {
                value: /^\d{11}$/,
                message: t('payment.validation.mobileInvalid'),
              },
            })}
          />
          {errors.mobile && (
            <span className="text-[var(--error-color)] text-sm mb-4 mt-1">
              {errors.mobile.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsStep;
