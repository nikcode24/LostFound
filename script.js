/**
 * LostFound – drag-and-drop folder manager
 *
 * Features:
 *  • Drag folders to reorder them in the grid
 *  • Drag item chips between folders (and back to the palette)
 *  • Add / rename / delete folders
 *  • Delete individual items
 *
 * Uses the HTML5 native Drag and Drop API exclusively – no external libraries.
 */

// ─── Seed data ────────────────────────────────────────────────────────────────

const DEFAULT_FOLDERS = [
  { id: 'f1', name: 'Electronics',  icon: '🔌' },
  { id: 'f2', name: 'Clothing',     icon: '👕' },
  { id: 'f3', name: 'Documents',    icon: '📄' },
  { id: 'f4', name: 'Keys & Cards', icon: '🗝️' },
];

const DEFAULT_ITEMS = [
  { id: 'i1',  icon: '📱', label: 'Black iPhone',       folderId: 'f1'     },
  { id: 'i2',  icon: '🎧', label: 'Wireless earbuds',   folderId: 'f1'     },
  { id: 'i3',  icon: '💻', label: 'Laptop charger',     folderId: 'f1'     },
  { id: 'i4',  icon: '🧣', label: 'Red scarf',          folderId: 'f2'     },
  { id: 'i5',  icon: '🧢', label: 'Blue cap',           folderId: 'f2'     },
  { id: 'i6',  icon: '📋', label: 'Exam paper',         folderId: 'f3'     },
  { id: 'i7',  icon: '🪪', label: 'Student ID card',    folderId: 'f3'     },
  { id: 'i8',  icon: '🔑', label: 'Car keys',           folderId: 'f4'     },
  { id: 'i9',  icon: '💳', label: 'Credit card',        folderId: 'f4'     },
  { id: 'i10', icon: '🎒', label: 'Backpack',           folderId: null     },
  { id: 'i11', icon: '☂️', label: 'Black umbrella',     folderId: null     },
  { id: 'i12', icon: '📷', label: 'Camera',             folderId: null     },
];

// ─── State ────────────────────────────────────────────────────────────────────

let folders = DEFAULT_FOLDERS.map(f => ({ ...f }));
let items   = DEFAULT_ITEMS.map(i => ({ ...i }));
let nextFolderId = 100;
let nextItemId   = 200;

// ─── DOM refs ─────────────────────────────────────────────────────────────────

const folderGrid       = document.getElementById('folderGrid');
const palette          = document.getElementById('palette');
const addFolderBtn     = document.getElementById('addFolderBtn');
const folderNameInput  = document.getElementById('folderNameInput');

// ─── Drag state ───────────────────────────────────────────────────────────────

/** @type {{ type: 'folder'|'item', id: string }|null} */
let dragPayload = null;

// ─── Render ───────────────────────────────────────────────────────────────────

function render() {
  // 1. Render folders
  folderGrid.innerHTML = '';
  folders.forEach(folder => {
    folderGrid.appendChild(buildFolderCard(folder));
  });

  // 2. Render unassigned items in palette
  palette.innerHTML = '';
  items
    .filter(item => item.folderId === null)
    .forEach(item => palette.appendChild(buildItemChip(item)));
}

// ─── Build folder card ────────────────────────────────────────────────────────

