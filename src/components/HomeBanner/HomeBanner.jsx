import bannerImg from "../../assets/images/banner-home.png"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
function HomeBanner() {
    const { t, i18n } = useTranslation();
    const teachers = useSelector((state) => state.teachers.teachers);
    const subjects = teachers.map((t) => t.subject);
    const isArabic = i18n.language === 'ar';

    const getTranslatedSubject = (subject) => {
      const normalizedSubject = subject.toLowerCase().trim();
      
      let translationKey = `homePage.banner.subjects.${normalizedSubject}`;
      let translation = t(translationKey);
      

      if (translation === translationKey) {
        if (normalizedSubject === 'psychology' || normalizedSubject === 'sychology') {
          translation = t('homePage.banner.subjects.psychology');
        }
      }
      
      return translation !== translationKey ? translation : subject;
    };
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0); 
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (subjects.length === 0) return;

        const currentWord = subjects[wordIndex];
        const translatedWord = getTranslatedSubject(currentWord);
        const typingSpeed =  100;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (charIndex < translatedWord.length) {
                    setText(translatedWord.substring(0, charIndex + 1));
                    setCharIndex(prev => prev + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), 1500);
                }
            } else {
                if (charIndex > 0) {
                    setText(translatedWord.substring(0, charIndex - 1));
                    setCharIndex(prev => prev - 1);
                } else {
                    setTimeout(() => {
                        setIsDeleting(false);
                        setWordIndex(prev => (prev + 1) % subjects.length);
                    }, 500);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, wordIndex, subjects, getTranslatedSubject]);

    const navigate = useNavigate(); //edit
      const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim() !== "") {
      params.set("query", searchQuery.trim());
    }
    navigate(`/search?${params.toString()}`);
  };
    
  return (
    <>
      {/* Banner section */}
      <section
        className="home__banner min-h-fit lg:min-h-[calc(100vh-100px)] flex flex-col justify-center text-left bg-[var(--light-background)] py-[20px] lg:py-[50px]"
        data-aos="zoom-in"
      >
        <div className="container">
          <div className="flex flex-col items-center lg:flex-row gap-4 ">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <h1 className="text-[var(--dark-color)] !text-[50px] mb-5">
                {t('homePage.banner.title')}
                <p className="h-[45px] font-bold text-[var(--secondary-color)] text-5xl">
                  {text}
                </p>
                {t('homePage.banner.courses')}
              </h1>
              <p className="text-[var(--text-color)] leading-[var(--line-height)]">
                {t('homePage.banner.subtitle')}
              </p>

              {/* search for teachers */}
              <div className="home-search pt-5 w-full overflow-hidden">
                <h4 className="text-[var(--dark-color)] pb-2">
                  {t('homePage.banner.findTeacher')}
                </h4>
                <div className="relative w-[90%]">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    placeholder={t('homePage.banner.searchPlaceholder')}
                    className="input border-2 border-[var(--secondary-color)] focus:outline-0 w-full bg-[var(--background-color)] rounded-[30px] h-[45px]"
                  />
                  <div
                    onClick={handleSearch}
                    className="teacher-icon absolute right-0 top-0 width-full bg-[var(--secondary-color)] flex justify-center items-center rounded-[30px] h-[45px] w-[70px] cursor-pointer z-2 "
                  >
                    <i className="fa-solid fa-magnifying-glass text-white"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-[380px] lg:w-1/2 order-1 lg:order-2">
              <div className="banner-img  justify-self-center w-70 lg:w-[380px] rounded-full relative">
                <img
                  className="w-100 object-cover"
                  src={bannerImg}
                  alt="banner"
                />

                <div 
                  className="chat chat-start absolute top-10 opacity-90 hidden xl:block"
                  style={{ 
                    [isArabic ? 'left' : 'right']: isArabic ? '-90px' : '-130px' 
                  }}
                >
                  <div className="chat-bubble bg-[#faddcf] w-fit max-w-full whitespace-nowrap px-3 py-2">
                    <i className="fa-solid fa-heart text-[#d53232] mr-2"></i>
                    {t('homePage.banner.chatBubbles.greatTeacher')}
                  </div>
                </div>

                <div 
                  className="chat chat-start absolute top-35 opacity-90 hidden xl:block"
                  style={{ 
                    [isArabic ? 'left' : 'right']: isArabic ? '-90px' : '-130px' 
                  }}
                >
                  <div className="chat-bubble bg-[#faddcf] w-fit max-w-full whitespace-nowrap px-3 py-2">
                    <i className="fa-solid fa-heart text-[var(--primary-color)] mr-2"></i>
                    {t('homePage.banner.chatBubbles.superClear')}
                  </div>
                </div>

                <div 
                  className="chat chat-start absolute bottom-15 opacity-90 hidden xl:block"
                  style={{ 
                    [isArabic ? 'left' : 'right']: isArabic ? '-90px' : '-130px' 
                  }}
                >
                  <div className="chat-bubble bg-[#faddcf] w-fit max-w-full whitespace-nowrap px-3 py-2">
                    <i className="fa-solid fa-lightbulb text-[var(--secondary-color)] mr-2"></i>
                    {t('homePage.banner.chatBubbles.amazingSession')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeBanner