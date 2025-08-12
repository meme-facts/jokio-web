// MemeVerse SPA logic
const qs = (s, r = document) => r.querySelector(s);
const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));

const storage = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

const state = {
  profile: storage.get('mv_profile', {
    name: 'Meme Lord',
    handle: '@memelord',
    avatarUrl: '',
    followers: 420,
    following: 69,
    likes: 1337,
    dislikes: 42,
  }),
  posts: storage.get('mv_posts', []),
  notifications: storage.get('mv_notifications', []),
};

// Seed demo data if none
if (state.posts.length === 0) {
  state.posts = [
    {
      id: crypto.randomUUID(),
      user: { name: 'Meme Lord', handle: '@memelord', avatarUrl: '' },
      caption: 'First post! The purple vibes are immaculate ✨',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
      likes: 24,
      dislikes: 1,
      comments: 3,
      createdAt: Date.now() - 1000 * 60 * 20,
    },
    {
      id: crypto.randomUUID(),
      user: { name: 'Pixel Wizard', handle: '@pixwiz', avatarUrl: '' },
      caption: 'POV: You open devtools and fix a bug on prod 😅',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
      likes: 102,
      dislikes: 4,
      comments: 17,
      createdAt: Date.now() - 1000 * 60 * 60 * 5,
    },
    {
      id: crypto.randomUUID(),
      user: { name: 'CSS Sorcerer', handle: '@cascade', avatarUrl: '' },
      caption: 'Border-radius solves 80% of UX problems. Change my mind.',
      image: '',
      likes: 66,
      dislikes: 2,
      comments: 7,
      createdAt: Date.now() - 1000 * 60 * 60 * 24,
    },
  ];
  storage.set('mv_posts', state.posts);
}

// Elements
const views = {
  home: qs('#homeView'),
  explore: qs('#exploreView'),
  notifications: qs('#notificationsView'),
  messages: qs('#messagesView'),
  settings: qs('#settingsView'),
  profile: qs('#profileView'),
};
const feedEl = qs('#feed');
const exploreFeedEl = qs('#exploreFeed');
const searchInput = qs('#searchInput');
const exploreSearch = qs('#exploreSearch');
const profileFeedEl = qs('#profileFeed');

const profileEls = {
  avatar: qs('#profileAvatar'),
  name: qs('#profileName'),
  handle: qs('#profileHandle'),
  followers: qs('#statFollowers'),
  following: qs('#statFollowing'),
  likes: qs('#statLikes'),
  dislikes: qs('#statDislikes'),
  miniAvatar: qs('#miniAvatar'),
  miniName: qs('#miniName'),
};

const profilePageEls = {
  avatar: qs('#profilePageAvatar'),
  name: qs('#profilePageName'),
  handle: qs('#profilePageHandle'),
  editBtn: qs('#profilePageEditBtn'),
};

const modals = {
  create: qs('#createPostModal'),
  editProfile: qs('#editProfileModal'),
};

const createForm = qs('#createPostForm');
const postText = qs('#postText');
const postImageUrl = qs('#postImageUrl');

const editProfileForm = qs('#editProfileForm');
const editDisplayName = qs('#editDisplayName');
const editHandle = qs('#editHandle');
const editAvatarUrl = qs('#editAvatarUrl');

const sidebar = qs('#sidebar');
const sidebarToggle = qs('#sidebarToggle');

// Helpers
const timeAgo = (ts) => {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return `${diff}s`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
};

function renderProfile() {
  const p = state.profile;
  const avatarCss = p.avatarUrl
    ? `background-image: url(${JSON.stringify(p.avatarUrl)}); background-size: cover; background-position: center;`
    : '';
  profileEls.avatar.setAttribute('style', avatarCss);
  profileEls.miniAvatar.setAttribute('style', avatarCss);
  profileEls.name.textContent = p.name;
  profileEls.handle.textContent = p.handle;
  profileEls.miniName.textContent = p.handle;
  profileEls.followers.textContent = p.followers;
  profileEls.following.textContent = p.following;
  profileEls.likes.textContent = p.likes;
  profileEls.dislikes.textContent = p.dislikes;

  // Profile page header
  profilePageEls.avatar.setAttribute('style', avatarCss);
  profilePageEls.name.textContent = p.name;
  profilePageEls.handle.textContent = p.handle;
}

