import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { auth, db } from "../../../firebase";
import toast from "react-hot-toast";
import Overview from "../../components/Overview/Overview";
import FormInput from "../../components/FormInput/FormInput";
import TermsModal from "../../components/TermsModal/TermsModal";
import PendingImg from "../../components/PendingImg/PendingImg";
import FormSelector from "../../components/FormSelector/FormSelector";

function TeacherPending() {
  const [overviewCount, setOverviewCount] = useState(0);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const defaultValues = {
    Image: "",
    name: "",
    subject: "",
    gradeLevel: "",
    lessonType: "Online",
    hourlyRate: "",
    firstLessonFree: false,
    overview: "",
    certificate: null,
    agreeTerms: false,
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  useEffect(() => {
    const load = async () => {
      const ref = doc(db, "newTeachers", user.uid);
      if (!user) return;
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        if (data.approved === true) {
          toast.success(t('teacherPending.profileAlreadyApproved'));
          // navigate("/teacher");
        }
      }
    };
    load();
  }, [user, navigate]);

  // on submitting form with data
  const onSubmit = async (form) => {
    if (!user) return;
    try {
      let certificateUrl = "";
      const fileToUpload = form.certificate[0];

      if (!fileToUpload) {
        toast.error(t('teacherPending.pleaseUploadCertificate'));
        return;
      }
      // Await the promise from toast.promise to ensure the upload finishes
      const result = await toast.promise(
        (async () => {
          const data = new FormData();
          data.append("file", fileToUpload);
          data.append("upload_preset", "im54mwpi");

          const res = await fetch(
            "https://api.cloudinary.com/v1_1/dhcclmr8d/upload",
            { method: "POST", body: data }
          );

          if (!res.ok) throw new Error("Cloudinary upload failed.");
          return await res.json();
        })(),
        {
          loading: t('teacherPending.uploadingCertificate'),
          success: t('teacherPending.certificateUploaded'),
          error: t('teacherPending.certificateUploadFailed'),
        }
      );
      // file url
      certificateUrl = result.secure_url;
      console.log("Uploaded file URL:", certificateUrl);

      const formDataToSave = { ...form };
      delete formDataToSave.certificate;
      // get the name from users collection
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      let userName = "";
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        userName = userData.name;
      }

      // save data to firebase
      const ref = doc(db, "newTeachers", user.uid);
      await setDoc(
        ref,
        {
          ...formDataToSave,
          hourlyRate: Number(form.hourlyRate) || null,
          ownerId: user.uid,
          name: userName,
          submitted: true,
          approved: false,
          certificateUrl: certificateUrl,
          // updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      toast.success(t('teacherPending.profileSubmitted'));
      reset();
    } catch (err) {
      console.error(err);
      toast.error(t('teacherPending.failedToSubmitProfile'));
    }
  };

  return (
    <>
      <div className="container py-40 flex gap-9">
        <div className="">
          <h1 className="text-2xl mb-5 font-semibold">{t('teacherPending.title')}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              {/* profile Image */}

              <FormInput
                label={t('teacherPending.profileImageUrl')}
                type="text"
                placeholder={t('teacherPending.profileImagePlaceholder')}
                name="Image"
                register={register}
                rules={{
                  validate: (value) =>
                    !value ||
                    /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(value) ||
                    t('teacherPending.invalidImageUrl'),
                }}
                error={errors.Image}
              />

              <div className="grid grid-cols-3 gap-5">
                {/* subject */}
                <FormSelector
                  name="subject"
                  label={t('teacherPending.subject')}
                  options={[
                    "Math",
                    "English",
                    "Science",
                    "History",
                    "Geography",
                    "Biology",
                    "Chemistry",
                    "Physics",
                    "Italy"
                  ].map(subject => ({
                    value: subject,
                    label: t(`subjects.${subject}`) || subject
                  }))}
                  register={register}
                  rules={{ required: t('teacherPending.subjectRequired') }}
                  error={errors.subject}
                />

                {/* grade level */}
                <FormSelector
                  name="gradeLevel"
                  label={t('teacherPending.gradeLevel')}
                  options={["Preparatory", "Secondary"].map(grade => ({
                    value: grade,
                    label: t(`gradeLevels.${grade}`) || grade
                  }))}
                  register={register}
                  rules={{ required: t('teacherPending.gradeLevelRequired') }}
                  error={errors.gradeLevel}
                />

                <FormInput
                  label={t('teacherPending.hourlyRate')}
                  type="number"
                  placeholder={t('teacherPending.hourlyRatePlaceholder')}
                  name="hourlyRate"
                  min="0"
                  register={register}
                  rules={{
                    required: t('teacherPending.priceRequired'),
                  }}
                  error={errors.hourlyRate}
                />
              </div>

              {/* upload file */}
              <div>
                <input
                  type="file"
                  accept=".pdf, .jpg, .jpeg, .png"
                  className="file-input
                  rounded-xl shadow-md w-full
                              focus:ring-1 focus:ring-[var(--light-secondary-color)]
                              focus:outline focus:outline-[var(--light-secondary-color)]
                              focus:border-[var(--light-secondary-color)] "
                  {...register("certificate", {
                    required: t('teacherPending.certificateRequired'),
                  })}
                />
                {errors.certificate && (
                  <div className="text-red-500 text-sm lg:text-xl">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span className="text-sm">
                      {" "}
                      {errors.certificate.message}{" "}
                    </span>
                  </div>
                )}
              </div>

              <Overview
                register={register}
                error={errors.overview}
                overviewCount={overviewCount}
                setOverviewCount={setOverviewCount}
              />

              {/* modal */}
              <TermsModal />

              {/* terms and conditions */}
              <div>
                <input
                  type="checkbox"
                  className="checkbox mr-2 border-[var(--light-secondary-color)] bg-[var(--light-secondary-color)] checked:border-orange-500 checked:bg-[var(--secondary-color)] checked:text-orange-800"
                  {...register("agreeTerms", { required: true })}
                />
                <label>{t('teacherPending.termsAndConditions')}</label>
                {errors.agreeTerms && (
                  <div className="text-red-500 text-sm lg:text-xl">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span className="text-sm">
                      {" "}
                      {t('teacherPending.mustAgreeBeforeSubmitting')}{" "}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* submit button */}
            <button
              type="submit"
              disabled={!watch("agreeTerms") || isSubmitting}
              className="btn mt-8 text-white bg-[var(--secondary-color)] rounded-3xl 
               hover:bg-white hover:text-[var(--secondary-color)] transition-colors duration-300 shadow-md border-[var(--secondary-color)]"
            >
              {isSubmitting ? t('teacherPending.submitting') : t('teacherPending.submitForReview')}
            </button>
          </form>
        </div>

        <PendingImg />
      </div>
    </>
  );
}

export default TeacherPending;