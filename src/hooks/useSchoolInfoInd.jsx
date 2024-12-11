import useGetSugUser from './useGetSugUser';
import useGetRegSchools from './useGetRegSchools';

export default function useSchoolInfoInd() {
 const { data: sugData } = useGetSugUser();
 const uni = sugData?.data?.university;
 const { school } = useGetRegSchools();
 const schools = school?.schools;
 console.log(schools, uni);
 const sch = schools?.filter((item) => item.university === uni);
 const schObj = sch?.at(0);

 const schoolInfoId = schObj?._id;
 console.log(schoolInfoId);

 return {schoolInfoId}
}
