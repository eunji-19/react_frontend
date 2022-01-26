import { Space, Spin } from "antd";
import React, { useEffect } from "react";
import Audio from "../components/Audio";
import { brainVideo } from "../redux/actions/_brainAction";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { VideoKeyReqType } from "../types";

interface AudioProps {
  videoReqType: VideoKeyReqType;
  isAudio: boolean;
}

const AudioContainer: React.FC<AudioProps> = ({ videoReqType, isAudio }) => {
  const { videoLoading } = useAppSelector((state) => state.brainVideo);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(brainVideo(videoReqType));
  }, []);

  return (
    <>
      {videoLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </div>
      ) : (
        <Audio />
      )}
    </>
  );
};

export default AudioContainer;
