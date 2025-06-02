<script lang="ts">
  import { onMount } from 'svelte';
  import Navbar from '../components/navbar.svelte';
  import Modalask from '../components/modalask.svelte';
  import type { PageData } from './$types';
  import { goto } from '$app/navigation';

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
      <h1 class="text-4xl md:text-5xl font-bold mb-2">คำพูดเซียบชวนมากดูปุ่ม</h1>
      <h2 class="text-4xl md:text-5xl font-bold mb-8">คำพูดเซียบชวนมากดูปุ่ม</h2>
      <button class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors">
        ปุ่มไปพิงค์ขันแนบ
      </button>
    </div>
  </section>

  <!-- Search Section -->
  <section class="px-6 py-8">
    <div class="max-w-md mx-auto relative">
      <!-- <form onsubmit={handleSearch}>
        <div class="relative">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="ค้นหา"
            bind:value={searchQuery}
            class="w-full pl-10 pr-4 py-3 bg-white text-gray-900 rounded-full border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </form> -->
    </div>
    
    <div class="flex justify-center space-x-8 mt-6">
      <a href="/top-rated" class="text-blue-400 hover:text-blue-300 text-sm">สถานที่ดูดาวที่ดีที่สุด</a>
      <a href="/family-friendly" class="text-blue-400 hover:text-blue-300 text-sm">สถานที่ดูดาวและน่าสำหรับครอบครัว</a>
    </div>
  </section>

  <!-- Cards Grid -->
  <section class="px-6 pb-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {#each cards as card}
        <div class="bg-gray-800 rounded-lg overflow-hidden">
          <div class="relative h-48 bg-gray-600">
            <img 
              src="/placeholder.svg?height=200&width=300" 
              alt="สถานที่ดูดาว"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">{card.title}</h3>
            <p class="text-gray-400 text-sm mb-4">{card.description}</p>
            <button class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              อ่านเพิ่มเติม
            </button>
          </div>
        </div>
      {/each}
    </div>
  </section>
</div>
<Modalask />