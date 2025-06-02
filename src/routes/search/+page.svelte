<script lang="ts">
  import { onMount } from 'svelte';
  import { writable, derived } from 'svelte/store';
  export let data;
  import Navbar from '../../components/navbar.svelte';
  import Footer from '../../components/footer.svelte';
  // Types
  interface MarkerPosition {
    x: number;
    y: number;
  }

  interface Booking {
    name: string;
    price: number;
    organizer: string;
    fee: number;
    total: number;
  }

  interface Marker {
    id: number;
    name: string;
    type: string;
    description: string;
    position: MarkerPosition;
    images: string[];
  }

  type ProvinceKey = 'bangkok' | 'chiangmai' | 'phuket' | 'chonburi' | 'krabi' | 'loei' | 'nakhonratchasima';

  // Stores
  const isAddingPoint = writable(false);
  const pointCount = writable(0);
  const selectedImages = writable<string[]>([]);
  const currentGalleryIndex = writable(0);
  const galleryImages = writable<string[]>([]);
  const likeCount = writable(100);
  const isLiked = writable(false);
  const markers = writable<Marker[]>([]);
  const currentBooking = writable<Booking>({
    name: '',
    price: 0,
    organizer: '',
    fee: 50,
    total: 0
  });

  // Modal states
  let showAddPointModal = false;
  let showPaymentModal = false;
  let showDetailModal = false;
  let showSearchResultsModal = false;

  // Form data
  let tempMarkerPosition: MarkerPosition | null = null;
  let pointName = '';
  let pointType = '';
  let pointDescription = '';
  let detailTitle = '';
  let detailDescription = '';

  // Search form data
  let selectedProvince: ProvinceKey | '' = '';
  let startDate = '2025-06-01';
  let endDate = '2025-06-02';

  // Payment form data
  let firstName = '';
  let lastName = '';
  let email = '';
  let phone = '';
  let paymentMethod = '';
  let cardNumber = '';
  let expiry = '';
  let cvv = '';
  let cardName = '';
  let showCreditCardSection = false;

  // Search results data
  let searchProvince = 'ทุกจังหวัด';
  let searchDateRange = '1-6-2568 ถึง 2-6-2568';
  let foundActivities = '3 กิจกรรม';

  // Gallery data
  let galleryMainImage = '/placeholder.svg?height=250&width=400';

  // DOM references
  let mapWrapper: HTMLElement;
  let imageInput: HTMLInputElement;
  let cardsContainer: HTMLElement;

  // Province mapping
  const provinceNames: Record<ProvinceKey, string> = {
    'bangkok': 'กรุงเทพมหานคร',
    'chiangmai': 'เชียงใหม่',
    'phuket': 'ภูเก็ต',
    'chonburi': 'ชลบุรี',
    'krabi': 'กระบี่',
    'loei': 'เลย',
    'nakhonratchasima': 'นครราชสีมา'
  };

  // Functions
  function performSearch() {
    const provinceName = selectedProvince ? provinceNames[selectedProvince as ProvinceKey] : 'ทุกจังหวัด';
    const startDateThai = formatDateToThai(startDate);
    const endDateThai = formatDateToThai(endDate);

    searchProvince = provinceName;
    searchDateRange = `${startDateThai} ถึง ${endDateThai}`;
    foundActivities = '3 กิจกรรม';

    showSearchResultsModal = true;
  }

  function formatDateToThai(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() + 543;
    return `${day}-${month}-${year}`;
  }

  function toggleAddPointMode() {
    isAddingPoint.update(val => !val);
    if (mapWrapper) {
      mapWrapper.style.cursor = $isAddingPoint ? 'crosshair' : 'default';
    }
  }

  function handleMapClick(e: MouseEvent) {
    if (!$isAddingPoint) return;

    const rect = mapWrapper.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    tempMarkerPosition = { x, y };
    showAddPointModal = true;
    isAddingPoint.set(false);
  }

  function openPaymentModal(activityName: string, price: number, organizer: string) {
    currentBooking.set({
      name: activityName,
      price: price,
      organizer: organizer,
      fee: 50,
      total: price + 50
    });

    // Reset form
    firstName = '';
    lastName = '';
    email = '';
    phone = '';
    paymentMethod = '';
    showCreditCardSection = false;

    showSearchResultsModal = false;
    showPaymentModal = true;
  }

  function handlePayment(e: Event) {
    e.preventDefault();

    const paymentData = {
      firstName,
      lastName,
      email,
      phone,
      paymentMethod,
      booking: $currentBooking
    };

    // Validation
    if (!firstName || !lastName || !email || !phone || !paymentMethod) {
      showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('กรุณากรอกอีเมลให้ถูกต้อง', 'error');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = phone.replace(/[-\s]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      showNotification('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)', 'error');
      return;
    }

    // Simulate payment processing
    setTimeout(() => {
      showPaymentModal = false;
      showNotification(`จองสำเร็จ! ${$currentBooking.name} ยอดชำระ ${$currentBooking.total.toLocaleString()} บาท`, 'success');
      console.log('Payment Data:', paymentData);
    }, 2000);
  }

  function handleAddPoint(e: Event) {
    e.preventDefault();

    if (!tempMarkerPosition) return;

    // Create new marker
    const marker: Marker = {
      id: Date.now(),
      name: pointName,
      type: pointType,
      description: pointDescription,
      position: tempMarkerPosition,
      images: $selectedImages
    };

    // Add to map and create card
    markers.update(m => [...m, marker]);
    pointCount.update(n => n + 1);

    // Reset form
    pointName = '';
    pointType = '';
    pointDescription = '';
    selectedImages.set([]);
    tempMarkerPosition = null;
    showAddPointModal = false;

    showNotification(`เพิ่มจุดใหม่เรียบร้อยแล้ว! (${marker.images.length} รูปภาพ)`, 'success');
  }

  function createObservatoryCard(marker: Marker) {
    // This would create a new card in the cards container
    // In a real Svelte app, this would be handled by reactive statements
    console.log('Creating observatory card:', marker);
  }

  function showDetailModalFunc(name: string, description: string, images: string[]) {
    detailTitle = name;
    detailDescription = description || 'เป็นจุดชมดาวในเขตอุทยานแห่งชาติ คมใสเอาะ';
    
    galleryImages.set(images && images.length > 0 ? images : ['/placeholder.svg?height=250&width=400']);
    currentGalleryIndex.set(0);
    
    showDetailModal = true;
  }

  function changeGalleryImage(direction: number) {
    currentGalleryIndex.update(index => {
      const newIndex = index + direction;
      const maxIndex = $galleryImages.length - 1;
      
      if (newIndex < 0) return maxIndex;
      if (newIndex > maxIndex) return 0;
      return newIndex;
    });
  }

  function toggleLike() {
    isLiked.update(val => !val);
    likeCount.update(count => $isLiked ? count + 1 : count - 1);
  }

  function handleImageSelect(e: Event) {
    const target = e.target as HTMLInputElement;
    if (!target.files) return;

    const files = Array.from(target.files);
    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        showNotification(`${file.name} ไม่ใช่ไฟล์รูปภาพ`, 'error');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showNotification(`${file.name} มีขนาดเกิน 5MB`, 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result;
        if (result && typeof result === 'string') {
          selectedImages.update(images => [...images, result]);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  function removeImageAtIndex(index: number) {
    selectedImages.update(images => images.filter((_, i) => i !== index));
  }

  function showNotification(message: string, type: 'success' | 'error' = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'error' ? '#ff4444' : '#4A90E2';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: ${bgColor};
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      z-index: 1004;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      max-width: 300px;
      word-wrap: break-word;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 4000);
  }

  // Reactive statements
  const galleryMainImageDerived = derived([galleryImages, currentGalleryIndex], ([$galleryImages, $currentGalleryIndex]) => {
    return $galleryImages[$currentGalleryIndex] || '/placeholder.svg?height=250&width=400';
  });
  $: galleryMainImage = $galleryMainImageDerived;

  // Convert paymentMethod to a store
  const paymentMethodStore = writable(paymentMethod);
  $: paymentMethodStore.set(paymentMethod);

  const showCreditCardSectionDerived = derived(paymentMethodStore, ($paymentMethod) => {
    return $paymentMethod === 'credit';
  });
  $: showCreditCardSection = $showCreditCardSectionDerived;

  onMount(() => {
    // Initialize any DOM-dependent functionality
  });
</script>

<svelte:head>
  <title>ยื่อฟังก์ชัน - จองสถานที่</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" rel="stylesheet">
</svelte:head>

<!-- Header -->
<Navbar data={data} />

<!-- Hero Section -->
<section class="hero">
  <h1>ค้นหาสถานที่ดูดาว</h1>
  <p>คำอธิบาย</p>

  <!-- Search Form -->
  <div class="search-form">
    <div class="form-row">
      <div class="form-group">
        <select bind:value={selectedProvince}>
          <option value="">จังหวัด</option>
          <option value="bangkok">กรุงเทพมหานคร</option>
          <option value="chiangmai">เชียงใหม่</option>
          <option value="phuket">ภูเก็ต</option>
          <option value="chonburi">ชลบุรี</option>
          <option value="krabi">กระบี่</option>
          <option value="loei">เลย</option>
          <option value="nakhonratchasima">นครราชสีมา</option>
        </select>
      </div>
      <div class="form-group">
        <input type="date" bind:value={startDate}>
      </div>
      <span>-</span>
      <div class="form-group">
        <input type="date" bind:value={endDate}>
      </div>
    </div>
    <button class="search-btn" onclick={performSearch}>ค้นหา</button>
  </div>
</section>

<!-- Search Results Modal -->
{#if showSearchResultsModal}
  <div class="search-results-modal">
    <div class="search-results-content">
      <div class="search-results-header">
        <span class="search-results-close" onclick={() => showSearchResultsModal = false}>&times;</span>
        <h2 class="search-results-title">ผลการค้นหา</h2>
        <p class="search-results-subtitle">กิจกรรมแนะนำสำหรับคุณ</p>
      </div>

      <div class="search-results-body">
        <div class="search-criteria">
          <div class="criteria-item">
            <span class="criteria-label">จังหวัด:</span>
            <span class="criteria-value">{searchProvince}</span>
          </div>
          <div class="criteria-item">
            <span class="criteria-label">วันที่:</span>
            <span class="criteria-value">{searchDateRange}</span>
          </div>
          <div class="criteria-item">
            <span class="criteria-label">กิจกรรมที่พบ:</span>
            <span class="criteria-value">{foundActivities}</span>
          </div>
        </div>

        <div class="recommended-activities">
          <div class="section-header">🌟 กิจกรรมแนะนำ</div>

          <div class="activity-recommendation">
            <div class="recommendation-image">
              <img src="https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2023/11/%E0%B8%94%E0%B8%AD%E0%B8%A2%E0%B8%AD%E0%B8%B4%E0%B8%99%E0%B8%97%E0%B8%99%E0%B8%99%E0%B8%97%E0%B9%8C-FI.jpg" alt="ดอยอินทนนท์">
            </div>
            <div class="recommendation-info">
              <div class="recommendation-title">การดูดาว - ดอยอินทนนท์</div>
              <div class="recommendation-details">
                ผู้จัด: Starlover • เชียงใหม่<br>
                วันที่: 1-2 มิ.ย. 2568 • จำนวนที่เหลือ: 25 ท่าน
              </div>
              <div class="recommendation-price">1,299 บาท/ท่าน</div>
            </div>
            <button class="recommendation-btn" onclick={() => openPaymentModal('การดูดาว - ดอยอินทนนท์', 1299, 'Starlover')}>จองเลย</button>
          </div>

          <div class="activity-recommendation">
            <div class="recommendation-image">
              <img src="https://www.nstda.or.th/sci2pub/wp-content/uploads/2023/05/stagazer-app-image.jpg" alt="ดูดาวเลย">
            </div>
            <div class="recommendation-info">
              <div class="recommendation-title">กิจกรรมดูดาว (จังหวัดเลย)</div>
              <div class="recommendation-details">
                ผู้จัด: Skycamp • เลย<br>
                วันที่: 1-2 มิ.ย. 2568 • จำนวนที่เหลือ: 15 ท่าน
              </div>
              <div class="recommendation-price">899 บาท/ท่าน</div>
            </div>
            <button class="recommendation-btn" onclick={() => openPaymentModal('กิจกรรมดูดาว (จังหวัดเลย)', 899, 'Skycamp')}>จองเลย</button>
          </div>

          <div class="activity-recommendation">
            <div class="recommendation-image">
              <img src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop" alt="ดูดาวภูเก็ต">
            </div>
            <div class="recommendation-info">
              <div class="recommendation-title">ดูดาวริมทะเล - ภูเก็ต</div>
              <div class="recommendation-details">
                ผู้จัด: SeaStar Tours • ภูเก็ต<br>
                วันที่: 1-2 มิ.ย. 2568 • จำนวนที่เหลือ: 20 ท่าน
              </div>
              <div class="recommendation-price">1,599 บาท/ท่าน</div>
            </div>
            <button class="recommendation-btn" onclick={() => openPaymentModal('ดูดาวริมทะเล - ภูเก็ต', 1599, 'SeaStar Tours')}>จองเลย</button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Content -->
<main class="content">
  <h2 class="section-title">ผลลัพธ์เหตุการณ์จากวันที่ 20 – 22 ธันวาคม 2568</h2>

  <div class="event-card">
    <div class="event-header">
      <div>
        <h3 class="event-title">ฟันตาวดคาอมินิสต์</h3>
        <div class="event-date">📅 20 ธันวาคม 2568</div>
        <div class="event-location">รายละเอียดในหตุการณ์นี้</div>
      </div>
      <span class="status-badge status-available">สถานะที่นั่งเหลือเพียงพอดูงาน</span>
    </div>
  </div>

  <div class="activity-section">
    <h3 class="section-title">กิจกรรมพิเศษในวันนี้</h3>

    <div class="activity-item">
      <div class="activity-image">
        <img src="https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2023/11/%E0%B8%94%E0%B8%AD%E0%B8%A2%E0%B8%AD%E0%B8%B4%E0%B8%99%E0%B8%97%E0%B8%99%E0%B8%99%E0%B8%97%E0%B9%8C-FI.jpg" alt="ดอยอินทนนท์">
      </div>
      <div class="activity-info">
        <h4 class="activity-title">การดูหนัง-ดอยอินทนนท์</h4>
        <div class="activity-details">
          ผู้จัด Starlover<br>
          ราคา 1,299 บาท จำนวนที่เหลือ:30
        </div>
      </div>
      <button class="activity-btn" onclick={() => openPaymentModal('การดูหนัง-ดอยอินทนนท์', 1299, 'Starlover')}>จองเลย</button>
    </div>

    <div class="activity-item">
      <div class="activity-image">
        <img src="https://www.nstda.or.th/sci2pub/wp-content/uploads/2023/05/stagazer-app-image.jpg" alt="ดูดาวเลย">
      </div>
      <div class="activity-info">
        <h4 class="activity-title">กิจกรรมดูดาว (จังหวัดเลย)</h4>
        <div class="activity-details">
          ผู้จัด Skycamp<br>
          ราคา 899 บาท จำนวนที่เหลือ:15
        </div>
      </div>
      <button class="activity-btn" onclick={() => openPaymentModal('กิจกรรมดูดาว (จังหวัดเลย)', 899, 'Skycamp')}>จองเลย</button>
    </div>
  </div>

  <div class="event-card">
    <div class="event-header">
      <div>
        <h3 class="event-title">พระจันทร์เต็มดวง</h3>
        <div class="event-date">📅 21 ธันวาคม 2568</div>
        <div class="event-location">รายละเอียดในหตุการณ์นี้</div>
      </div>
      <span class="status-badge status-full">สถานะที่นั่งเต็มแล้วดูงาน</span>
    </div>
  </div>
</main>

<div class="container">
  <h1 class="title">จุดดาราศาสตร์แห่ง ({$pointCount} แห่ง)</h1>

  <!-- Map Container -->
  <div class="map-container">
    <div class="map-wrapper" bind:this={mapWrapper} onclick={handleMapClick}>
      <img src="thai.png" alt="Thailand Map" class="thailand-map-img" />
      {#each $markers as marker}
        <div 
          class="map-marker marker-{marker.type}" 
          style="left: {marker.position.x}%; top: {marker.position.y}%;"
          onclick={() => showDetailModalFunc(marker.name, marker.description, marker.images)}
        >
          <div class="marker-dot"></div>
          <div class="marker-label">{marker.name}</div>
        </div>
      {/each}
    </div>

    <div class="legend">
      <div class="legend-item">
        <div class="legend-dot" style="background-color: #4A90E2;"></div>
        <span>จุดสังเกตการณ์ (น้ำเงิน)</span>
      </div>
      <div class="legend-item">
        <div class="legend-dot" style="background-color: #ff4444;"></div>
        <span>จุดสำคัญ (แดง)</span>
      </div>
      <div class="legend-item">
        <div class="legend-dot" style="background-color: #ffaa00;"></div>
        <span>จุดสำคัญพิเศษ (เหลือง)</span>
      </div>
      <div class="legend-item">
        <div class="legend-dot" style="background-color: #44ff44;"></div>
        <span>จุดใหม่ (เขียว)</span>
      </div>
    </div>

    <button class="add-point-btn" class:active={$isAddingPoint} onclick={toggleAddPointMode}>
      {$isAddingPoint ? 'คลิกบนแผนที่เพื่อเพิ่มจุด' : '+ เพิ่มจุดใหม่'}
    </button>
  </div>

  <!-- Cards Container -->
  <div class="cards-container" bind:this={cardsContainer}>
    <!-- Cards will be added dynamically -->
  </div>
</div>

<!-- Add Point Modal -->
{#if showAddPointModal}
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">เพิ่มจุดดาราศาสตร์ใหม่</h2>
        <span class="close" onclick={() => showAddPointModal = false}>&times;</span>
      </div>
      <form onsubmit={handleAddPoint}>
        <div class="form-group">
          <label class="form-label">ชื่อสถานที่:</label>
          <input type="text" class="form-input" bind:value={pointName} required>
        </div>
        <div class="form-group">
          <label class="form-label">ประเภท:</label>
          <select class="form-select" bind:value={pointType} required>
            <option value="">เลือกประเภท</option>
            <option value="blue">จุดสังเกตการณ์ (สีน้ำเงิน)</option>
            <option value="red">จุดสำคัญ (สีแดง)</option>
            <option value="yellow">จุดสำคัญพิเศษ (สีเหลือง)</option>
            <option value="green">จุดใหม่ (สีเขียว)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">รูปภาพ:</label>
          <div class="image-upload-container" onclick={() => imageInput.click()}>
            <div class="upload-icon">📷</div>
            <div class="upload-text">คลิกเพื่อเลือกรูปภาพหลายรูป หรือลากไฟล์มาวางที่นี่</div>
            <div class="upload-text" style="font-size: 12px; color: #888;">รองรับไฟล์: JPG, PNG, GIF (ขนาดไม่เกิน 5MB ต่อรูป)</div>
            <input type="file" class="file-input" bind:this={imageInput} accept="image/*" multiple onchange={handleImageSelect}>
          </div>
          {#if $selectedImages.length > 0}
            <div class="images-preview-container">
              <div class="image-count">รูปภาพที่เลือก: {$selectedImages.length} รูป</div>
              <div class="images-preview-grid">
                {#each $selectedImages as image, index}
                  <div class="image-preview-item">
                    <img src={image || "/placeholder.svg"} class="image-preview" alt="Preview {index + 1}">
                    <button type="button" class="remove-image" onclick={() => removeImageAtIndex(index)}>×</button>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
        <div class="form-group">
          <label class="form-label">รายละเอียด:</label>
          <textarea class="form-textarea" bind:value={pointDescription} placeholder="ใส่รายละเอียดเพิ่มเติม..."></textarea>
        </div>
        <div class="form-buttons">
          <button type="button" class="btn btn-secondary" onclick={() => showAddPointModal = false}>ยกเลิก</button>
          <button type="submit" class="btn btn-primary">เพิ่มจุด</button>
        </div>
      </form>
    </div>
  </div>
{/if}

<!-- Payment Modal -->
{#if showPaymentModal}
  <div class="payment-modal">
    <div class="payment-modal-content">
      <div class="payment-header">
        <span class="payment-close" onclick={() => showPaymentModal = false}>&times;</span>
        <h2 class="payment-title">ชำระเงิน</h2>
        <p class="payment-subtitle">กรุณากรอกข้อมูลเพื่อดำเนินการจอง</p>
      </div>

      <div class="payment-body">
        <div class="booking-summary">
          <div class="booking-item">
            <div>
              <div class="booking-name">{$currentBooking.name}</div>
              <div class="booking-details">ผู้จัด: {$currentBooking.organizer} • 1 ท่าน</div>
            </div>
            <div class="booking-price">{$currentBooking.price?.toLocaleString()} บาท</div>
          </div>
          <div class="booking-item">
            <div class="booking-name">ค่าธรรมเนียม</div>
            <div class="booking-price">50 บาท</div>
          </div>
          <div class="booking-item">
            <div class="booking-name">ยอดรวมทั้งสิ้น</div>
            <div class="booking-price">{$currentBooking.total?.toLocaleString()} บาท</div>
          </div>
        </div>

        <form class="payment-form" onsubmit={handlePayment}>
          <div class="payment-section">
            <div class="section-header">📋 ข้อมูลผู้จอง</div>
            <div class="input-row">
              <div class="input-group">
                <label class="input-label">ชื่อ</label>
                <input type="text" class="input-field" bind:value={firstName} required placeholder="ชื่อ">
              </div>
              <div class="input-group">
                <label class="input-label">นามสกุล</label>
                <input type="text" class="input-field" bind:value={lastName} required placeholder="นามสกุล">
              </div>
            </div>
            <div class="input-group">
              <label class="input-label">อีเมล</label>
              <input type="email" class="input-field" bind:value={email} required placeholder="example@email.com">
            </div>
            <div class="input-group">
              <label class="input-label">เบอร์โทรศัพท์</label>
              <input type="tel" class="input-field" bind:value={phone} required placeholder="08X-XXX-XXXX">
            </div>
          </div>

          <div class="payment-section">
            <div class="section-header">💳 วิธีการชำระเงิน</div>
            <div class="payment-methods">
              <label class="payment-method" class:selected={paymentMethod === 'credit'}>
                <input type="radio" bind:group={paymentMethod} value="credit" required>
                <span class="payment-icon">💳</span>
                <span class="payment-name">บัตรเครดิต</span>
              </label>
              <label class="payment-method" class:selected={paymentMethod === 'promptpay'}>
                <input type="radio" bind:group={paymentMethod} value="promptpay" required>
                <span class="payment-icon">📱</span>
                <span class="payment-name">พร้อมเพย์</span>
              </label>
              <label class="payment-method" class:selected={paymentMethod === 'banking'}>
                <input type="radio" bind:group={paymentMethod} value="banking" required>
                <span class="payment-icon">🏦</span>
                <span class="payment-name">โอนธนาคาร</span>
              </label>
              <label class="payment-method" class:selected={paymentMethod === 'wallet'}>
                <input type="radio" bind:group={paymentMethod} value="wallet" required>
                <span class="payment-icon">👛</span>
                <span class="payment-name">กระเป๋าเงิน</span>
              </label>
            </div>
          </div>

          {#if showCreditCardSection}
            <div class="payment-section">
              <div class="section-header">💳 ข้อมูลบัตรเครดิต</div>
              <div class="input-group">
                <label class="input-label">หมายเลขบัตร</label>
                <input type="text" class="input-field" bind:value={cardNumber} placeholder="1234 5678 9012 3456" maxlength="19">
              </div>
              <div class="input-row">
                <div class="input-group">
                  <label class="input-label">วันหมดอายุ</label>
                  <input type="text" class="input-field" bind:value={expiry} placeholder="MM/YY" maxlength="5">
                </div>
                <div class="input-group">
                  <label class="input-label">CVV</label>
                  <input type="text" class="input-field" bind:value={cvv} placeholder="123" maxlength="3">
                </div>
              </div>
              <div class="input-group">
                <label class="input-label">ชื่อบนบัตร</label>
                <input type="text" class="input-field" bind:value={cardName} placeholder="ชื่อตามบัตร">
              </div>
            </div>
          {/if}

          <div class="security-info">
            🔒 ข้อมูลของคุณได้รับการปกป้องด้วยระบบความปลอดภัยระดับสูง SSL 256-bit
          </div>

          <div class="payment-buttons">
            <button type="button" class="payment-btn btn-cancel" onclick={() => showPaymentModal = false}>ยกเลิก</button>
            <button type="submit" class="payment-btn btn-pay">ชำระเงิน {$currentBooking.total?.toLocaleString()} บาท</button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}

<!-- Detail Modal -->
{#if showDetailModal}
  <div class="detail-modal">
    <div class="detail-modal-content">
      <span class="detail-close" onclick={() => showDetailModal = false}>&times;</span>
      <div class="detail-modal-header">
        <h2 class="detail-modal-title">{detailTitle}</h2>
      </div>

      <div class="image-gallery">
        <img src={galleryMainImage || "/placeholder.svg"} class="gallery-main-image" alt="Observatory">
        <button class="gallery-nav gallery-prev" onclick={() => changeGalleryImage(-1)}>‹</button>
        <button class="gallery-nav gallery-next" onclick={() => changeGalleryImage(1)}>›</button>
        <div class="gallery-indicators">
          {#each $galleryImages as _, index}
            <div class="gallery-dot" class:active={index === $currentGalleryIndex} onclick={() => currentGalleryIndex.set(index)}></div>
          {/each}
        </div>
      </div>

      <div class="detail-info">
        <div class="user-info">
          <div class="user-avatar">ส</div>
          <div class="user-details">
            <div class="user-name">สมชาย</div>
            <div class="user-rating">
              <div class="stars">
                <span class="star">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
              </div>
              <span class="rating-date">12 ม.ค. 2025</span>
            </div>
          </div>
          <button class="like-button" class:liked={$isLiked} onclick={toggleLike}>
            <span>❤️</span>
            <span>{$likeCount}</span>
          </button>
        </div>
        <div class="description">{detailDescription}</div>
      </div>
    </div>
  </div>
{/if}
<div class="mt-5">
<Footer />
</div>
<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

  :global(*) {
 
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }

  :global(body) {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #1a1a1a;
    color: white;

  }

  /* Header */
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
    text-align: center;
    padding: 2rem 1rem;
    background-image: url(img/sn.png);
    background-size: cover;
    background-position: center;
  }

  .hero h1 {
    font-size: clamp(1.8rem, 5vw, 2.5rem);
    margin-bottom: 0.5rem;
    font-weight: 300;
  }

  .hero p {
    color: #888;
    font-size: clamp(0.9rem, 3vw, 1rem);
    margin-bottom: 2rem;
  }

  /* Search Form */
  .search-form {
    background-color: white;
    border-radius: 12px;
    padding: 1.5rem;
    max-width: 600px;
    margin: 0 auto 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .form-row {
    display: flex;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .form-group {
    flex: 1;
    position: relative;
    min-width: 120px;
  }

  .form-group select,
  .form-group input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.9rem;
    color: #333;
    background-color: #f8f9fa;
  }

  .search-btn {
    background-color: #4a90e2;
    color: white;
    padding: 0.8rem 2rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s;
  }

  .search-btn:hover {
    background-color: #357abd;
  }

  /* Search Results Modal */
  .search-results-modal {
    position: fixed;
    z-index: 1003;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search-results-content {
    background-color: #1a1a1a;
    border-radius: 16px;
    width: 95%;
    max-width: 600px;
    border: 1px solid #333;
    overflow: hidden;
    position: relative;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
    max-height: 95vh;
    overflow-y: auto;
  }

  .search-results-header {
    background: linear-gradient(135deg, #4a90e2, #357abd);
    padding: 1.5rem;
    text-align: center;
    position: relative;
  }

  .search-results-title {
    font-size: clamp(1.2rem, 4vw, 1.5rem);
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
  }

  .search-results-subtitle {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
  }

  .search-results-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: white;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    z-index: 10;
    transition: color 0.3s;
    padding: 0.2rem;
  }

  .search-results-close:hover {
    color: #ffdd00;
  }

  .search-results-body {
    padding: 1.5rem;
  }

  .search-criteria {
    background-color: #2d2d2d;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-left: 4px solid #4a90e2;
  }

  .criteria-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .criteria-item:last-child {
    margin-bottom: 0;
  }

  .criteria-label {
    color: #ccc;
  }

  .criteria-value {
    color: #4a90e2;
    font-weight: 600;
  }

  .recommended-activities {
    margin-top: 1rem;
  }

  .section-header {
    font-size: 1.1rem;
    font-weight: 600;
    color: #4a90e2;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #4a90e2;
    text-align: center;
  }

  .activity-recommendation {
    background-color: #2d2d2d;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: transform 0.3s ease;
    border: 1px solid #3a3a3a;
  }

  .activity-recommendation:hover {
    transform: translateY(-2px);
    border-color: #4a90e2;
  }

  .recommendation-image {
    width: 80px;
    height: 60px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .recommendation-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .recommendation-info {
    flex: 1;
    min-width: 0;
  }

  .recommendation-title {
    color: #4a90e2;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
  }

  .recommendation-details {
    color: #ccc;
    font-size: 0.85rem;
    line-height: 1.4;
    margin-bottom: 0.5rem;
  }

  .recommendation-price {
    color: #28a745;
    font-weight: bold;
    font-size: 0.9rem;
  }

  .recommendation-btn {
    background-color: #4a90e2;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background-color 0.3s;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .recommendation-btn:hover {
    background-color: #357abd;
  }

  /* Content */
  .content {
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-size: clamp(1.2rem, 4vw, 1.5rem);
    margin-bottom: 1.5rem;
    color: white;
    text-align: center;
  }

  /* Event Cards */
  .event-card {
    background-color: #2d2d2d;
    border-radius: 12px;
    padding: 1.2rem;
    margin-bottom: 1.2rem;
    position: relative;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .event-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .event-title {
    color: #4a90e2;
    font-size: clamp(1rem, 3vw, 1.1rem);
    margin-bottom: 0.5rem;
  }

  .event-date {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #ccc;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .event-location {
    color: #888;
    font-size: 0.9rem;
  }

  .status-badge {
    padding: 0.4rem 0.8rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
    white-space: nowrap;
  }

  .status-available {
    background-color: #28a745;
    color: white;
  }

  .status-full {
    background-color: #dc3545;
    color: white;
  }

  /* Activity Section */
  .activity-section {
    margin-top: 2rem;
  }

  .activity-item {
    background-color: #2d2d2d;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .activity-image img {
    width: 100%;
    max-width: 150px;
    height: auto;
    border-radius: 10px;
    object-fit: cover;
    display: block;
  }

  .activity-info {
    flex: 1;
    min-width: 200px;
  }

  .activity-title {
    color: #4a90e2;
    font-size: clamp(0.9rem, 3vw, 1rem);
    margin-bottom: 0.25rem;
  }

  .activity-details {
    color: #ccc;
    font-size: 0.85rem;
    line-height: 1.4;
  }

  .activity-btn {
    background-color: #4a90e2;
    color: white;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s;
    white-space: nowrap;
  }

  .activity-btn:hover {
    background-color: #357abd;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .title {
    font-size: clamp(1.5rem, 5vw, 2rem);
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: white;
    text-align: center;
  }

  /* Map Container */
  .map-container {
    background-color: #2a2a2a;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 2rem;
    position: relative;
    border: 1px solid #3a3a3a;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .map-wrapper {
    position: relative;
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
    overflow: hidden;
    border-radius: 8px;
  }

  .thailand-map-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }

  .legend {
    position: absolute;
    bottom: 10px;
    left: 10px;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 0.8rem;
    border-radius: 8px;
    backdrop-filter: blur(10px);
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    font-size: 12px;
  }

  .legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .add-point-btn {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 12px;
    color: #4A90E2;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid #4A90E2;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    transition: all 0.3s;
    backdrop-filter: blur(10px);
  }

  .add-point-btn:hover {
    background-color: rgba(74, 144, 226, 0.2);
  }

  .add-point-btn.active {
    background-color: rgba(74, 144, 226, 0.3);
    color: #fff;
  }

  /* Modal Styles */
  .modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background-color: #2a2a2a;
    padding: 1.5rem;
    border-radius: 12px;
    width: 95%;
    max-width: 500px;
    border: 1px solid #3a3a3a;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #4A90E2;
  }

  .modal-title {
    font-size: clamp(1.1rem, 4vw, 1.3rem);
    font-weight: 800;
    color: #357ABD;
    text-shadow: 0 1px 3px rgba(53, 122, 189, 0.7);
  }

  .close {
    color: #aaa;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    padding: 0.2rem;
  }

  .close:hover {
    color: white;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    font-size: 0.9rem;
  }

  .form-input,
  .form-select,
  .form-textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #3a3a3a;
    border-radius: 8px;
    background-color: #1a1a1a;
    color: white;
    font-size: 0.9rem;
  }

  .form-textarea {
    height: 80px;
    resize: vertical;
  }

  /* Image Upload */
  .image-upload-container {
    border: 2px dashed #3a3a3a;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    transition: border-color 0.3s;
    cursor: pointer;
  }

  .image-upload-container:hover {
    border-color: #4A90E2;
  }

  .upload-icon {
    font-size: 40px;
    color: #666;
    margin-bottom: 0.8rem;
  }

  .upload-text {
    color: #ccc;
    margin-bottom: 0.8rem;
    font-size: 0.9rem;
  }

  .file-input {
    display: none;
  }

  .images-preview-container {
    margin-top: 1rem;
  }

  .images-preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 0.8rem;
    margin-top: 0.8rem;
  }

  .image-preview-item {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
  }

  .image-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  .remove-image {
    position: absolute;
    top: -6px;
    right: -6px;
    background-color: #ff4444;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-count {
    margin-top: 0.8rem;
    font-size: 0.85rem;
    color: #4A90E2;
  }

  .form-buttons {
    display: flex;
    gap: 0.8rem;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  .btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s;
    flex: 1;
    min-width: 100px;
  }

  .btn-primary {
    background-color: #4A90E2;
    color: white;
  }

  .btn-primary:hover {
    background-color: #357ABD;
  }

  .btn-secondary {
    background-color: #666;
    color: white;
  }

  .btn-secondary:hover {
    background-color: #555;
  }

  /* Payment Modal */
  .payment-modal {
    position: fixed;
    z-index: 1002;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .payment-modal-content {
    background-color: #1a1a1a;
    border-radius: 16px;
    width: 95%;
    max-width: 500px;
    border: 1px solid #333;
    overflow: hidden;
    position: relative;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
    max-height: 95vh;
    overflow-y: auto;
  }

  .payment-header {
    background: linear-gradient(135deg, #4a90e2, #357abd);
    padding: 1.5rem;
    text-align: center;
    position: relative;
  }

  .payment-title {
    font-size: clamp(1.2rem, 4vw, 1.5rem);
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
  }

  .payment-subtitle {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
  }

  .payment-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: white;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    z-index: 10;
    transition: color 0.3s;
    padding: 0.2rem;
  }

  .payment-close:hover {
    color: #ffdd00;
  }

  .payment-body {
    padding: 1.5rem;
  }

  .booking-summary {
    background-color: #2d2d2d;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-left: 4px solid #4a90e2;
  }

  .booking-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #3a3a3a;
  }

  .booking-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
    font-weight: bold;
    font-size: 1.1rem;
    color: #4a90e2;
  }

  .booking-name {
    font-weight: 600;
    color: white;
  }

  .booking-details {
    font-size: 0.85rem;
    color: #ccc;
    margin-top: 0.2rem;
  }

  .booking-price {
    font-weight: bold;
    color: #4a90e2;
  }

  .payment-form {
    margin-top: 1rem;
  }

  .payment-section {
    margin-bottom: 1.5rem;
  }

  .input-group {
    margin-bottom: 1rem;
  }

  .input-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #ddd;
    font-size: 0.9rem;
  }

  .input-field {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #3a3a3a;
    border-radius: 8px;
    background-color: #2d2d2d;
    color: white;
    font-size: 0.9rem;
    transition: border-color 0.3s;
  }

  .input-field:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }

  .input-row {
    display: flex;
    gap: 1rem;
  }

  .input-row .input-group {
    flex: 1;
  }

  .payment-methods {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.8rem;
    margin-top: 0.8rem;
  }

  .payment-method {
    background-color: #2d2d2d;
    border: 2px solid #3a3a3a;
    border-radius: 12px;
    padding: 1rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
  }

  .payment-method:hover {
    border-color: #4a90e2;
    background-color: #333;
  }

  .payment-method.selected {
    border-color: #4a90e2;
    background-color: rgba(74, 144, 226, 0.1);
  }

  .payment-method input[type="radio"] {
    display: none;
  }

  .payment-icon {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    display: block;
  }

  .payment-name {
    font-size: 0.8rem;
    color: #ddd;
    font-weight: 500;
  }

  .payment-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    flex-wrap: wrap;
  }

  .payment-btn {
    flex: 1;
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s;
    min-width: 120px;
  }

  .btn-cancel {
    background-color: #666;
    color: white;
  }

  .btn-cancel:hover {
    background-color: #555;
  }

  .btn-pay {
    background: linear-gradient(135deg, #28a745, #20c997);
    color: white;
  }

  .btn-pay:hover {
    background: linear-gradient(135deg, #20c997, #28a745);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
  }

  .security-info {
    background-color: rgba(40, 167, 69, 0.1);
    border: 1px solid #28a745;
    border-radius: 8px;
    padding: 0.8rem;
    margin-top: 1rem;
    font-size: 0.8rem;
    color: #28a745;
    text-align: center;
  }

  /* Detail Modal */
  .detail-modal {
    position: fixed;
    z-index: 1001;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .detail-modal-content {
    background-color: #1a1a1a;
    border-radius: 20px;
    width: 96%;
    max-width: 420px;
    border: 1px solid #333;
    overflow: hidden;
    position: relative;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
    max-height: 98vh;
    overflow-y: auto;
  }

  .detail-modal-header {
    padding: 1rem 1rem 0 1rem;
    text-align: center;
    position: relative;
  }

  .detail-modal-title {
    font-size: clamp(1.3rem, 5vw, 1.8rem);
    font-weight: 600;
    color: white;
    margin-bottom: 1rem;
    letter-spacing: 0.5px;
    padding-right: 2rem;
  }

  .detail-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    z-index: 10;
    transition: color 0.3s;
    padding: 0.2rem;
  }

  .detail-close:hover {
    color: white;
  }

  /* Image Gallery */
  .image-gallery {
    position: relative;
    width: 100%;
    height: 250px;
    overflow: hidden;
    border-radius: 16px;
    margin: 0 1rem 1rem 1rem;
    width: calc(100% - 2rem);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  }

  .gallery-main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
    transition: transform 0.3s ease;
  }

  .gallery-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    backdrop-filter: blur(10px);
  }

  .gallery-nav:hover {
    background-color: rgba(0, 0, 0, 0.9);
    transform: translateY(-50%) scale(1.1);
  }

  .gallery-prev {
    left: 10px;
  }

  .gallery-next {
    right: 10px;
  }

  .gallery-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 6px 10px;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    max-width: 80%;
    overflow-x: auto;
  }

  .gallery-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.3s;
    flex-shrink: 0;
  }

  .gallery-dot.active {
    background-color: white;
    transform: scale(1.2);
  }

  .gallery-dot:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }

  /* User Info */
  .detail-info {
    padding: 0 1rem 1rem 1rem;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 16px;
    backdrop-filter: blur(15px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transition: background 0.3s ease;
  }

  .user-info:hover {
    background: rgba(255, 255, 255, 0.12);
  }

  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4A90E2, #357ABD);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 18px;
    box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
    user-select: none;
    transition: transform 0.3s ease;
    flex-shrink: 0;
  }

  .user-avatar:hover {
    transform: scale(1.1);
  }

  .user-details {
    flex: 1;
    min-width: 0;
  }

  .user-name {
    font-size: clamp(1rem, 4vw, 1.2rem);
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #ffffffcc;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .user-rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .stars {
    display: flex;
    gap: 2px;
  }

  .star {
    color: #ffdd00;
    font-size: 14px;
    text-shadow: 0 0 8px rgba(255, 221, 0, 0.7);
    filter: drop-shadow(0 0 1.5px #ffdd00);
  }

  .rating-date {
    font-size: 12px;
    color: #bbb;
    font-weight: 600;
    font-style: italic;
  }

  .like-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #ff5252, #e04848);
    border: none;
    color: white;
    cursor: pointer;
    font-size: 14px;
    padding: 0.8rem 1rem;
    border-radius: 25px;
    box-shadow: 0 5px 18px rgba(255, 82, 82, 0.4);
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;
    flex-shrink: 0;
  }

  .like-button:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 26px rgba(255, 82, 82, 0.6);
  }

  .like-button.liked {
    background: linear-gradient(135deg, #ff7373, #ff5252);
    box-shadow: 0 6px 22px rgba(255, 115, 115, 0.6);
  }

  .description {
    color: #ddd;
    line-height: 1.6;
    font-size: clamp(0.9rem, 3vw, 1rem);
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    border-left: 4px solid #4A90E2;
    box-shadow: inset 0 0 8px rgba(74, 144, 226, 0.15);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.2rem;
    padding: 0 0.5rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .header {
      padding: 0.8rem;
      flex-direction: column;
      gap: 1rem;
    }

    .nav-menu {
      order: 3;
      width: 100%;
      justify-content: center;
      gap: 0.5rem;
    }

    .nav-menu a {
      padding: 0.4rem 0.6rem;
      font-size: 12px;
    }

    .login-btn {
      order: 2;
      padding: 0.5rem 1rem;
      font-size: 12px;
    }

    .hero {
      padding: 1.5rem 0.8rem;
    }

    .search-form {
      padding: 1rem;
      margin: 0 0.5rem 1.5rem;
    }

    .form-row {
      flex-direction: column;
      gap: 0.8rem;
    }

    .form-row span {
      display: none;
    }

    .content {
      padding: 0.8rem;
    }

    .map-wrapper {
      height: 300px;
    }

    .map-container {
      padding: 0.8rem;
    }

    .legend {
      position: static;
      margin-top: 1rem;
      background-color: rgba(0, 0, 0, 0.6);
    }

    .add-point-btn {
      position: static;
      margin-top: 1rem;
      width: 100%;
      text-align: center;
    }

    .activity-item {
      flex-direction: column;
      text-align: center;
      gap: 1rem;
    }

    .activity-info {
      min-width: auto;
    }

    .activity-btn {
      width: 100%;
    }

    .event-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.8rem;
    }

    .status-badge {
      align-self: flex-start;
    }

    .cards-container {
      grid-template-columns: 1fr;
      gap: 1rem;
      padding: 0;
    }

    .input-row {
      flex-direction: column;
      gap: 0.8rem;
    }

    .payment-buttons {
      flex-direction: column;
    }

    .payment-btn {
      width: 100%;
    }

    .payment-methods {
      grid-template-columns: repeat(2, 1fr);
    }

    .activity-recommendation {
      flex-direction: column;
      text-align: center;
      gap: 0.8rem;
    }

    .recommendation-image {
      width: 100%;
      max-width: 200px;
      height: 120px;
    }

    .recommendation-btn {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .hero h1 {
      font-size: 1.5rem;
    }

    .detail-modal-title {
      font-size: 1.2rem;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      font-size: 16px;
    }

    .gallery-nav {
      width: 35px;
      height: 35px;
      font-size: 16px;
    }

    .images-preview-grid {
      grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    }

    .image-preview-item {
      width: 70px;
      height: 70px;
    }

    .activity-image img {
      max-width: 100px;
    }

    .payment-methods {
      grid-template-columns: 1fr;
    }
  }

  .map-wrapper {
    position: relative;
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
    overflow: hidden;
    border-radius: 8px;
  }

  .map-marker {
    position: absolute;
    transform: translate(-50%, -50%);
    cursor: pointer;
    z-index: 2;
  }

  .marker-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #4A90E2;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .marker-label {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  .map-marker:hover .marker-label {
    opacity: 1;
  }

  .marker-blue .marker-dot {
    background-color: #4A90E2;
  }

  .marker-red .marker-dot {
    background-color: #ff4444;
  }

  .marker-yellow .marker-dot {
    background-color: #ffaa00;
  }

  .marker-green .marker-dot {
    background-color: #44ff44;
  }
</style>