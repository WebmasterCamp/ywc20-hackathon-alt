<script lang="ts">
  import { onMount } from 'svelte';
  import Navbar from '../components/navbar.svelte';
  import Modalask from '../components/modalask.svelte';
  import type { PageData } from './$types';
  import { goto } from '$app/navigation';
  import Footer from '../components/footer.svelte';

  let { data } = $props();

  interface Location {
    lat: number;
    lng: number;
    label: string;
    description?: string;
  }

  let map: L.Map | undefined;
  let locations: Location[] = [];

  onMount(async () => {
    const res = await fetch('http://localhost:5173/api/getalocation');
    const data = await res.json();

    locations = data.map((loc: { lat: number; long: number; title: string; }) => ({
      lat: loc.lat,
      lng: loc.long,
      label: loc.title === "Tokyo" ? "Tokyo Station" : loc.title
    }));

    const L = await import('leaflet');
    await import('leaflet/dist/leaflet.css');

    map = L.map('map').setView([35.6812, 139.7671], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    locations.forEach((loc: Location) => {
      if (map) {
        L.marker([loc.lat, loc.lng])
          .addTo(map)
          .bindPopup(loc.label)
          .on('click', () => {
            window.location.href = "https://example.com"; // Replace with your URL
          });
      }
    });
  });

  const cards = [
    {
      id: 1,
      title: 'ชื่อสถานที่',
      description: 'รายละเอียดของสถานที่นี้',
      hasSpecialBadge: true
    },
    {
      id: 2,
      title: 'ชื่อสถานที่',
      description: 'รายละเอียดของสถานที่นี้'
    },
    {
      id: 3,
      title: 'ชื่อสถานที่',
      description: 'รายละเอียดของสถานที่นี้'
    },
    {
      id: 4,
      title: 'ชื่อสถานที่',
      description: 'รายละเอียดของสถานที่นี้'
    },
    {
      id: 5,
      title: 'ชื่อสถานที่',
      description: 'รายละเอียดของสถานที่นี้'
    },
    {
      id: 6,
      title: 'ชื่อสถานที่',
      description: 'รายละเอียดของสถานที่นี้'
    }
  ];

  function handleRegister() {
    // Handle registration logic here
  }

  async function handleLogout() {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST'
      });
      
      if (res.ok) {
        // Redirect to login page after successful logout
        goto('/login');
      }
    } catch (e) {
      console.error('Logout failed:', e);
    }
  }

  // Type definitions
	interface Article {
		id: number;
		title: string;
		description: string;
		category: 'popular' | 'latest';
		image: string;
		date: string;
		content: string;
	}

	// State using Svelte 5 runes
	let activeFilter = $state<'latest' | 'popular'>('latest');
	let searchTerm = $state('');
	let showCreateModal = $state(false);
	let showDetailModal = $state(false);
	let selectedArticle = $state<Article | null>(null);
	
	// Form state
	let articleTitle = $state('');
	let articleContent = $state('');
	let articleCategory = $state<'popular' | 'latest' | ''>('');
	let previewImageSrc = $state('');
	let showImagePreview = $state(false);
	let uploadText = $state('คลิกเพื่อเลือกรูปภาพ หรือลากไฟล์มาวางที่นี่');
	let isDragOver = $state(false);
	let isFavorited = $state(false);

	// Article data
	let articles = $state<Article[]>([
		{
			id: 1,
			title: 'ชมดาวเมื่อหร่ดีที่สุด',
			description: 'คำแนะนำเกี่ยวกับช่วงเวลาที่เหมาะสมในการชมดาวและปรากฏการณ์ทางดาราศาสตร์ที่น่าสนใจ',
			category: 'popular',
			image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=400&auto=format&fit=crop',
			date: '15 มกราคม 2025',
			content: `การชมดาวที่ดีที่สุดขึ้นอยู่กับหลายปัจจัย ได้แก่ สภาพอากาศ ความสว่างของท้องฟ้า และเวลาที่เหมาะสม

**เวลาที่เหมาะสมในการชมดาว:**
- ช่วงเวลา 21:00 - 02:00 น. เป็นเวลาที่ท้องฟ้ามืดที่สุด
- หลีกเลี่ยงช่วงพระจันทร์เต็มดวง เพราะแสงจันทร์จะบดบังแสงดาว
- เลือกสถานที่ที่ห่างไกลจากแสงไฟเมือง

**ปรากฏการณ์ทางดาราศาสตร์ที่น่าสนใจ:**
- ฝนดาวตก: เกิดขึ้นเป็นช่วงๆ ตลอดปี
- การเรียงตัวของดาวเคราะห์
- จันทรุปราคาและสุริยุปราคา
- การปรากฏของดาวหาง

การเตรียมตัวที่ดีและการเลือกเวลาที่เหมาะสมจะทำให้คุณได้สัมผัสกับความงามของจักรวาลอย่างเต็มที่`
		},
		{
			id: 2,
			title: 'กาแล็กซี่ทางช้างเผือก',
			description: 'เรื่องราวน่าสนใจเกี่ยวกับกาแล็กซี่ทางช้างเผือกที่เราอาศัยอยู่ และความลับที่ซ่อนอยู่',
			category: 'popular',
			image: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=400&auto=format&fit=crop',
			date: '12 มกราคม 2025',
			content: `กาแล็กซี่ทางช้างเผือกเป็นบ้านของเราในจักรวาลอันกว้างใหญ่ มีเรื่องราวน่าสนใจมากมายที่ยังคงเป็นปริศนา

**ข้อมูลพื้นฐานเกี่ยวกับทางช้างเผือก:**
- เส้นผ่านศูนย์กลางประมาณ 100,000 ปีแสง
- มีดาวฤกษ์มากกว่า 100,000 ล้านดวง
- ระบบสุริยะของเราอยู่ห่างจากศูนย์กลางประมาณ 26,000 ปีแสง

**ความลับที่ซ่อนอยู่:**
- หลุมดำมวลยิ่งยวดที่ศูนย์กลาง
- สสารมืดที่ประกอบขึ้นเป็นส่วนใหญ่ของกาแล็กซี่
- การชนกันกับกาแล็กซี่แอนโดรเมดาในอนาคต

การศึกษาทางช้างเผือกช่วยให้เราเข้าใจถึงที่มาและวิวัฒนาการของจักรวาล รวมถึงความเป็นไปได้ของสิ่งมีชีวิตในดวงดาวอื่นๆ`
		},
		{
			id: 3,
			title: 'ดาวเคราะห์น้อยที่น่าสนใจ',
			description: 'ค้นพบดาวเคราะห์น้อยที่น่าสนใจในระบบสุริยะของเรา และความสำคัญทางวิทยาศาสตร์',
			category: 'popular',
			image: 'https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?q=80&w=400&auto=format&fit=crop',
			date: '10 มกราคม 2025',
			content: `ดาวเคราะห์น้อยเป็นซากเหลือจากการก่อตัวของระบบสุริยะ มีความหลากหลายและน่าสนใจมาก

**ดาวเคราะห์น้อยที่สำคัญ:**
- เซเรส (Ceres): ดาวเคราะห์น้อยที่ใหญ่ที่สุดในแถบดาวเคราะห์น้อย
- เวสตา (Vesta): มีพื้นผิวที่สว่างที่สุด
- พัลลาส (Pallas): มีวงโคจรที่เอียงมาก

**ความสำคัญทางวิทยาศาสตร์:**
- เป็นหลักฐานของการก่อตัวของระบบสุริยะ
- มีแร่ธาตุและน้ำแข็งที่มีค่า
- อาจเป็นแหล่งทรัพยากรในอนาคต

การศึกษาดาวเคราะห์น้อยช่วยให้เราเข้าใจประวัติศาสตร์ของระบบสุริยะและเตรียมพร้อมสำหรับการสำรวจอวกาศในอนาคต`
		},
		{
			id: 4,
			title: 'ดาวหางฮัลเลย์',
			description: 'ประวัติและข้อมูลน่าสนใจเกี่ยวกับดาวหางฮัลเลย์ที่โคจรกลับมาให้เราได้ชมทุก 76 ปี',
			category: 'popular',
			image: 'https://images.unsplash.com/photo-1614642535054-8d2aa8c40fa9?q=80&w=400&auto=format&fit=crop',
			date: '8 มกราคม 2025',
			content: `ดาวหางฮัลเลย์เป็นดาวหางที่มีชื่อเสียงที่สุด โคจรกลับมาให้เราได้ชมทุก 76 ปี

**ประวัติและการค้นพบ:**
- ค้นพบโดยเอ็ดมันด์ ฮัลเลย์ ในปี 1705
- มีบันทึกการสังเกตการณ์ย้อนหลังไปถึง 240 ปีก่อนคริสตกาล
- ปรากฏครั้งล่าสุดในปี 1986

**ลักษณะเฉพาะ:**
- มีแกนกลางขนาดประมาณ 15 กิโลเมตร
- ประกอบด้วยน้ำแข็ง ฝุ่น และก๊าซ
- เมื่อเข้าใกล้ดวงอาทิตย์จะเกิดหางที่สวยงาม

**การปรากฏครั้งต่อไป:**
- จะกลับมาปรากฏอีกครั้งในปี 2061
- จะสามารถมองเห็นได้ด้วยตาเปล่า
- เป็นโอกาสที่หายากในชีวิตคนเรา

ดาวหางฮัลเลย์เป็นสัญลักษณ์ของความมหัศจรรย์ของจักรวาลที่เชื่อมโยงอดีต ปัจจุบัน และอนาคต`
		},
		{
			id: 5,
			title: 'หลุมดำในจักรวาล',
			description: 'ความลึกลับของหลุมดำ วัตถุที่มีแรงโน้มถ่วงมหาศาลจนแสงไม่สามารถหลุดพ้นได้',
			category: 'latest',
			image: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=400&auto=format&fit=crop',
			date: '5 มกราคม 2025',
			content: 'เนื้อหาเพิ่มเติมจะอัปเดตในเร็วๆ นี้...'
		},
		{
			id: 6,
			title: 'ดาวเคราะห์นอกระบบสุริยะ',
			description: 'การค้นพบดาวเคราะห์นอกระบบสุริยะที่น่าสนใจและความเป็นไปได้ในการค้นพบสิ่งมีชีวิต',
			category: 'latest',
			image: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=400&auto=format&fit=crop',
			date: '3 มกราคม 2025',
			content: 'เนื้อหาเพิ่มเติมจะอัปเดตในเร็วๆ นี้...'
		},
		{
			id: 7,
			title: 'ปรากฏการณ์แสงเหนือ',
			description: 'ความมหัศจรรย์ของปรากฏการณ์แสงเหนือ สาเหตุการเกิด และสถานที่ที่ดีที่สุดในการชม',
			category: 'latest',
			image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=400&auto=format&fit=crop',
			date: '1 มกราคม 2025',
			content: 'เนื้อหาเพิ่มเติมจะอัปเดตในเร็วๆ นี้...'
		},
		{
			id: 8,
			title: 'ดาวเทียมและการสำรวจอวกาศ',
			description: 'ประวัติการสำรวจอวกาศและความก้าวหน้าของเทคโนโลยีดาวเทียมในปัจจุบัน',
			category: 'latest',
			image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=400&auto=format&fit=crop',
			date: '28 ธันวาคม 2024',
			content: 'เนื้อหาเพิ่มเติมจะอัปเดตในเร็วๆ นี้...'
		},
		{
			id: 9,
			title: 'กล้องดูดาวสำหรับมือใหม่',
			description: 'คำแนะนำในการเลือกซื้อกล้องดูดาวสำหรับผู้เริ่มต้น และเทคนิคการใช้งานเบื้องต้น',
			category: 'latest',
			image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=400&auto=format&fit=crop',
			date: '25 ธันวาคม 2024',
			content: 'เนื้อหาเพิ่มเติมจะอัปเดตในเร็วๆ นี้...'
		}
	]);

	// Derived state for filtered articles
	const filteredArticles = $derived.by(() => {
		let filtered = articles;

		// Apply search filter
		if (searchTerm.trim()) {
			filtered = filtered.filter(article => 
				article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				article.description.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			// Apply category filter only if no search term
			if (activeFilter === 'popular') {
				filtered = filtered.filter(article => article.category === 'popular');
			}
		}

		return filtered;
	});

	// File input reference
	let fileInput: HTMLInputElement;

	// Functions
	function setFilter(filter: 'latest' | 'popular') {
		activeFilter = filter;
	}

	function performSearch() {
		// Search is reactive through derived state
	}

	function openCreateModal() {
		showCreateModal = true;
	}

	function closeCreateModal() {
		showCreateModal = false;
		resetForm();
	}

	function resetForm() {
		articleTitle = '';
		articleContent = '';
		articleCategory = '';
		previewImageSrc = '';
		showImagePreview = false;
		uploadText = 'คลิกเพื่อเลือกรูปภาพ หรือลากไฟล์มาวางที่นี่';
	}

	function openImageUpload() {
		
	}

	function handleImageUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			handleImageFile(file);
		}
	}

	function handleImageFile(file: File) {
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
			const result = e.target?.result;
			if (typeof result === 'string') {
				previewImageSrc = result;
				showImagePreview = true;
			}
		};
		reader.readAsDataURL(file);
	}

	function removeImage() {
		previewImageSrc = '';
		showImagePreview = false;

		
		uploadText = 'รูปภาพถูกลบแล้ว - คลิกเพื่อเลือกรูปภาพใหม่';
		
		setTimeout(() => {
			uploadText = 'คลิกเพื่อเลือกรูปภาพ หรือลากไฟล์มาวางที่นี่';
		}, 2000);
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		isDragOver = true;
	}

	function handleDragLeave() {
		isDragOver = false;
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragOver = false;
		const files = event.dataTransfer?.files;
		if (files?.length) {
			handleImageFile(files[0]);
		}
	}

	function submitArticle(event: Event) {
		event.preventDefault();
		
		if (!articleTitle || !articleContent || !articleCategory) {
			alert('กรุณากรอกข้อมูลให้ครบถ้วน');
			return;
		}

		const newArticle: Article = {
			id: Date.now(),
			title: articleTitle,
			description: articleContent.length > 150 ? articleContent.substring(0, 150) + '...' : articleContent,
			content: articleContent,
			category: articleCategory as 'popular' | 'latest',
			image: previewImageSrc || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop',
			date: new Date().toLocaleDateString('th-TH', { 
				year: 'numeric', 
				month: 'long', 
				day: 'numeric' 
			})
		};

		articles = [newArticle, ...articles];
		closeCreateModal();
		alert('เผยแพร่บทความเรียบร้อยแล้ว!');
	}

	function showArticleDetail(article: Article) {
		selectedArticle = article;
		showDetailModal = true;
		isFavorited = false;
	}

	function closeDetailModal() {
		showDetailModal = false;
		selectedArticle = null;
	}

	function shareArticle() {
		if (!selectedArticle) return;
		
		if (navigator.share) {
			navigator.share({
				title: selectedArticle.title,
				text: 'อ่านบทความน่าสนใจเกี่ยวกับดาราศาสตร์',
				url: window.location.href
			});
		} else {
			navigator.clipboard.writeText(window.location.href);
			alert('คัดลอกลิงก์แล้ว!');
		}
	}

	function toggleFavorite() {
		isFavorited = !isFavorited;
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			performSearch();
		}
	}
