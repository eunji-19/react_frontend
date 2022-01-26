import React, { useRef, useState } from "react";
import { Button, Input, Form, message } from "antd";
import styles from "../css/Login.module.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { authSignup } from "../redux/actions/_authActions";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { APP_URL } from "../configure";

const Signup = () => {
  const nicknameRef = useRef<Input>(null);
  const emailRef = useRef<Input>(null);
  const passwordRef = useRef<Input>(null);
  const [error, setError] = useState("");

  // antd form control
  const [form] = Form.useForm();

  /**
   * 회원가입
   */
  const { signupError, signupLoading, user } = useAppSelector(
    (state) => state.authSignup
  );
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  /**
   * Modal 위해서 필요
   */
  const [show, setShow] = useState(false);

  // submit 할때 Form
  const onSubmitForm = async () => {
    const nickname = nicknameRef.current!.state.value;
    const email = emailRef.current!.state.value;
    const password = passwordRef.current!.state.value;

    console.log("nickname, email, password ", nickname, email, password);
    await axios
      .post(`${APP_URL}/auth/signup`, { nickname, email, password })
      .then((response) => {
        console.log("HERE");
        navigate("/login");
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setShow(true);
          setError(err.response!.data.statusMessage);
        }
      });
  };

  return (
    <div className={styles.login_page}>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>회원가입오류</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error !== "" ? error : ""}</Modal.Body>
        <Modal.Footer>
          <Button
            danger
            type="text"
            onClick={() => {
              setShow(false);
            }}
          >
            확인
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.login_box}>
        <div className={styles.illustration_wrapper}>
          <img
            src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            alt="Login"
          />
        </div>
        <Form className={styles.login_form} onFinish={onSubmitForm} form={form}>
          <p
            style={{
              color: "#333333",
              fontSize: "30px",
              fontWeight: "bold",
              lineHeight: 1,
              marginBottom: 0,
              //   marginLeft: 10,
            }}
          >
            Signup Book
          </p>
          {/* <p style={{ marginBottom: 30 }}>Login to the Dashboard</p> */}
          <div className={styles.nickname_title}>
            Nickname <span className={styles.required}>*</span>
          </div>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Nickname" }]}
          >
            <div className={styles.input_area}>
              <Input
                placeholder="Nickname"
                autoComplete="nickname"
                name="nickname"
                className={styles.input}
                ref={nicknameRef}
              />
            </div>
          </Form.Item>
          <div className={styles.email_title}>
            Email <span className={styles.required}>*</span>
          </div>
          <Form.Item
            name="email"
            rules={[
              { type: "email", message: "The input is not valid E-mail!" },
              { required: true, message: "Please input your E-mail!" },
            ]}
          >
            <div className={styles.input_area}>
              <Input
                placeholder="Email"
                autoComplete="email"
                name="email"
                className={styles.input}
                ref={emailRef}
              />
            </div>
          </Form.Item>
          <div className={styles.password_title}>
            Password <span className={styles.required}>*</span>
          </div>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <div className={styles.input_area}>
              <Input.Password
                type="password"
                autoComplete="current-password"
                name="password"
                className={styles.input}
                ref={passwordRef}
              />
            </div>
          </Form.Item>
          <div className={styles.button_area}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.login_form_button}
              size="large"
            >
              {/* {signupLoading ? <>Loading</> : <>Signup</>} */}
              Signup
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
