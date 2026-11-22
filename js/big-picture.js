const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const commentCount = bigPicture.querySelector('.social__comment-count');
const totalComments = bigPicture.querySelector('.comments-count');
const loadCommentsButton = bigPicture.querySelector('.comments-loader');
const COMMENTS_PER_PAGE = 5;
let photoComments = [];
let shownComments = 0;
let previousFocus;

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoComments = [];
  shownComments = 0;
  commentsList.replaceChildren();
  if (previousFocus) {
    previousFocus.focus();
  }
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

const renderNextComments = () => {
  const fragment = document.createDocumentFragment();
  const nextComments = photoComments.slice(shownComments, shownComments + COMMENTS_PER_PAGE);
  nextComments.forEach(({avatar, name, message}) => {
    const comment = commentTemplate.cloneNode(true);
    const image = comment.querySelector('.social__picture');
    image.src = avatar;
    image.alt = name;
    comment.querySelector('.social__text').textContent = message;
    fragment.appendChild(comment);
  });
  commentsList.appendChild(fragment);
  shownComments += nextComments.length;
  totalComments.textContent = photoComments.length;
  commentCount.replaceChildren(`${shownComments} из `, totalComments, ' комментариев');
  loadCommentsButton.classList.toggle('hidden', shownComments >= photoComments.length);
};

const openBigPicture = ({url, description, likes, comments}) => {
  previousFocus = document.activeElement;
  const image = bigPicture.querySelector('.big-picture__img img');
  image.src = url;
  image.alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  photoComments = comments;
  shownComments = 0;
  commentsList.replaceChildren();
  commentCount.classList.remove('hidden');
  renderNextComments();
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.focus();
};

closeButton.addEventListener('click', closeBigPicture);
loadCommentsButton.addEventListener('click', renderNextComments);

export {openBigPicture};
