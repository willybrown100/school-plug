

export default function useSchool() {
 const userInfo = localStorage.getItem("schoolInfoData");

 const schoolDatas = JSON.parse(userInfo);
const id = schoolDatas?.schoolData?._id;
  const uni = schoolDatas?.schoolData?.university;
 
 return { schoolDatas, id, uni };
}
