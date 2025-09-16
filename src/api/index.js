import axios from "../config/axiosCOnfig";


// if we not pass anything then it fetch all document from db as filter object will be null 
export const getAllpdfRequest = async () => {
  try {
    const response = await axios.get("/pyqs");
    return response.data.data || []; // <-- return the inner array
  } catch (error) {
    console.error("Error in getAllpdfRequest:", error.response?.data || error.message);
    return []; // fallback array
  }
};

// here we will pass the filter object to get filtered data from db
export const getFilteredpdfRequest = async (filters={}) => {
  try {
    const response = await axios.get("/pyqs", { params: filters });
    return response.data.data || []; // <-- return the inner array
  } catch (error) {
    console.error("Error in getFilteredpdfRequest:", error.response?.data || error.message);
    return []; // fallback array
  }
};
