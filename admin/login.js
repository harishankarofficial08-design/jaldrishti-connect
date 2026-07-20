document.addEventListener('DOMContentLoaded', () => {
    // Initialize icons
    lucide.createIcons();

    // Check if already logged in
    checkIfLoggedIn();

    // Password toggle
    const toggleBtn = document.getElementById('toggle-password');
    const pwdInput = document.getElementById('admin-password');
    
    toggleBtn.addEventListener('click', () => {
        const type = pwdInput.getAttribute('type') === 'password' ? 'text' : 'password';
        pwdInput.setAttribute('type', type);
        toggleBtn.innerHTML = type === 'password' ? '<i data-lucide="eye"></i>' : '<i data-lucide="eye-off"></i>';
        lucide.createIcons();
    });

    let isRegisterMode = false;
    const toggleReg = document.getElementById('toggle-register');
    const headerTitle = document.querySelector('.login-header h2');
    const btnText = document.querySelector('#login-submit-btn span');
    const submitBtn = document.getElementById('login-submit-btn');

    toggleReg.addEventListener('click', (e) => {
        e.preventDefault();
        isRegisterMode = !isRegisterMode;
        if (isRegisterMode) {
            headerTitle.textContent = "Create Admin";
            btnText.textContent = "Register";
            toggleReg.innerHTML = `Already have an account? <span style="color: var(--primary);">Log In</span>`;
        } else {
            headerTitle.textContent = "Admin Portal";
            btnText.textContent = "Secure Login";
            toggleReg.innerHTML = `Don't have an admin account? <span style="color: var(--primary);">Register</span>`;
        }
    });

    // Handle Login or Register
    document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('admin-email').value;
        const password = pwdInput.value;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> <span>${isRegisterMode ? 'Registering...' : 'Authenticating...'}</span>`;
        lucide.createIcons();

        try {
            if (isRegisterMode) {
                const { data, error } = await window.supabaseClient.auth.signUp({
                    email: email,
                    password: password
                });
                
                if (error) {
                    throw error;
                } else {
                    showToast('Registration Success!', 'Account created successfully. Logging you in...', 'success');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1500);
                }
            } else {
                const { data, error } = await window.supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });

                if (error) {
                    throw error;
                } else {
                    showToast('Success', 'Redirecting to dashboard...', 'success');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 800);
                }
            }
        } catch (err) {
            console.error("Auth exception:", err);
            showToast('Error', err.message || 'An unexpected error occurred.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>${isRegisterMode ? 'Register' : 'Secure Login'}</span><i data-lucide="arrow-right"></i>`;
            lucide.createIcons();
        }
    });
});

async function checkIfLoggedIn() {
    try {
        const { data: { session } } = await window.supabaseClient.auth.getSession();
        if (session) {
            window.location.replace('dashboard.html');
        }
    } catch (e) {
        console.error("Session check failed:", e);
    }
}

// Reuse the toast UI
function showToast(title, message, type = "info") {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconName = "info";
    if (type === "success") iconName = "check-circle";
    if (type === "warning") iconName = "alert-triangle";
    if (type === "error") iconName = "alert-octagon";

    toast.innerHTML = `
        <i data-lucide="${iconName}"></i>
        <div class="toast-content">
            <h5>${title}</h5>
            <p>${message}</p>
        </div>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, 4500);
}
