
import visionImg from "../../assets/images/vision.jpg";
import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <div className="about mt-[100px] mb-[50px]">
      <div className="container">
        {/* Title */}
        <h3 className="font-bold py-5 text-center text-[var(--dark-color)] text-[length:var(--title-font-size)]" data-aos="fade-down">
          {t('aboutUs.title')}
        </h3>

        {/* Main Description */}
        <p className="text-md md:text-lg text-center lg:w-[60vw] w-full mx-auto leading-relaxed mb-16 text-[var(--text-color)] " data-aos="fade-down">
          {t('aboutUs.description')}
        </p>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-10" data-aos="fade-up">
          {[
            {
              title: t('aboutUs.benefits.easyBooking.title'),
              desc: t('aboutUs.benefits.easyBooking.desc'),
              icon: "fa-calendar-check",
            },
            {
              title: t('aboutUs.benefits.seamlessCommunication.title'),
              desc: t('aboutUs.benefits.seamlessCommunication.desc'),
              icon: "fa-comments",
            },
            {
              title: t('aboutUs.benefits.smartTools.title'),
              desc: t('aboutUs.benefits.smartTools.desc'),
              icon: "fa-chalkboard-teacher",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[var(--light-background)] shadow-[var(--box-shadow)] rounded-[var(--border-radius)] p-8 transition-transform transform hover:scale-102 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              <div className="flex justify-center mb-4">
                <i
                  className={`fas ${item.icon} text-4xl text-[var(--secondary-color)]`}
                ></i>
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-[var(--dark-color)]">
                {item.title}
              </h3>
              <p className="text-center text-[var(--text-color)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Vision */}
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-10 mt-20 overflow-x-hidden">
          <div className="vision-img" data-aos="fade-right">
            <img className="rounded-[var(--border-radius)]" src={visionImg} alt="vision" />
          </div>

          <div data-aos="fade-left">
            <h3 className="text-3xl font-extrabold mb-6 text-[var(--dark-color)] text-[length:var(--title-font-size)]">
              {t('aboutUs.vision.title')}
            </h3>
            <p className="text-lg leading-[var(line-height)] text-[var(--text-color)]">
              {t('aboutUs.vision.description')}
            </p>
            <div className="mt-8">
                <div className="flex items-start mb-3 text-[var(--text-color)]">
                    <i className="fa-regular fa-square-check text-[var(--secondary-color)] text-2xl mr-2"></i>
                    {t('aboutUs.vision.points.globalCommunity')}
                </div>
                <div className="flex items-start mb-3 text-[var(--text-color)]">
                    <i className="fa-regular fa-square-check text-[var(--secondary-color)] text-2xl mr-2"></i>
                    {t('aboutUs.vision.points.diverseResources')}
                </div>
                <div className="flex items-start mb-3 text-[var(--text-color)]">
                    <i className="fa-regular fa-square-check text-[var(--secondary-color)] text-2xl mr-2"></i>
                    {t('aboutUs.vision.points.interactiveEngaging')}
                </div>
                <div className="flex items-start mb-3 text-[var(--text-color)]">
                    <i className="fa-regular fa-square-check text-[var(--secondary-color)] text-2xl mr-2"></i>
                    {t('aboutUs.vision.points.safeEnvironment')}
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
