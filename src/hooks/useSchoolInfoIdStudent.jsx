
import useGetUser from './useGetUser';
import useGetRegSchools from './useGetRegSchools';

export default function useSchoolInfoIdStudent() {
 const { data: studentData } = useGetUser();
 console.log(studentData);
 const uni = studentData?.studentInfo?.university;
 const { school } = useGetRegSchools();
 const schools = school?.schools;
 console.log(schools, uni);
 const sch = schools?.filter((item) => item.university === uni);
 const schObj = sch?.at(0);

 const schoolInfoId = schObj?._id;
 console.log(schoolInfoId);

 return { schoolInfoId };
}
