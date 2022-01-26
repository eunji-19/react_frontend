import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks/hooks";
import {
  BookDetail,
  BookState,
  setBookDetail,
} from "../redux/modules/bookSlice";
import { Tag, Divider, List, Avatar } from "antd";
import Icon from "@ant-design/icons";
import Footer from "../pages/Footer";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface BookProps {
  book: BookState;
}

const BookCategoryList: React.FC<BookProps> = ({ book }) => {
  /**
   * 국내도서 기준 domesticItemList
   * 해외도서 기준 foreignItemList
   */
  const domesticItemList = book.books!.statusMessage.domestic.item;
  const foreignItemList = book.books!.statusMessage.foreign.item;

  /**
   * 국내도서 / 해외도서 클릭 구분
   */
  const [category, setCategory] = useState("국내도서");
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const clickCategory = (data: string) => {
    // console.log("click ", data);
    setShow(true);
  };

  const domesticListData: BookDetail[] = [];
  const foreignListData: BookDetail[] = [];

  if (domesticItemList.length !== 0) {
    for (let i = 0; i < domesticItemList.length; i++) {
      domesticListData.push({
        href: `book/${domesticItemList[i].isbn}`,
        title: domesticItemList[i].title,
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content: domesticItemList[i].description,
        coverLargeUrl: domesticItemList[i].coverLargeUrl,
        author: domesticItemList[i].author,
        publisher: domesticItemList[i].publisher,
        customerReviewRank: domesticItemList[i].customerReviewRank,
        priceStandard: domesticItemList[i].priceStandard,
        coverSmallUrl: domesticItemList[i].coverSmallUrl,
        categoryName: domesticItemList[i].categoryName,
        isbn: domesticItemList[i].isbn,
      });
    }
  }

  if (foreignItemList.length !== 0) {
    for (let i = 0; i < foreignItemList.length; i++) {
      foreignListData.push({
        href: `book/${foreignItemList[i].isbn}`,
        title: foreignItemList[i].title,
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content: foreignItemList[i].description,
        coverLargeUrl: foreignItemList[i].coverLargeUrl,
        author: foreignItemList[i].author,
        publisher: foreignItemList[i].publisher,
        customerReviewRank: foreignItemList[i].customerReviewRank,
        priceStandard: foreignItemList[i].priceStandard,
        coverSmallUrl: foreignItemList[i].coverSmallUrl,
        categoryName: foreignItemList[i].categoryName,
        isbn: foreignItemList[i].isbn,
      });
    }
  }

  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <div style={{ margin: "10px", display: "flex" }}>
        <div
          onClick={() => {
            clickCategory(category);
          }}
        >
          <Tag color="geekblue">{category}</Tag>
        </div>
        <Modal
          show={show}
          onHide={() => {
            setShow(false);
          }}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>카테고리 선택</Modal.Title>
          </Modal.Header>
          <Modal.Body>원하시는 카테고리를 선택해주세요</Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => {
                // clickCategory("국내도서");
                setCategory("국내도서");
                setShow(false);
              }}
            >
              국내도서
            </Button>
            <Button
              variant="outline-success"
              onClick={() => {
                // clickCategory("해외도서");
                setCategory("해외도서");
                setShow(false);
              }}
            >
              해외도서
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {category === "국내도서" ? (
        <List
          style={{ margin: "10px" }}
          itemLayout="vertical"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          dataSource={domesticListData}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              actions={[
                <Icon type="setting" title="156" style={{ marginRight: 8 }} />,
                <Icon type="setting" title="156" style={{ marginRight: 8 }} />,
                <Icon type="message" title="156" style={{ marginRight: 8 }} />,
              ]}
              extra={
                <img
                  width={210}
                  height={200}
                  alt="logo"
                  src={item.coverLargeUrl}
                />
              }
              onClick={() => {
                dispatch(setBookDetail(item));
                navigate(`/book/${item.title}`);
              }}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.title}
                description={`작가: ${item.author} 출판사: ${item.publisher} 별점: ${item.customerReviewRank}`}
              />
              {item.content}
            </List.Item>
          )}
        />
      ) : (
        <List
          style={{ margin: "10px" }}
          itemLayout="vertical"
          pagination={{
            onChange: (page) => {},
            pageSize: 10,
          }}
          dataSource={foreignListData}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              actions={[
                <Icon type="setting" title="156" style={{ marginRight: 8 }} />,
                <Icon type="setting" title="156" style={{ marginRight: 8 }} />,
                <Icon type="message" title="156" style={{ marginRight: 8 }} />,
              ]}
              extra={
                <img
                  width={210}
                  height={200}
                  alt="logo"
                  src={item.coverLargeUrl}
                />
              }
              onClick={() => {
                dispatch(setBookDetail(item));
                navigate(`/book/${item.title}`);
              }}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.title}
                description={`작가: ${item.author} 출판사: ${item.publisher} 별점: ${item.customerReviewRank}`}
              />
              {item.content}
            </List.Item>
          )}
        />
      )}
      {/* <Footer /> */}
    </div>
  );
};

export default BookCategoryList;
