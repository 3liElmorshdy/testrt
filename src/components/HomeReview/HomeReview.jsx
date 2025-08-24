import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import RatingStars from '../RatingStars/RatingStars';
import { useTranslation } from "react-i18next";

function HomeReview({teachers}) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const leftChevron = isArabic ? 'fa-chevron-right' : 'fa-chevron-left';
  const rightChevron = isArabic ? 'fa-chevron-left' : 'fa-chevron-right';

  // Function to get student name and comment from reviews
  const getStudentInfo = (teacher) => {
    if (teacher.reviews && teacher.reviews.length > 0) {
      const review = teacher.reviews[0];
      return {
        studentName: review.studentName,
        comment: review.comment,
        rating: review.rating
      };
    }
    return null;
  };

    const [currentSlide, setCurrentSlide] = useState(0);
    const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  }

  // arrows for review section
  const CustomButtonGroup = ({ next, previous }) => (
    <div className="flex justify-center gap-5 mt-5">
        <button
            onClick={previous}
            className="btn btn-circle btn-outline p-3 border-2 border-[var(--secondary-color)] bg-[var(--background-color)] text-[var(--secondary-color)] hover:bg-[var(--secondary-color)] hover:text-white transition-colors"
        >
            <i className={`fa-solid ${leftChevron}`}></i>
        </button>
        <button
            onClick={next}
            className="btn btn-circle btn-outline p-3 border-2 border-[var(--secondary-color)] bg-[var(--background-color)] text-[var(--secondary-color)] hover:bg-[var(--secondary-color)] hover:text-white transition-colors"
        >
            <i className={`fa-solid ${rightChevron}`}></i>
        </button>
    </div>
  )


  return (
    <>
        {/* reviews section */}
      <section className="reviews my-[50px] py-[50px] relative " data-aos="fade-up">
        <div className="container">
        <h3 className="text-[var(--dark-color)] text-[length:var(--title-font-size)] font-bold capitalize mb-2">{t('homePage.reviews.title')}</h3>
        <p>{t('homePage.reviews.subtitle')}</p>
        <Carousel
        responsive={responsive}
        itemClass="px-2"
        arrows={false}
        showDots={false}
        containerClass="carousel-container py-15"
        afterChange={(previousSlide, { currentSlide }) => setCurrentSlide(currentSlide)}
        customButtonGroup={<CustomButtonGroup />}
        renderButtonGroupOutside={true}
        >
        {teachers.filter((teacher) => teacher.rating > 4)
        .map((item, i) => {
        const isCenter = i === currentSlide + Math.floor(responsive.desktop.items / 2);

        // Get student information from reviews
        const studentInfo = getStudentInfo(item);

        return(
          <div
            key={item.id} 
            className={` shadow-[var(--box-shadow)] bg-[var(--card-background)] !h-full rounded-[var(--border-radius)] p-5 text-center items-stretch transition-all duration-300 
            ${isCenter ? "scale-y-120 border-2 border-[var(--secondary-color)] shadow-lg" : "scale-95 opacity-80"} `} >
            <i className="fa-solid fa-quote-right text-4xl items-end text-[var(--light-primary-color)] mb-2"></i>
            <div className="flex items-center justify-center ">
              <div >
                <h4 className="text-[var(--dark-color)]">
                  {studentInfo ? t(`homePage.studentNames.${studentInfo.studentName}`) || studentInfo.studentName : ''}
                </h4>
                <p className="leading-[var(--line-height] my-2">
                  {studentInfo ? t(`homePage.teacherStudentComments.${item.name}.${studentInfo.studentName}`) || t(`homePage.studentComments.${studentInfo.studentName}`) || studentInfo.comment : ''}
                </p>
                <RatingStars value={studentInfo?.rating}/>
              </div>
            </div>
          </div>
        )})}
        
        
      </Carousel>
      </div>
      </section>
    </>
  )
}

export default HomeReview