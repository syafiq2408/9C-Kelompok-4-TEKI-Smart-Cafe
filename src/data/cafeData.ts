import { TeamMember, PromoItem } from '../types';

export const CREATORS: TeamMember[] = [
  {
    name: 'Beryl Arkananta Zaidan',
    role: 'Chief Technologist & IoT System Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
    bio: 'Memimpin arsitektur sistem cerdas TEKI, mengintegrasikan sensor IoT pada meja kafe, sinkronisasi gateway kasir POS real-time, serta otomasi cloud backend.',
    skills: ['IoT Embedded System', 'POS Architecture', 'Microcontroller Logic', 'Cloud Sync'],
    quote: '"Teknologi cerdas hadir bukan untuk menggantikan manusia, melainkan menyempurnakan setiap detik pengalaman ngopi."',
  },
  {
    name: 'Farsya Azka',
    role: 'Creative Director & Architectural Experience Lead',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80',
    bio: 'Merancang identitas visual, estetika interior Neo-Japandi, tata pencahayaan sirkadian adaptif, serta kenyamanan akustik ruang untuk pengunjung TEKI.',
    skills: ['Interior Spatial Design', 'Circadian Lighting', 'Brand Identity', 'Acoustic Comfort'],
    quote: '"Desain kafe modern harus berbicara antara ketenangan alam dan kecanggihan masa depan yang menyatu hangat."',
  },
  {
    name: 'Wistara Naufal Rabbani',
    role: 'Coffee Science & AI Extraction Profiler',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
    bio: 'Meneliti profil ekstraksi biji kopi nusantara, memprogram algoritma kalibrasi suhu & kelembapan gilingan espresso, serta kontrol kualitas robotic brewing.',
    skills: ['Sensory Coffee Profiling', 'Extraction Algorithms', 'Roast Engineering', 'Water Chemistry'],
    quote: '"Setiap gram kopi mengandung jutaan variabel rasa; algoritma pintar menjamin cangkir terbaik tersaji tanpa cela."',
  },
  {
    name: 'Nadira Inaya Putri',
    role: 'Digital Product Manager & Customer Journey Specialist',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80',
    bio: 'Menyusun alur pengguna portal pembeli mandiri, strategi kampanye promosi terintegrasi, personalisasi loyalty program, dan edukasi report text.',
    skills: ['Customer UX Research', 'Promotion Strategy', 'Product Operations', 'Educational Curation'],
    quote: '"Pengalaman pelanggan yang mulus dari klik pertama hingga seruputan terakhir adalah standar utama TEKI."',
  },
];

export const PROMOTIONS: PromoItem[] = [
  {
    id: 'promo-1',
    code: 'TEKIPINTAR',
    title: 'Diskon 20% Peluncuran TEKI Smart Cafe',
    discountType: 'percentage',
    discountValue: 20,
    description: 'Nikmati potongan 20% untuk semua menu kopi dan dessert tanpa batas minimum order.',
    validUntil: '31 Desember 2026',
    minSpend: 0,
    bannerColor: 'from-amber-600 to-orange-700',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'promo-2',
    code: 'STUDENTCOMBO',
    title: 'Paket Hemat Belajar: Mac & Coffee',
    discountType: 'fixed',
    discountValue: 15000,
    description: 'Potongan Rp 15.000 untuk pembelian bundling Truffle Mac and Cheese + Americano / Latte.',
    validUntil: 'Setiap Hari Pukul 13:00 - 18:00',
    minSpend: 50000,
    bannerColor: 'from-emerald-600 to-teal-800',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'promo-3',
    code: 'FUDGYLOVER',
    title: 'Sweet Treats Fudgy Brownies Combo',
    discountType: 'percentage',
    discountValue: 15,
    description: 'Hemat 15% untuk pairing Fudgy Brownies atau Choco Lava Cookies dengan minuman favorit.',
    validUntil: 'Berlaku Sepanjang Waktu',
    minSpend: 40000,
    bannerColor: 'from-purple-700 to-indigo-900',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'promo-4',
    code: 'BERYLFARSYA',
    title: 'Voucher Khusus Team Creators 25%',
    discountType: 'percentage',
    discountValue: 25,
    description: 'Apresiasi karya tim inovator muda: Beryl, Farsya, Wistara, dan Nadira!',
    validUntil: 'Promo Spesial Project',
    minSpend: 30000,
    bannerColor: 'from-rose-600 to-amber-700',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
  },
];

