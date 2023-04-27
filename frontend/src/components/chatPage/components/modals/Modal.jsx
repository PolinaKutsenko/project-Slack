import { useSelector } from 'react-redux';

import { getModalType } from '../../../../slices/modalsSlice.js';
import AddChannelModal from './components/AddChannelModal.jsx';
import RemoveChannelModal from './components/RemoveChannelModal.jsx';
import UpdateChannelModal from './components/UpdateChannelModal.jsx';

const Modal = () => {
  const type = useSelector(getModalType);
  const modals = {
    add: AddChannelModal,
    remove: RemoveChannelModal,
    update: UpdateChannelModal,
  };

  const ChannelModal = modals[type];

  return (
    <ChannelModal />
  );
};

export default Modal;
