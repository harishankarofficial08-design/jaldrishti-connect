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

    // Handle Login
    document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('admin-email').value;
        const password = pwdInput.value;
        const btn = document.getElementById('login-submit-btn');

        btn.disabled = true;
        btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> <span>Authenticating...</span>';
        lucide.createIcons();

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                showToast('Authentication Failed', 'Invalid Admin ID or Password.', 'error');
                btn.disabled = false;
                btn.innerHTML = '<span>Secure Login</span><i data-lucide="arrow-right"></i>';
                lucide.createIcons();
            } else {
                showToast('Success', 'Redirecting to dashboard...', 'success');
                setTimeout(() => {
                    window.location.href = '/admin/dashboard';
                }, 800);
            }
        } catch (err) {
            console.error("Login exception:", err);
            showToast('Error', 'An unexpected error occurred.', 'error');
            btn.disabled = false;
            btn.innerHTML = '<span>Secure Login</span><i data-lucide="arrow-right"></i>';
            lucide.createIcons();
        }
    });
});

async function checkIfLoggedIn() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        window.location.replace('/admin/dashboard');
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