function buildFolderCard(folder) {
  const card = document.createElement('div');
  card.className = 'folder-card';
  card.dataset.folderId = folder.id;
  card.setAttribute('draggable', 'true');

  // Header
  const header = document.createElement('div');
  header.className = 'folder-header';

  const iconEl = document.createElement('span');
  iconEl.className = 'folder-icon';
  iconEl.textContent = folder.icon;

  const titleEl = document.createElement('span');
  titleEl.className = 'folder-title';
  titleEl.textContent = folder.name;

  const renameBtn = document.createElement('button');
  renameBtn.className = 'btn-rename';
  renameBtn.title = 'Rename folder';
  renameBtn.textContent = '✏️';
  renameBtn.addEventListener('click', e => {
    e.stopPropagation();
    startRename(titleEl, folder.id);
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-delete-folder';
  deleteBtn.title = 'Delete folder';
  deleteBtn.textContent = '🗑️';
  deleteBtn.addEventListener('click', e => {
    e.stopPropagation();
    deleteFolder(folder.id);
  });

  header.append(iconEl, titleEl, renameBtn, deleteBtn);

  // Body (item drop zone)
  const body = document.createElement('div');
  body.className = 'folder-body';
  body.dataset.folderId = folder.id;

  items
    .filter(item => item.folderId === folder.id)
    .forEach(item => body.appendChild(buildItemChip(item)));

  // ── Folder drag events ────────────────────────────────────────────────────

  card.addEventListener('dragstart', e => {
    dragPayload = { type: 'folder', id: folder.id };
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    // Use a minimal ghost image so the card itself isn't distorted
    e.dataTransfer.setDragImage(card, 20, 20);
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
    clearDropIndicators();
    dragPayload = null;
  });

  // Allow OTHER folders to act as reorder targets
  card.addEventListener('dragover', e => {
    if (!dragPayload || dragPayload.type !== 'folder') return;
    if (dragPayload.id === folder.id) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    card.classList.add('drag-over-folder');
  });

  card.addEventListener('dragleave', e => {
    if (!card.contains(e.relatedTarget)) {
      card.classList.remove('drag-over-folder');
    }
  });

  card.addEventListener('drop', e => {
    e.preventDefault();
    card.classList.remove('drag-over-folder');
    if (!dragPayload || dragPayload.type !== 'folder') return;
    if (dragPayload.id === folder.id) return;
    reorderFolders(dragPayload.id, folder.id);
  });

  // ── Item drop zone events (body) ──────────────────────────────────────────

  body.addEventListener('dragover', e => {
    if (!dragPayload || dragPayload.type !== 'item') return;
    e.preventDefault();
    e.stopPropagation(); // don't trigger folder reorder
    e.dataTransfer.dropEffect = 'move';
    body.classList.add('drag-over');
  });

  body.addEventListener('dragleave', e => {
    if (!body.contains(e.relatedTarget)) {
      body.classList.remove('drag-over');
    }
  });

  body.addEventListener('drop', e => {
    e.preventDefault();
    e.stopPropagation();
    body.classList.remove('drag-over');
    if (!dragPayload || dragPayload.type !== 'item') return;
    moveItem(dragPayload.id, folder.id);
  });

  card.append(header, body);
  return card;
}

// ─── Build item chip ──────────────────────────────────────────────────────────

function buildItemChip(item) {
  const chip = document.createElement('div');
  chip.className = 'item-chip';
  chip.dataset.itemId = item.id;
  chip.setAttribute('draggable', 'true');

  const iconEl = document.createElement('span');
  iconEl.className = 'item-icon';
  iconEl.textContent = item.icon;

  const labelEl = document.createElement('span');
  labelEl.className = 'item-label';
  labelEl.textContent = item.label;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-delete-item';
  deleteBtn.title = 'Remove item';
  deleteBtn.textContent = '✕';
  deleteBtn.addEventListener('click', e => {
    e.stopPropagation();
    deleteItem(item.id);
  });

  chip.append(iconEl, labelEl, deleteBtn);

  chip.addEventListener('dragstart', e => {
    dragPayload = { type: 'item', id: item.id };
    chip.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.stopPropagation(); // prevent folder drag from firing
  });

  chip.addEventListener('dragend', () => {
    chip.classList.remove('dragging');
    dragPayload = null;
  });

  return chip;
}

// ─── Palette drop zone ────────────────────────────────────────────────────────

palette.addEventListener('dragover', e => {
  if (!dragPayload || dragPayload.type !== 'item') return;
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  palette.classList.add('drag-over');
});

palette.addEventListener('dragleave', e => {
  if (!palette.contains(e.relatedTarget)) {
    palette.classList.remove('drag-over');
  }
});

palette.addEventListener('drop', e => {
  e.preventDefault();
  palette.classList.remove('drag-over');
  if (!dragPayload || dragPayload.type !== 'item') return;
  moveItem(dragPayload.id, null); // null folderId → unassigned
});

// ─── Operations ───────────────────────────────────────────────────────────────

/**
 * Reorder folders: move `draggedId` so it appears before `targetId`.
 */
function reorderFolders(draggedId, targetId) {
  const fromIdx = folders.findIndex(f => f.id === draggedId);
  const toIdx   = folders.findIndex(f => f.id === targetId);
  if (fromIdx === -1 || toIdx === -1) return;

  const [moved] = folders.splice(fromIdx, 1);
  const insertAt = folders.findIndex(f => f.id === targetId);
  folders.splice(insertAt, 0, moved);
  render();
}

/**
 * Move an item to a new folder (or palette if folderId is null).
 */
function moveItem(itemId, folderId) {
  const item = items.find(i => i.id === itemId);
  if (!item) return;
  if (item.folderId === folderId) return; // nothing to do
  item.folderId = folderId;
  render();
}

/**
 * Add a new folder.
 */
function addFolder(name) {
  const trimmed = name.trim();
  if (!trimmed) return;
  folders.push({
    id:   'f' + (nextFolderId++),
    name: trimmed,
    icon: '📁',
  });
  render();
}

/**
 * Delete a folder and send its items back to the palette.
 */
function deleteFolder(folderId) {
  folders = folders.filter(f => f.id !== folderId);
  items.forEach(item => {
    if (item.folderId === folderId) item.folderId = null;
  });
  render();
}

/**
 * Delete an item entirely.
 */
function deleteItem(itemId) {
  items = items.filter(i => i.id !== itemId);
  render();
}

/**
 * Begin inline rename of a folder title.
 */
function startRename(titleEl, folderId) {
  titleEl.setAttribute('contenteditable', 'true');
  titleEl.focus();

  // Select all text
  const range = document.createRange();
  range.selectNodeContents(titleEl);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);

  function commit() {
    titleEl.removeAttribute('contenteditable');
    titleEl.removeEventListener('keydown', onKeyDown);
    const newName = titleEl.textContent.trim();
    if (newName) {
      const folder = folders.find(f => f.id === folderId);
      if (folder) folder.name = newName;
    }
    render();
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') { e.preventDefault(); titleEl.blur(); }
    if (e.key === 'Escape') { titleEl.blur(); }
  }

  titleEl.addEventListener('blur', commit, { once: true });
  titleEl.addEventListener('keydown', onKeyDown);
}

/**
 * Remove any lingering drop-indicator styling.
 */
function clearDropIndicators() {
  document.querySelectorAll('.drag-over-folder').forEach(el => {
    el.classList.remove('drag-over-folder');
  });
}

// ─── Toolbar actions ──────────────────────────────────────────────────────────

addFolderBtn.addEventListener('click', () => {
  const name = folderNameInput.value.trim();
  if (!name) {
    folderNameInput.focus();
    return;
  }
  addFolder(name);
  folderNameInput.value = '';
});

folderNameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addFolderBtn.click();
});

// ─── Boot ─────────────────────────────────────────────────────────────────────

render();
