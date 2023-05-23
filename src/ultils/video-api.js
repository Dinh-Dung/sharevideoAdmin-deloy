import axios from "axios";
import { BASE_URL } from "../constants/base_url";
export async function getPendingVideos() {
  try {
    const { data, error } = await axios.get(
      `${BASE_URL}/admin/getPendingVideos`
    );

    if (!data || error) throw new Error();

    return data.data;
  } catch (error) {
    return [];
  }
}
export async function accpetPendingVideo(videoId, accept) {
  try {
    const { data, error } = await axios.post(
      `${BASE_URL}/admin/acceptPendingVideo`,
      { videoId, accept }
    );

    if (!data || error) throw new Error();

    return data.data;
  } catch (error) {
    return [];
  }
}
export async function deleteVideo(videoId) {
  try {
    const { data, error } = await axios.post(`${BASE_URL}/video/deleteVideo`, {
      videoId,
    });

    if (!data || error) throw new Error();

    return data.data;
  } catch (error) {
    return [];
  }
}
