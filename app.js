/* ============================================================
   AYRLNK RESTAURANT — APP LOGIC
   ============================================================ */

// ===== MENU DATA =====
const menuItems = [
  // Biryani
  { id: 1, name: "Hyderabadi Dum Biryani", category: "biryani", price: 349, emoji: "🍗", color: "#c0392b,#e74c3c", badge: "Bestseller", desc: "Slow-cooked for 4 hours with aged basmati, saffron & hand-ground spices." },
  { id: 2, name: "Mutton Biryani", category: "biryani", price: 429, emoji: "🥘", color: "#922b21,#c0392b", badge: "Chef's Pick", desc: "Tender mutton pieces slow-cooked with aromatic biryani masala." },
  { id: 3, name: "Veg Biryani", category: "biryani", price: 249, emoji: "🌿", color: "#1e8449,#27ae60", badge: "Veg", desc: "Fragrant basmati with garden-fresh vegetables and mint." },

  // Pizza
  { id: 4, name: "BBQ Chicken Pizza", category: "pizza", price: 399, emoji: "🍕", color: "#d35400,#e67e22", badge: "Hot & New", desc: "Wood-fired crust, smoky BBQ sauce, grilled chicken, mozzarella." },
  { id: 5, name: "Margherita Pizza", category: "pizza", price: 299, emoji: "🍕", color: "#c0392b,#e74c3c", badge: "Classic", desc: "San Marzano tomatoes, fresh basil, buffalo mozzarella." },
  { id: 6, name: "Pepperoni Pizza", category: "pizza", price: 449, emoji: "🍕", color: "#922b21,#c0392b", badge: "Loaded", desc: "Double pepperoni, three-cheese blend, oregano." },

  // Pasta
  { id: 7, name: "Creamy Alfredo Pasta", category: "pasta", price: 279, emoji: "🍝", color: "#f0e68c,#d4a017", badge: "Creamy", desc: "Fettuccine in rich parmesan cream sauce with garlic butter." },
  { id: 8, name: "Arrabbiata Pasta", category: "pasta", price: 249, emoji: "🍝", color: "#c0392b,#e74c3c", badge: "Spicy", desc: "Penne in fiery tomato-chili sauce with fresh herbs." },
  { id: 9, name: "Pesto Chicken Pasta", category: "pasta", price: 319, emoji: "🍝", color: "#1e8449,#27ae60", badge: "Fresh", desc: "Fusilli tossed in basil pesto with grilled chicken strips." },

  // Burgers
  { id: 10, name: "AYRLNK Signature Burger", category: "burger", price: 299, emoji: "🍔", color: "#e67e22,#d35400", badge: "Signature", desc: "Double smash patty, secret sauce, caramelised onions, aged cheddar." },
  { id: 11, name: "Crispy Chicken Burger", category: "burger", price: 249, emoji: "🍔", color: "#c0392b,#e74c3c", badge: "Crispy", desc: "Buttermilk-fried chicken, sriracha mayo, coleslaw, pickles." },
  { id: 12, name: "Veggie Burger", category: "burger", price: 199, emoji: "🥙", color: "#1e8449,#27ae60", badge: "Veg", desc: "Black bean & quinoa patty with avocado and chipotle sauce." },

  // Drinks
  { id: 13, name: "Mint Lemonade", category: "drinks", price: 99, emoji: "🍋", color: "#1e8449,#27ae60", badge: "Fresh", desc: "Fresh-squeezed lemons, muddled mint, hint of ginger." },
  { id: 14, name: "Mango Lassi", category: "drinks", price: 129, emoji: "🥭", color: "#e67e22,#f39c12", badge: "Thick & Rich", desc: "Alphonso mango, creamy yogurt, cardamom — chilled to perfection." },
  { id: 15, name: "Cold Coffee", category: "drinks", price: 149, emoji: "☕", color: "#4a235a,#7d3c98", badge: "Chilled", desc: "Double espresso, cold milk, vanilla, caramel drizzle." },
  { id: 16, name: "Fresh Fruit Smoothie", category: "drinks", price: 179, emoji: "🍓", color: "#c0392b,#e74c3c", badge: "Healthy", desc: "Seasonal mixed fruit blend with honey and chia seeds." },

  // Sides
  { id: 17, name: "Loaded Fries", category: "sides", price: 149, emoji: "🍟", color: "#e67e22,#f39c12", badge: "Crispy", desc: "Crispy seasoned fries with cheese sauce, jalapeños, sour cream." },
  { id: 18, name: "Garlic Bread", category: "sides", price: 99, emoji: "🥖", color: "#d4a017,#b7950b", badge: "Warm", desc: "Toasted baguette with herb-garlic butter and parmesan." },
  { id: 19, name: "Onion Rings", category: "sides", price: 119, emoji: "🧅", color: "#d35400,#e67e22", badge: "Crunchy", desc: "Beer-battered thick-cut onion rings with chipotle dip." },
];

// ===== CART STATE =====
let cart = [];

// ===== PAGE ROUTING =====
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + name);
  if (page) {
    page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (name === 'menu') renderMenu('all');
  if (name === 'cart') renderCart();
  if (name === 'payment') renderPaymentSummary();
}

