

export default function useSchool() {
 const userInfo = localStorage.getItem("schoolInfoData");

 const schoolDatas = JSON.parse(userInfo);
const id = schoolDatas?.schoolData?._id;
 //  console.log(authUserData?.token);
 return { schoolDatas, id };
}
