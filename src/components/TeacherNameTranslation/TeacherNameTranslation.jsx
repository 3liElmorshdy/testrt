import React from 'react';
import { useTranslation } from 'react-i18next';

const TeacherNameTranslation = ({ name, className, as = 'span' }) => {
  const { t } = useTranslation();

  // Helper function to translate teacher names
  const getTranslatedTeacherName = (teacherName) => {
    const translationKey = `homePage.teacherNames.${teacherName}`;
    const translation = t(translationKey);
    return translation !== translationKey ? translation : teacherName;
  };

  const translatedName = getTranslatedTeacherName(name);

  // Render as different HTML elements based on 'as' prop
  const Component = as;

  return (
    <Component className={className}>
      {translatedName}
    </Component>
  );
};

export default TeacherNameTranslation;
