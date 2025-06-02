<script lang="ts">
	import { onMount } from 'svelte';
	import { derived, writable } from 'svelte/store';

	// Types
	interface Article {
		id: number;
		title: string;
		description: string;
		image: string;
		category: 'popular' | 'latest';
		fullContent?: string;
		date?: string;
		displayCategory?: 'ยอดนิยม' | 'ล่าสุด';
	}

	interface Comment {
		id: number;
		avatar: string;
		username: string;
		rating: number;
		timestamp: string;
		text: string;
		likes: number;
		liked: boolean;
		expanded: boolean;
	}

	// Svelte stores for reactive state
	const articlesStore = writable<Article[]>([]);
	const searchTermStore = writable('');
	const activeFilterStore = writable<'latest' | 'popular'>('latest');
	const commentTextStore = writable('');
	const selectedRatingStore = writable(0);

	// Computed values
	const filteredArticles = derived(
		[articlesStore, searchTermStore, activeFilterStore],
		([$articles, $searchTerm, $activeFilter]) => {
			return $articles.filter((article: Article) => {
				let filtered = true;

				// Apply search filter
				if ($searchTerm.trim()) {
					filtered = article.title.toLowerCase().includes($searchTerm.toLowerCase()) ||
						article.description.toLowerCase().includes($searchTerm.toLowerCase());
				}

				// Apply category filter
				if ($activeFilter === 'popular') {
					filtered = article.category === 'popular';
				}

				return filtered;
			});
		}
	);

	const charCount = derived(
		commentTextStore,
		($commentText) => $commentText.length
	);

	const isSubmitDisabled = derived(
		[commentTextStore, selectedRatingStore],
		([$commentText, $selectedRating]) => $commentText.trim() === '' || $selectedRating === 0
	);

	// Local state
	let showCreateModal = false;
	let showDetailModal = false;
	let selectedArticle: Article | null = null;
	let commentCount = 3;
	let comments: Comment[] = [
		{
			id: 1,
			avatar: 'ป',
			username: 'ปลื่มจิตร ชิตรผล',
			rating: 5,
			timestamp: '12-02-2568',
			text: 'ผมชอบที่นี่หอดูดาว เที่ยวแบบนี้แหละได้ความรู้ด้วย ชอบมากๆ สถานที่สวยงาม บรรยากาศดี เหมาะสำหรับการพักผ่อนและเรียนรู้เรื่องดาราศาสตร์ พนักงานให้บริการดีมาก อธิบายรายละเอียดชัดเจน แนะนำให้มาเที่ยวกันครับ',
			likes: 100,
			liked: true,
			expanded: false
		},
		{
			id: 2,
			avatar: 'โ',
			username: 'โรส',
			rating: 5,
			timestamp: '12-02-2568',
			text: 'พาแฟนต่างชาติไปดู เขาชอบมาก กับข้าวที่อร่อยยย มีแพลนจำต้องไปๆ ที่นี่เป็นสถานที่ที่น่าประทับใจมาก วิวสวยงาม อาหารอร่อย บริการดีเยี่ยม แฟนผมที่เป็นชาวต่างชาติประทับใจมากๆ บอกว่าจะกลับมาอีกแน่นอน',
			likes: 100,
			liked: true,
			expanded: false
		},
		{
			id: 3,
			avatar: 'R',
			username: 'Rusan',
			rating: 5,
			timestamp: '12-02-2568',
			text: "It's good I'm so happy",
			likes: 100,
			liked: true,
			expanded: false
		}
	];

	// Form states
	let articleTitle = '';
	let articleContent = '';
	let articleCategory: 'popular' | 'latest' = 'latest';
	let previewImageSrc = '';
	let imageFile: File | null = null;

	// Initialize articles
	onMount(() => {
		const initialArticles: Article[] = [
			{
				id: 1,
				title: 'อุทยานแห่งชาติเขาใหญ่',
				description: 'ใกล้กรุงเทพฯ ได้ฟีลธรรมชาติ',
				image: 'img/1.png',
				category: 'popular'
			},
			{
				id: 2,
				title: 'อุทยานแห่งชาติภูกระดึง',
				description: 'ไม่ใช่แค่ดูดาว แต่คือพิชิตฝัน..',
				image: 'img/2.png',
				category: 'popular'
			},
			{
				id: 3,
				title: 'North Star Valley หุบเขาดาวเหนือ...',
				description: 'ที่พักบับเบิ้ลใส',
				image: 'img/3.png',
				category: 'popular'
			},
			{
				id: 4,
				title: 'อุทยานแห่งชาติเขาใหญ่',
				description: 'ใกล้กรุงเทพฯ ได้ฟีลธรรมชาติ',
				image: 'img/4.png',
				category: 'popular'
			},
			{
				id: 5,
				title: 'อุทยานแห่งชาติภูกระดึง',
				description: 'ไม่ใช่แค่ดูดาว แต่คือพิชิตฝัน...',
				image: 'img/5.png',
				category: 'latest'
			},
			{
				id: 6,
				title: 'ดอยเสมอดาว - น่าน',
				description: 'ตื่นมาก็หมอก...ก่อนนอนก็ดาว',
				image: 'img/6.png',
				category: 'latest'
			},
			{
				id: 7,
				title: 'กิ่วกะลก" แคมป์',
				description: 'มันจะดีต่อใจแค่ไหน ถ้า...',
				image: 'img/7.png',
				category: 'latest'
			},
			{
				id: 8,
				title: 'ดอยพุ่ยโค',
				description: 'วิวทิวทัศน์สวยงามและสุดยอด',
				image: 'img/8.png',
				category: 'latest'
			},
			{
				id: 9,
				title: 'กิ่วลมเหนือ',
				description: 'สายเดินป่า ต้องพิชิตดอย...',
				image: 'img/9.png',
				category: 'latest'
			}
		];
		articlesStore.set(initialArticles);
	});

	// Functions
	function setFilter(filter: 'latest' | 'popular'): void {
		activeFilterStore.set(filter);
	}

	function performSearch(): void {
		// Search is reactive, no need for explicit function
	}

	function openCreateModal(): void {
		showCreateModal = true;
	}

	function closeCreateModal(): void {
		showCreateModal = false;
		resetForm();
	}

	function resetForm(): void {
		articleTitle = '';
		articleContent = '';
		articleCategory = 'latest';
		previewImageSrc = '';
		imageFile = null;
	}

	function handleImageUpload(event: Event): void {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			if (!file.type.startsWith('image/')) {
				alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
				return;
			}
			if (file.size > 5 * 1024 * 1024) {
				alert('ขนาดไฟล์ต้องไม่เกิน 5MB');
				return;
			}

			const reader = new FileReader();
			reader.onload = (e) => {
				previewImageSrc = e.target?.result as string;
			};
			reader.readAsDataURL(file);
			imageFile = file;
		}
	}

	function removeImage(): void {
		previewImageSrc = '';
		imageFile = null;
	}

	function submitArticle(event: Event): void {
		event.preventDefault();
		if (!articleTitle || !articleContent || !articleCategory) {
			alert('กรุณากรอกข้อมูลให้ครบถ้วน');
			return;
		}

		const newArticle: Article = {
			id: 0, // Will be set by the store
			title: articleTitle,
			description: articleContent.length > 150 ? articleContent.substring(0, 150) + '...' : articleContent,
			image: previewImageSrc || 'img/1.png',
			category: articleCategory
		};

		articlesStore.update(articles => {
			newArticle.id = articles.length + 1;
			return [newArticle, ...articles];
		});

		closeCreateModal();
		alert('เผยแพร่บทความเรียบร้อยแล้ว!');
	}

	function openArticleDetail(article: Article): void {
		selectedArticle = {
			...article,
			fullContent: getArticleContent(article.title),
			displayCategory: article.category === 'popular' ? 'ยอดนิยม' : 'ล่าสุด',
			date: '15 มกราคม 2025'
		};
		showDetailModal = true;
	}

	function closeDetailModal(): void {
		showDetailModal = false;
		selectedArticle = null;
	}

	function getArticleContent(title: string): string {
		const defaultContent = `เนื้อหาเพิ่มเติมเกี่ยวกับ ${title} จะอัปเดตในเร็วๆ นี้...

**สถานที่น่าสนใจ:**
- วิวทิวทัศน์ที่สวยงาม
- บรรยากาศที่เหมาะสำหรับการพักผ่อน
- กิจกรรมที่หลากหลาย

**ข้อมูลการเดินทาง:**
- เส้นทางการเดินทางที่สะดวก
- ที่พักและสิ่งอำนวยความสะดวก
- ค่าใช้จ่ายโดยประมาณ

การเที่ยวชมดาวที่นี่จะเป็นประสบการณ์ที่น่าจดจำและคุ้มค่าอย่างแน่นอน`;

		return defaultContent;
	}

	function setRating(rating: number): void {
		selectedRatingStore.set(rating);
	}

	function addComment(): void {
		if ($commentTextStore.trim() === '' || $selectedRatingStore === 0) {
			alert('กรุณาใส่ความคิดเห็นและให้คะแนน');
			return;
		}

		const now = new Date();
		const thaiDate = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear() + 543}`;

		const newComment: Comment = {
			id: comments.length + 1,
			avatar: 'ผ',
			username: 'ผู้ใช้ใหม่',
			rating: $selectedRatingStore,
			timestamp: thaiDate,
			text: $commentTextStore,
			likes: 0,
			liked: false,
			expanded: false
		};

		comments = [newComment, ...comments];
		commentCount++;
		commentTextStore.set('');
		selectedRatingStore.set(0);

		// Show success message
		const successMsg = document.createElement('div');
		successMsg.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#28a745;color:white;padding:12px 24px;border-radius:6px;z-index:9999;';
		successMsg.textContent = 'โพสต์ความคิดเห็นสำเร็จ!';
		document.body.appendChild(successMsg);
		setTimeout(() => successMsg.remove(), 3000);
	}

	function toggleLike(comment: Comment): void {
		comment.liked = !comment.liked;
		comment.likes += comment.liked ? 1 : -1;
	}

	function toggleReadMore(comment: Comment): void {
		comment.expanded = !comment.expanded;
	}

	function shareArticle(): void {
		if (navigator.share) {
			navigator.share({
				title: selectedArticle?.title,
				text: 'อ่านบทความน่าสนใจเกี่ยวกับดาราศาสตร์',
				url: window.location.href
			});
		} else {
			navigator.clipboard.writeText(window.location.href);
			alert('คัดลอกลิงค์แล้ว!');
		}
	}

	function toggleFavorite(): void {
		// Toggle favorite functionality
		alert('เพิ่มในรายการโปรดแล้ว!');
	}

	function shouldShowReadMore(text: string): boolean {
		return text.length > 120;
	}

	function getTruncatedText(text: string): string {
		return text.length > 120 ? text.substring(0, 120) + '...' : text;
	}
</script>

<div class="container">
	<!-- Search and Filter Section -->
	<div class="search-section">
		<div class="search-container">
			<input
				type="text"
				class="search-input"
				placeholder="ค้นหาบทความ..."
				bind:value={$searchTermStore}
			/>
			<button class="search-btn" on:click={performSearch}>
				<i class="fas fa-search"></i>
			</button>
		</div>
		<div class="filter-buttons">
			<button
				class="filter-btn {$activeFilterStore === 'latest' ? 'active' : 'inactive'}"
				on:click={() => setFilter('latest')}
			>
				ล่าสุด
			</button>
			<button
				class="filter-btn {$activeFilterStore === 'popular' ? 'active' : 'inactive'}"
				on:click={() => setFilter('popular')}
			>
				ยอดนิยม
			</button>
			<button class="create-article-btn" on:click={openCreateModal}>
				<i class="fas fa-plus"></i>
				เขียนบทความ
			</button>
		</div>
	</div>

	<!-- Articles Grid -->
	<div class="articles-section">
		<div class="articles-grid">
			{#each $filteredArticles as article (article.id)}
				<div class="article-card">
					<div class="article-image" style="background-image: url({article.image})">
						<div class="article-category">
							{article.category === 'popular' ? 'ยอดนิยม' : 'ล่าสุด'}
						</div>
					</div>
					<div class="article-content">
						<h3 class="article-title">{article.title}</h3>
						<p class="article-description">{article.description}</p>
						<button class="read-more" on:click={() => openArticleDetail(article)}>
							อ่านเพิ่มเติม
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Create Article Modal -->
	{#if showCreateModal}
		<div class="modal active">
			<div class="modal-content">
				<div class="modal-header">
					<h2 class="modal-title">เขียนบทความใหม่</h2>
					<button class="close-btn" on:click={closeCreateModal}>&times;</button>
				</div>
				<div class="modal-body">
					<form on:submit={submitArticle}>
						<div class="form-group">
							<label class="form-label" for="title">หัวข้อบทความ</label>
							<input
								type="text"
								id="title"
								class="form-input"
								bind:value={articleTitle}
								required
							/>
						</div>
						<div class="form-group">
							<label class="form-label" for="content">เนื้อหาบทความ</label>
							<textarea
								id="content"
								class="form-input form-textarea"
								bind:value={articleContent}
								required
							></textarea>
						</div>
						<div class="form-group">
							<label class="form-label" for="category">หมวดหมู่</label>
							<select id="category" class="form-input" bind:value={articleCategory}>
								<option value="latest">ล่าสุด</option>
								<option value="popular">ยอดนิยม</option>
							</select>
						</div>
						<div class="form-group">
							<label class="form-label">รูปภาพประกอบ</label>
							<div
								class="image-upload-area"
								on:click={() => document.getElementById('image-upload')?.click()}
							>
								{#if previewImageSrc}
									<div class="image-preview active">
										<div class="image-preview-container">
											<img src={previewImageSrc} alt="Preview" class="preview-image" />
											<button
												type="button"
												class="remove-image-btn"
												on:click|stopPropagation={removeImage}
											>
												&times;
											</button>
										</div>
									</div>
								{:else}
									<i class="fas fa-cloud-upload-alt upload-icon"></i>
									<p class="upload-text">คลิกเพื่ออัปโหลดรูปภาพ</p>
									<p class="upload-text">รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB</p>
								{/if}
								<input
									type="file"
									id="image-upload"
									class="file-input"
									accept="image/*"
									on:change={handleImageUpload}
								/>
							</div>
						</div>
						<div class="form-buttons">
							<button type="button" class="btn btn-secondary" on:click={closeCreateModal}>
								ยกเลิก
							</button>
							<button type="submit" class="btn btn-primary">เผยแพร่</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	{/if}

	<!-- Article Detail Modal -->
	{#if showDetailModal && selectedArticle}
		<div class="modal active">
			<div class="modal-content">
				<div class="modal-header">
					<h2 class="modal-title">{selectedArticle.title}</h2>
					<button class="close-btn" on:click={closeDetailModal}>&times;</button>
				</div>
				<div class="modal-body">
					<div class="detail-image-container">
						<img src={selectedArticle.image} alt={selectedArticle.title} class="detail-image" />
					</div>
					<div class="detail-meta">
						<span class="detail-category">{selectedArticle.displayCategory}</span>
						<span class="detail-date">{selectedArticle.date}</span>
					</div>
					<div class="detail-description">
						{selectedArticle.fullContent}
					</div>
					<div class="detail-actions">
						<button class="btn btn-primary" on:click={shareArticle}>
							<i class="fas fa-share-alt"></i>
							แชร์
						</button>
						<button class="btn btn-secondary" on:click={toggleFavorite}>
							<i class="fas fa-heart"></i>
							เพิ่มในรายการโปรด
						</button>
					</div>

					<!-- Comments Section -->
					<div class="comments-section">
						<h3>ความคิดเห็น ({commentCount})</h3>
						<div class="comment-form">
							<div class="rating-input">
								{#each Array(5) as _, i}
									<button
										class="star-btn {i < $selectedRatingStore ? 'active' : ''}"
										on:click={() => setRating(i + 1)}
									>
										<i class="fas fa-star"></i>
									</button>
								{/each}
							</div>
							<div class="comment-input-container">
								<textarea
									class="comment-input"
									placeholder="เขียนความคิดเห็น..."
									bind:value={$commentTextStore}
								></textarea>
								<div class="char-count {$charCount > 500 ? 'error' : ''}">
									{$charCount}/500
								</div>
							</div>
							<button
								class="submit-comment-btn"
								on:click={addComment}
								disabled={$isSubmitDisabled}
							>
								โพสต์
							</button>
						</div>
						<div class="comments-list">
							{#each comments as comment (comment.id)}
								<div class="comment">
									<div class="comment-header">
										<div class="comment-user">
											<div class="user-avatar">{comment.avatar}</div>
											<div class="user-info">
												<div class="username">{comment.username}</div>
												<div class="comment-meta">
													<div class="rating">
														{#each Array(5) as _, i}
															<i
																class="fas fa-star {i < comment.rating ? 'active' : ''}"
															></i>
														{/each}
													</div>
													<span class="timestamp">{comment.timestamp}</span>
												</div>
											</div>
										</div>
										<button
											class="like-btn {comment.liked ? 'active' : ''}"
											on:click={() => toggleLike(comment)}
										>
											<i class="fas fa-heart"></i>
											<span>{comment.likes}</span>
										</button>
									</div>
									<div class="comment-content">
										{#if comment.expanded}
											{comment.text}
										{:else}
											{shouldShowReadMore(comment.text)
												? getTruncatedText(comment.text)
												: comment.text}
										{/if}
										{#if shouldShowReadMore(comment.text)}
											<button
												class="read-more-btn"
												on:click={() => toggleReadMore(comment)}
											>
												{comment.expanded ? 'แสดงน้อยลง' : 'อ่านเพิ่มเติม'}
											</button>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	/* Container */
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
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

	.article-category {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background-color: #4a90e2;
		color: white;
		padding: 0.3rem 0.8rem;
		border-radius: 15px;
		font-size: 0.8rem;
		z-index: 1;
	}

	.article-content {
		padding: 1.2rem;
	}

	.article-title {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: white;
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

	/* Form Styles */
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

	.form-textarea {
		min-height: 150px;
		resize: vertical;
		font-family: inherit;
	}

	/* Image Upload Styles */
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

	/* Button Styles */
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

	/* Article Detail Styles */
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

	/* Comments Section Styles */
	.comments-section {
		margin-top: 3rem;
	}

	.comments-section h3 {
		color: white;
		margin-bottom: 1.5rem;
		font-size: 1.2rem;
	}

	.comment-form {
		background-color: #1a1f2e;
		padding: 1.5rem;
		border-radius: 8px;
		margin-bottom: 2rem;
	}

	.rating-input {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.star-btn {
		background: none;
		border: none;
		color: #b0b7c3;
		font-size: 1.2rem;
		cursor: pointer;
		transition: color 0.3s;
	}

	.star-btn.active {
		color: #ffd700;
	}

	.comment-input-container {
		position: relative;
		margin-bottom: 1rem;
	}

	.comment-input {
		width: 100%;
		padding: 1rem;
		border: 1px solid #2a3040;
		border-radius: 6px;
		background-color: rgba(255, 255, 255, 0.1);
		color: white;
		font-size: 0.9rem;
		min-height: 100px;
		resize: vertical;
		font-family: inherit;
	}

	.comment-input:focus {
		outline: none;
		border-color: #4a90e2;
		background-color: rgba(255, 255, 255, 0.15);
	}

	.char-count {
		position: absolute;
		bottom: 0.5rem;
		right: 0.5rem;
		color: #b0b7c3;
		font-size: 0.8rem;
	}

	.char-count.error {
		color: #dc3545;
	}

	.submit-comment-btn {
		background-color: #4a90e2;
		color: white;
		border: none;
		padding: 0.8rem 1.5rem;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: background-color 0.3s;
	}

	.submit-comment-btn:hover:not(:disabled) {
		background-color: #3a7bc8;
	}

	.submit-comment-btn:disabled {
		background-color: #2a3040;
		cursor: not-allowed;
	}

	.comments-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.comment {
		background-color: #1a1f2e;
		padding: 1.5rem;
		border-radius: 8px;
	}

	.comment-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.comment-user {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.user-avatar {
		width: 40px;
		height: 40px;
		background-color: #4a90e2;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
	}

	.user-info {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.username {
		color: white;
		font-weight: 500;
	}

	.comment-meta {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.rating {
		display: flex;
		gap: 0.2rem;
	}

	.rating i {
		color: #b0b7c3;
		font-size: 0.8rem;
	}

	.rating i.active {
		color: #ffd700;
	}

	.timestamp {
		color: #b0b7c3;
		font-size: 0.8rem;
	}

	.like-btn {
		background: none;
		border: none;
		color: #b0b7c3;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		transition: color 0.3s;
	}

	.like-btn.active {
		color: #dc3545;
	}

	.like-btn:hover {
		color: #dc3545;
	}

	.comment-content {
		color: #ffffff;
		line-height: 1.6;
		font-size: 0.9rem;
	}

	.read-more-btn {
		background: none;
		border: none;
		color: #4a90e2;
		cursor: pointer;
		padding: 0;
		margin-top: 0.5rem;
		font-size: 0.9rem;
	}

	.read-more-btn:hover {
		text-decoration: underline;
	}

	/* Responsive Styles */
	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		.search-section {
			padding: 1rem;
		}

		.filter-buttons {
			flex-wrap: wrap;
			justify-content: center;
		}

		.articles-grid {
			grid-template-columns: 1fr;
		}

		.modal-content {
			width: 100%;
			height: 100%;
			max-height: none;
			border-radius: 0;
		}

		.modal-header {
			border-radius: 0;
		}

		.detail-actions {
			flex-direction: column;
		}

		.detail-actions .btn {
			width: 100%;
			justify-content: center;
		}
	}
</style>
