import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../services/firebase-config";

export default async function signUp(data) {
  try {
    const response = await fetch(
      "https://student-plug.onrender.com/api/auth/signup1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const result = await response.json();
    if (result) {
      localStorage.setItem("userDetails", JSON.stringify(result));
    }
    console.log(result);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function studentComment({ postId, text, isAdmin, userId }) {
  console.log({ postId, text, isAdmin, userId });
  try {
    const response = await fetch(
      `https://student-plug.onrender.com/api/add/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, isAdmin, userId }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const result = await response.json();

    console.log(result);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function studentLikePost({ userId, isAdminPost, postId }) {
  console.log({ userId, postId });

  try {
    const response = await fetch(
      `https://student-plug.onrender.com/api/students/likepost/${postId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, isAdminPost }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(` ${error.message}`);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function getStudentComments(postId) {
  console.log(postId);
  try {
    const response = await fetch(
      `https://student-plug.onrender.com/api/add/posts/${postId}?postType=user`
    );

    const result = await response.json();

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function sugDeletePost({ token, postId }) {
  console.log({ token, postId });

  try {
    const response = await fetch(
      `https://student-plug.onrender.com/api/sugPost/deletePost/${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(` ${error.message}`);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function getAuthUser(token) {
  try {
    const response = await fetch(
      "https://student-plug.onrender.com/api/auth/getuser",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getStudentComment(token) {
  try {
    const response = await fetch(
      "https://student-plug.onrender.com/api/auth/getuser",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getParticularSchData(schoolInfoId) {
  try {
    const response = await fetch(
      `https://student-plug.onrender.com/api/school/${schoolInfoId}`
    );

    const result = await response.json();

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function EducationalSignUp(data) {
  console.log(data);
  try {
    const response = await fetch(
      "https://student-plug.onrender.com/api/auth/studentinfo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("faild to signup");
    }
    const result = await response.json();
    console.log(result);
    if (result) {
      localStorage.setItem("student", JSON.stringify(result));
    }

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function signIn(data) {
  console.log(data);
  try {
    const response = await fetch(
      "https://student-plug.onrender.com/api/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const result = await response.json();
    if (result) {
      localStorage.setItem("userDetails", JSON.stringify(result));
    }
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function forgetPassword(data) {
  console.log(data);
  try {
    const response = await fetch(
      "https://student-plug.onrender.com/api/auth/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const result = await response.json();

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function verifyPasswordCode(data) {
  console.log(data);
  try {
    const response = await fetch(
      "https://student-plug.onrender.com/api/auth/verify-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const result = await response.json();
    if (result) {
      localStorage.setItem("userId", JSON.stringify(result.userId));
    }
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function newPassword(data) {
  console.log(data);
  try {
    const response = await fetch(
      "https://student-plug.onrender.com/api/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const result = await response.json();

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function uploadUserImage({ userId, token, profilePhoto }) {
  console.log(`${userId}, token:${token}, ${profilePhoto}`);
  try {
    const response = await fetch(
      "https://student-plug.onrender.com/api/auth/upload-profile",
      {
        method: "POST",
        headers: {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
        body: JSON.stringify({ profilePhoto, userId }),
      }
    );
    if (!response.ok) {
      throw new Error("faild to upload");
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const handleUpload = async ({ profilePhoto, userId, token }) => {
  console.log(profilePhoto, userId, token);
  if (!profilePhoto || !userId) return; // Ensure both image and userId are present

  const formData = new FormData();
  formData.append("profilePhoto", profilePhoto); // Append the image file
  formData.append("userId", userId); // Append the user ID

  try {
    const response = await fetch(
      "https://student-plug.onrender.com/api/auth/upload-profile",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          // Do not set Content-Type, it will be set automatically
        },
        body: formData, // Send FormData
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    console.log("Upload successful:", data);
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const handleUpload2 = async ({ profilePhoto, token, userId }) => {
  if (!profilePhoto || !userId) return;

  const defaultImagePath = "/images/blackman2.png";
  console.log(defaultImagePath);
  const formData = new FormData();

  const imageToUpload = profilePhoto || defaultImagePath;

  if (typeof imageToUpload === "string") {
    const response = await fetch(imageToUpload);
    const blob = await response.blob();
    formData.append("profilePhoto", blob, "defaultImage.png");
  } else {
    formData.append("profilePhoto", profilePhoto);
  }

  formData.append("token", token);
  formData.append("userId", userId);

  try {
    const response = await fetch(
      "https://student-plug.onrender.com/api/auth/upload-profile",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    console.log("Upload successful:", data);
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const schoolInfo = async ({
  userId,
  university,
  state,
  aboutUniversity,
  uniProfilePicture,
}) => {
  try {
    console.log({
      userId,
      university,
      state,
      aboutUniversity,
      uniProfilePicture,
    });
    const formData = new FormData();
    formData.append("uniProfilePicture", uniProfilePicture);
    formData.append("university", university);
    formData.append("aboutUniversity", aboutUniversity);
    formData.append("state", state);
    formData.append("userId", userId);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log(formData);

    const response = await fetch(
      "https://student-plug.onrender.com/api/school/schoolInfo",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      // Attempt to get the exact error message from the response
      const errorData = await response.json(); // Assuming the backend returns JSON
      console.error(
        "Backend error:",
        errorData.message || errorData.error || "Unknown error"
      );
      throw new Error(
        errorData.message || errorData.error || "Unknown error from backend"
      );
    }

    const data = await response.json();
    if (data) {
      localStorage.setItem("schoolInfoData", JSON.stringify(data));
    }

    console.log("Upload successful:", data);
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const studentCreatePost = async ({ userId, text, image }) => {
  try {
    if (!image) {
      console.error("No image provided.");
      return;
    }

    const formData = new FormData();
    for (let index = 0; index < image.length; index++) {
      formData.append("image", image[index]);
    }
    // formData.append("image", image);
    formData.append("text", text);
    formData.append("userId", userId);

    const response = await fetch(
      "https://student-plug.onrender.com/api/students/create-post",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "Backend error:",
        errorData.message || errorData.error || "Unknown error"
      );
      throw new Error(
        errorData.message || errorData.error || "Unknown error from backend"
      );
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// signup=====
export const signInWithGoogle = async () => {
  provider.setCustomParameters({
    prompt: "select_account",
  });
  try {
    const result = await signInWithPopup(auth, provider);
    const signedInUser = result.user;
    console.log("User signed in:", signedInUser);

    // Get the current user's ID token
    const idToken = await signedInUser.getIdToken(/* forceRefresh */ true);
    const data = {
      agreedToTerms: true,
      idToken,
    };
    console.log(idToken, data);

    const response = await fetch(
      "https://student-plug.onrender.com/api/auth/signup1",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const userResult = await response.json();
    console.log(userResult);

    if (result) {
      localStorage.setItem("userDetails", JSON.stringify(userResult));
    }

    return userResult;
  } catch (error) {
    await signInWithRedirect(auth, provider);
    console.error("Error signing in:", error.message);
    throw error;
  }
};

export const userSignInWithGoogle = async () => {
  provider.setCustomParameters({
    prompt: "select_account",
  });

  try {
    const result = await signInWithPopup(auth, provider);
    const signedInUser = result.user;
    console.log("User signed in:", signedInUser);

    // Get the current user's ID token
    const idToken = await signedInUser.getIdToken(/* forceRefresh */ true);
    const data = {
      idToken,
    };
    console.log(idToken);

    const response = await fetch(
      "https://student-plug.onrender.com/api/auth/signin-google",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const userResult = await response.json();
    console.log(userResult);

    if (result) {
      localStorage.setItem("userDetails", JSON.stringify(userResult));
    }

    return userResult;
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw error;
  }
};
