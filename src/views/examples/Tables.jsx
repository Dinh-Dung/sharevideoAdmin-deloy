/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Header from "../../components/Headers/Header";
import "./Tables.css";
import { getPendingVideos } from "../../ultils/video-api";
import { deleteVideo } from "../../ultils/video-api";
import { accpetPendingVideo } from "../../ultils/video-api";
import { useRef } from "react";

const Tables = () => {
  const history = useHistory();
  const [pendingVideoList, setPendingVideoList] = useState([]);
  const [status, setStatus] = useState("public");
  const videoRef = useRef(null);
  useEffect(() => {
    (async () => {
      const list = await getPendingVideos();
      setPendingVideoList(list);
    })();
  }, []);
  useEffect(() => {
    let options = {
      rootMargin: "0px",
      threshold: [0.95],
    };

    let handlePlay = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (videoRef.current && document.visibilityState === "visible") {
            videoRef.current.play();
          } else {
            document.addEventListener(
              "visibilitychange",
              function onVisibilityChange() {
                if (
                  document.visibilityState === "visible" &&
                  videoRef.current
                ) {
                  videoRef.current.play();
                  document.removeEventListener(
                    "visibilitychange",
                    onVisibilityChange
                  );
                }
              }
            );
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      });
    };

    let observer;
    if (videoRef.current) {
      observer = new IntersectionObserver(handlePlay, options);
      observer.observe(videoRef.current);
      return () => {
        if (observer && videoRef.current) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          observer.unobserve(videoRef.current);
        }
      };
    }
  }, [videoRef]);

  const acceptVideo = async (videoId) => {
    try {
      await accpetPendingVideo(videoId, status);
      const pendingVideoArray = [...pendingVideoList];
      const updateList = pendingVideoArray.filter(
        (video) => video.user.user_request_status === status
      );
      setStatus(updateList);
      history.push("/admin/tables");
    } catch (error) {
      console.log(error);
    }
  };

  const deletePendingVideo = async (id) => {
    try {
      await deleteVideo(id);
      const pendingVideoArray = [...pendingVideoList];
      const updateList = pendingVideoArray.filter((video) => video.id !== id);
      setPendingVideoList(updateList);
      history.push("/admin/tables");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />

      {pendingVideoList.map((video, id) => (
        <div className={"list_item-container"} key={`video_${id}`}>
          <div
            className={"avatar-user"}
            style={{ width: "56px", height: "56px" }}
          >
            <div className={"browse-user-avatar"}>
              <div
                className={"user-avatar"}
                style={{ width: "56px", height: "56px" }}
              >
                <span>{video.user.fullname[0]}</span>
              </div>
            </div>
          </div>

          <div className={"content-container"}>
            <div className={"content-info"}>
              <div className={"author"}>
                <div className={"author-container"}>
                  <h3 className={"video-author_uniqued"}>
                    {video.user.fullname}
                  </h3>
                  <h4 className={"video-author_nickname"}>
                    {video.user.nickname}
                  </h4>
                </div>
              </div>
            </div>

            <div className={"span-text"}>
              <span>{video ? video.description : ""}</span>
            </div>
            <div className={"content-video"}>
              <div className={"video"}>
                <video
                  ref={videoRef}
                  src={video.url}
                  controls
                  loop
                  muted={false}
                  style={{ width: "100%", height: "584px" }}
                ></video>
              </div>

              <div className={"action-item"}>
                <button
                  type="button"
                  className={"comment"}
                  onClick={() => acceptVideo(video.id)}
                >
                  <span className={"icon-check"}>
                    <i className="fas fa-check text-success mr-3 span-icon_success"></i>
                  </span>
                </button>
                <button
                  type="button"
                  className={"like"}
                  onClick={() => deletePendingVideo(video.id)}
                >
                  <span className="icon-delete">
                    <i className="ni ni-fat-remove text-danger  mr-3 span-icon_danger"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Tables;
