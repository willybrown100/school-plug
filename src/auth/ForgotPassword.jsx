import React, { useState } from 'react';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';

// const ForgetPassword = () => {
//   const [step, setStep] = useState(1);

//   const showNextComponent = (nextStep) => {
//     setStep(nextStep);
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className={`w-96 p-6 bg-white rounded-lg shadow-md ${step === 1 ? 'slide-in' : 'hidden'}`}>
//         <h2 className="text-2xl mb-4">Component 1</h2>
//         <div className='flex'>
            
//         <button
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={() => showNextComponent(2)}
//           >
//             Next
          
//         </button>
//         <img src="/images/indicator1.png" alt='img'/>
//             </div>
//       </div>
//       <div className={`w-96 p-6 bg-white rounded-lg shadow-md ${step === 2 ? 'slide-in' : 'hidden'}`}>
//         <h2 className="text-2xl mb-4">Component 2</h2>
//         <button
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={() => showNextComponent(3)}
//         >
//           Next
//         </button>
//       </div>
//       <div className={`w-96 p-6 bg-white rounded-lg shadow-md ${step === 3 ? 'slide-in' : 'hidden'}`}>
//         <h2 className="text-2xl mb-4">Component 3</h2>
//         <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ForgetPassword;




const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Mock server request
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock server response
    const isEmailValid = email === "test@example.com";

    if (isEmailValid) {
      setStep(2);
    } else {
      setError("Invalid email address");
    }

    setLoading(false);
  };
  return (
    <div className="flex forgotbg justify-center items-center h-screen bg-[url('/images/sign-bg.png')]">
      {step === 1 && (
        <div className="md:w-[700px] flex flex-col  gap-y-9 py-0 p-6 bg-white rounded-lg shadow-md slide-in">
          <div className="flex justify-center">
            <Logo />
          </div>

          <h2 className="text-2xl mb-4 text-center capitalize font-semibold font-fontHeading">
            Enter Email or phone no.
          </h2>
          <form
            onSubmit={handleEmailSubmit}
            className="flex flex-col gap-y-3 m-auto md:w-[500px]"
          >
            <input
              type="email"
              placeholder="enter Email or phone no"
              className="w-full px-4 py-2 border rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex items-center gap-x-3">
              <button
                type="submit"
                className=" bg-blue-500 w-full capitalize font-semibold text-white px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? "Submitting..." : "continue"}
              </button>
              <img
                src="/images/indicator1.png"
                alt="img"
                className="h-[2.2rem]"
              />
            </div>
          </form>
          <div className="flex mt-[5rem] flex-col justify-center">
            <p className="mr-auto ml-auto text-stone-600 mb-0">
              following our <Link>Terms</Link> and Condition <Link>policy</Link>{" "}
              , enter the email
            </p>
            <p className="mr-auto text-stone-600 ml-auto  mb-0">
              or phone number used in registration
            </p>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="w-96 p-6 bg-white rounded-lg shadow-md slide-in">
          <h2 className="text-2xl mb-4">Check Your Email</h2>
          <p className="mb-4">
            We have sent a reset link to your email address.
          </p>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setStep(3)}
          >
            Next
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="w-96 p-6 bg-white rounded-lg shadow-md slide-in">
          <h2 className="text-2xl mb-4">Reset Password</h2>
          <form>
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-2 border rounded mb-4"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded mb-4"
              required
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;

function Email(){
    return <div>
        <Logo/>
        <h3 className='capitalize'>enter email or Phone</h3>
    </div>
}