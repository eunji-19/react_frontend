import React, { useEffect, useState } from "react";
import { LikeBook } from "../models/Book";
import { Model, ModelElement, ModelInfo } from "../models/brain/Model";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import styles from "../css/BookDetail.module.css";
import { Button, Card, Modal } from "react-bootstrap";
import { message, Space, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { doLikeBook } from "../redux/actions/_bookAction";
import { LikeBookReqType, VideoKeyReqType } from "../types";
import AudioContainer from "../containers/AudioContainer";
import { brainVideo } from "../redux/actions/_brainAction";

interface SelectBookProps {
  likeBook: LikeBook;
  model: Model;
}

const _SelectBook: React.FC<SelectBookProps> = ({ likeBook, model }) => {
  const { isLoggedIn, user } = useAppSelector((state) => state.authLogin);
  const bookDetail = useAppSelector((state) => state.getBookDetail);
  const [modelInfoList, setModelInfoList] = useState<ModelElement[]>([]);

  const [modelInfoLoading, setModelInfoLoading] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /**
   * 페이지 초기화
   */
  const [init, setInit] = useState(false);
  const initItem = () => {
    if (!likeBook) {
      setCartBook(false);
    } else {
      if (likeBook.statusMessage.existingLikeBook.title === bookDetail.title) {
        setCartBook(true);
      } else {
        setCartBook(false);
      }
    }
    setInit(true);
  };

  const initModel = () => {
    if (isLoggedIn) {
      setModelInfoList((prev) => [...prev, ...model!.statusMessage.models]);
      setModelInfoLoading(false);
    }
  };

  useEffect(() => {
    initModel();
  }, [dispatch]);

  useEffect(() => {
    initItem();
  }, []);

  /**
   * 모델
   */
  function ModelUI() {
    let listData: ModelInfo[] = [];
    modelInfoList.forEach((element) => {
      listData.push({
        imgUrl: element.clothes[0].imgPath.replace(".png", "_new.png"),
        name: element.label.ko,
        language: element.language,
        expertise: element.expertise.ko,
        clothes: element.clothes,
        modelId: element.id,
      });
    });
    const listItems = listData.map((item) => (
      <Card key={item.name} style={{ width: "18rem", margin: "5px" }}>
        <Card.Img variant="top" src={item.imgUrl} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>
            언어 : {item.language} <br />
            직업 : {item.expertise}
          </Card.Text>
          <Button
            variant="outline-secondary"
            onClick={() => {
              listenAudio(item);
            }}
          >
            오디오북
          </Button>
        </Card.Body>
      </Card>
    ));
    return <div style={{ display: "flex" }}>{listItems}</div>;
  }

  /**
   * 좋아하는 책 & 해당 UI
   */
  const [cartBook, setCartBook] = useState(false);
  function CartUI() {
    if (cartBook) {
      return (
        <Button
          variant="success"
          onClick={() => {
            const email = user!.statusMessage.user.email;
            const likeBookReqType: LikeBookReqType = {
              href: bookDetail.href,
              title: bookDetail.title,
              avatar: bookDetail.avatar,
              content: bookDetail.content,
              coverLargeUrl: bookDetail.coverLargeUrl,
              author: bookDetail.author,
              publisher: bookDetail.publisher,
              customerReviewRank: bookDetail.customerReviewRank,
              priceStandard: bookDetail.priceStandard,
              coverSmallUrl: bookDetail.coverSmallUrl,
              categoryName: bookDetail.categoryName,
              isbn: bookDetail.isbn,
              email: email,
            };
            setCartBook(false);
            dispatch(doLikeBook(likeBookReqType));
          }}
        >
          😍좋아하는 책
        </Button>
      );
    } else {
      return (
        <Button
          variant="outline-dark"
          onClick={() => {
            const email = user!.statusMessage.user.email;
            const likeBookReqType: LikeBookReqType = {
              href: bookDetail.href,
              title: bookDetail.title,
              avatar: bookDetail.avatar,
              content: bookDetail.content,
              coverLargeUrl: bookDetail.coverLargeUrl,
              author: bookDetail.author,
              publisher: bookDetail.publisher,
              customerReviewRank: bookDetail.customerReviewRank,
              priceStandard: bookDetail.priceStandard,
              coverSmallUrl: bookDetail.coverSmallUrl,
              categoryName: bookDetail.categoryName,
              isbn: bookDetail.isbn,
              email: email,
            };
            setCartBook(false);
            dispatch(doLikeBook(likeBookReqType));
            setCartBook(true);
            console.log("cartBOOk ", cartBook);
          }}
        >
          책 담기
        </Button>
      );
    }
  }

  /**
   * 오디오북 들으러가기
   * Modal 창 위해서 필요
   */
  const [isAudio, setIsAudio] = useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setShow(false);

  const [videoKeyReqType, setVideoKeyReqType] = useState({
    language: "",
    text: "",
    model: "",
    clothes: 0,
    token: "",
  });

  const listenAudio = (item: ModelInfo) => {
    if (item.language[0] !== "ko") {
      setShow(true);
      setOpen(false);
    } else {
      setShow(false);
      setOpen(!open);
      setVideoKeyReqType({
        language: item.language[0],
        // text: "이것은 테스트입니다. 끝냅시다",
        text:
          "이 책은 " +
          bookDetail.title +
          " 제목이며 저자는 " +
          bookDetail.author +
          " 입니다. 이후부터는 준비중이니 조금만 기다려주세요",
        model: item.modelId,
        clothes: parseInt(item.clothes[0].id),
        token: user!.statusMessage.user.generateToken,
      });
      // dispatch(brainVideo(videoReqType)).then((response) => {
      //   setOpen(!open);
      // });
    }
  };

  return (
    <>
      {!init ? (
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
        <div>
          <div className={styles.app}>
            <div className={styles.details}>
              <div className={styles["big-img"]}>
                <img src={bookDetail.coverLargeUrl!} alt="" />
              </div>
              <div className={styles.box}>
                <div className={styles.row}>
                  <h3>{bookDetail.title}</h3>
                  <span>{bookDetail.priceStandard}원</span>
                </div>
                <p>{bookDetail.content}</p>
                <div style={{ display: "flex" }}>
                  <Button
                    variant="outline-success"
                    onClick={() => {
                      if (!isLoggedIn) {
                        message
                          .info("로그인 후 사용가능")
                          .then(() => navigate("/login"));
                        setIsAudio(false);
                      } else {
                        setIsAudio((prev) => !prev);
                      }
                    }}
                  >
                    오디오북 듣기
                  </Button>
                  <div style={{ marginLeft: "10px" }}></div>
                  {isLoggedIn && <>{<CartUI />}</>}
                  {!isLoggedIn && (
                    <Button
                      variant="outline-dark"
                      // variant={likeBook ? "success" : "outline-success"}
                      onClick={() => {
                        message
                          .info("로그인 후 사용가능")
                          .then(() => navigate("/login"));
                        setIsAudio(false);
                      }}
                    >
                      책 담기
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {isAudio && (
            <div className={styles.app}>
              <div style={{ margin: "10px", paddingTop: "20px" }}>
                <h4>😍 모델 선택</h4>
                <div className={styles.box}></div>
                {!modelInfoLoading && <ModelUI />}
                {open && (
                  <AudioContainer
                    videoReqType={videoKeyReqType}
                    isAudio={isAudio}
                  />
                )}

                {/* {open && (
              <CustomVideoPlay open={open} videoKeyType={videoKeyType} />
            )} */}
                <Modal
                  show={show}
                  onHide={() => {
                    setShow(false);
                  }}
                  backdrop="static"
                  // keyboard="false"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>오디오북</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>아직 준비중이에요😭</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default _SelectBook;
