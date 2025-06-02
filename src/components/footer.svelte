<footer class="footer mt-96">
	<div class="footer-container">
		<div class="footer-section">
			<div class="footer-logo">
				<img class="logo-icon" src="Stargaze_logo.png">
				<span>ดูดาว</span>
			</div>
			<p class="footer-description">
				แหล่งข้อมูลและบทความเกี่ยวกับดาราศาสตร์ที่ครบถ้วนและน่าเชื่อถือ
			</p>
		</div>

		<div class="footer-section">
			<h3 class="footer-heading">เมนูหลัก</h3>
			<nav class="footer-nav">
				<a href="#home">หน้าหลัก</a>
				<a href="#articles">บทความ</a>
				<a href="#stars">ข้อมูลดวงดาว</a>
				<a href="#activities">กิจกรรม</a>
			</nav>
		</div>

		<div class="footer-section">
			<h3 class="footer-heading">เกี่ยวกับเรา</h3>
			<nav class="footer-nav">
				<a href="#about">เกี่ยวกับเรา</a>
				<a href="#contact">ติดต่อเรา</a>
				<a href="#privacy">นโยบายความเป็นส่วนตัว</a>
				<a href="#terms">เงื่อนไขการใช้งาน</a>
			</nav>
		</div>

		<div class="footer-section">
			<h3 class="footer-heading">ติดตามเรา</h3>
			<div class="social-links">
				<a href="#" class="social-link" aria-label="Facebook">
					<i class="fab fa-facebook"></i>
				</a>
				<a href="#" class="social-link" aria-label="Twitter">
					<i class="fab fa-twitter"></i>
				</a>
				<a href="#" class="social-link" aria-label="Instagram">
					<i class="fab fa-instagram"></i>
				</a>
				<a href="#" class="social-link" aria-label="YouTube">
					<i class="fab fa-youtube"></i>
				</a>
			</div>
		</div>
	</div>

	<div class="footer-bottom">
		<div class="footer-bottom-content">
			<p class="copyright">© 2025 ดูดาว. สงวนลิขสิทธิ์.</p>
			<div class="footer-bottom-links">
				<a href="#privacy">นโยบายความเป็นส่วนตัว</a>
				<span class="separator">|</span>
				<a href="#terms">เงื่อนไขการใช้งาน</a>
			</div>
		</div>
	</div>
</footer>

