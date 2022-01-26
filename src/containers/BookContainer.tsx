import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { MenuIndexState } from "../redux/modules/menuIndex";
import { Spin, Space } from "antd";
import {
  bestSeller,
  newSeller,
  recommendSeller,
} from "../redux/actions/_bookAction";
import BookCategoryList from "../components/BookCategoryList";
import { Button } from "react-bootstrap";

const BookContainer = () => {
  const { title }: MenuIndexState = useAppSelector((state) => state.menuIndex);
  const bookLoading = useAppSelector((state) => state.getBook.bookLoading);
  const book = useAppSelector((state) => state.getBook);
  const dispatch = useAppDispatch();

  const fetchBookItem = () => {
    if (title === "BestSeller") {
      dispatch(bestSeller());
    } else if (title === "New") {
      dispatch(newSeller());
    } else {
      dispatch(recommendSeller());
    }
  };

  useEffect(() => {
    fetchBookItem();
  }, [title]);

  return (
    <div>
      {bookLoading ? (
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
        <BookCategoryList book={book} />
      )}
    </div>
  );
};

export default BookContainer;
