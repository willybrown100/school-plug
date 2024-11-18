

// export default function useStudentInfo() {
//    const studentInfo = localStorage.getItem("student");
//     const studentEducationData = JSON.parse(studentInfo);

   
//    const { newStudentInfo } = studentEducationData;
//    console.log(newStudentInfo)
// const uni = newStudentInfo?.university
//    return { uni };
// }



export default function useStudentInfo() {
  const studentInfo = localStorage.getItem("student");
  
  // Parse and check if studentInfo exists
  const studentEducationData = studentInfo ? JSON.parse(studentInfo) : null;

  if (!studentEducationData) {
    console.error("Student data is not available or invalid.");
    return { uni: null }; // Or any default value
  }

  const { newStudentInfo } = studentEducationData;

  // Check if newStudentInfo exists
  if (!newStudentInfo) {
    console.error("newStudentInfo is missing in student data.");
    return { uni: null }; // Or any default value
  }

  console.log(newStudentInfo);
  const uni = newStudentInfo?.university;
  return { uni };
}
