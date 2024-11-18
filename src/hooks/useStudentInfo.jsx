

export default function useStudentInfo() {
   const studentInfo = localStorage.getItem("student");
    const studentEducationData = JSON.parse(studentInfo);

   
   const { newStudentInfo } = studentEducationData;
const uni = newStudentInfo?.university
   return { uni };
}
