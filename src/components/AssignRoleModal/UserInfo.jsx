import { Home, Globe } from 'lucide-react';

const UserInfo = ({ selectedUser, organization }) => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '25px',
      }}
    >
      <Home />
      <div
        style={{
          marginLeft: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <p style={{ color: 'gray', fontWeight: 'bold', margin: '0' }}>Name</p>
        <p style={{ fontWeight: 'bold', margin: '0' }}>{selectedUser.name}</p>
      </div>
    </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '25px',
      }}
    >
      <Globe />
      <div
        style={{
          marginLeft: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <p style={{ color: 'gray', fontWeight: 'bold', margin: '0' }}>Organization</p>
        <p style={{ fontWeight: 'bold', margin: '0' }}>
          {selectedUser.organizations[organization.uuid]}
        </p>
      </div>
    </div>
  </div>
);

export default UserInfo;