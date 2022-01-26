import { Space, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { APP_URL } from "../configure";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";

const Audio = () => {
  const { user } = useAppSelector((state) => state.authLogin);
  const { videoKey } = useAppSelector((state) => state.brainVideo);
  const dispatch = useAppDispatch();

  const [videoUrl, setVideoUrl] = useState("");
  const [videoLoading, setVideoLoading] = useState(true);

  useEffect(() => {
    const findProject = async () => {
      const result = await axios.post(`${APP_URL}/deepbrain/findProject`, {
        key: videoKey,
        token: user!.statusMessage.user.generateToken,
      });
      if (!result.data.statusMessage.data.video) {
        setTimeout(() => {
          findProject();
        }, 3000);
      } else {
        setVideoUrl(result.data.statusMessage.data.video);
        setVideoLoading(false);
      }
    };
    findProject();
  }, [dispatch]);

  return (
    <>
      {videoLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <ReactPlayer
            className="react-player"
            url={videoUrl} // 플레이어 url
            width="800px" // 플레이어 크기 (가로)
            height="500px" // 플레이어 크기 (세로)
            playing={true} // 자동 재생 on
            muted={true} // 자동 재생 on
            controls={true} // 플레이어 컨트롤 노출 여부
            light={false} // 플레이어 모드
            pip={true} // pip 모드 설정 여부
            poster={
              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
            } // 플레이어 초기 포스터 사진
            // onEnded={() => handleVideo()} // 플레이어 끝났을 때 이벤트
          />
        </div>
      )}
    </>
  );
};

export default Audio;
