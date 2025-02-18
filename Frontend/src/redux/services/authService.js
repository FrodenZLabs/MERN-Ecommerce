import axios from "axios";

const API_URL = "http://localhost:8000";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/signin`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.errorMessage;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/signout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.errorMessage || "Error logging out.";
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.errorMessage;
  }
};

export const createClient = async (clientPayload) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/client/new_client`,
      clientPayload,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.errorMessage ||
      "An error occurred while submitting the form."
    );
  }
};

export const createGuarantor = async (guarantorPayload) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/client/new_guarantor`,
      guarantorPayload,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.errorMessage ||
      "An error occurred while submitting the form."
    );
  }
};

export const predictScore = async (creditScoreInput) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/prediction/predict_score`,
      creditScoreInput,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.errorMessage ||
      "An error occurred while submitting the form."
    );
  }
};

export const predictRisk = async (creditRiskInput) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/prediction/predict_risk`,
      creditRiskInput,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.errorMessage ||
      "An error occurred while submitting the form."
    );
  }
};

export const fetchUserPrediction = async (userId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/prediction/user/${userId}`,
      {
        withCredentials: true,
      }
    );

    return response.data.prediction || null;
  } catch (error) {
    error.response?.data?.errorMessage;
  }
};
