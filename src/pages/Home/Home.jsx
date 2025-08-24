// import style from "./Home.module.css";
import HomeBanner from "../../components/HomeBanner/HomeBanner";
import RecommendedTeachers from "../../components/RecommendedTeachers/RecommendedTeachers";
import TeacherBenefits from "../../components/TeacherBenefits/TeacherBenefits";
import "react-multi-carousel/lib/styles.css";
import FeaturesCard from "../../components/FeaturesCard/FeaturesCard";
import HomeReview from "../../components/HomeReview/HomeReview";
import Services from "../../components/Services/Services";
import { useTranslation } from "react-i18next";

import tutorImg1 from "../../assets/images/tutor-1.jpg";
import tutorImg2 from "../../assets/images/tutor-2.jpg";
import tutorImg3 from "../../assets/images/tutor-3.jpg";
import tutorImg4 from "../../assets/images/tutor-4.jpg";
import tutorImg5 from "../../assets/images/tutor-5.jpg";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";




function Home() {
  const { t, i18n } = useTranslation();
  const teachers = useSelector((state) => state.teachers.teachers);
  const isArabic = i18n.language === 'ar';
  
  return (
    <>
      <section className="home capitalize pt-[100px]">
        <HomeBanner />

        <div className="container">
          {/* why us section */}
          <section className="why-learnify py-[50px]" data-aos="fade-up" >
              <div className="w-1/2 m-auto mb-5 text-center">
                <h3 className="text-[var(--dark-color)] text-[length:var(--title-font-size)] font-bold">{t('homePage.whyChooseUs.title')}</h3>
                <p className="text-[var(--text-color)] leading-[var(--line-height)] py-5">{t('homePage.whyChooseUs.description')}</p>
              </div>
              
              <div className="features grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeaturesCard iconClass="fa-regular fa-calendar-check" description={t('homePage.features.easyBooking')}/>
                <FeaturesCard iconClass="fa-regular fa-star" description={t('homePage.features.qualifiedTeachers')}/>
                <FeaturesCard iconClass="fa-regular fa-alarm-clock" description={t('homePage.features.flexibleScheduling')}/>
                <FeaturesCard iconClass="fa-regular fa-money-bill-1" description={t('homePage.features.affordablePackages')}/>
                <FeaturesCard iconClass="fa-regular fa-hand" description={t('homePage.features.interactiveClasses')}/>
                <FeaturesCard iconClass="fa-regular fa-address-book" description={t('homePage.features.varietySubjects')}/>

              </div>
          </section>
          
          
          <RecommendedTeachers />
          <Services />
          
        </div>
        {/* reviews section */}
        <HomeReview teachers={teachers} />
          {/* bcome a tutor section */}
          <section className="become-atutor !bg-[var(--light-background)] py-[100px] overflow-x-hidden mb-[50px]"
            
          >
            <div className="container">
              <h3 className="text-[var(--dark-color)] text-[length:var(--title-font-size)] font-bold mb-4">{t('homePage.becomeTutor.title')}</h3>
              <p>{t('homePage.becomeTutor.subtitle')}</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5  mb-[50px] rounded-[var(--border-radius)]">
              
              <div className="teacher-benefits grid grid-cols-1 lg:grid-cols-2 gap-5 my-5" data-aos="fade-down-right">
                <TeacherBenefits iconClass="fa-solid fa-calendar-check" title={t('homePage.becomeTutor.flexibleSchedule')} description={t('homePage.becomeTutor.flexibleScheduleDesc')}/>
                <TeacherBenefits iconClass="fa-solid fa-money-check-dollar" title={t('homePage.becomeTutor.earnIncome')} description={t('homePage.becomeTutor.earnIncomeDesc')}/>
                <TeacherBenefits iconClass="fa-solid fa-arrow-up-right-dots" title={t('homePage.becomeTutor.professionalGrowth')} description={t('homePage.becomeTutor.professionalGrowthDesc')}/>
                <TeacherBenefits iconClass="fa-solid fa-computer-mouse" title={t('homePage.becomeTutor.easyOnboarding')} description={t('homePage.becomeTutor.easyOnboardingDesc')}/>
              </div>
            
            <div className="become-atutor-imgs  flex items-center"
              
            >
              <div className="relative flex items-center justify-start lg:justify-center w-fit" data-aos="fade-down-left">
                <img className="lg:!w-1/2 !w-100 relative  z-2 border-none lg:border-white border-4"src={tutorImg1} alt="tutor"/>
                <img className="absolute hidden lg:block !w-[150px] z-3 top-[-50px] right-[50px] border-[var(--light-primary-color)] border-4 rotate-60" src={tutorImg2} alt="tutor"/>
                <img className="absolute hidden lg:block !w-[150px] z-1 bottom-[-50px] right-[40px] border-[var(--light-primary-color)] border-4 rotate-45" src={tutorImg3} alt="tutor"/>
                <img className="absolute hidden lg:block !w-[150px] z-1 top-[-50px] left-[40px] border-[var(--light-primary-color)] border-4 -rotate-45" src={tutorImg4} alt="tutor"/>
                <img className="absolute hidden lg:block !w-[150px] z-3 bottom-[-50px] left-[40px] border-[var(--light-primary-color)] border-4 rotate-45" src={tutorImg5} alt="tutor"/>
              </div> 
            </div>
            <NavLink to="/role" className="flex justify-start items-center">
            <button className="btn btn-outline block border-[var(--secondary-color)] text-white bg-[var(--secondary-color)] w-fit hover:bg-[var(--background-color)] px-10  hover:text-[var(--secondary-color)]">{t('homePage.becomeTutor.joinUs')}</button>
            </NavLink>
            </div>
            </div>
          </section>
      </section>


      
    
    </>
  );
}

export default Home;

