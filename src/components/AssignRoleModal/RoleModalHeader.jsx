import { StyledGreenButtonIcon } from "../styled-compontent/Buttons";
import { X } from "lucide-react";

const RoleModalHeader = ({ onClose }) => (
  <div>
    <StyledGreenButtonIcon title="Close modal" onClick={onClose}>
      <X size={20} />
    </StyledGreenButtonIcon>
    <h2 style={{ textAlign: 'center' }}>Assign Role</h2>
  </div>
);

export default RoleModalHeader;
