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
    const orderUrl = "https://order.toasttab.com/online/pi-society";

    const modal = document.getElementById('orderModal');
    const proceedBtn = document.getElementById('proceedBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    let targetRedirectUrl = orderUrl;

    // Intercept clicks on order triggers
    document.querySelectorAll('.order-popup-trigger').forEach(trigger => {
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