function renderPostCard(post) {
  const hasImage = Boolean(post.image);
  const wrapper = document.createElement('article');
  wrapper.className = 'card';
  wrapper.innerHTML = `
    <div class="card-header">
      <div class="avatar" style="${post.user.avatarUrl ? `background-image:url(${post.user.avatarUrl});background-size:cover;background-position:center;` : ''}"></div>
      <div class="card-username">${post.user.name}</div>
      <div class="card-handle">${post.user.handle}</div>
      <div class="card-time">${timeAgo(post.createdAt)}</div>
    </div>
    ${hasImage ? `<img class="card-image" src="${post.image}" alt="Post image" />` : ''}
    <div class="card-body">
      <div class="card-caption">${escapeHtml(post.caption)}</div>
    </div>
    <div class="card-footer">
      <button class="icon-btn" data-action="like" data-id="${post.id}"><svg><use href="#icon-like" /></svg> <span>${post.likes}</span></button>
      <button class="icon-btn" data-action="dislike" data-id="${post.id}"><svg><use href="#icon-dislike" /></svg> <span>${post.dislikes}</span></button>
      <button class="icon-btn" data-action="comment" data-id="${post.id}"><svg><use href="#icon-chat" /></svg> <span>${post.comments}</span></button>
      <button class="icon-btn" data-action="share" data-id="${post.id}"><svg><use href="#icon-share" /></svg></button>
    </div>
  `;
  return wrapper;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function renderFeed({ target = feedEl, list = state.posts } = {}) {
  target.innerHTML = '';
  const frag = document.createDocumentFragment();
  list
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt)
    .forEach((post) => frag.appendChild(renderPostCard(post)));
  target.appendChild(frag);
}

function filterPosts(query) {
  query = query.trim().toLowerCase();
  if (!query) return state.posts;
  return state.posts.filter((p) =>
    p.caption.toLowerCase().includes(query) ||
    p.user.name.toLowerCase().includes(query) ||
    p.user.handle.toLowerCase().includes(query)
  );
}

function openModal(modal) {
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}
function closeModal(modal) {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}

function switchView(viewId) {
  qsa('.view').forEach((v) => v.classList.remove('active'));
  const v = views[viewId];
  if (v) v.classList.add('active');
  qsa('.nav .nav-item').forEach((b) => b.classList.remove('active'));
  const activeBtn = qsa('.nav .nav-item').find((b) => b.dataset.view === viewId);
  if (activeBtn) activeBtn.classList.add('active');
  // Lazy renders on switch
  if (viewId === 'explore') renderExplore();
  if (viewId === 'profile') renderProfileFeed();
}

function sync() {
  storage.set('mv_posts', state.posts);
  storage.set('mv_profile', state.profile);
}

// Events: navigation
qsa('.nav .nav-item').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.dataset.action === 'open-create') {
      openModal(modals.create);
      return;
    }
    const view = btn.dataset.view;
    if (view) switchView(view);
  });
});

// Top actions
qs('#openCreateBtn').addEventListener('click', () => openModal(modals.create));
qs('#quickCreateBtn').addEventListener('click', () => openModal(modals.create));
qs('#editProfileBtn').addEventListener('click', () => {
  editDisplayName.value = state.profile.name;
  editHandle.value = state.profile.handle.replace(/^@/, '');
  editAvatarUrl.value = state.profile.avatarUrl || '';
  openModal(modals.editProfile);
});
qs('#miniEditProfile').addEventListener('click', () => {
  editDisplayName.value = state.profile.name;
  editHandle.value = state.profile.handle.replace(/^@/, '');
  editAvatarUrl.value = state.profile.avatarUrl || '';
  openModal(modals.editProfile);
});
profilePageEls.editBtn.addEventListener('click', () => {
  editDisplayName.value = state.profile.name;
  editHandle.value = state.profile.handle.replace(/^@/, '');
  editAvatarUrl.value = state.profile.avatarUrl || '';
  openModal(modals.editProfile);
});

