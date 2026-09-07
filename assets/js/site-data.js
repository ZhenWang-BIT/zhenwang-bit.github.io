/*
 * Single source of truth for public-facing CV content.
 * See CONTENT_GUIDE.md before adding papers, news, or journal metrics.
 *
 * Bilingual fields: any string field may have a Chinese twin with the "Zh"
 * suffix (e.g. description / descriptionZh). When the visitor switches to
 * 中文, the Zh value is used if present; otherwise the English value stays.
 * Paper titles, author lists, and journal names intentionally stay English.
 */
window.SITE_DATA = {
	lastUpdated: "2026-09-07",
	metricChecked: "2026-09-07",

	profile: {
		scholarUrl: "https://scholar.google.com/citations?user=XBrOaJwAAAAJ&hl=en",
		githubUrl: "https://github.com/ZhenWang-BIT",
		email: "zwang@bit.edu.cn"
	},

	researchAreas: [
		{
			number: "01",
			name: "Fleet SOH",
			nameZh: "车队电池健康状态",
			description: "State-of-health estimation from fragmented charging data collected under real-world operating conditions.",
			descriptionZh: "面向真实运行工况下碎片化充电数据的电池健康状态估计。"
		},
		{
			number: "02",
			name: "Smart Batteries",
			nameZh: "智能电池",
			description: "Fine-grained sensing and state monitoring across cells, modules, and battery systems.",
			descriptionZh: "覆盖单体、模组与电池系统的精细感知与状态监测。"
		},
		{
			number: "03",
			name: "Charging Intelligence",
			nameZh: "智能充电",
			description: "Physics-informed prediction of charging-power trajectories and remaining charging time for electric vehicles.",
			descriptionZh: "基于物理信息的电动汽车充电功率轨迹与剩余充电时间预测。"
		},
		{
			number: "04",
			name: "Multimodal Perception",
			nameZh: "多模态感知",
			description: "Efficient multimodal learning for assistive-driving perception and intelligent mobility.",
			descriptionZh: "面向辅助驾驶感知与智能出行的高效多模态学习。"
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
		"Engineering Applications of Artificial Intelligence": {
			abbreviation: "Eng. Appl. Artif. Intell.",
			impactFactor: "9.0",
			jifYear: "2025",
			releaseYear: "2026",
			publisher: "Elsevier",
			url: "https://www.sciencedirect.com/journal/engineering-applications-of-artificial-intelligence"
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
			id: "pi-transformer-charging-2026",
			order: 1,
			featured: true,
			type: "journal",
			theme: "Charging Intelligence",
			title: "Physics-informed Transformer for online joint prediction of electric vehicle battery charging-power trajectories and remaining charging time",
			authors: "Zhen Wang, Yiding Li, Jiayi Sun, Yuening Zhang, Fengwei Liang, Di Wu, Peiwen Yu, and Wenwei Wang*",
			venue: "Journal of Energy Storage",
			year: "2026",
			volume: "181, 124453",
			doi: "10.1016/j.est.2026.124453",
			description: "Jointly predicts charging-power trajectories and remaining charging time online with a physics-informed Transformer.",
			descriptionZh: "以物理信息 Transformer 在线联合预测电动汽车充电功率轨迹与剩余充电时间。",
			url: "https://www.sciencedirect.com/science/article/pii/S2352152X26041174",
			image: "images/6.png",
			imageAlt: "Framework of the physics-informed Transformer for charging-power trajectory prediction",
			width: 1600,
			height: 1137
		},
		{
			id: "fbg-bearing-fault-2026",
			order: 2,
			featured: false,
			type: "journal",
			theme: "Intelligent Sensing",
			title: "Bearing fault diagnosis for rotating machinery using multi-axial fiber Bragg grating vibration sensing and deep learning",
			authors: "Kun Li, Zhen Wang*, Mingli Dong*, Yanmin Song, Xiaoping Lou, and Lianqing Zhu*",
			venue: "Engineering Applications of Artificial Intelligence",
			year: "2026",
			volume: "182, 116011",
			doi: "10.1016/j.engappai.2026.116011",
			description: "Diagnoses bearing faults from multi-axial fiber Bragg grating vibration signals with deep learning.",
			descriptionZh: "基于多轴光纤布拉格光栅振动信号与深度学习的旋转机械轴承故障诊断。",
			url: "https://www.sciencedirect.com/science/article/pii/S0952197626022955",
			image: "images/7.png",
			imageAlt: "SFT-AFM framework for FBG-based bearing fault diagnosis",
			width: 1529,
			height: 1600
		},
		{
			id: "fragmented-charging-soh-2026",
			order: 3,
			featured: true,
			type: "journal",
			theme: "Fleet SOH",
			title: "Lithium-ion battery state-of-health estimation for fragmented charging segments in real-world fleets",
			authors: "Zhen Wang, Jiuchun Jiang, Youzhi Song, Di Wu, Fengwei Liang, Yiding Li, and Wenwei Wang",
			venue: "Applied Energy",
			year: "2026",
			description: "Estimates battery health from incomplete charging fragments collected in real-world fleets.",
			descriptionZh: "利用真实车队中不完整的充电片段估计电池健康状态。",
			url: "https://www.sciencedirect.com/science/article/pii/S0306261926010317",
			image: "images/5.png",
			imageAlt: "Graphical overview of fragmented-charging SOH estimation for real-world fleets",
			width: 2400,
			height: 1975
		},
		{
			id: "smart-battery-monitoring-2026",
			order: 4,
			featured: true,
			type: "journal",
			theme: "Smart Batteries",
			title: "Breakthrough in fine state monitoring of lithium-ion smart batteries towards module applications",
			authors: "Chengming Zhang, Zhen Wang, Yiding Li*, Shuaibang Liu, Xiaoguang Yang, Cheng Lin, and Wenwei Wang",
			venue: "Journal of Energy Storage",
			year: "2026",
			description: "Explores fine-grained state monitoring from module-level smart battery sensing.",
			descriptionZh: "面向模组应用的锂离子智能电池精细状态监测。",
			url: "https://www.sciencedirect.com/science/article/pii/S2352152X26027908",
			image: "images/4.jpg",
			imageAlt: "Graphical overview of module-level smart battery monitoring",
			width: 2845,
			height: 1880
		},
		{
			id: "frequent-itemset-soh-2025",
			order: 5,
			featured: true,
			type: "journal",
			theme: "Fleet SOH",
			title: "A data-efficient method for lithium-ion battery state-of-health estimation based on real-time frequent itemset image encoding",
			authors: "Zhen Wang, Li Zhao*, Yiding Li, and Wenwei Wang",
			venue: "Applied Energy",
			year: "2025",
			description: "Transforms real-time charging patterns into image features for data-efficient SOH estimation.",
			descriptionZh: "将实时充电模式编码为图像特征，实现数据高效的 SOH 估计。",
			url: "https://www.sciencedirect.com/science/article/pii/S0306261925011468",
			image: "images/3.png",
			imageAlt: "Graphical overview of frequent-itemset image encoding for battery SOH estimation",
			width: 3812,
			height: 1095
		},
		{
			id: "uv-m3tl-2026",
			order: 6,
			featured: false,
			type: "preprint",
			theme: "Multimodal Perception",
			title: "UV-M3TL: A Unified and Versatile Multimodal Multi-Task Learning Framework for Assistive Driving Perception",
			authors: "Wenzhuo Liu, Qiannan Guo, Zhen Wang, Wenshuo Wang, Lei Yang, Yicheng Qiao, Lening Wang, Zhiwei Li, Chen Lv, Shanghang Zhang, Junqiang Xi, and Huaping Liu",
			venue: "arXiv preprint",
			year: "2026",
			description: "A unified multimodal multi-task framework for assistive-driving perception.",
			descriptionZh: "面向辅助驾驶感知的统一多模态多任务学习框架。",
			url: "https://arxiv.org/abs/2602.01594",
			image: "images/DB-SCME.png",
			imageAlt: "Architecture overview of the UV-M3TL multimodal perception framework",
			width: 3747,
			height: 2674
		},
		{
			id: "tem3-learning-2025",
			order: 7,
			featured: false,
			type: "conference",
			theme: "Multimodal Perception",
			title: "TEM3-Learning: Time-Efficient Multimodal Multi-Task Learning for Advanced Assistive Driving",
			authors: "Wenzhuo Liu, Yicheng Qiao, Zhen Wang, et al., Huaping Liu, and Wenshuo Wang*",
			venue: "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)",
			year: "2025",
			description: "Improves time efficiency in multimodal multi-task learning for assistive driving.",
			descriptionZh: "提升辅助驾驶多模态多任务学习的时间效率。",
			url: "https://arxiv.org/abs/2506.18084",
			codeUrl: "https://github.com/Wenzhuo-Liu/TEM3-Learning",
			image: "images/2.png",
			imageAlt: "Architecture overview of the TEM3-Learning framework",
			width: 2152,
			height: 496
		},
		{
			id: "low-sampling-rate-soh-2024",
			order: 8,
			featured: false,
			type: "journal",
			theme: "Fleet SOH",
			title: "An On-line SOH estimation method for power battery under low sampling rate",
			authors: "Li Zhao, Zhen Wang*, Zhanchao Ma, and Yuqi Li",
			venue: "Journal of Energy Storage",
			year: "2024",
			description: "Online SOH estimation designed for sparse power-battery telemetry.",
			descriptionZh: "面向低采样率动力电池数据的在线 SOH 估计方法。",
			url: "https://www.sciencedirect.com/science/article/pii/S2352152X24002792",
			image: "images/1.png",
			imageAlt: "Graphical overview of online SOH estimation under low sampling rate",
			width: 4808,
			height: 2812
		},
		{
			id: "ev-driving-cycle-2022",
			order: 9,
			featured: false,
			type: "journal",
			theme: "Vehicle Data",
			title: "A sticky sampling and Markov state transition matrix based driving cycle construction method for EV",
			authors: "Li Zhao, Kun Li*, et al., Zhen Wang",
			venue: "Energies",
			year: "2022",
			description: "Constructs representative EV driving cycles using sticky sampling and Markov state transitions.",
			descriptionZh: "基于粘性采样与马尔可夫状态转移矩阵构建电动汽车代表性行驶工况。",
			url: "https://www.mdpi.com/1996-1073/15/3/1057",
			image: "images/0.png",
			imageAlt: "Overview of the EV driving-cycle construction method",
			width: 4090,
			height: 2412
		}
	],

	experience: [
		{
			start: "2025-08",
			period: "Aug 2025 – Present",
			periodZh: "2025 年 8 月 – 至今",
			role: "Research Intern",
			roleZh: "研究实习生",
			organization: "Shenzhen Automotive Research Institute, Beijing Institute of Technology",
			organizationZh: "北京理工大学深圳汽车研究院",
			location: "Shenzhen, China",
			locationZh: "深圳"
		},
		{
			start: "2024-09",
			period: "Sep 2024 – Present",
			periodZh: "2024 年 9 月 – 至今",
			role: "Ph.D. Student, Energy and Transportation Domain",
			roleZh: "博士研究生，能源与交通学域",
			organization: "Beijing Institute of Technology · National Engineering Research Center of Electric Vehicles",
			organizationZh: "北京理工大学 · 电动车辆国家工程研究中心",
			location: "Zhuhai / Beijing, China",
			locationZh: "珠海 / 北京"
		}
	],

	addresses: [
		{
			lines: ["Energy and Transportation Domain", "Beijing Institute of Technology", "Zhuhai, 519088, China"],
			linesZh: ["北京理工大学 能源与交通学域", "广东省珠海市，519088"]
		},
		{
			lines: ["National Engineering Research Center of Electric Vehicles", "Beijing Institute of Technology", "Beijing, 100081, China"],
			linesZh: ["北京理工大学 电动车辆国家工程研究中心", "北京市，100081"]
		},
		{
			lines: ["Shenzhen Automotive Research Institute", "Beijing Institute of Technology", "Shenzhen, 518118, China"],
			linesZh: ["北京理工大学 深圳汽车研究院", "广东省深圳市，518118"]
		}
	],

	news: [
		{
			date: "2026-09-06",
			label: "Sep 6, 2026",
			labelZh: "2026 年 9 月 6 日",
			text: "Our Journal of Energy Storage paper on physics-informed joint prediction of EV charging-power trajectories and remaining charging time is available online.",
			textZh: "基于物理信息 Transformer 的电动汽车充电功率轨迹与剩余充电时间联合预测论文在 Journal of Energy Storage 上线。",
			publicationId: "pi-transformer-charging-2026"
		},
		{
			date: "2026-09-03",
			label: "Sep 3, 2026",
			labelZh: "2026 年 9 月 3 日",
			text: "Our Engineering Applications of Artificial Intelligence paper on bearing fault diagnosis with multi-axial fiber Bragg grating sensing is available online.",
			textZh: "基于多轴光纤布拉格光栅振动传感的轴承故障诊断论文在 Engineering Applications of Artificial Intelligence 上线。",
			publicationId: "fbg-bearing-fault-2026"
		},
		{
			date: "2026-07-17",
			label: "Jul 17, 2026",
			labelZh: "2026 年 7 月 17 日",
			text: "Our Applied Energy paper on state-of-health estimation from fragmented real-world charging segments is available online.",
			textZh: "面向真实车队碎片化充电片段的电池健康状态估计论文在 Applied Energy 上线。",
			publicationId: "fragmented-charging-soh-2026"
		},
		{
			date: "2026-07-02",
			label: "Jul 2, 2026",
			labelZh: "2026 年 7 月 2 日",
			text: "Our Journal of Energy Storage paper on fine state monitoring for smart battery modules is available online.",
			textZh: "面向模组应用的智能电池精细状态监测论文在 Journal of Energy Storage 上线。",
			publicationId: "smart-battery-monitoring-2026"
		},
		{
			date: "2026-02-02",
			label: "Feb 2, 2026",
			labelZh: "2026 年 2 月 2 日",
			text: "UV-M3TL, our multimodal multi-task framework for assistive-driving perception, is available on arXiv.",
			textZh: "面向辅助驾驶感知的多模态多任务框架 UV-M3TL 发布于 arXiv。",
			publicationId: "uv-m3tl-2026"
		},
		{
			date: "2025-08-01",
			label: "Aug 1, 2025",
			labelZh: "2025 年 8 月 1 日",
			text: "I started a research internship at the Shenzhen Automotive Research Institute, Beijing Institute of Technology.",
			textZh: "开始在北京理工大学深圳汽车研究院实习。"
		},
		{
			date: "2025-06-29",
			label: "Jun 29, 2025",
			labelZh: "2025 年 6 月 29 日",
			text: "Our data-efficient SOH estimation method using frequent-itemset image encoding appears in Applied Energy.",
			textZh: "基于频繁项集图像编码的数据高效 SOH 估计方法发表于 Applied Energy。",
			publicationId: "frequent-itemset-soh-2025"
		},
		{
			date: "2025-06-25",
			label: "Jun 25, 2025",
			labelZh: "2025 年 6 月 25 日",
			text: "TEM3-Learning was accepted to IROS 2025.",
			textZh: "TEM3-Learning 被 IROS 2025 录用。",
			publicationId: "tem3-learning-2025"
		},
		{
			date: "2024-09-01",
			label: "Sep 1, 2024",
			labelZh: "2024 年 9 月 1 日",
			text: "I joined Prof. Wenwei Wang’s research group as a doctoral student at Beijing Institute of Technology.",
			textZh: "加入北京理工大学王文伟教授课题组，攻读博士学位。"
		},
		{
			date: "2024-01-28",
			label: "Jan 28, 2024",
			labelZh: "2024 年 1 月 28 日",
			text: "Our online SOH estimation method for low-rate battery telemetry appears in Journal of Energy Storage.",
			textZh: "面向低采样率电池数据的在线 SOH 估计方法发表于 Journal of Energy Storage。",
			publicationId: "low-sampling-rate-soh-2024"
		}
	],

	/* Static interface strings. English is the source; Chinese is used when the
	   visitor switches language. Keys map to data-i18n attributes in index.html
	   and to labels generated in main.js. */
	ui: {
		en: {
			"nav.research": "Research",
			"nav.publications": "Publications",
			"nav.updates": "Updates",
			"nav.bio": "Bio",
			"nav.contact": "Contact",
			"lang.switch": "中文",
			"lang.switchAria": "切换为中文",
			"identity.tagline": "Battery Intelligence Researcher",
			"hero.eyebrow": "PhD Researcher · Beijing Institute of Technology",
			"hero.title": "Making battery health legible from incomplete real-world data.",
			"hero.summary": "I develop data-efficient estimation methods for fragmented charging, low-rate telemetry, and smart battery sensing.",
			"hero.meta1": "PhD Student",
			"hero.meta2": "Beijing Institute of Technology",
			"hero.meta3": "Zhuhai · Beijing · Shenzhen, China",
			"hero.cta": "View selected papers",
			"featured.eyebrow": "Featured work",
			"featured.online": "Online now",
			"jif.badge": "JIF",
			"strip.eyebrow": "Journal visibility",
			"strip.text": "Current journal-level metrics, with the combined total counted once for every journal paper.",
			"strip.total": "Total JIF",
			"strip.detail": "journal papers, each counted once",
			"strip.released": "released",
			"pub.eyebrow": "Research record",
			"pub.title": "Selected work and publication archive.",
			"pub.text": "Journal, year, and impact factor are kept visually prominent. Conference papers and preprints are clearly labeled without journal metrics.",
			"pub.filter.all": "All",
			"pub.filter.journal": "Journals",
			"pub.filter.conference": "Conferences",
			"pub.filter.preprint": "Preprints",
			"pub.note": "2025 JIF values released in 2026. Total JIF counts the journal metric once per listed journal paper. * marks corresponding authors.",
			"pub.viewPaper": "View paper",
			"pub.viewPreprint": "View preprint",
			"pub.code": "Code",
			"pub.released": "Released",
			"pub.empty": "No publications in this category yet.",
			"type.journal": "Journal article",
			"type.conference": "Conference paper",
			"type.preprint": "Preprint",
			"news.eyebrow": "Research log",
			"news.title": "Latest updates.",
			"news.text": "A concise record of publications, releases, and academic milestones.",
			"news.read": "Read paper",
			"news.showAll": "Show all updates",
			"news.showFewer": "Show fewer updates",
			"bio.eyebrow": "Background",
			"bio.title": "Research across batteries, vehicles, and intelligent systems.",
			"bio.p1": "I am a doctoral student in the Energy and Transportation Domain at Beijing Institute of Technology, supervised by <a href=\"https://me.bit.edu.cn/szdw/jsml/jlgcx/ddjlgcjzzx/bssds4/6b31e9e9d81f4fea81033f02c356fb64.htm\" target=\"_blank\" rel=\"noopener\">Prof. Wenwei Wang</a> and <a href=\"https://me.bit.edu.cn/szdw/jsml/jlgcx/ddjlgcjzzx/sssds4/c733b8b7175d419ca5590023ceee8b34.htm\" target=\"_blank\" rel=\"noopener\">Assoc. Prof. Yiding Li</a>.",
			"bio.p2": "I am jointly trained with the National Engineering Research Center of Electric Vehicles and the Shenzhen Automotive Research Institute. Our group belongs to the electric-vehicle research team led by Academician <a href=\"https://me.bit.edu.cn/szdw/jsml/jlgcx/ddjlgcjzzx/bssds4/fc60fc69a21a4ba0bdadd2245e876a13.htm\" target=\"_blank\" rel=\"noopener\">Fengchun Sun</a>.",
			"exp.eyebrow": "Experience",
			"exp.title": "Positions and training.",
			"contact.eyebrow": "Contact",
			"contact.title": "Let’s discuss battery intelligence and real-world estimation.",
			"contact.email": "Email Zhen Wang",
			"contact.scholar": "Google Scholar",
			"contact.github": "GitHub",
			"footer.updated": "Content updated",
			"noscript": "This site needs JavaScript to display the publication archive and updates."
		},
		zh: {
			"nav.research": "研究",
			"nav.publications": "论文",
			"nav.updates": "动态",
			"nav.bio": "简介",
			"nav.contact": "联系",
			"lang.switch": "English",
			"lang.switchAria": "Switch to English",
			"identity.tagline": "电池智能研究者",
			"hero.eyebrow": "博士研究生 · 北京理工大学",
			"hero.title": "让电池健康在不完整的真实数据中变得可读。",
			"hero.summary": "我致力于面向碎片化充电、低采样率遥测与智能电池感知的数据高效估计方法。",
			"hero.meta1": "博士研究生",
			"hero.meta2": "北京理工大学",
			"hero.meta3": "珠海 · 北京 · 深圳",
			"hero.cta": "查看代表论文",
			"featured.eyebrow": "代表工作",
			"featured.online": "最新上线",
			"jif.badge": "影响因子",
			"strip.eyebrow": "期刊影响力",
			"strip.text": "当前期刊影响因子，合计值按每篇期刊论文各计一次。",
			"strip.total": "影响因子合计",
			"strip.detail": "篇期刊论文 · 每篇计一次",
			"strip.released": "发布于",
			"pub.eyebrow": "研究成果",
			"pub.title": "代表工作与论文存档。",
			"pub.text": "期刊、年份与影响因子保持醒目；会议论文与预印本单独标注，不计期刊指标。",
			"pub.filter.all": "全部",
			"pub.filter.journal": "期刊",
			"pub.filter.conference": "会议",
			"pub.filter.preprint": "预印本",
			"pub.note": "影响因子为 2026 年发布的 2025 年 JIF。合计值按每篇期刊论文各计一次。* 为通讯作者。",
			"pub.viewPaper": "查看论文",
			"pub.viewPreprint": "查看预印本",
			"pub.code": "代码",
			"pub.released": "发布于",
			"pub.empty": "该类别暂无论文。",
			"type.journal": "期刊论文",
			"type.conference": "会议论文",
			"type.preprint": "预印本",
			"news.eyebrow": "研究日志",
			"news.title": "最新动态。",
			"news.text": "论文发表、成果发布与学术里程碑的简要记录。",
			"news.read": "阅读论文",
			"news.showAll": "展开全部动态",
			"news.showFewer": "收起动态",
			"bio.eyebrow": "个人背景",
			"bio.title": "横跨电池、车辆与智能系统的研究。",
			"bio.p1": "我是北京理工大学能源与交通学域的博士研究生，导师为<a href=\"https://me.bit.edu.cn/szdw/jsml/jlgcx/ddjlgcjzzx/bssds4/6b31e9e9d81f4fea81033f02c356fb64.htm\" target=\"_blank\" rel=\"noopener\">王文伟教授</a>与<a href=\"https://me.bit.edu.cn/szdw/jsml/jlgcx/ddjlgcjzzx/sssds4/c733b8b7175d419ca5590023ceee8b34.htm\" target=\"_blank\" rel=\"noopener\">李宜丁副教授</a>。",
			"bio.p2": "我在电动车辆国家工程研究中心与深圳汽车研究院联合培养。课题组隶属于<a href=\"https://me.bit.edu.cn/szdw/jsml/jlgcx/ddjlgcjzzx/bssds4/fc60fc69a21a4ba0bdadd2245e876a13.htm\" target=\"_blank\" rel=\"noopener\">孙逢春</a>院士领衔的电动车辆研究团队。",
			"exp.eyebrow": "经历",
			"exp.title": "任职与培养经历。",
			"contact.eyebrow": "联系方式",
			"contact.title": "欢迎交流电池智能与真实工况下的状态估计。",
			"contact.email": "给王震发邮件",
			"contact.scholar": "Google Scholar",
			"contact.github": "GitHub",
			"footer.updated": "内容更新于",
			"noscript": "本站需要启用 JavaScript 才能显示论文存档与动态。"
		}
	}
};
