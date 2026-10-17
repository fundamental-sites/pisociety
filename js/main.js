document.addEventListener("DOMContentLoaded", () => {
    const tabsContainer = document.querySelector(".tabs");
    const menuContainer = document.getElementById("menu-container");
    const navToggle = document.querySelector(".navtoggle");
    const navMenu = document.querySelector(".header nav");

    // Mobile Navigation Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => navMenu.classList.remove("open"));
        });
    }

    // Render Menu Dynamically from menu-data.js
    if (typeof menuData !== 'undefined' && menuData.length > 0) {
        renderTabs();
        renderCategory(menuData[0].category);
    }

    function renderTabs() {
        if (!tabsContainer) return;
        tabsContainer.innerHTML = "";
        menuData.forEach((section, index) => {
            const btn = document.createElement("button");
            btn.className = `tab ${index === 0 ? "active" : ""}`;
            btn.textContent = section.category.toUpperCase();
            btn.setAttribute("role", "tab");
            btn.addEventListener("click", () => {
                document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
                btn.classList.add("active");
                renderCategory(section.category);
            });
            tabsContainer.appendChild(btn);
        });
    }

    function renderCategory(categoryName) {
        if (!menuContainer) return;
        const categoryObj = menuData.find(sec => sec.category === categoryName);
        if (!categoryObj) return;

        menuContainer.innerHTML = "";
        categoryObj.items.forEach(item => {
            const itemEl = document.createElement("div");
            itemEl.className = "menu-item";
            itemEl.innerHTML = `
                <div class="menu-number">${item.number}</div>
                <div class="item-heading">
                    <h3>${item.name}</h3>
                    <strong>${item.price}</strong>
                </div>
                <p>${item.description}</p>
            `;
            menuContainer.appendChild(itemEl);
        });
    }

    // --- ORDER REDIRECT POPUP MODAL LOGIC ---
    const orderUrl = "https://www.meandu.app/westfield-collective-mvo/counter";

    // Create and inject modal markup dynamically
    const modalHTML = `
        <div id="orderModal" class="order-modal-overlay" style="display: none;">
            <div class="order-modal-content">
                <span class="order-modal-badge">SECURE PORTAL</span>
                <h3>REDIRECTING TO ORDERING PORTAL</h3>
                <p>You are now leaving the Pi Society Pizza site and being redirected to the secure online ordering portal for <br> Westfield Collective.</p>
                <div class="order-modal-actions">
                    <button id="proceedOrderBtn" class="btn btn-red" style="flex:1;">CONTINUE TO ORDER</button>
                    <button id="cancelOrderBtn" class="btn btn-outline" style="flex:1; border-color: #ccc; color: #333;">CANCEL</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('orderModal');
    const proceedBtn = document.getElementById('proceedOrderBtn');
    const cancelBtn = document.getElementById('cancelOrderBtn');
    let targetRedirectUrl = orderUrl;

    // Intercept clicks on order triggers and add class dynamically if needed
    document.querySelectorAll('a[href*="meandu.app"]').forEach(trigger => {
        trigger.classList.add('order-popup-trigger');
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            targetRedirectUrl = trigger.getAttribute('href') || orderUrl;
            modal.style.display = 'flex';
        });
    });

    // Handle modal actions
    if (proceedBtn) {
        proceedBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            window.open(targetRedirectUrl, '_blank', 'noopener');
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});