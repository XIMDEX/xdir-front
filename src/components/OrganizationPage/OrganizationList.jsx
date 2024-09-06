import React, { useEffect, useState } from "react";
import { useAuth, useSpinner } from "@ximdex/xui-react/hooks";
import {
  getOrganizations,
  getUsersByOrganization,
} from "../../service/xdir.service";
import {
  StyledFlexFullCenter,
  StyledXModal,
} from "../styled-compontent/Container";
import { XRow, XRowContent, XRowDetails } from "@ximdex/xui-react/material";
import { CircularProgress } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
  assignRoleToUser,
  deleteExistingUser,
  getUser,
  getUsers,
} from "../../service/xdir.service";
import { StyledGreenButtonIcon } from "../styled-compontent/Buttons";
import { display } from "@mui/system";
import { XDirModalRoles } from "../../hooks/useModals";
import RoleModal from "../AssignRoleModal/RoleModal";

const OrganizationList = () => {
  const [loading, setLoading] = useState(false);
  const { isSuperAdmin } = useAuth();
  const { showSpinner, hideSpinner } = useSpinner();
  const [organizations, setOrganizations] = useState([]);
  const [fetchingUsers, setFetchingUsers] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [roleAssignModal, setRolesAssignModal] = useState({
    open: false,
    user: undefined,
  });
  const getOrganizationOptions = async () => {
    const res = await getOrganizations();
    let options = res?.map((org) => ({ value: org.uuid, label: org.name }));
    console.log(res, "options");
    setOrganizations(res);
  };


  const confirmNewRoles = async (userRoles) => {
    showSpinner()
    console.log(userRoles, "userRoles");
    const res =  await assignRoleToUser(userRoles)
    hideSpinner()
  }

  const getUsersFromOrganizations = async (idOrganization) => {
    const res = await getUsersByOrganization(idOrganization);
    const newFetchingUsers = { ...fetchingUsers };
    newFetchingUsers[idOrganization] = res;
    setFetchingUsers(newFetchingUsers);
    console.log(newFetchingUsers, "res");
  };

  const assignRoles = async (user, index) => {
    let userSelected = undefined;
    if (!userDetails[index]?.uuid) {
      showSpinner();
      const res = await getUser(user.uuid);
      userSelected = res.user;
      hideSpinner();
    } else {
      userSelected = userDetails[index];
    }

    setRolesAssignModal({
      open: true,
      user: userSelected,
    });
  };

  useEffect(() => {
    getOrganizationOptions();
  }, []);
  return loading ? (
    <></>
  ) : (
    <>
      {organizations?.length === 0 ? (
        <StyledFlexFullCenter>
          <p>No groups yet.</p>
        </StyledFlexFullCenter>
      ) : (
        <>
          {organizations?.map((organization, index) => (
            <XRow
              style={{
                background: "rgb(247, 247, 247)",
                width: "100%",
              }}
              key={"row" + index}
              identifier={organization.uuid}
              isCollapsable={true}
              functionButtonCollapsable={() =>
                getUsersFromOrganizations(organization?.uuid)
              }
              labelButtonCollapsable={`Show details`}
            >
              <XRowContent key={"XRowContent" + index}>
                <p>{organization?.name}</p>
              </XRowContent>
              {fetchingUsers[organization?.uuid] === undefined ? (
                <XRowDetails
                  key={"XRowDetails_loading"}
                  style={{ justifyContent: "center" }}
                  // controlsDetails={[]}
                >
                  <CircularProgress
                    color="primary"
                    size={"50px"}
                    style={{ padding: "10px" }}
                  />
                </XRowDetails>
              ) : (
                <div
                  key="XRowDetails"
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                  }}
                >
                  {fetchingUsers[organization?.uuid].map((user, index) => (
                    <React.Fragment key={"XRowDetails" + index}>
                      <XRowDetails
                        key={"XRowDetails" + index}
                        controlsDetails={[
                          {
                            component: (
                              <StyledGreenButtonIcon
                                onClick={() => assignRoles(user, index)}
                                title="Assign roles"
                              >
                                <FontAwesomeIcon
                                  icon={faPenToSquare}
                                  size="xs"
                                  title="Edit"
                                />
                              </StyledGreenButtonIcon>
                            ),
                          },
                        ]}
                      >
                        <p>
                          <strong>Name:</strong> {user.name}
                        </p>
                      </XRowDetails>
                    </React.Fragment>
                  ))}
                  {/*ASSIGNACION DE ROLES*/}
                  <>
                    <StyledXModal
                      isOpen={roleAssignModal?.open}
                      ariaHideApp={false}
                    >
                      <div
                        style={{ height: "500px", width: "600px" }}
                        className={`animate__animated ${
                          roleAssignModal.open
                            ? "animate__fadeInUp animate__faster"
                            : "animate__fadeOutDown animate__faster"
                        }`}
                      >
                        {roleAssignModal.user && <RoleModal selectedUser={roleAssignModal.user} setOpenModal={() => setRolesAssignModal({open:false})}/>}
                      </div>
                    </StyledXModal>
                  </>
                </div>
              )}
            </XRow>
          ))}
        </>
      )}
    </>
  );
};

export default OrganizationList;
