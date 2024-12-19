

export default function useGetEventCardToken() {
 const userInfo = localStorage.getItem("eventCardToken");

 const cardDetails = JSON.parse(userInfo);
 const cardToken = cardDetails?.data?.token;
 console.log(cardToken);
 
 return { cardToken };
}
