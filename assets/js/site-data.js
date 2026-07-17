/*
 * Single source of truth for public-facing CV content.
 * See CONTENT_GUIDE.md before adding papers, news, or journal metrics.
 */
window.SITE_DATA = {
	lastUpdated: "2026-07-17",
	metricChecked: "2026-07-17",

	researchAreas: [
		{
			number: "01",
			name: "Fleet SOH",
			description: "State-of-health estimation from fragmented charging data collected under real-world operating conditions."
		},
		{
			number: "02",
			name: "Smart Batteries",
			description: "Fine-grained sensing and state monitoring across cells, modules, and battery systems."
		},
		{
			number: "03",
			name: "Multimodal Perception",
			description: "Efficient multimodal learning for assistive-driving perception and intelligent mobility."
		}
	],

	journalMetrics: {
		"Applied Energy": {
			abbreviation: "Applied Energy",
			impactFactor: "12.2",
			jifYear: "2025",
			releaseYear: "2026",
			publisher: "Elsevier",
			url: "https://www.sciencedirect.com/journal/applied-energy"
		},
		"Journal of Energy Storage": {
			abbreviation: "J. Energy Storage",
			impactFactor: "10.7",
			jifYear: "2025",
			releaseYear: "2026",
			publisher: "Elsevier",
			url: "https://www.sciencedirect.com/journal/journal-of-energy-storage"
		},
		"Energies": {
			abbreviation: "Energies",
			impactFactor: "3.9",
			jifYear: "2025",
			releaseYear: "2026",
			publisher: "MDPI",
			url: "https://www.mdpi.com/journal/energies"
		}
	},

	publications: [
		{
			id: "fragmented-charging-soh-2026",
			order: 1,
			featured: true,
			type: "journal",
			theme: "Fleet SOH",
			title: "Lithium-ion battery state-of-health estimation for fragmented charging segments in real-world fleets",
			authors: "Zhen Wang, Jiuchun Jiang, Youzhi Song, Di Wu, Fengwei Liang, Yiding Li, and Wenwei Wang",
			venue: "Applied Energy",
			year: "2026",
			description: "Estimates battery health from incomplete charging fragments collected in real-world fleets.",
			url: "https://www.sciencedirect.com/science/article/pii/S0306261926010317",
			image: "images/5.png",
			imageAlt: "Graphical overview of fragmented-charging SOH estimation for real-world fleets",
			width: 2400,
			height: 1975
		},
		{
			id: "smart-battery-monitoring-2026",
			order: 2,
			featured: true,
			type: "journal",
			theme: "Smart Batteries",
			title: "Breakthrough in fine state monitoring of lithium-ion smart batteries towards module applications",
			authors: "Chengming Zhang, Zhen Wang, Yiding Li*, Shuaibang Liu, Xiaoguang Yang, Cheng Lin, and Wenwei Wang",
			venue: "Journal of Energy Storage",
			year: "2026",
			description: "Explores fine-grained state monitoring from module-level smart battery sensing.",
			url: "https://www.sciencedirect.com/science/article/pii/S2352152X26027908",
			image: "images/4.jpg",
			imageAlt: "Graphical overview of module-level smart battery monitoring",
			width: 2845,
			height: 1880
		},
		{
			id: "frequent-itemset-soh-2025",
			order: 3,
			featured: true,
			type: "journal",
			theme: "Fleet SOH",
			title: "A data-efficient method for lithium-ion battery state-of-health estimation based on real-time frequent itemset image encoding",
			authors: "Zhen Wang, Li Zhao*, Yiding Li, and Wenwei Wang",
			venue: "Applied Energy",
			year: "2025",
			description: "Transforms real-time charging patterns into image features for data-efficient SOH estimation.",
			url: "https://www.sciencedirect.com/science/article/pii/S0306261925011468",
			image: "images/3.png",
			imageAlt: "Graphical overview of frequent-itemset image encoding for battery SOH estimation",
			width: 3812,
			height: 1095
		},
		{
			id: "uv-m3tl-2026",
			order: 4,
			featured: false,
			type: "preprint",
			theme: "Multimodal Perception",
			title: "UV-M3TL: A Unified and Versatile Multimodal Multi-Task Learning Framework for Assistive Driving Perception",
			authors: "Wenzhuo Liu, Qiannan Guo, Zhen Wang, Wenshuo Wang, Lei Yang, Yicheng Qiao, Lening Wang, Zhiwei Li, Chen Lv, Shanghang Zhang, Junqiang Xi, and Huaping Liu",
			venue: "arXiv preprint",
			year: "2026",
			description: "A unified multimodal multi-task framework for assistive-driving perception.",
			url: "https://arxiv.org/abs/2602.01594",
			image: "images/DB-SCME.png",
			imageAlt: "Architecture overview of the UV-M3TL multimodal perception framework",
			width: 3747,
			height: 2674
		},
		{
			id: "tem3-learning-2025",
			order: 5,
			featured: false,
			type: "conference",
			theme: "Multimodal Perception",
			title: "TEM3-Learning: Time-Efficient Multimodal Multi-Task Learning for Advanced Assistive Driving",
			authors: "Wenshuo Liu, Yicheng Qiao, Zhen Wang, et al., Huaping Liu, and Wenshuo Wang*",
			venue: "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)",
			year: "2025",
			description: "Improves time efficiency in multimodal multi-task learning for assistive driving.",
			url: "https://arxiv.org/abs/2506.18084",
			codeUrl: "https://github.com/Wenzhuo-Liu/TEM3-Learning",
			image: "images/2.png",
			imageAlt: "Architecture overview of the TEM3-Learning framework",
			width: 2152,
			height: 496
		},
		{
			id: "low-sampling-rate-soh-2024",
			order: 6,
			featured: false,
			type: "journal",
			theme: "Fleet SOH",
			title: "An On-line SOH estimation method for power battery under low sampling rate",
			authors: "Li Zhao, Zhen Wang*, Zhanchao Ma, and Yuqi Li",
			venue: "Journal of Energy Storage",
			year: "2024",
			description: "Online SOH estimation designed for sparse power-battery telemetry.",
			url: "https://www.sciencedirect.com/science/article/pii/S2352152X24002792",
			image: "images/1.png",
			imageAlt: "Graphical overview of online SOH estimation under low sampling rate",
			width: 4808,
			height: 2812
		},
		{
			id: "ev-driving-cycle-2022",
			order: 7,
			featured: false,
			type: "journal",
			theme: "Vehicle Data",
			title: "A sticky sampling and Markov state transition matrix based driving cycle construction method for EV",
			authors: "Li Zhao, Kun Li*, et al., Zhen Wang",
			venue: "Energies",
			year: "2022",
			description: "Constructs representative EV driving cycles using sticky sampling and Markov state transitions.",
			url: "https://www.mdpi.com/1996-1073/15/3/1057",
			image: "images/0.png",
			imageAlt: "Overview of the EV driving-cycle construction method",
			width: 4090,
			height: 2412
		}
	],

	news: [
		{
			date: "2026-07-17",
			label: "Jul 17, 2026",
			text: "Our Applied Energy paper on state-of-health estimation from fragmented real-world charging segments is available online.",
			publicationId: "fragmented-charging-soh-2026"
		},
		{
			date: "2026-07-02",
			label: "Jul 2, 2026",
			text: "Our Journal of Energy Storage paper on fine state monitoring for smart battery modules is available online.",
			publicationId: "smart-battery-monitoring-2026"
		},
		{
			date: "2026-02-02",
			label: "Feb 2, 2026",
			text: "UV-M3TL, our multimodal multi-task framework for assistive-driving perception, is available on arXiv.",
			publicationId: "uv-m3tl-2026"
		},
		{
			date: "2025-06-29",
			label: "Jun 29, 2025",
			text: "Our data-efficient SOH estimation method using frequent-itemset image encoding appears in Applied Energy.",
			publicationId: "frequent-itemset-soh-2025"
		},
		{
			date: "2025-06-25",
			label: "Jun 25, 2025",
			text: "TEM3-Learning was accepted to IROS 2025.",
			publicationId: "tem3-learning-2025"
		},
		{
			date: "2024-09-01",
			label: "Sep 1, 2024",
			text: "I joined Prof. Wenwei Wang’s research group as a doctoral student at Beijing Institute of Technology."
		},
		{
			date: "2024-01-28",
			label: "Jan 28, 2024",
			text: "Our online SOH estimation method for low-rate battery telemetry appears in Journal of Energy Storage.",
			publicationId: "low-sampling-rate-soh-2024"
		}
	]
};
