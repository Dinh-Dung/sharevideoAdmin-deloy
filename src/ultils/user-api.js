import axios from "axios";

export async function getPendingVideos() {
  try {
    const { data, error } = await axios.get(
      `http://localhost:8080/admin/getAllUser`
    );

    if (!data || error) throw new Error();

    return data.data;
  } catch (error) {
    return [];
  }
}
export async function deleteUser(userId) {
  try {
    const { data, error } = await axios.post(
      `http://localhost:8080/admin/deleteUser`,
      { userId }
    );

    if (!data || error) throw new Error();

    return data.data;
  } catch (error) {
    return [];
  }
}
