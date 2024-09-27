/**
 * Erstellt ein Modal mit einer Nachricht.
 * Alert würde an einigen Stellen nicht funktionieren, da der Alert-Dialog den JavaScript-Thread blockiert.
 * @param title - Titel des Modals
 * @param text - Text des Modals
 */
export function showCustomMessageModal(title: string, text: string) {
  const messageModal = document.createElement('div');
  messageModal.classList.add('modal');
  messageModal.style.display = 'block';

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const closeButton = document.createElement('span');
  closeButton.classList.add('close');
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(messageModal);
  });

  const titleElement = document.createElement('h2');
  titleElement.textContent = title;

  const textElement = document.createElement('p');
  textElement.textContent = text;

  const okButton = document.createElement('button');
  okButton.textContent = 'Bestätigen';
  okButton.addEventListener('click', () => {
    document.body.removeChild(messageModal);
  });

  modalContent.appendChild(closeButton);
  modalContent.appendChild(titleElement);
  modalContent.appendChild(textElement);
  modalContent.appendChild(okButton);
  messageModal.appendChild(modalContent);

  document.body.appendChild(messageModal);
}
