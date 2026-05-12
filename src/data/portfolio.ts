export type TerminalPhase = 'typing' | 'docking' | 'docked' | 'skipped'

export type Project = {
  id: string
  title: string
  cn: string
  desc: string
  stack: string[]
  repo: string
  image: string
  note: string
}

export type Landscape = {
  id: string
  city: string
  image: string
  note: string
  rotation: number
}

export type Cat = {
  id: string
  image: string
  note: string
  rotation: number
}

export const terminalLines = [
  'yyyyyynnn@archive:~$ pnpm run boot:portfolio',
  '> initializing paper archive...',
  '> loading project metadata...',
  '> indexing landscape captures...',
  '> pinning cat stickers...',
  '> composing hero layout...',
  '> syncing terminal to device...',
  'done.',
  'yyyyyynnn@archive:~$ open home',
]

export const projects: Project[] = [
  {
    id: '01',
    title: 'Immersive Interview System',
    cn: '沉浸式模拟面试系统',
    desc: '基于大语言模型的模拟面试与简历诊断系统，覆盖简历解析、岗位匹配、阶段化问答、会话回放、报告生成和能力分析。',
    stack: ['Vue 3', 'TypeScript', 'Vite', 'Spring Boot', 'MySQL', 'SSE', 'LLM API', 'ECharts'],
    repo: 'github.com/zyyyyynnn/graduation-project',
    image: '/assets/projects/project-01-interview.png',
    note: 'Code shapes logic.',
  },
  {
    id: '02',
    title: 'Meeting Room Reservation System',
    cn: '会议室预约与资源协调系统',
    desc: '面向会议室资源协调的预约管理系统，包含运营看板、会议预约、会议室管理、审批、通知抽屉和用户管理等界面。',
    stack: ['Vue 3', 'TypeScript', 'Vite', 'Element Plus', 'FullCalendar', 'Axios'],
    repo: 'github.com/zyyyyynnn/meeting-room-system',
    image: '/assets/projects/project-02-meeting-room.png',
    note: 'Pinned workflow.',
  },
  {
    id: '03',
    title: 'AI Procurement Platform',
    cn: 'AI 采购与供应商准入平台',
    desc: '基于 AI 智能体的企业采购与供应商准入协同平台，覆盖采购申请、审批流转、AI 辅助审核、通知留痕与统计看板。',
    stack: ['Vue 3', 'TypeScript', 'Vite', 'Spring Boot', 'JWT', 'MyBatis-Plus', 'MySQL', 'Redis'],
    repo: 'github.com/zyyyyynnn/ai-procurement-platform',
    image: '/assets/projects/project-03-procurement.png',
    note: 'Archived system.',
  },
]

export const landscapes: Landscape[] = [
  { id: '01', city: '厦门 Xiamen', image: '/assets/photos/landscapes/landscape-01-xiamen.jpg', note: '24.47°N', rotation: -3 },
  { id: '02', city: '重庆 Chongqing', image: '/assets/photos/landscapes/landscape-02-chongqing.jpg', note: 'mountain city', rotation: 1.8 },
  { id: '03', city: '长沙 Changsha', image: '/assets/photos/landscapes/landscape-03-changsha.jpg', note: 'neon rain', rotation: -1.5 },
  { id: '04', city: '广州 Guangzhou', image: '/assets/photos/landscapes/landscape-04-guangzhou.jpg', note: 'tower line', rotation: 2.6 },
  { id: '05', city: '南京 Nanjing', image: '/assets/photos/landscapes/landscape-05-nanjing.jpg', note: 'quiet wall', rotation: -2.4 },
  { id: '06', city: '南昌 Nanchang', image: '/assets/photos/landscapes/landscape-06-nanchang.jpg', note: 'rose note', rotation: 1.2 },
  { id: '07', city: '丽江 Lijiang', image: '/assets/photos/landscapes/landscape-07-lijiang.jpg', note: 'blue lake', rotation: 3.2 },
  { id: '08', city: '武汉 Wuhan', image: '/assets/photos/landscapes/landscape-08-wuhan.jpg', note: 'night tower', rotation: -1 },
  { id: '09', city: '青岛 Qingdao', image: '/assets/photos/landscapes/landscape-09-qingdao.jpg', note: 'sea frame', rotation: 2 },
]

export const cats: Cat[] = [
  { id: '01', image: '/assets/photos/cats/cat-01.png', note: '猫猫出没', rotation: -5 },
  { id: '02', image: '/assets/photos/cats/cat-02.png', note: 'archived cat', rotation: 4 },
  { id: '03', image: '/assets/photos/cats/cat-03.png', note: 'quiet visitor', rotation: -2 },
  { id: '04', image: '/assets/photos/cats/cat-04.png', note: 'found frame', rotation: 6 },
  { id: '05', image: '/assets/photos/cats/cat-05.png', note: 'take a rest', rotation: -4 },
  { id: '06', image: '/assets/photos/cats/cat-06.png', note: 'daily companion', rotation: 2 },
]

export const contact = {
  primaryEmail: 'ww7296298@gmail.com',
  secondaryEmail: '1974447317@qq.com',
  github: 'https://github.com/zyyyyynnn',
  githubLabel: 'github.com/zyyyyynnn',
  douyin: 'ynzhang0118',
  wechat: '13312244867',
}
