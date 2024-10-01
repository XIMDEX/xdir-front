import { XButton } from '@ximdex/xui-react/material';
import { Pencil } from 'lucide-react';

const RoleModalFooter = ({ onSave }) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <XButton onClick={onSave} style={{ marginTop: '10px', width: '200px' }}>
      <Pencil size={20} style={{ marginRight: '10px' }} />
      save
    </XButton>
  </div>
);

export default RoleModalFooter;