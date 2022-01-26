import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { APP_URL } from "../configure";

interface MyBookType {
  title: string;
  email: string;
  author: string;
  coverLargeUrl: string;
}

const Profile = () => {
  const { user } = useAppSelector((state) => state.authLogin);
  const dispatch = useAppDispatch();

  const [myBook, setMyBook] = useState<MyBookType[]>([]);
  const [loading, setLoading] = useState(true);
  const listData: any[] = [];

  const getMyBook = async () => {
    const email = user!.statusMessage.user.email;
    const result = await axios.post(`${APP_URL}/book/myBook`, { email: email });
    setMyBook(result.data.statusMessage);
    setLoading(false);
  };

  if (myBook.length !== 0) {
    if (myBook.length > 5) {
      for (let i = 0; i < 5; i++) {
        listData.push({
          title: myBook[i].title,
          author: myBook[i].author,
          coverLargeUrl: myBook[i].coverLargeUrl,
        });
      }
    } else {
      for (let i = 0; i < myBook.length; i++) {
        listData.push({
          title: myBook[i].title,
          author: myBook[i].author,
          coverLargeUrl: myBook[i].coverLargeUrl,
        });
      }
    }
  }

  const likeBookUI = listData.map((item, index) => (
    <Card
      key={index}
      style={{ width: "15rem" }}
      onClick={() => {
        console.log("click");
      }}
    >
      <Card.Img variant="top" src={item.coverLargeUrl} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>
          저자: <span>{item.author}</span>
          <br />
        </Card.Text>
      </Card.Body>
    </Card>
  ));

  useEffect(() => {
    getMyBook();
  }, []);

  return (
    <div style={{ margin: "10px" }}>
      <div style={{ textAlign: "center" }}>
        <h3>About Our Site / Profile</h3>
        <br />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ margin: "20px" }}>
          <h5>이곳은 책 관련 사이트입니다.</h5>

          <br />
          <span>* Book Site</span>
          <br />
          <span>1. 회원가입 / 로그인 / 로그아웃</span>
          <br />
          <span>2. 카테고리 - 베스트셀러 / 추천도서 / 신규도서</span>
          <br />
          <span>3. 책 상세페이지</span>
          <br />
          <span>4. About & Profile</span>
          <br />
          <br />
          <span>* 함께하고 있는 OPEN API</span>
          <br />
          <span>1. 인터파크 OPEN API와 함께하고 있어요</span>
          <br />
          <span>2. 딥브레인 제공 API도 함께하고 있어요</span>
          <br />
          <span>3. 구성된 API 설명은 여기서 확인 가능해요</span>
          <br />
          <a href="http://localhost:5000/api/docs" target="_blank">
            API DOCS
          </a>
          <br />
          <br />
          <span>* 디자인은 Antd , BootStrap으로 구성되었습니다</span>
          <br />
        </div>

        <Card style={{ width: "30rem" }}>
          <Card.Img
            variant="top"
            src="https://www.kedglobal.com/data/ked/image/2021/06/15/ked202106150022.700x.0.jpg"
          />
          <Card.Body>
            <Card.Title>
              Welcome, {user!.statusMessage.user.nickname}😻
            </Card.Title>
            <Card.Text>
              닉네임: <span>{user!.statusMessage.user.nickname}</span>
              <br />
              이메일: <span>{user!.statusMessage.user.email}</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div>
        <h5>{user!.statusMessage.user.nickname} 님이 좋아하는 책</h5>
      </div>
      {listData.length !== 0 && (
        <div style={{ display: "flex" }}>{likeBookUI}</div>
      )}
    </div>
  );
};

export default Profile;
