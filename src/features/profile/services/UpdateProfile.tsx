import axios from 'axios';
import { Details } from '../../../interface/mainInterface';
const token = sessionStorage.getItem('token');

export const updateAboutMe = async (userId: string, aboutMe: string) => {
  try {
    const response = await axios.patch(`http://localhost:3000/v1/user/${userId}`, { aboutMe: aboutMe },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
    );
    console.log("About Us updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to update About Us:", error);
    throw error;
  }
};

export const updateDisplayName = async (userId: string, displayName: string) => {
    try {
      const response = await axios.patch(`http://localhost:3000/v1/user/${userId}`, { displayName: displayName },
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      console.log("Display Name updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to update Display Name:", error);
      throw error;
    }
};
export const updateUserName= async (userId: string, userName: string) => {
    try {
      const response = await axios.patch(`http://localhost:3000/v1/user/${userId}`, { userName: userName },
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      console.log("User Name updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to update User Name:", error);
      throw error;
    }
};
export const updateName = async (userId: string, firstName: string, lastName: string) => {
    try {
      const response = await axios.patch(`http://localhost:3000/v1/user/${userId}`, { firstName: firstName, lastName: lastName },
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      console.log("Name updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to update Name:", error);
      throw error;
    }
};
export const updateAccount = async (userId: string, email: string, password: string) => {
    try {
      const response = await axios.patch(`http://localhost:3000/v1/user/${userId}`, { 
        account: {
        email: email,
        password: password
    } },
    {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      console.log("Account updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to update Account:", error);
      throw error;
    }
};

export const updateDetails = async (userId: string, details: Details) => {
    try {
      const response = await axios.patch(`http://localhost:3000/v1/user/${userId}`, {details: details},
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      console.log("Account updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to update Account:", error);
      throw error;
    }
};