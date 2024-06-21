
import React, { useState } from 'react';
import { StyledXCard, StyledMarginContent, StyledDivCenterY } from '../styled-compontent/Container';
import { XButton, XInput } from '@ximdex/xui-react/material';
import { updateUserXDIR } from '../../service/xdir.service';
import { useSpinner } from '@ximdex/xui-react/hooks';
import useModals from '../../hooks/useModals';
import _ from 'lodash';
import { Pencil, Save, User } from 'lucide-react';

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
        <StyledDivCenterY>
          <User size={30} style={{ marginRight: '10px' }}/>
          <p>
            USER INFORMATION
          </p>
        </StyledDivCenterY>
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
              <Pencil size={20} style={{ marginRight: '10px' }} />
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
              <Save size={20} style={{ marginRight: '10px' }} />
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
