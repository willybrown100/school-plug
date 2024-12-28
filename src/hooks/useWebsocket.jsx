// import  {  useEffect, useMemo,  useState } from 'react'
// import { useLocation } from 'react-router-dom';
// import useUser from './useUser';
// import useSug from './useSug';
// import { useSocket } from '../components/SocketProvider';
// import useFetchNotification from './useFetchNotification';

// export default function useWebSocket() {
//   const [socket, setSocket] = useState(null); // Initial state is null
//   const [messages, setMessages] = useState([]);
// const {pathname}=useLocation()
// const {userId:studentId}=useUser()
// const {userId:adminId}=useSug()
// console.log(pathname)
// const userId = pathname === "/home/homePage/feed" ? studentId : adminId;
//     const url = "https://student-plug.onrender.com";
//   useEffect(() => {
//     // Create a WebSocket instance only when the component mounts
//     const ws = new WebSocket(url);

//     // Store the socket instance in state
//     setSocket(ws)

//     // Set up event listeners only after the socket is created
//     // ws.onopen = () => {
//     //   console.log("Connected to WebSocket server");
//     // };
//     ws.onopen = () => {
//       // console.log("Connected to WebSocket server");

//       // Send the user ID to the server immediately after connection
//       if (userId) {
//         ws.send(JSON.stringify({ type: "user-connect", userId }));
//         // console.log("Sent user ID to server:", userId);
//       }
//     };

  

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("Message from server:", data);
//       setMessages((prevMessages) => [...prevMessages, data]);
//     };

    

//     ws.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     ws.onclose = (event) => {
//       console.log("WebSocket connection closed:", event);
//     };

//     // Cleanup WebSocket connection on unmount
//     return () => {
//       if (ws.readyState === WebSocket.OPEN) {
//         ws.close();
//       }
//       console.log("WebSocket connection closed");
//     };
//   }, [url]);

//   return { messages, socket };
// }



// export default function useWebSocket() {
//   const [socket, setSocket] = useState(null); // Initial state is null
//   // const [messages, setMessages] = useState([]);
//   const {isLoading}=useFetchNotification()
//   console.log(isLoading)
// const { notification, setNotification } = useSocket();
//   const { pathname } = useLocation();
//   const { userId: studentId } = useUser();
//   const { userId: adminId } = useSug();
// console.log(notification);
//   // Memoize the userId based on the pathname
//   const userId = useMemo(() => {
//     return pathname === "/home/homePage/feed" ? studentId : adminId;
//   }, [pathname, studentId, adminId]);

//   // Memoize the WebSocket URL
//   const url = useMemo(() => "https://student-plug.onrender.com", []); // to wss for secure WebSocket connection

//   useEffect(() => {
//     // Create a WebSocket instance only when the component mounts
//     const ws = new WebSocket(url);

//     // Store the socket instance in state
//     setSocket(ws);

//     // Set up event listeners only after the socket is created
//     ws.onopen = () => {
//       if (userId) {
//         ws.send(JSON.stringify({ type: "user-connect", userId }));
//         console.log("Sent user ID to server:", userId);
//       }
//     };

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//          console.log("Message from server:", data);
//       setNotification((prevMessages) => [...prevMessages, data]);
//     };

//     ws.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     ws.onclose = (event) => {
//       console.log("WebSocket connection closed:", event);
//     };

//     // Cleanup WebSocket connection on unmount
//     return () => {
//       if (ws.readyState === WebSocket.OPEN) {
//         ws.close();
//       }
//     };
//   }, [url, userId]); // Effect depends on `url` and `userId`

//   return { notification, socket };
// }






