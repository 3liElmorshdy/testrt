import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import "./RecommendedTeachers.module.css";
import RatingStars from "../RatingStars/RatingStars";
import { NavLink } from "react-router-dom";
import BadgeFree from "../BadgeFree/BadgeFree";
import TeacherNameTranslation from "../TeacherNameTranslation/TeacherNameTranslation";
import { useTranslation } from "react-i18next";

function RecommendedTeachers() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const leftChevron = isArabic ? 'fa-chevron-right' : 'fa-chevron-left';
  const rightChevron = isArabic ? 'fa-chevron-left' : 'fa-chevron-right';
  const teachers = useSelector((state) => state.teachers.teachers);

  const getTranslatedSubject = (subject) => {
    const translationKey = `homePage.banner.subjects.${subject.toLowerCase()}`;
    const translation = t(translationKey);
    return translation !== translationKey ? translation : subject;
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const CustomLeftArrow = ({ onClick }) => (
  <button 
    onClick={() => onClick()} 
    className="absolute left-5 top-1/2 transform -translate-y-1/2 w-[50px] h-[50px] bg-[var(--background-color)] hover:bg-[var(--secondary-color)] border-2 border-[var(--secondary-color)] rounded-full flex items-center justify-center cursor-pointer hover:text-white text-[var(--secondary-color)]"
  >
    <i className={`fa-solid ${leftChevron}`}></i>
  </button>
);

const CustomRightArrow = ({ onClick }) => (
  <button 
    onClick={() => onClick()} 
    className="absolute right-5 top-1/2 transform -translate-y-1/2 w-[50px] h-[50px] bg-[var(--background-color)] hover:bg-[var(--secondary-color)] border-2 border-[var(--secondary-color)] rounded-full flex items-center justify-center cursor-pointer hover:text-white text-[var(--secondary-color)]"
  >
    <i className={`fa-solid ${rightChevron}`}></i>
  </button>
);

  return (
    <>
      <div className="recommended-teachers relative py-[50px] ">
        
        <h3 className="text-[var(--dark-color)] font-bold mb-5 text-[length:var(--title-font-size)]">
          {t('homePage.recommendedTeachers.title')}
        </h3>
        <Carousel
          responsive={responsive}
          itemClass="px-2 py-10 bg-transparent"
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          customTransition="all .5"
          transitionDuration={500}  
          customLeftArrow={<CustomLeftArrow />} 
          customRightArrow={<CustomRightArrow />}
        >
          {teachers
            .filter((teacher) => teacher.rating > 4)
            .map((teacher) => (
              <div
                key={teacher.id}
                className="teacher-card bg-[var(--card-background)] p-4 rounded-[var(--border-radius)] shadow-[var(--box-shadow)] flex flex-col items-center"
                data-aos="flip-left"
              >
                
                <img
                  className="rounded-full !w-50 mb-5"
                  src={teacher.Image}
                  alt={teacher.name}
                />
                <TeacherNameTranslation 
                  name={teacher.name} 
                  as="h3" 
                  className="text-[var(--primary-color)] font-bold"
                />
                <p className="mb-2">{getTranslatedSubject(teacher.subject)}</p>
                <span>
                  <RatingStars value={teacher.rating} />
                </span>
                <div className="flex gap-2 mt-2">
                
                <NavLink to={`/tutor/${teacher.id}`}>
                  <button className="btn btn-outline block border-[var(--secondary-color)] text-[var(--secondary-color)] w-fit hover:bg-[var(--secondary-color)] hover:text-white">
                  {t('homePage.recommendedTeachers.viewMore')}</button>
                </NavLink>
                <NavLink
                  to={`/payment/${teacher.id}`}>
                  <button className="btn btn-outline block border-[var(--secondary-color)] text-[var(--background-color)] bg-[var(--secondary-color)] w-fit hover:bg-[var(--background-color)] hover:text-[var(--secondary-color)]">
                  {t('homePage.recommendedTeachers.bookNow')} </button>
                </NavLink>
                </div>
                <BadgeFree />
              </div>
            ))}
        </Carousel>
      </div>
    </>
  );
}

export default RecommendedTeachers;
