import Search from "../../components/Search/Search";
import { useTranslation } from "react-i18next";

export default function SearchPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="search mt-[100px] mb-[50px]">
          <div className="bg-[var(--light-background)] pt-[50px] pb-[70px] " data-aos="fade-down">
          <h1
            className="font-bold text-[var(--dark-color)] mb-8 text-center text-[length:var(--title-font-size)]"
            data-aos="fade-down"
          >
            {t('searchPage.title')}
          </h1>
          </div>
          <div className="container">
          <Search />
        </div>
      </div>
    </>
  );
}