export const CAFE_ZONES = [
  {
    id: 'zone-1',
    name: 'Cyber Brewing Bar & Robotic Arm',
    subtitle: 'Presisi Ekstraksi 9 Bar dengan Visual Display',
    description: 'Pusat komando barista cerdas dengan mesin espresso PID dual boiler terhubung IoT, grinder otomatis, dan showcase barista kaca transparan.',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80',
    features: ['Real-time telemetry display', '0.1°C thermal stability', 'Automated milk texturing', 'Zero bean residue grinder'],
    techHighlight: 'Algoritma AI Barista menyesuaikan gilingan otomatis terhadap kelembapan udara ruangan.',
  },
  {
    id: 'zone-2',
    name: 'Smart Study & Work Pods',
    subtitle: 'Meja Ergonomis dengan Wireless Charging & NFC Order',
    description: 'Area produktif kedap suara ringan dengan meja berteknologi pengisian daya nirkabel 15W Qi, stopkontak universal tersembunyi, dan sensor kehadiran meja.',
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1000&q=80',
    features: ['Built-in Qi Wireless Pad', 'Ultrasonic Seat Sensor', 'Touchless Tap-to-Order NFC', 'Warm Glare-Free Task Lighting'],
    techHighlight: 'Lampu meja otomatis menyala lembut saat sensor mendeteksi pengunjung duduk.',
  },
  {
    id: 'zone-3',
    name: 'Communal Tech Lounge',
    subtitle: 'Kolaborasi Dinamis & Suasana Santai',
    description: 'Ruang interaksi sosial dengan sofa kulit modular ergonomis, display papan interaktif informasi cuaca & antrean pesanan, serta musik lofi cerdas.',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1000&q=80',
    features: ['Modular Acoustic Sofa', 'Smart Sound System', 'Digital Order Queue Display', 'Air Quality Purifier HEPA 13'],
    techHighlight: 'Sistem tata suara adaptif menyesuaikan desibel musik dengan keramaian pengunjung.',
  },
  {
    id: 'zone-4',
    name: 'Zen Glasshouse & Microclimate Garden',
    subtitle: 'Harmoni Alam & Efisiensi Energi Surya',
    description: 'Teras kaca semi-terbuka dengan tanaman indoor biofilik, atap panel surya parsial, dan sistem misting pendingin udara mikro otomatis hemat daya.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
    features: ['Solar-Assisted Microclimate', 'Smart Misting Fan', 'Biophilic Green Wall', 'Natural Sunlight Optimization'],
    techHighlight: 'Mengurangi konsumsi energi pendingin AC hingga 35% dengan ventilasi silang otomatis.',
  },
];

export const SMART_TECH_FEATURES = [
  {
    id: 'tech-1',
    name: 'AI Extraction & Precision Barista',
    category: 'Robotics & Automation',
    stat: '±0.1°C',
    statLabel: 'Stabilitas Suhu Ekstraksi',
    description: 'Menggunakan mikroprosesor kontrol PID multi-titik dan sensor tekanan hidrolik digital untuk memastikan profil ekstraksi konsisten di setiap tegukan kopi.',
    icon: 'Cpu',
  },
  {
    id: 'tech-2',
    name: 'IoT Smart Table & Presence Sensor',
    category: 'Internet of Things (IoT)',
    stat: '12 Meja',
    statLabel: 'Terpantau Otomatis Real-time',
    description: 'Setiap meja dilengkapi sensor ultrasonik dan chip NFC. Sistem kasir mengetahui status okupansi meja secara instan tanpa perlu pengecekan manual.',
    icon: 'Radio',
  },
  {
    id: 'tech-3',
    name: 'Dual-Portal Real-time Cloud POS',
    category: 'Software Ecosystem',
    stat: '< 0.3 dtk',
    statLabel: 'Latensi Sinkronisasi Pesanan',
    description: 'Pesanan yang dilakukan oleh pembeli di meja langsung muncul di monitor antrean kasir dan kitchen display tanpa jeda waktu.',
    icon: 'Zap',
  },
  {
    id: 'tech-4',
    name: 'Circadian Dynamic Lighting',
    category: 'Smart Environmental',
    stat: '2700K - 6000K',
    statLabel: 'Rentang Suhu Warna Lampu',
    description: 'Lampu interior secara otomatis menyesuaikan temperatur warna dan intensitas lux sesuai ritme sirkadian matahari untuk kenyamanan mata dan suasana fokus.',
    icon: 'Sun',
  },
  {
    id: 'tech-5',
    name: 'Zero-Waste Smart Inventory Predictor',
    category: 'Data Intelligence',
    stat: '-42%',
    statLabel: 'Pengurangan Food & Milk Waste',
    description: 'Analisis prediktif menghitung kebutuhan susu segar, biji kopi, pasta keju, dan sirup harian sehingga stok selalu segar dan tidak terbuang.',
    icon: 'TrendingDown',
  },
  {
    id: 'tech-6',
    name: 'Contactless Smart QRIS & Digital Receipt',
    category: 'Green Payment',
    stat: '100%',
    statLabel: 'Paperless Digital Ecosystem',
    description: 'Sistem pembayaran digital instan dengan struk elektronik ramah lingkungan yang bisa diunduh atau dikirim via WhatsApp.',
    icon: 'QrCode',
  },
];

