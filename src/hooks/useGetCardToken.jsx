

export default function useGetCardToken() {
 const userInfo = localStorage.getItem("cardToken");

 const cardDetails= JSON.parse(userInfo);
 const cardToken = cardDetails?.cardToken
 console.log(cardToken)
return { cardToken };
}