// ===== MENU =====
function renderMenu(cat) {
  const grid = document.getElementById('menu-grid');
  const items = cat === 'all' ? menuItems : menuItems.filter(i => i.category === cat);

  grid.innerHTML = items.map(item => {
    const inCart = cart.find(c => c.id === item.id);
    return `
      <div class="menu-item" data-cat="${item.category}">
        <div class="menu-item-img" style="background:linear-gradient(135deg,${item.color})">
          <span>${item.emoji}</span>
        </div>
        <div class="menu-item-body">
          <span class="menu-item-badge">${item.badge}</span>
          <div class="menu-item-name">${item.name}</div>
          <div class="menu-item-desc">${item.desc}</div>
          <div class="menu-item-footer">
            <span class="menu-item-price">₹${item.price}</span>
            <button class="btn-add ${inCart ? 'added' : ''}" 
              id="btn-${item.id}"
              onclick="addToCart(${item.id})">
              ${inCart ? '✓ Added' : '+ Add to Cart'}
            </button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function filterMenu(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMenu(cat);
}

// ===== ADD TO CART =====
function addToCart(id) {
  const item = menuItems.find(i => i.id === id);
  const existing = cart.find(c => c.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  updateCartCount();

  const btn = document.getElementById('btn-' + id);
  if (btn) {
    btn.classList.add('added');
    btn.textContent = '✓ Added';
  }

  showToast(`${item.emoji} ${item.name} added to cart!`);
}

function updateCartCount() {
  const total = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('cart-count').textContent = total;
}

// ===== RENDER CART =====
function renderCart() {
  const empty = document.getElementById('cart-empty');
  const content = document.getElementById('cart-content');
  const itemsEl = document.getElementById('cart-items');

  if (cart.length === 0) {
    empty.style.display = 'block';
    content.style.display = 'none';
    return;
  }

  empty.style.display = 'none';
  content.style.display = 'block';

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price} each</div>
      </div>
      <div class="cart-qty">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
      <div style="font-weight:700;min-width:60px;text-align:right;color:var(--accent)">₹${item.price * item.qty}</div>
      <button class="remove-btn" onclick="removeItem(${item.id})">🗑</button>
    </div>
  `).join('');

  updateCartTotals();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(c => c.id !== id);
  }
  updateCartCount();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartCount();
  renderCart();
}

function getSubtotal() {
  return cart.reduce((s, c) => s + c.price * c.qty, 0);
}

function updateCartTotals() {
  const sub = getSubtotal();
  const tax = Math.round(sub * 0.05);
  const total = sub + tax + 49;
  document.getElementById('subtotal').textContent = '₹' + sub;
  document.getElementById('tax').textContent = '₹' + tax;
  document.getElementById('total').textContent = '₹' + total;
}

// ===== PAYMENT =====
function renderPaymentSummary() {
  const el = document.getElementById('payment-items');
  el.innerHTML = cart.map(item => `
    <div class="pay-item-row">
      <span>${item.emoji} ${item.name} ×${item.qty}</span>
      <span>₹${item.price * item.qty}</span>
    </div>
  `).join('');

  const sub = getSubtotal();
  const tax = Math.round(sub * 0.05);
  document.getElementById('p-subtotal').textContent = '₹' + sub;
  document.getElementById('p-tax').textContent = '₹' + tax;
  document.getElementById('p-total').textContent = '₹' + (sub + tax + 49);
}

function setPayMethod(btn, method) {
  document.querySelectorAll('.pay-method').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('pay-card').style.display = method === 'card' ? 'block' : 'none';
  document.getElementById('pay-upi').style.display  = method === 'upi'  ? 'block' : 'none';
  document.getElementById('pay-cod').style.display  = method === 'cod'  ? 'block' : 'none';
}

function placeOrder() {
  const orderNum = Math.floor(100000 + Math.random() * 900000);
  document.getElementById('order-num').textContent = orderNum;
  cart = [];
  updateCartCount();
  showPage('success');
}

// ===== CONTACT FORM =====
function submitForm(e) {
  e.preventDefault();
  showToast('✅ Message sent! We\'ll reply within 24 hours.');
  e.target.reset();
}

// ===== LIKE POSTS =====
function likePost(btn) {
  const parts = btn.textContent.split(' ');
  const count = parseInt(parts[1]) + 1;
  btn.textContent = '❤️ ' + count;
  btn.style.background = 'var(--accent)';
  btn.style.color = '#000';
}

// ===== TOAST =====
function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
    background: linear-gradient(135deg, #e8a84e, #e05c3a);
    color: #fff; padding: 14px 28px; border-radius: 50px;
    font-weight: 600; font-size: 0.9rem;
    box-shadow: 0 8px 30px rgba(0,0,0,0.5);
    z-index: 9999; animation: fadeInUp 0.3s ease;
    white-space: nowrap;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  const links = document.querySelector('.nav-links');
  if (links.style.display === 'flex') {
    links.style.display = 'none';
  } else {
    links.style.cssText = `
      display: flex; flex-direction: column;
      position: fixed; top: 70px; left: 0; right: 0;
      background: rgba(13,13,13,0.98); backdrop-filter: blur(20px);
      padding: 24px 32px; gap: 20px; z-index: 998;
      border-bottom: 1px solid #2a2a2a;
    `;
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
});
