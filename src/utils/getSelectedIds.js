// utils/getSelectedIds.js

/**
 * Extract selected IDs from student data for auto-selection
 * @param {Object} studentData - The API response from fetchStudentData
 * @returns {Object} - Object containing arrays of selected IDs for each category
 */
export const getSelectedIds = (studentData) => {
  if (!studentData?.data?.[0]) {
    return {
      selectedGradeIds: [],
      selectedSchoolIds: [],
      selectedSkillIds: [],
      selectedSubjectIds: [],
      selectedSdgIds: [],
      ambitions: ''
    };
  }

  const data = studentData.data[0];

  return {
    selectedGradeIds: data.selected_grades?.map(grade => grade.gradeId) || [],
    selectedSchoolIds: data.selected_school?.map(school => school.schoolId) || [],
    selectedSkillIds: data.selected_skill?.map(skill => skill.skillId) || [],
    selectedSubjectIds: data.selected_subject?.map(subject => subject.subjectId) || [],
    selectedSdgIds: data.selected_sdg?.map(sdg => sdg.sdgId) || [],
    ambitions: data.ambitions || ''
  };
};

/**
 * Check if an item should be selected based on selected IDs
 * @param {string} itemId - The ID to check
 * @param {Array} selectedIds - Array of selected IDs
 * @returns {boolean}
 */
export const isItemSelected = (itemId, selectedIds) => {
  return selectedIds.includes(itemId);
};

/**
 * Get pre-selected items from a list based on selected IDs
 * @param {Array} items - Array of items with _id property
 * @param {Array} selectedIds - Array of selected IDs
 * @returns {Array} - Array of pre-selected items
 */
export const getPreSelectedItems = (items, selectedIds) => {
  if (!Array.isArray(items) || !Array.isArray(selectedIds)) {
    return [];
  }
  
  return items.filter(item => selectedIds.includes(item._id));
};