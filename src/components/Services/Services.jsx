import privateImg from "../../assets/images/private.jpg";
import groupImg from "../../assets/images/group.jpg"
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const arrowIcon = isArabic ? 'fa-circle-left' : 'fa-circle-right';

  return (
    <section className="services pb-[50px] capitalize overflow-x-hidden">
      <div className="">
        <div className="w-1/2 m-auto mb-5 text-center">
          <h3 className="text-[var(--dark-color)] text-[length:var(--title-font-size)] font-bold">
            {t('homePage.services.title')}
          </h3>
          <p className="text-[var(--text-color)] leading-[var(--line-height)] py-5">
            {t('homePage.services.subtitle')}
          </p>
        </div>
        <div className="services-grid">
          <div className="">
            <div className="services-item grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5" data-aos="fade-right">
              <div className="col-span-1">
                <img className="rounded-[var(--border-radius)] h-full" src={privateImg} alt="private"/>
              </div>
              <div className="col-span-2 bg-[var(--light-background)] rounded-[var(--border-radius)] p-5">
                <h3 className="text-[var(--dark-color)] font-bold text-xl">{t('homePage.services.privateSessions.title')}</h3>
                <p className="text-[var(--text-color)] py-3">{t('homePage.services.privateSessions.description')}</p>
                <ul className="features">
                  <li className="flex items-center"><i className={`fa-regular ${arrowIcon} text-[var(--success-color)] text-xl mr-2 mt-1`}></i>{t('homePage.services.privateSessions.features.privateEnvironment')}</li>
                  <li className="flex items-center"><i className={`fa-regular ${arrowIcon} text-[var(--success-color)] text-xl mr-2 mt-1`}></i>{t('homePage.services.privateSessions.features.directAttention')}</li>
                  <li className="flex items-center"><i className={`fa-regular ${arrowIcon} text-[var(--success-color)] text-xl mr-2 mt-1`}></i>{t('homePage.services.privateSessions.features.flexibleScheduling')}</li>
                  <li className="flex items-center"><i className={`fa-regular ${arrowIcon} text-[var(--success-color)] text-xl mr-2 mt-1`}></i>{t('homePage.services.privateSessions.features.tailoredContent')}</li>
                  <li className="flex items-center"><i className={`fa-regular ${arrowIcon} text-[var(--success-color)] text-xl mr-2 mt-1`}></i>{t('homePage.services.privateSessions.features.immediateFeedback')}</li>
                </ul>
              </div>
            </div>
            
            <div className="services-item grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5" data-aos="fade-left">
                <div className="col-span-2 bg-[var(--light-background)] rounded-[var(--border-radius)] p-5">
                  <h3 className="text-[var(--dark-color)] font-bold text-xl">{t('homePage.services.groupSessions.title')}</h3>
                  <p className="text-[var(--text-color)] py-3">{t('homePage.services.groupSessions.description')}</p>
                  <ul className="features">
                    <li className="flex items-center"><i className={`fa-regular ${arrowIcon} text-[var(--success-color)] text-xl mr-2 mt-1`}></i>{t('homePage.services.groupSessions.features.socialLearning')}</li>
                    <li className="flex items-center"><i className={`fa-regular ${arrowIcon} text-[var(--success-color)] text-xl mr-2 mt-1`}></i>{t('homePage.services.groupSessions.features.peerInteraction')}</li>
                    <li className="flex items-center"><i className={`fa-regular ${arrowIcon} text-[var(--success-color)] text-xl mr-2 mt-1`}></i>{t('homePage.services.groupSessions.features.learnFromOthers')}</li>
                    <li className="flex items-center"><i className={`fa-regular ${arrowIcon} text-[var(--success-color)] text-xl mr-2 mt-1`}></i>{t('homePage.services.groupSessions.features.smallGroups')}</li>
                    <li className="flex items-center"><i className={`fa-regular ${arrowIcon} text-[var(--success-color)] text-xl mr-2 mt-1`}></i>{t('homePage.services.groupSessions.features.lowCost')}</li>
                  </ul>
                </div>
                <div className="col-span-1">
                  <img className="rounded-[var(--border-radius)] h-full" src={groupImg} alt="group"/>
                </div>
                
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
