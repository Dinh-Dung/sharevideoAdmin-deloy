import axios from "axios";
export async function getPendingVideos() {
  try {
    const { data, error } = await axios.get(
      `http://localhost:8080/admin/getPendingVideos`
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
      `http://localhost:8080/admin/acceptPendingVideo`,
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
    const { data, error } = await axios.post(
      `http://localhost:8080/video/deleteVideo`,
      { videoId }
    );

    if (!data || error) throw new Error();

    return data.data;
  } catch (error) {
    return [];
  }
}
