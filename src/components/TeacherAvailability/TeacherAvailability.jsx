import { useTranslation } from "react-i18next";

const TeacherAvailability = ({ availableDates, availableGroupDates }) => {
  const { t } = useTranslation();
  const formatDate = (dateString, timeString) => {
    const dateTimeString = `${dateString}T${timeString}:00`;
    const dateObj = new Date(dateTimeString);

    if (isNaN(dateObj.getTime())) {
      return "Invalid Date";
    }
    
    // Get day of week and convert to lowercase for translation key
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
    const dayOfMonth = dateObj.getDate();
    const month = dateObj.toLocaleDateString("en-US", { month: "short" }).toLowerCase();
    
    // Parse time and format
    const timeParts = timeString.split(':');
    const hour = parseInt(timeParts[0]);
    const minute = timeParts[1];
    const period = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    
    // Use translation keys for day, month, and period
    const translatedDay = t(`teacherAvailability.dateFormats.${dayOfWeek}`);
    const translatedMonth = t(`teacherAvailability.dateFormats.${month}`);
    const translatedPeriod = t(`teacherAvailability.timeFormats.${period}`);
    
    return `${translatedDay}, ${dayOfMonth} ${translatedMonth} - ${displayHour}:${minute} ${translatedPeriod}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[var(--dark-color)] mb-4">
        {t('teacherAvailability.availableTimes')}
      </h2>
      {/* Individual Lessons */}
      {availableDates?.length > 0 && (
        <div className="mb-10">
          <div className="divider">
            <div className="flex gap-2">
              <h3 className="text-lg font-semibold text-[var(--dark-color)] mb-3">
                {t('teacherAvailability.individualLessons')}
              </h3>
              <i className="fa-solid fa-calendar-days text-2xl text-[var(--primary-color)]"></i>
            </div>
          </div>

          {/* grid grid-cols-2 sm:grid-cols-3 */}
          <div className="flex flex-wrap gap-3">
            {availableDates.map((slot, index) => (
              <div
                key={index}
                className="bg-[var(--light-background)] text-[var(--primary-color)] py-3 px-4 rounded-lg text-center text-sm font-medium border border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-500"
              >
                {formatDate(slot.date, slot.time)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Group Lessons */}
      {availableGroupDates?.length > 0 && (
        <div>
        
            <div className="divider">
            <div className="flex gap-2">
              <h3 className="text-lg font-semibold text-[var(--dark-color)] mb-3">
                {t('teacherAvailability.groupLessons')}
              </h3>
              <i className="fa-solid fa-calendar-days text-2xl text-[var(--primary-color)]"></i>
              <i class="fa-solid fa-people-group text-2xl text-[var(--primary-color)]"></i>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {availableGroupDates.map((slot, index) => (
              <div
                key={index}
                className="bg-[var(--light-background)] text-[var(--primary-color)] py-3 px-4 rounded-lg text-center text-sm font-medium border border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-500"
              >
                {formatDate(slot.date, slot.time)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAvailability;
