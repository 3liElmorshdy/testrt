import terms from "../../assets/images/assignment.png";
import { useTranslation } from "react-i18next";

function TermsModal() {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <button
          type="button"
          className="btn
                       bg-white  text-[var(--secondary-color)]
                        hover:text-white hover:bg-[var(--secondary-color)] transition-colors duration-300 shadow-md border-[var(--secondary-color)]"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          {t('terms.readTerms')}
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="flex gap-2 items-center">
              <div className="w-10">
                <img src={terms} alt="terms" />
              </div>
              <h3 className="font-bold text-lg text-[var(--primary-color)]">
                {t('terms.title')}
              </h3>
            </div>

            <div className="py-4 ">
              <p className="flex items-baseline text-sm">
                <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                {t('terms.accurateInformation')}
              </p>
              <br></br>

              <p className="flex items-baseline text-sm">
                <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                {t('terms.profileReview')}
              </p>
              <br></br>

              <p className="flex items-baseline text-sm">
                <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                {t('terms.noInappropriateContent')}
              </p>
              <br></br>

              <p className="flex items-baseline text-sm">
                <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                {t('terms.professionalConduct')}
              </p>
              <br></br>

              <p className="flex items-baseline text-sm">
                <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                {t('terms.accountSuspension')}
              </p>
              <br></br>

              <p className="flex items-baseline text-sm">
                <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                {t('terms.pricingPolicies')}
              </p>
              <br></br>

              <p className="flex items-baseline text-sm">
                <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                {t('terms.approvalNotGuaranteed')}
              </p>
            </div>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button
                type="button"
                onClick={() => document.getElementById("my_modal_1").close()}
                className="btn text-white 
                              bg-[var(--primary-color)] hover:bg-white hover:text-[var(--primary-color)] transition-colors duration-300 shadow-md 
                              border-[var(--primary-color)]"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}

export default TermsModal;
