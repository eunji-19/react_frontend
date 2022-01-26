import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { MenuIndexPayload, setMenuIndex } from "../redux/modules/menuIndex";
import "bootstrap/dist/css/bootstrap.min.css";
import { authLogout } from "../redux/actions/_authActions";
import { AuthLogin } from "../models/Auth";

const NavHeader = () => {
  const menuItem: {
    key: string;
    label: string;
    path: string;
    title: string;
  }[] = [
    { key: "1", label: "BestSeller", path: "/", title: "베스트셀러" },
    { key: "2", label: "Recommend", path: "/recommend", title: "추천도서" },
    { key: "3", label: "New", path: "/new", title: "신규도서" },
  ];

  const navigate = useNavigate();

  /**
   * Login 설정
   */
  const { isLoggedIn } = useAppSelector((state) => state.authLogin);
  const dispatch = useAppDispatch();
  let user: AuthLogin | null = null;
  if (isLoggedIn) {
    // @ts-ignore
    user = JSON.parse(localStorage.getItem("user"));
  }

  const onClickMenu = (item: any) => {
    const selectTitle = item.target.innerHTML;
    const clickedMenu = menuItem.find((_item) => _item.title === selectTitle);

    const selectMenuIndexPayload: MenuIndexPayload = {
      index: clickedMenu!.key,
      title: clickedMenu!.label,
    };

    dispatch(setMenuIndex(selectMenuIndexPayload));
    /**
     * 선택한 곳으로 이동
     */
    navigate(clickedMenu!.path);
  };

  const onClickLogout = () => {
    dispatch(authLogout());
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Book with BootStrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {menuItem.map((item) => (
              <Nav.Link key={item.key} onClick={onClickMenu}>
                {item.title}
              </Nav.Link>
            ))}
          </Nav>
          {isLoggedIn ? (
            <Nav>
              <Nav.Link href="/profile">
                {user!.statusMessage.user.nickname}님 프로필
              </Nav.Link>
              <Nav.Link onClick={onClickLogout}>Logout</Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Signup</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavHeader;
