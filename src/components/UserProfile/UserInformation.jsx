
import React, { useState } from 'react';
import { StyledXCard, StyledMarginContent, StyledDivCenterY } from '../styled-compontent/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faXmark, faPen, faSave } from '@fortawesome/free-solid-svg-icons';
import { XButton, XInput } from '@ximdex/xui-react/material';
import { updateUserXDIR } from '../../service/xdir.service';
import { useSpinner } from '@ximdex/xui-react/hooks';
import useModals from '../../hooks/useModals';
import _ from 'lodash';

const UserInformation = ({ user, saveUserData }) => {
  const [canEdit, setCanEdit] = useState(false);
  const [userForm, setUserForm] = useState({ ...user });
  const { showSpinner, hideSpinner } = useSpinner();
  const { executeXPopUp } = useModals();

  const handleCanEdit = () => {
    setCanEdit(prevCanEdit => !prevCanEdit);
  };

  const onInputChange = (e) => {
    setUserForm((prevUserForm) => ({
      ...prevUserForm,
      [e.target.id]: e.target.value,
    }));
  };

  const removeUnusedFields = (user, userForm) => {
    return Object.keys(userForm).reduce((result, key) => {
      if (userForm[key] !== user[key]) {
        result[key] = userForm[key];
      }
      return result;
    }, {});
  };

  const updateUserData = async () => {
    showSpinner();
    const res = await updateUserXDIR(removeUnusedFields(user, userForm), user.uuid);
    executeXPopUp(res, 'User information updated successfully.');
    if (!res?.error) {
      saveUserData(res.user);
    }
    setCanEdit(false);
    hideSpinner();
  };

  return (
    <StyledXCard
      title={
        <p style={{ marginLeft: '1em' }}>
          <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
          USER INFORMATION
        </p>
      }
      style={{ height: 'auto', width: '80%', margin: '2em auto', padding: '0 1em' }}
      isCollapsable
      isCollapsed
      controls={[
        {
          component: (
            <XButton
              style={{ marginRight: '10px' }}
              onClick={handleCanEdit}
              title="Edit information"
            >
              <FontAwesomeIcon icon={canEdit ? faXmark : faPen} style={{ marginRight: '10px' }} />
              {canEdit ? 'CANCEL' : 'EDIT'}
            </XButton>
          ),
        },
        {
          component: (
            <XButton
              disabled={_.isEqual(user, userForm)}
              onClick={updateUserData}
              title="Update user"
            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: '10px' }} />
              SAVE
            </XButton>
          ),
        },
      ]}
    >
      <StyledMarginContent>
        <StyledDivCenterY style={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: '1.5em' }}>
          <label style={{ marginBottom: '-5px' }}>
            Name
          </label>
          <XInput
            id='name'
            type='text'
            disabled={!canEdit}
            size='medium'
            fullWidth
            value={userForm.name}
            onChange={onInputChange}
          />
        </StyledDivCenterY>
        <StyledDivCenterY style={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: '1.5em' }}>
          <label style={{ marginBottom: '-5px' }}>
            Surname
          </label>
          <XInput
            id='surname'
            type='text'
            disabled={!canEdit}
            size='medium'
            fullWidth
            value={userForm.surname}
            onChange={onInputChange}
          />
        </StyledDivCenterY>
        <StyledDivCenterY style={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: '1.5em' }}>
          <label style={{ marginBottom: '-5px' }}>
            Email
          </label>
          <XInput
            id='email'
            type='text'
            disabled={true}
            size='medium'
            fullWidth
            value={userForm.email}
            onChange={onInputChange}
          />
        </StyledDivCenterY>
        <StyledDivCenterY style={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: '1.5em' }}>
          <label style={{ marginBottom: '-5px' }}>
            Birth date
          </label>
          <XInput
            id='birthdate'
            type='date'
            disabled={!canEdit}
            size='medium'
            fullWidth
            value={userForm.birthdate}
            onChange={onInputChange}
          />
        </StyledDivCenterY>
      </StyledMarginContent>
    </StyledXCard>
  );
};

export default UserInformation;