qsa('[data-close-modal]').forEach((btn) =>
  btn.addEventListener('click', (e) => closeModal(e.target.closest('.modal')))
);
[modals.create, modals.editProfile].forEach((m) =>
  m.addEventListener('click', (e) => {
    if (e.target === m) closeModal(m);
  })
);

// Sidebar toggle (mobile)
sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Create post
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const caption = postText.value.trim();
  const image = postImageUrl.value.trim();
  if (!caption && !image) return;
  const newPost = {
    id: crypto.randomUUID(),
    user: {
      name: state.profile.name,
      handle: state.profile.handle,
      avatarUrl: state.profile.avatarUrl,
    },
    caption,
    image,
    likes: 0,
    dislikes: 0,
    comments: 0,
    createdAt: Date.now(),
  };
  state.posts.push(newPost);
  sync();
  renderFeed();
  postText.value = '';
  postImageUrl.value = '';
  closeModal(modals.create);
});

// Edit profile
editProfileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = editDisplayName.value.trim() || 'User';
  let handle = editHandle.value.trim();
  if (!handle.startsWith('@')) handle = '@' + handle;
  state.profile.name = name;
  state.profile.handle = handle;
  state.profile.avatarUrl = editAvatarUrl.value.trim();
  sync();
  renderProfile();
  // Update existing posts by this user
  state.posts.forEach((p) => {
    if (p.user.handle === state.profile.handle || p.user.name === state.profile.name) {
      p.user.name = state.profile.name;
      p.user.handle = state.profile.handle;
      p.user.avatarUrl = state.profile.avatarUrl;
    }
  });
  renderFeed();
  closeModal(modals.editProfile);
});

// Interactions on posts
function delegate(container, selector, event, handler) {
  container.addEventListener(event, (e) => {
    const target = e.target.closest(selector);
    if (target && container.contains(target)) handler(e, target);
  });
}

[feedEl, exploreFeedEl].forEach((container) => {
  delegate(container, 'button[data-action]', 'click', (e, btn) => {
    const id = btn.dataset.id;
    const action = btn.dataset.action;
    const post = state.posts.find((p) => p.id === id);
    if (!post) return;
    if (action === 'like') post.likes += 1;
    if (action === 'dislike') post.dislikes += 1;
    if (action === 'comment') post.comments += 1;
    if (action === 'share') {
      navigator.clipboard?.writeText(location.href + '#post-' + id).catch(() => {});
    }
    sync();
    renderFeed();
    if (views.explore.classList.contains('active')) renderExplore();
  });
});

// Search filter
searchInput.addEventListener('input', () => {
  const filtered = filterPosts(searchInput.value);
  renderFeed({ list: filtered });
});

exploreSearch.addEventListener('input', () => {
  renderExplore();
});

qsa('.segmented .seg').forEach((b) =>
  b.addEventListener('click', () => {
    qsa('.segmented .seg').forEach((x) => x.classList.remove('active'));
    b.classList.add('active');
    renderExplore();
  })
);

function renderExplore() {
  const query = exploreSearch.value || '';
  const sort = qsa('.segmented .seg').find((s) => s.classList.contains('active'))?.dataset.sort || 'new';
  let list = filterPosts(query);
  if (sort === 'new') list = list.slice().sort((a, b) => b.createdAt - a.createdAt);
  if (sort === 'top') list = list.slice().sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes));
  if (sort === 'trending') list = list.slice().sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments));
  exploreFeedEl.innerHTML = '';
  const frag = document.createDocumentFragment();
  list.forEach((post) => frag.appendChild(renderPostCard(post)));
  exploreFeedEl.appendChild(frag);
}

function renderProfileFeed() {
  const my = state.profile.handle.toLowerCase();
  const list = state.posts.filter((p) => p.user.handle.toLowerCase() === my);
  profileFeedEl.innerHTML = '';
  const frag = document.createDocumentFragment();
  list
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt)
    .forEach((post) => frag.appendChild(renderPostCard(post)));
  profileFeedEl.appendChild(frag);
}

// Initial render
renderProfile();
renderFeed();
renderExplore();
renderProfileFeed();

// Accessibility: close modal on Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    qsa('.modal.show').forEach((m) => closeModal(m));
  }
});