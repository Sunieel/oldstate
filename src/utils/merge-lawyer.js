
// LEGACY
// there is a copy of this in the lambda named lawyerApi

// export const mergeLawyers = (lawyerOriginal, lawyerUpdated) => {
//   const mergedLawyer = { ...lawyerOriginal };

//   lawyerUpdated.name && (mergedLawyer.name = lawyerUpdated.name);
//   lawyerUpdated.site && (mergedLawyer.site = lawyerUpdated.site);
//   lawyerUpdated.phone && (mergedLawyer.phone = lawyerUpdated.phone);
//   lawyerUpdated.type && (mergedLawyer.type = lawyerUpdated.type);
//   lawyerUpdated.city && (mergedLawyer.city = lawyerUpdated.city);
//   lawyerUpdated.postal_code && (mergedLawyer.postal_code = lawyerUpdated.postal_code);
//   lawyerUpdated.full_address && (mergedLawyer.full_address = lawyerUpdated.full_address);
//   lawyerUpdated.latitude && (mergedLawyer.latitude = lawyerUpdated.latitude);
//   lawyerUpdated.longitude && (mergedLawyer.longitude = lawyerUpdated.longitude);
//   lawyerUpdated.logo && (mergedLawyer.logo = lawyerUpdated.logo);
//   lawyerUpdated.subtypes && (mergedLawyer.subtypes = lawyerUpdated.subtypes);
//   lawyerUpdated.category && (mergedLawyer.category = lawyerUpdated.category);
//   lawyerUpdated.street && (mergedLawyer.street = lawyerUpdated.street);
//   lawyerUpdated.state && (mergedLawyer.state = lawyerUpdated.state);

//   const updatedWorkingHours = lawyerUpdated.working_hours;
//   if (updatedWorkingHours) {
//     if (updatedWorkingHours.Monday || updatedWorkingHours.Tuesday || updatedWorkingHours.Wednesday || updatedWorkingHours.Thursday || updatedWorkingHours.Friday || updatedWorkingHours.Saturday || updatedWorkingHours.Sunday) {
//       !mergedLawyer.working_hours && (mergedLawyer.working_hours = {});
//     }
//     updatedWorkingHours.Monday && (mergedLawyer.working_hours.Monday = updatedWorkingHours.Monday);
//     updatedWorkingHours.Tuesday && (mergedLawyer.working_hours.Tuesday = updatedWorkingHours.Tuesday);
//     updatedWorkingHours.Wednesday && (mergedLawyer.working_hours.Wednesday = updatedWorkingHours.Wednesday);
//     updatedWorkingHours.Thursday && (mergedLawyer.working_hours.Thursday = updatedWorkingHours.Thursday);
//     updatedWorkingHours.Friday && (mergedLawyer.working_hours.Friday = updatedWorkingHours.Friday);
//     updatedWorkingHours.Saturday && (mergedLawyer.working_hours.Saturday = updatedWorkingHours.Saturday);
//     updatedWorkingHours.Sunday && (mergedLawyer.working_hours.Sunday = updatedWorkingHours.Sunday);
//   }

//   lawyerUpdated.facebook && (mergedLawyer.facebook = lawyerUpdated.facebook);
//   lawyerUpdated.linkedin && (mergedLawyer.linkedin = lawyerUpdated.linkedin);
//   lawyerUpdated.twitter && (mergedLawyer.twitter = lawyerUpdated.twitter);
//   lawyerUpdated.instagram && (mergedLawyer.instagram = lawyerUpdated.instagram);

//   lawyerUpdated.deleted && (mergedLawyer.deleted = lawyerUpdated.deleted);

//   mergedLawyer.manuallyUpdated = true;
//   return mergedLawyer;
// }