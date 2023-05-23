import axios from "axios";
import { BASE_URL } from "../constants/base_url";

export async function getPendingVideos() {
  try {
    const { data, error } = await axios.get(`${BASE_URL}/admin/getAllUser`);

    if (!data || error) throw new Error();

    return data.data;
  } catch (error) {
    return [];
  }
}
export async function deleteUser(userId) {
  try {
    const { data, error } = await axios.post(`${BASE_URL}/admin/deleteUser`, {
      userId,
    });

    if (!data || error) throw new Error();

    return data.data;
  } catch (error) {
    return [];
  }
}