</script>


<Navbar data={data} />

<div class="min-h-screen bg-gray-900 text-white">
  <!-- Hero Section -->
  <section class="relative h-96 flex items-center justify-center bg-cover bg-center" style="background-image: url('/placeholder.svg?height=400&width=800');">
    <img class="absolute inset-0 bg-black" src="back.png">
    <div class="relative text-center z-10">
      <h1 class="text-4xl md:text-5xl font-bold mb-2">ท้องฟ้าที่เต็มไปด้วยดาว</h1>
      <h2 class="text-4xl md:text-5xl font-bold mb-8">มันอยู่ไหนกันนะ?</h2>
      <button class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors">
        สถานที่ดูดาว
      </button>
    </div>
  </section>



<!-- Articles Section -->
<section class="articles-section">
	<div class="articles-grid">
		{#each filteredArticles as article (article.id)}
			<div class="article-card">
				<div class="article-image" style="background-image: url('{article.image}')"></div>
				<div class="article-content">
					<h3 class="article-title">{article.title}</h3>
					<p class="article-description">{article.description}</p>
					<button class="read-more" onclick={() => showArticleDetail(article)}>อ่านเพิ่ม</button>
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- Create Article Modal -->
{#if showCreateModal}
	<div class="modal active" onclick={(e) => e.target === e.currentTarget && closeCreateModal()} role="dialog" tabindex="-1">
		<div class="modal-content">
			<div class="modal-header">
				<h2 class="modal-title">เขียนบทความใหม่</h2>
				<button class="close-btn" onclick={closeCreateModal} aria-label="Close">
					<i class="fas fa-times"></i>
				</button>
			</div>
			<div class="modal-body">
				<form onsubmit={(event) => {event.preventDefault(); submitArticle(event)}}>
					<div class="form-group">
						<label class="form-label" for="articleTitle">หัวข้อบทความ</label>
						<input 
							type="text" 
							class="form-input" 
							placeholder="กรอกหัวข้อบทความ..."
							id="articleTitle"
							bind:value={articleTitle}
							required
						>
					</div>

					<div class="form-group">
						<label class="form-label" for="imageUpload">รูปภาพประกอบ</label>
						<div 
							class="image-upload-area {isDragOver ? 'dragover' : ''}"
							onclick={openImageUpload}
							onkeydown={openImageUpload}
							ondragover={handleDragOver}
							ondragleave={handleDragLeave}
							ondrop={handleDrop}
							role="button"
							tabindex="0"
							aria-label="Upload image"
						>
							<div class="upload-icon">
								<i class="fas fa-cloud-upload-alt"></i>
							</div>
							<div class="upload-text">{uploadText}</div>
							<div class="upload-text" style="font-size: 0.8rem; color: #888;">
								รองรับไฟล์: JPG, PNG, GIF (ขนาดไม่เกิน 5MB)
							</div>
						</div>
						<input 
							type="file"
							id="imageUpload"
							class="file-input" 
							accept="image/*"
							bind:this={fileInput}
							onchange={handleImageUpload}
						>
						{#if showImagePreview}
							<div class="image-preview active">
								<div class="image-preview-container">
									<img class="preview-image" src={previewImageSrc || "/placeholder.svg"} alt="Preview">
									<button type="button" class="remove-image-btn" onclick={removeImage} aria-label="Remove image">
										<i class="fas fa-times"></i>
									</button>
								</div>
							</div>
						{/if}
					</div>

					<div class="form-group">
						<label class="form-label" for="articleContent">เนื้อหาบทความ</label>
						<textarea 
							class="form-input form-textarea"
							id="articleContent"
							placeholder="เขียนเนื้อหาบทความของคุณที่นี่..." 
							bind:value={articleContent}
							required
						></textarea>
					</div>

					<div class="form-group">
						<label class="form-label" for="articleCategory">หมวดหมู่</label>
						<select class="form-input" id="articleCategory" bind:value={articleCategory} required>
							<option value="">เลือกหมวดหมู่</option>
							<option value="popular">ยอดนิยม</option>
							<option value="latest">ล่าสุด</option>
						</select>
					</div>

					<div class="form-buttons">
						<button type="button" class="btn btn-secondary" onclick={closeCreateModal}>ยกเลิก</button>
						<button type="submit" class="btn btn-primary">เผยแพร่บทความ</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}

<!-- Article Detail Modal -->
{#if showDetailModal && selectedArticle}
	<div class="modal active" onclick={(e) => e.target === e.currentTarget && closeDetailModal()} role="dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h2 class="modal-title">รายละเอียดบทความ</h2>
				<button class="close-btn" onclick={closeDetailModal} aria-label="Close">
					<i class="fas fa-times"></i>
				</button>
			</div>
			<div class="modal-body">
				<div class="article-detail">
					<div class="detail-image-container">
						<img class="detail-image" src={selectedArticle.image || "/placeholder.svg"} alt="Article Image">
					</div>
					<div class="detail-content">
						<h3 class="detail-title">{selectedArticle.title}</h3>
						<div class="detail-meta">
							<span class="detail-category">{selectedArticle.category === 'popular' ? 'ยอดนิยม' : 'ล่าสุด'}</span>
							<span class="detail-date">{selectedArticle.date}</span>
						</div>
						<div class="detail-description">
							{@html selectedArticle.content.replace(/\n/g, '<br>')}
						</div>
						<div class="detail-actions">
							<button class="btn btn-primary" onclick={shareArticle}>
								<i class="fas fa-share"></i>
								แชร์บทความ
							</button>
							<button class="btn btn-secondary" onclick={toggleFavorite}>
								<i class="fas fa-heart {isFavorited ? '' : 'far'}"></i>
								{isFavorited ? 'บันทึกแล้ว' : 'บันทึก'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
</div>
<Modalask />
<Footer />

<style>

*{
  font-family: 'Noto Sans Thai', sans-serif;
}
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
		background-color: white;
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
		margin-top: 4rem;
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
		background-color: #4a90e2;
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