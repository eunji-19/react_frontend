import { Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import _SelectBook from "../components/_SelectBook";
import { findLikeBook, initLikeBook } from "../redux/actions/_bookAction";
import { brainModel } from "../redux/actions/_brainAction";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";

const BookDetailContainer = () => {
  const { isLoggedIn, user } = useAppSelector((state) => state.authLogin);
  const bookDetail = useAppSelector((state) => state.getBookDetail);
  const { likeBook } = useAppSelector((state) => state.getLikeBook);
  const { model, modelLoading } = useAppSelector((state) => state.brainModel);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  const initItem = () => {
    if (isLoggedIn) {
      const email = user!.statusMessage.user.email;
      const title = bookDetail.title;
      const token = user!.statusMessage.user.generateToken;
      /**
       * 좋아하는 책 찾음 -> 모델리스트 받아옴
       */
      dispatch(findLikeBook({ email, title })).then(() => {
        // setLoading(false);
        dispatch(brainModel(token)).then((response) => {
          // setLoading(false);
          setLoading(false);
        });
      });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    initItem();
  }, [dispatch]);

  return (
    <>
      {loading ? (
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
        <_SelectBook likeBook={likeBook!} model={model!} />
        // <div>no</div>
      )}
    </>
  );
};

export default BookDetailContainer;
