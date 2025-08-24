import RatingStars from "../RatingStars/RatingStars";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTranslation } from "react-i18next";

function TeacherReview({ reviews, teacherName }) {
  const { t } = useTranslation();
  // Carousel settings
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="mt-9 p-4 rounded-2xl shadow-md">
      <h3 className="text-xl font-bold mb-2 text-shadow-md">
        {t('teacherDetails.reviews')}{" "}
        <i className="fa-solid fa-star text-[var(--stars-color)]"></i>{" "}
      </h3>
      {reviews?.length > 0 ? (
        <div>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            arrows={false}
            showDots={true}
          >
            {(reviews ?? []).map((review, index) => (
              <div key={index} className="p-4 mb-5 w-full">
                <div className="bg-[var(--light-background)] p-6 rounded-lg border-l-4 border-[var(--primary-color)]">

                  <div className="flex items-center mb-3">
                    <RatingStars value={review?.rating ?? 0} />
                    <span className="ml-2 text-sm text-[var(--text-color)]">
                      ({Number(review?.rating ?? 0).toFixed(1)})
                    </span>
                  </div>
                  <p className="text-[var(--text-color)] italic">
                    "{teacherName ? t(`homePage.teacherStudentComments.${teacherName}.${review?.studentName}`) || t(`homePage.studentComments.${review?.studentName}`) || review?.comment : review?.comment ?? ""}"
                  </p>
                  <div className="mt-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center mr-3">
                      {(review?.studentName ?? "?").charAt(0)}
                    </div>
                    <div>
                      <p className="text-[var(--dark-color)] font-medium">
                        {t(`homePage.studentNames.${review?.studentName}`) || review?.studentName || t('teacherDetails.student')}
                      </p>
                      <p className="text-sm text-[var(--text-color)]">
                        {t('teacherDetails.student')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <p className="text-[var(--text-color)] italic">
          {t('teacherDetails.noReviews')}
        </p>
      )}
    </div>
  );
}

export default TeacherReview;
