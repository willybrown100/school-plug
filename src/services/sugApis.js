export async function sugSignUp(data) {
  console.log(data);
  try {
    const response = await fetch(
      "https://student-plug.onrender.com/api/school/sug-signup",
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
      localStorage.setItem("sugDetails", JSON.stringify(result));
    }
    console.log(result);

    return result;
  } catch (error) {
    throw error;
    console.log(error);
  }
}

export async function sugSignIn(data) {
  console.log(data);
  try {
    const response = await fetch(
      "https://student-plug.onrender.com/api/school/sug-signin",
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
      localStorage.setItem("sugDetails", JSON.stringify(result));
    }
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}



export async function sugVerifyPasswordCode(data) {
  console.log(data);
  try {
    const response = await fetch(
      "https://student-plug.onrender.com/api/school/code-verification",
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
      localStorage.setItem("sugId", JSON.stringify(result.userId));
    }
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function sugForgetPassword(data) {
  console.log(data);
  try {
    const response = await fetch(
      "https://student-plug.onrender.com/api/school/forgot",
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

export async function sugNewPassword(data) {
  console.log(data);
  try {
    const response = await fetch(
      "https://student-plug.onrender.com/api/school/passwordReset",
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

export async function getAuthSug(userId) {
  console.log(userId);
  try {
    const response = await fetch(
      `https://student-plug.onrender.com/api/school/getSug/${userId}`
    );

    const result = await response.json();

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function schoolFacultyandReg({
  facultyName,
  file,
  schoolInfoId,
  selectedFaculties,
}) {
  console.log({ facultyName, file, schoolInfoId, selectedFaculties });
  const formData = new FormData();

  if (Array.isArray(facultyName)) {
    facultyName.forEach((name) => {
      formData.append("facultyName[]", name);
    });
  } else {
    formData.append("facultyName", facultyName);
  }

  if (Array.isArray(selectedFaculties)) {
    selectedFaculties.forEach((facultyId) => {
      formData.append("selectedFaculties[]", facultyId); // Note the [] to handle as array
    });
  } else {
    formData.append("selectedFaculties", selectedFaculties);
  }

  formData.append("file", file);
  formData.append("schoolInfoId", schoolInfoId);

  try {
    const response = await fetch(
      "https://student-plug.onrender.com/api/school/faculty/reg-upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      let errorMessage;

      if (contentType && contentType.includes("application/json")) {
        const errorJson = await response.json();
        errorMessage = errorJson.message;
      } else {
        const errorText = await response.text();
        errorMessage = errorText;
      }

      throw new Error(errorMessage || "Something went wrong with the upload.");
    }

    if (contentType && contentType.includes("application/json")) {
      const result = await response.json();
      console.log(result);
      return result;
    } else {
      const result = await response.text();
      console.log(result);
      return result;
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

export async function getFaculties() {
  try {
    const response = await fetch(
      `https://student-plug.onrender.com/api/school/faculty/faculties/`
    );

    const result = await response.json();

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}