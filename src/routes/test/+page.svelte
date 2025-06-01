<script>
    let showPassword = false;
</script>

<div class="box">
    <div class="login">
        <div class="loginBx">
            <h2>🔒 ล็อคอิน</h2>

            <input type="email" placeholder="อีเมล" />

            <div class="password-wrapper">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="รหัสผ่าน"
                />
                <i
                    class={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                    on:click={() => (showPassword = !showPassword)}
                ></i>
            </div>

            <input type="submit" value="เข้าสู่ระบบ" class="submit-btn" />

            <div class="group">
                <a href="#">ลืมรหัสผ่าน?</a>
                <a href="#" class="signup">สร้างบัญชีใหม่</a>
            </div>
        </div>
    </div>
</div>

<!-- fontawesome CDN -->
<svelte:head>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
    />
</svelte:head>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap");

    body,
    html {
        margin: 0;
        padding: 0;
        font-family: "Poppins", sans-serif;
        background: linear-gradient(145deg, #1f1e29, #2e2d3f);
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .box {
        position: relative;
        width: 400px;
        height: 220px;
        background: repeating-conic-gradient(
            from var(--a),
            #ff2770 0%,
            #ff2770 5%,
            transparent 5%,
            transparent 40%,
            #ff2770 50%
        );
        animation: rotate 4s linear infinite;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        --a: 0deg;
        transition: 0.5s;
        z-index: 1000000;
    }

    .box:hover {
        width: 450px;
        height: 520px;
    }

    @keyframes rotate {
        0% {
            --a: 0deg;
        }
        100% {
            --a: 360deg;
        }
    }

    .box::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: repeating-conic-gradient(
            from var(--a),
            #45f3ff 0%,
            #45f3ff 5%,
            transparent 5%,
            transparent 40%,
            #45f3ff 50%
        );
        animation: rotate 4s linear infinite;
        animation-delay: -1s;
        border-radius: 20px;
    }

    .box::after {
        content: "";
        position: absolute;
        inset: 4px;
        background: #2d2d39;
        border-radius: 15px;
        border: 8px solid #25252b;
    }

    .login {
        position: absolute;
        inset: 60px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        transition: 0.5s;
    }

    .box:hover .login {
        inset: 40px;
    }

    .loginBx {
        width: 75%;
        display: flex;
        flex-direction: column;
        gap: 18px;
        transform: translateY(120px);
        transition: 0.5s;
    }

    .box:hover .loginBx {
        transform: translateY(0);
    }

    h2 {
        font-size: 1.8rem;
        text-shadow: 0 0 10px #ff2770;
    }

    input {
        width: 100%;
        padding: 10px 20px;
        border-radius: 30px;
        border: 2px solid white;
        background: rgba(0, 0, 0, 0.15);
        color: white;
        font-size: 1rem;
    }

    input:focus {
        outline: none;
        border-color: #45f3ff;
        box-shadow: 0 0 10px #45f3ff;
    }

    .password-wrapper {
        position: relative;
    }

    .password-wrapper i {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        color: #bbb;
    }

    .submit-btn {
        background: #45f3ff;
        color: #111;
        font-weight: bold;
        border: none;
        cursor: pointer;
    }

    .submit-btn:hover {
        box-shadow:
            0 0 10px #45f3ff,
            0 0 40px #45f3ff;
    }

    .group {
        display: flex;
        justify-content: space-between;
        font-size: 0.9rem;
        color: #ccc;
    }

    .group a {
        text-decoration: none;
        color: #ccc;
    }

    .group a.signup {
        color: #ff2770;
        font-weight: 500;
    }
</style>
