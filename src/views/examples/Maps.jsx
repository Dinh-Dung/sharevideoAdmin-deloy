/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import Header from "../../components/Headers/Header";
import { getAllUser } from "../../ultils/auth-api";
import { deleteUser } from "../../ultils/user-api";
import { useAuth } from "../../hook/useAuth";
const Maps = () => {
  const [allUser, setAllUser] = useState([]);
  const user = useAuth;
  useEffect(() => {
    (async () => {
      if (user) {
        const listAllUser = await getAllUser();
        setAllUser(listAllUser);
      }
    })();
  }, [user]);

  const deleteUserOfAdmin = async (id) => {
    try {
      await deleteUser(id);
      const userArray = [...allUser];
      const updateUserList = userArray.filter((user) => user.user.id !== id);
      // console.log(updateUserList);
      setAllUser(updateUserList);
    } catch (error) {
      console.log(error);
    }
    // console.log(id);
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0"></Card>
            <Col className="mt-7 mb-xl-0" xl="18">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Infor Users</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Full name</th>
                      <th scope="col">Nick name</th>
                      <th scope="col">User name</th>
                      <th scope="col">Likes</th>
                      <th scope="col">Videos</th>
                      <th scope="col">Follower</th>
                      <th scope="col">Following</th>
                    </tr>
                  </thead>
                  {allUser.map((user, id) => (
                    <tbody key={`users_${id}`}>
                      <tr>
                        <th scope="row">{user.user.id}</th>
                        <td>{user.user.fullname}</td>
                        <td>{user.user.nickname}</td>
                        <td>{user.user.username}</td>
                        <td>
                          {" "}
                          <i className="fas fa-arrow-up text-success mr-3" />{" "}
                          {user.likeCount}
                        </td>
                        <td>
                          <i className="fas fa-arrow-up text-success mr-3" />{" "}
                          {user.videoCount}
                        </td>
                        <td>{user.followerCount}</td>
                        <td>{user.followingCount}</td>
                        <td>
                          <Button
                            color="danger"
                            onClick={() => deleteUserOfAdmin(user.user.id)}
                            size="sm"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </Table>
              </Card>
            </Col>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Maps;