<style>

	/* Enhanced Mobile Header */
	.header {
		background-color: #1a1a1a;
		padding: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #333;
		position: sticky;
		top: 0;
		z-index: 1000;
		flex-wrap: wrap;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 500;
		font-size: 1.1rem;
	}

	.logo-icon {
		width: 24px;
		height: 24px;
		border-radius: 50%;
	}

	.nav-menu {
		display: flex;
		gap: 1rem;
		list-style: none;
		flex-wrap: wrap;
	}

	.nav-menu a {
		color: white;
		text-decoration: none;
		padding: 0.5rem 0.8rem;
		border-radius: 4px;
		transition: background-color 0.3s;
		font-size: 14px;
		white-space: nowrap;
	}

	.nav-menu a:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.login-btn {
		background-color: #4a90e2;
		color: white;
		padding: 0.6rem 1rem;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		text-decoration: none;
		font-size: 14px;
		transition: background-color 0.3s;
		white-space: nowrap;
	}

	.login-btn:hover {
		background-color: #357abd;
	}

	/* Hero Section */
	.hero {
		background-image: linear-gradient(rgba(10, 13, 20, 0.8), rgba(10, 13, 20, 0.9)), url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop');
		background-size: cover;
		background-position: center;
		padding: 4rem 1rem;
		text-align: center;
	}

	.hero h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	.hero p {
		font-size: 1.2rem;
		color: #b0b7c3;
		max-width: 700px;
		margin: 0 auto;
	}

	/* Search Section */
	.search-section {
		background-color: #0a0d14;
		padding: 1.5rem 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.search-container {
		display: flex;
		max-width: 600px;
		width: 100%;
	}

	.search-input {
		flex: 1;
		padding: 0.8rem 1rem;
		border: 1px solid #2a3040;
		border-right: none;
		border-radius: 4px 0 0 4px;
		background-color: rgba(255, 255, 255, 0.1);
		color: white;
		font-size: 0.9rem;
	}

	.search-input::placeholder {
		color: #b0b7c3;
	}

	.search-input:focus {
		outline: none;
		background-color: rgba(255, 255, 255, 0.15);
	}

	.search-btn {
		background-color: #4a90e2;
		color: white;
		border: none;
		padding: 0 1.5rem;
		border-radius: 0 4px 4px 0;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.search-btn:hover {
		background-color: #3a7bc8;
	}

	.filter-buttons {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.filter-btn {
		padding: 0.5rem 1.5rem;
		border-radius: 4px;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.3s;
	}

	.filter-btn.active {
		background-color: #4a90e2;
		color: white;
		border: 1px solid #4a90e2;
	}

	.filter-btn.inactive {
		background-color: transparent;
		color: #ffffff;
		border: 1px solid #2a3040;
	}

	.filter-btn.inactive:hover {
		border-color: #4a90e2;
		color: #4a90e2;
	}

	.create-article-btn {
		background-color: #28a745;
		color: white;
		border: none;
		padding: 0.5rem 1.5rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: background-color 0.3s;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.create-article-btn:hover {
		background-color: #218838;
	}

	/* Articles Grid */
	.articles-section {
		padding: 2rem 1rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.articles-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.article-card {
		background-color: #1a1f2e;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
		transition: transform 0.3s;
	}

	.article-card:hover {
		transform: translateY(-5px);
	}

	.article-image {
		height: 180px;
		background-size: cover;
		background-position: center;
		position: relative;
	}

	.article-image::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
	}

	.article-content {
		padding: 1.2rem;
	}

	.article-title {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		font-weight: 600;
	}

	.article-description {
		color: #b0b7c3;
		font-size: 0.9rem;
		margin-bottom: 1rem;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.read-more {
		display: inline-block;
		background-color: #4a90e2;
		color: white;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		text-decoration: none;
		font-size: 0.9rem;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.read-more:hover {
		background-color: #3a7bc8;
	}

	/* Modal Styles */
	.modal {
		display: none;
		position: fixed;
		z-index: 2000;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(5px);
	}

	.modal.active {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-content {
		background-color: #1a1f2e;
		border-radius: 12px;
		width: 95%;
		max-width: 800px;
		max-height: 90vh;
		overflow-y: auto;
		position: relative;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
	}

	.modal-header {
		background-color: #4a90e2;
		padding: 1.5rem;
		border-radius: 12px 12px 0 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.modal-title {
		font-size: 1.3rem;
		font-weight: 600;
		color: white;
	}

	.close-btn {
		background: none;
		border: none;
		color: white;
		font-size: 1.5rem;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 4px;
		transition: background-color 0.3s;
	}

	.close-btn:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	.modal-body {
		padding: 2rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: #ffffff;
	}

	.form-input {
		width: 100%;
		padding: 0.8rem;
		border: 1px solid #2a3040;
		border-radius: 6px;
		background-color: rgba(255, 255, 255, 0.1);
		color: white;
		font-size: 0.9rem;
		transition: border-color 0.3s;
	}

	.form-input:focus {
		outline: none;
		border-color: #4a90e2;
		background-color: rgba(255, 255, 255, 0.15);
	}

	/* Select dropdown option styling */
	.form-input option {
		background-color: white;
		color: black;
		padding: 0.5rem;
	}

	.form-textarea {
		min-height: 150px;
		resize: vertical;
		font-family: inherit;
	}

	.image-upload-area {
		border: 2px dashed #2a3040;
		border-radius: 8px;
		padding: 2rem;
		text-align: center;
		transition: border-color 0.3s;
		cursor: pointer;
	}

	.image-upload-area:hover {
		border-color: #4a90e2;
	}

	.image-upload-area.dragover {
		border-color: #4a90e2;
		background-color: rgba(74, 144, 226, 0.1);
	}

	.upload-icon {
		font-size: 3rem;
		color: #b0b7c3;
		margin-bottom: 1rem;
	}

	.upload-text {
		color: #b0b7c3;
		margin-bottom: 0.5rem;
	}

	.file-input {
		display: none;
	}

	.image-preview {
		margin-top: 1rem;
		display: none;
	}

	.image-preview.active {
		display: block;
	}

	.preview-image {
		max-width: 100%;
		max-height: 200px;
		border-radius: 8px;
		object-fit: cover;
	}

	.image-preview-container {
		position: relative;
		display: inline-block;
	}

	.remove-image-btn {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		background-color: #dc3545;
		color: white;
		border: none;
		border-radius: 50%;
		width: 30px;
		height: 30px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		transition: background-color 0.3s;
		z-index: 10;
	}

	.remove-image-btn:hover {
		background-color: #c82333;
	}

	.form-buttons {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		margin-top: 2rem;
	}

	.btn {
		padding: 0.8rem 1.5rem;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: background-color 0.3s;
	}

	.btn-primary {
		background-color: #4a90e2;
		color: white;
	}

	.btn-primary:hover {
		background-color: #3a7bc8;
	}

	.btn-secondary {
		background-color: #2a3040;
		color: #ffffff;
	}

	.btn-secondary:hover {
		background-color: #3a4050;
	}

	/* Article Detail Modal Styles */
	.detail-image-container {
		width: 100%;
		margin-bottom: 1.5rem;
	}

	.detail-image {
		width: 100%;
		height: 300px;
		object-fit: cover;
		border-radius: 8px;
	}

	.detail-title {
		font-size: 1.8rem;
		color: #ffffff;
		margin-bottom: 1rem;
		font-weight: 600;
	}

	.detail-meta {
		display: flex;
		gap: 1rem;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}

	.detail-category {
		background-color: #4a90e2;
		color: white;
		padding: 0.3rem 0.8rem;
		border-radius: 15px;
		font-size: 0.8rem;
		font-weight: 500;
	}

	.detail-date {
		color: #b0b7c3;
		font-size: 0.9rem;
	}

	.detail-description {
		color: #ffffff;
		line-height: 1.8;
		font-size: 1rem;
		margin-bottom: 2rem;
	}

	.detail-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.detail-actions .btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	/* Footer Styles */
	.footer {
		background-color: #0a0d14;
		padding: 4rem 1rem 0;
		margin-top: -2rem;
	}

	.footer-container {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		padding-bottom: 3rem;
	}

	.footer-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.footer-logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.2rem;
		font-weight: 600;
	}

	.footer-logo .logo-icon {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: bold;
	}

	.footer-description {
		color: #b0b7c3;
		font-size: 0.9rem;
		line-height: 1.6;
		max-width: 300px;
	}

	.footer-heading {
		color: white;
		font-size: 1.1rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.footer-nav {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.footer-nav a {
		color: #b0b7c3;
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.3s;
	}

	.footer-nav a:hover {
		color: #4a90e2;
	}

	.social-links {
		display: flex;
		gap: 1rem;
	}

	.social-link {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background-color: #1a1f2e;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #b0b7c3;
		text-decoration: none;
		transition: all 0.3s;
	}

	.social-link:hover {
		background-color: #4a90e2;
		color: white;
		transform: translateY(-2px);
	}

	.footer-bottom {
		border-top: 1px solid #1a1f2e;
		padding: 1.5rem 0;
	}

	.footer-bottom-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.copyright {
		color: #b0b7c3;
		font-size: 0.9rem;
	}

	.footer-bottom-links {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.footer-bottom-links a {
		color: #b0b7c3;
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.3s;
	}

	.footer-bottom-links a:hover {
		color: #4a90e2;
	}

	.separator {
		color: #1a1f2e;
	}

	/* Responsive Footer */
	@media (max-width: 768px) {
		.footer {
			padding: 3rem 1rem 0;
		}

		.footer-container {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.footer-section {
			text-align: center;
		}

		.footer-logo {
			justify-content: center;
		}

		.footer-description {
			margin: 0 auto;
		}

		.social-links {
			justify-content: center;
		}

		.footer-bottom-content {
			flex-direction: column;
			text-align: center;
		}

		.footer-bottom-links {
			justify-content: center;
		}
	}
</style>