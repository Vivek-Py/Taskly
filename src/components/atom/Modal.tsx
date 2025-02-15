import {ModalProps} from './type';

const Modal = ({isOpen, onClose, title, children}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <dialog
        open
        aria-labelledby={title}
        aria-modal="true"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg p-6 bg-white shadow-xl"
      >
        <header className="mb-4">
          <h2 id="modal-title" className="text-xl font-semibold">
            {title}
          </h2>
        </header>
        <main className="mb-6">{children}</main>
      </dialog>
    </>
  );
};

export default Modal;
