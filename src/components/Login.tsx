import React, { useRef, useState } from "react";
import { Button, Input, Form, Spin, message } from "antd";
import styles from "../css/Login.module.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { useNavigate, Navigate } from "react-router-dom";
import { authLogin } from "../redux/actions/_authActions";

const Login = () => {
  const emailRef = useRef<Input>(null);
  // const emailRef = useRef();
  const passwordRef = useRef<Input>(null);

  // antd form control
  const [form] = Form.useForm();

  // const navigate = useNavigate();

  const isLoggedIn = useAppSelector((state) => state.authLogin.isLoggedIn);
  const { loginLoading, loginError } = useAppSelector(
    (state) => state.authLogin
  );
  const dispatch = useAppDispatch();

  // submit 할때 Form
  const onSubmitForm = async () => {
    // event.preventDefault();

    const email = emailRef.current!.state.value;
    const password = passwordRef.current!.state.value;

    dispatch(authLogin({ email, password }));
  };

  if (isLoggedIn) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className={styles.login_page}>
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
            Login Book
          </p>
          {/* <p style={{ marginBottom: 30 }}>Login to the Dashboard</p> */}
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
            {loginError && (
              <div style={{ color: "red", margin: "5px" }}>
                {loginError.statusMessage}
              </div>
            )}
            <Button
              type="primary"
              htmlType="submit"
              className={styles.login_form_button}
              size="large"
            >
              {loginLoading ? <Spin tip="Loading..."></Spin> : "로그인"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;

// const Login = () => {
//   const emailRef = useRef<Input>(null);
//   // const emailRef = useRef();
//   const passwordRef = useRef<Input>(null);

//   // antd form control
//   const [form] = Form.useForm();

//   const navigate = useNavigate();

//   const { isLoggedIn } = useAppSelector((state) => state.auth);
//   const { axiosMessage } = useAppSelector((state) => state.message);
//   const dispatch = useAppDispatch();

//   const [loading, setLoading] = useState(false);

//   // submit 할때 Form
//   const onSubmitForm = async () => {
//     // event.preventDefault();

//     const email = emailRef.current!.state.value;
//     const password = passwordRef.current!.state.value;

//     setLoading(true);

//     dispatch(login({ email, password }))
//       .then(() => {
//         navigate("/");
//       })
//       .catch(() => {
//         setLoading(false);
//       });

//     setLoading(false);
//     console.log("Login ", axiosMessage.status);

//     // if (axiosMessage) {
//     //   if (axiosMessage.data.statusMessage.includes("회원정보")) {
//     //     message
//     //       .error(axiosMessage.data.statusMessage)
//     //       .then(() => navigate("/signup"));
//     //   } else {
//     //     message.error(axiosMessage.data.statusMessage);
//     //   }
//     // }
//   };

//   if (isLoggedIn) {
//     return <Navigate replace to="/" />;
//   }

//   return (
//     <div className={styles.login_page}>
//       <div className={styles.login_box}>
//         <div className={styles.illustration_wrapper}>
//           <img
//             src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
//             alt="Login"
//           />
//         </div>
//         <Form className={styles.login_form} onFinish={onSubmitForm} form={form}>
//           <p
//             style={{
//               color: "#333333",
//               fontSize: "30px",
//               fontWeight: "bold",
//               lineHeight: 1,
//               marginBottom: 0,
//               //   marginLeft: 10,
//             }}
//           >
//             Login Book
//           </p>
//           {/* <p style={{ marginBottom: 30 }}>Login to the Dashboard</p> */}
//           <div className={styles.email_title}>
//             Email <span className={styles.required}>*</span>
//           </div>
//           <Form.Item
//             name="email"
//             rules={[
//               { type: "email", message: "The input is not valid E-mail!" },
//               { required: true, message: "Please input your E-mail!" },
//             ]}
//           >
//             <div className={styles.input_area}>
//               <Input
//                 placeholder="Email"
//                 autoComplete="email"
//                 name="email"
//                 className={styles.input}
//                 ref={emailRef}
//               />
//             </div>
//           </Form.Item>
//           <div className={styles.password_title}>
//             Password <span className={styles.required}>*</span>
//           </div>
//           <Form.Item
//             name="password"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your password!",
//               },
//             ]}
//           >
//             <div className={styles.input_area}>
//               <Input.Password
//                 type="password"
//                 autoComplete="current-password"
//                 name="password"
//                 className={styles.input}
//                 ref={passwordRef}
//               />
//             </div>
//           </Form.Item>
//           <div className={styles.button_area}>
//             <Button
//               type="primary"
//               htmlType="submit"
//               className={styles.login_form_button}
//               size="large"
//             >
//               {loading ? <Spin tip="Loading..."></Spin> : "로그인"}
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default Login;
