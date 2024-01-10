import React, { useState } from 'react';

const Education = () => {
  const grades = [
    'LKG',
    'UKG',
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    '11th',
    '12th',
    'Undergraduate',
    'Postgraduate',
    'PhD',
  ];
  const subjects = [
    'MATHS',
    'BIOLOGY',
    'ARTS',
    'COMMERCE',
    'COMPUTERSCIENCE',
    'HOMESCIENCE',
    'PCMB',
  ];

  const undergraduateDisciplines = ['BE', 'BSc', 'BA', 'MBBS', 'BDS', 'BVSc'];
  const postgraduateDisciplines = [
    'ME',
    'MSc',
    'MA',
    'MD',
    'MS',
    'MDS',
    'MVSc',
  ];
  const phDDisciplines = [
    'PhD in Engineering',
    'PhD in Science',
    'PhD in Arts',
  ];

  const subjectsByDiscipline = {
    BE: [
      'Electrical Engineering',
      'Civil Engineering',
      'Electronics Engineering',
    ],
    BSc: ['Physics', 'Chemistry', 'Biology'],
    BA: ['History', 'Literature', 'Political Science'],
    BDS: ['Dental Anatomy', 'Oral Pathology', 'Orthodontics'],
    BVSc: ['Veterinary Anatomy', 'Animal Husbandry', 'Veterinary Medicine'],

    MBBS: [
      'Anatomy',
      'Physiology',
      'Biochemistry',
      'Pathology',
      'Pharmacology',
    ],
    ME: [
      'Mechanical Engineering',
      'Computer Science',
      'Environmental Engineering',
    ],
    MSc: ['Mathematics', 'Chemistry', 'Biology'],
    MA: ['English Literature', 'Psychology', 'Sociology'],
    MDS: ['Prosthodontics', 'Periodontics', 'Oral Surgery'],
    MVSc: ['Veterinary Surgery', 'Animal Nutrition', 'Animal Reproduction'],
    MD: [
      'Internal Medicine',
      'Pediatrics',
      'Surgery',
      'Obstetrics and Gynecology',
    ],
    MS: ['Orthopedics', 'Ophthalmology', 'ENT'],
    'PhD in Engineering': ['Research Topic 1', 'Research Topic 2'],
    'PhD in Science': ['Research Topic A', 'Research Topic B'],
    'PhD in Arts': ['Research Topic X', 'Research Topic Y'],
  };

  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const handleGradeChange = (grade) => {
    setSelectedGrade(grade);
    setSelectedDiscipline('');
    setSelectedSubject('');
  };

  const handleDisciplineChange = (discipline) => {
    setSelectedDiscipline(discipline);
    setSelectedSubject('');
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
  };

  return (
    <div>
      <label>Select Grade:</label>
      <select
        value={selectedGrade}
        onChange={(e) => handleGradeChange(e.target.value)}
      >
        <option value="">Select Grade</option>
        {grades.map((grade) => (
          <option key={grade} value={grade}>
            {grade}
          </option>
        ))}
      </select>
      {/* Render subject dropdown only for 11th and 12th grades */}
      {['11th', '12th'].includes(selectedGrade) && (
        <div>
          <label>Select Subject:</label>
          <select
            value={selectedSubject}
            onChange={(e) => handleSubjectChange(e.target.value)}
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      )}

      {['Undergraduate', 'Postgraduate', 'PhD'].includes(selectedGrade) && (
        <div>
          <label>Select Discipline:</label>
          <select
            value={selectedDiscipline}
            onChange={(e) => handleDisciplineChange(e.target.value)}
          >
            <option value="">Select Discipline</option>
            {selectedGrade === 'Undergraduate' &&
              undergraduateDisciplines.map((discipline) => (
                <option key={discipline} value={discipline}>
                  {discipline}
                </option>
              ))}
            {selectedGrade === 'Postgraduate' &&
              postgraduateDisciplines.map((discipline) => (
                <option key={discipline} value={discipline}>
                  {discipline}
                </option>
              ))}
            {selectedGrade === 'PhD' &&
              phDDisciplines.map((discipline) => (
                <option key={discipline} value={discipline}>
                  {discipline}
                </option>
              ))}
          </select>
        </div>
      )}

      {selectedDiscipline && (
        <div>
          <label>Select Subject:</label>
          <select
            value={selectedSubject}
            onChange={(e) => handleSubjectChange(e.target.value)}
          >
            <option value="">Select Subject</option>
            {subjectsByDiscipline[selectedDiscipline].map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Education;
