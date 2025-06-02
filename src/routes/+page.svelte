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
