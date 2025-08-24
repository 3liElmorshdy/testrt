import { useForm } from "react-hook-form";
import { db } from "../../../firebase";
import toast from "react-hot-toast";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import contactImg from "../../assets/images/contact.png";

const Contact = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const { firstName, lastName, email, subject, message } = data;
    try {
      

      await setDoc(doc(collection(db, "messages")), {
        firstName,
        lastName,
        email,
        subject,
        message,
        createdAt: serverTimestamp(),
      });

      toast.success(t('contactUs.toast.success'));
      reset();
    } catch (err) {
      console.error(err);
      toast.error(t('contactUs.toast.error'));
    }
  };

  return (
    <div className="contact-page pt-[100px] min-h-screen capitalize">
      {/* Hero Section */}

      <section className="hero-section" data-aos="fade-down">
        <div className="container mx-auto text-center py-5">
          <h3 className="text-[length:var(--title-font-size)] text-[var(--dark-color)] font-bold mb-6">{t('contactUs.hero.title')}</h3>
          <p className="text-md md:text-lg max-w-3xl mx-auto leading-relaxed text-[var(--text-color)]">
            {t('contactUs.hero.description')}
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form py-10 bg-[var(--background-color)]">
        <div className="container">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 bg-[var(--card-background)] shadow-[var(--box-shadow)] p-5 rounded-[var(--border-radius)] items-center overflow-x-hidden" data-aos="zoom-in">
          <div className="order-2 lg:order-1">

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <h2 className="text-lg font-bold text-[var(--dark-color)] mb-8">

              {t('contactUs.form.title')}
            </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[var(--dark-color)] mb-1">
                    {t('contactUs.form.firstName')}
                  </label>
                  <input
                    type="text"
                    {...register("firstName", {
                      required: t('contactUs.validation.firstNameRequired'),
                    })}
                    className="w-full p-2 border border-[var(--light-primary-color)] rounded-[var(--border-radius)] focus:outline-none focus:border-[var(--primary-color)]"
                    placeholder={t('contactUs.form.firstNamePlaceholder')}
                  />
                  {errors.firstName && (
                    <p className="text-[var(--error-color)] text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[var(--dark-color)] mb-1">
                    {t('contactUs.form.lastName')}
                  </label>
                  <input
                    type="text"
                    {...register("lastName", {
                      required: t('contactUs.validation.lastNameRequired'),
                    })}
                    className="w-full p-2 border border-[var(--light-primary-color)] rounded-[var(--border-radius)] focus:outline-none focus:border-[var(--primary-color)]"
                    placeholder={t('contactUs.form.lastNamePlaceholder')}
                  />
                  {errors.lastName && (
                    <p className="text-[var(--error-color)] text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[var(--dark-color)] mb-1">
                  {t('contactUs.form.email')}
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: t('contactUs.validation.emailRequired'),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t('contactUs.validation.invalidEmail'),
                    },
                  })}
                  className="w-full p-2 border border-[var(--light-primary-color)] rounded-[var(--border-radius)] focus:outline-none focus:border-[var(--primary-color)]"
                  placeholder={t('contactUs.form.emailPlaceholder')}
                />
                {errors.email && (
                  <p className="text-[var(--error-color)] text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-[var(--dark-color)] mb-1">
                  {t('contactUs.form.subject')}
                </label>
                <select
                  {...register("subject", {
                    required: t('contactUs.validation.subjectRequired'),
                  })}
                  className="w-full p-2 border border-[var(--light-primary-color)] rounded-[var(--border-radius)] focus:outline-none focus:border-[var(--primary-color)]"
                >
                  <option value="">{t('contactUs.form.subjectPlaceholder')}</option>
                  <option value="general">{t('contactUs.subjects.general')}</option>
                  <option value="support">{t('contactUs.subjects.support')}</option>
                  <option value="billing">{t('contactUs.subjects.billing')}</option>
                  <option value="partnership">{t('contactUs.subjects.partnership')}</option>
                  <option value="other">{t('contactUs.subjects.other')}</option>
                </select>
                {errors.subject && (
                  <p className="text-[var(--error-color)] text-sm">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[var(--dark-color)] mb-1">
                  {t('contactUs.form.message')}
                </label>
                <textarea
                  rows="6"
                  {...register("message", {
                    required: t('contactUs.validation.messageRequired'),
                    minLength: {
                      value: 10,
                      message: t('contactUs.validation.messageMinLength'),
                    },
                  })}
                  className="w-full p-4 border border-[var(--light-primary-color)] rounded-[var(--border-radius)] focus:outline-none focus:border-[var(--primary-color)] resize-none"
                  placeholder={t('contactUs.form.messagePlaceholder')}
                ></textarea>
                {errors.message && (
                  <p className="text-[var(--error-color)] text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn bg-[var(--primary-color)] border-1 border-[var(--primary-color)] hover:bg-[var(--background-color)] text-white hover:text-[var(--primary-color)] shadow-none transition-all duration-300 text-lg px-8 py-4 capitalize"
                >
                  {t('contactUs.form.submitButton')}
                </button>
              </div>
            </form>
          </div>

          <div className="contact-img order-1 lg:order-2 lg:w-[80%] w-full justify-self-end">
              <img src={contactImg} alt="contact"/>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