export const REPORT_TEXT_DATA = {
  title: 'TEKI Smart Cafe: The Integration of Artificial Intelligence and Internet of Things in Modern Gastronomy',
  subject: 'English & Indonesian Science/Technology Academic Report Text',
  gradeLevel: 'SMP / SMA / Inovasi Pelajar & Sains Terapan',
  authors: 'Beryl Arkananta Zaidan, Farsya Azka, Wistara Naufal Rabbani, & Nadira Inaya Putri',
  schoolContext: 'SMPIT Citra Azzahra - Student Innovation Showcase',
  
  generalClassification: {
    en: 'A smart cafe is a contemporary culinary establishment that integrates Internet of Things (IoT) devices, artificial intelligence (AI), and automated software architectures to optimize food and beverage preparation, customer ordering journeys, and environmental energy management. TEKI Smart Cafe represents an advanced prototype of this paradigm, bridging artisanal specialty coffee crafting with automated point-of-sale telemetry and adaptive spatial technology.',
    id: 'Smart Cafe (Kafe Pintar) adalah sebuah tempat kuliner kontemporer yang mengintegrasikan perangkat Internet of Things (IoT), kecerdasan buatan (AI), dan arsitektur perangkat lunak terotomatisasi guna mengoptimalkan penyajian makanan dan minuman, perjalanan pemesanan pelanggan, serta manajemen energi lingkungan. TEKI Smart Cafe merupakan contoh prototipe mutakhir dari paradigma ini, memadukan seni kopi artisanal dengan telemetri sistem kasir digital dan teknologi ruang adaptif.'
  },

  descriptions: [
    {
      headingEn: '1. Automated Brewing and Extraction Dynamics',
      headingId: '1. Dinamika Penyeduhan dan Ekstraksi Terotomatisasi',
      textEn: 'Specialty coffee extraction requires rigorous precision regarding water temperature, grind particle distribution, hydrostatic pressure, and extraction time. In TEKI Smart Cafe, espresso machines are monitored by proportional-integral-derivative (PID) microcontrollers capable of preserving water stability within a margin of ±0.1 degrees Celsius. Sensor arrays constantly evaluate ambient room humidity and adjust the mechanical burrs of the coffee grinder to guarantee consistent total dissolved solids (TDS) and extraction yield across all espresso-based beverages, such as Americanos and Lattes.',
      textId: 'Ekstraksi kopi spesialti menuntut presisi ketat terkait suhu air, distribusi ukuran gilingan, tekanan hidrostatik, dan durasi ekstraksi. Di TEKI Smart Cafe, mesin espresso dipantau oleh mikrokontroler PID yang mampu menjaga stabilitas suhu air dalam deviasi ±0.1 derajat Celcius. Rangkaian sensor secara konstan memantau kelembapan udara ruangan dan mengkalibrasi burr grinder kopi secara otomatis guna menjamin konsistensi TDS (Total Dissolved Solids) pada seluruh sajian kopi, seperti Americano dan Cafe Latte.'
    },
    {
      headingEn: '2. Synchronized Dual-Portal Architecture',
      headingId: '2. Arsitektur Dua Portal yang Tersinkronisasi',
      textEn: 'A pivotal technical component of TEKI Smart Cafe is its real-time synchronized communication between the customer self-ordering interface and the cashier Point-of-Sale (POS) terminal. Customers interact through table-based digital kiosks or mobile browser portals enabled by table QR codes. Upon dispatching an order, websocket-level events push item specifications, dietary modifications (e.g., dairy substitutes, sweetness gradations), and seating coordinates to the kitchen queue in under 300 milliseconds. This eliminates auditory friction and manual ticketing errors.',
      textId: 'Komponen teknis penting dari TEKI Smart Cafe adalah komunikasi real-time antara antarmuka pemesanan mandiri pembeli dan terminal kasir (POS). Pelanggan berinteraksi melalui portal digital berbasis QR code di meja. Begitu pesanan dikirimkan, data menu, kustomisasi (seperti penggantian susu dan kadar gula), serta nomor meja langsung terkirim ke antrean kasir dan dapur dalam waktu kurang dari 300 milidetik, meniadakan kesalahan pencatatan manual.'
    },
    {
      headingEn: '3. Ambient Biophilic Architecture and Energy Optimization',
      headingId: '3. Arsitektur Biofilik Adaptif dan Optimasi Energi',
      textEn: 'TEKI Smart Cafe employs dynamic circadian lighting arrays that adjust chromatic color temperature from warm 2700 Kelvin in the evening to energized 6000 Kelvin daylight spectrum during peak study hours. Furthermore, occupancy sensors positioned on seating units dynamically disable wireless charging modules and reduce localized airflow when seats remain vacant for more than ten minutes. This system produces an estimated 35% reduction in auxiliary electrical consumption compared to conventional hospitality venues.',
      textId: 'TEKI Smart Cafe menerapkan pencahayaan sirkadian dinamis yang menyesuaikan temperatur warna dari 2700 Kelvin (hangat temaram) pada sore/malam hari hingga 6000 Kelvin pada jam produktif siang hari. Selain itu, sensor kehadiran pada kursi secara otomatis mematikan pengisian daya nirkabel dan meredam sirkulasi udara mikro ketika kursi kosong lebih dari 10 menit, memangkas konsumsi listrik hingga 35% dibandingkan kafe konvensional.'
    },
    {
      headingEn: '4. Sustainable Gastronomy and Waste Abatement',
      headingId: '4. Gastronomi Berkelanjutan dan Pengurangan Limbah',
      textEn: 'In addition to beverages, TEKI’s culinary offerings, including baked artisanal brownies, cookies, and gourmet mac and cheese, are governed by predictive inventory modeling. Machine learning heuristics anticipate daily demand based on day-of-week trends, weather patterns, and local academic schedules. Consequently, perishable dairy, artisanal cheese, and pastry dough replenishment are kept at lean buffers, curbing organic food waste by over 40%.',
      textId: 'Selain minuman, hidangan kuliner TEKI seperti brownies panggang, kukis lumer, dan mac and cheese dikelola dengan pemodelan inventaris prediktif. Sistem memperkirakan kebutuhan harian berdasarkan pola hari, perkiraan cuaca, dan jadwal kegiatan belajar sekitar. Hasilnya, penyediaan bahan segar seperti keju dan susu dapat ditekan pada rasio optimal, mengurangi limbah makanan organik hingga lebih dari 40%.'
    }
  ],

  vocabulary: [
    { word: 'Internet of Things (IoT)', meaning: 'Jaringan perangkat fisik yang dilengkapi sensor, perangkat lunak, dan konektivitas untuk bertukar data secara otomatis.' },
    { word: 'PID Controller', meaning: 'Mekanisme umpan balik kontrol cerdas yang mempertahankan kestabilan suhu dan variabel proses industri secara presisi.' },
    { word: 'Point of Sale (POS)', meaning: 'Sistem komputerisasi transaksi kasir yang mengelola pembayaran, antrean pesanan, dan rekapitulasi data penjualan.' },
    { word: 'Extraction Yield', meaning: 'Persentase senyawa terlarut yang berhasil diekstraksi dari bubuk kopi ke dalam cangkir minuman.' },
    { word: 'Circadian Lighting', meaning: 'Sistem tata cahaya lampu pintar yang berfluktuasi mengikuti ritme biologis sirkadian alami tubuh manusia.' },
    { word: 'Biophilic Design', meaning: 'Konsep desain ruang yang mengintegrasikan elemen tanaman dan alam untuk meningkatkan kesejahteraan psikologis dan fokus.' }
  ],

  quizQuestions: [
    {
      q: 'Apa fungsi utama kontroler PID pada mesin espresso di TEKI Smart Cafe?',
      options: [
        'Menjaga kestabilan suhu air hingga deviasi ±0.1°C',
        'Memotong adonan brownies secara otomatis',
        'Memutar musik lofi di kafe',
        'Mencetak struk kertas'
      ],
      correctIndex: 0,
      explanation: 'Kontroler PID bertugas memantau dan mempertahankan stabilitas suhu air ekstraksi secara presisi tinggi.'
    },
    {
      q: 'Berapa persen efisiensi energi yang berhasil dicapai melalui sensor kehadiran dan pencahayaan cerdas?',
      options: ['10%', '20%', 'Sekitar 35%', '90%'],
      correctIndex: 2,
      explanation: 'Sistem otomasi sensor kursi dan lampu sirkadian mereduksi konsumsi listrik pembantu hingga 35%.'
    },
    {
      q: 'Siapa saja 4 inovator perancang TEKI Smart Cafe?',
      options: [
        'Beryl Arkananta Zaidan, Farsya Azka, Wistara Naufal Rabbani, Nadira Inaya Putri',
        'Andi, Budi, Siti, dan Rina',
        'Albert Einstein, Nikola Tesla, Thomas Edison, Steve Jobs',
        'Barista A, Kasir B, Koki C, Pelayan D'
      ],
      correctIndex: 0,
      explanation: 'TEKI Smart Cafe dirancang dan dikembangkan oleh tim inovator muda: Beryl, Farsya, Wistara, dan Nadira.'
    }
  ]
};
