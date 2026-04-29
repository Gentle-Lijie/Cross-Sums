<div align="center">

# ✖️ Cross-Sums

**一款基于数字逻辑的网页益智游戏**

[![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

[![GitHub stars](https://img.shields.io/github/stars/Gentle-Lijie/Cross-Sums?style=for-the-badge&logo=github&color=f0c040)](https://github.com/Gentle-Lijie/Cross-Sums/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Gentle-Lijie/Cross-Sums?style=for-the-badge&logo=github&color=4ea1f3)](https://github.com/Gentle-Lijie/Cross-Sums/network)
[![GitHub issues](https://img.shields.io/github/issues/Gentle-Lijie/Cross-Sums?style=for-the-badge&logo=github&color=e05d44)](https://github.com/Gentle-Lijie/Cross-Sums/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/Gentle-Lijie/Cross-Sums?style=for-the-badge&logo=github&color=brightgreen)](https://github.com/Gentle-Lijie/Cross-Sums/commits)

[![Node](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10+-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square&logo=github)](https://github.com/Gentle-Lijie/Cross-Sums/pulls)
[![Made with ❤️](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-red?style=flat-square)](https://github.com/Gentle-Lijie/Cross-Sums)

</div>

---

## 📖 游戏介绍

**Cross-Sums** 是一款基于数字逻辑的网页益智游戏。每局游戏会生成一个数字网格，玩家需要找出每一行、每一列中哪些数字被"保留"，哪些数字被"划去"，使得每行每列中保留的数字之和等于对应的行/列标题数字。

- 🧮 **横纵求和**：每行和每列都有一个目标和，玩家需要判断格子里的数字是否计入总和
- 🖊️ **双模式操作**：橡皮擦模式（划去不计入的格子）和铅笔模式（标记计入总和的格子）
- ❤️ **生命值系统**：错误操作会扣除生命值（每次 -20），共 100 点 HP（5 颗心），归零即游戏结束
- 🎯 **三档难度**：简单（4×4）、中等（6×6）、困难（8×8）

---

## 🖼️ 界面截图

### 难度选择页

![难度选择页](https://github.com/user-attachments/assets/e53c91c6-b272-4288-a60c-2a98037f9845)

> 游戏开始时，玩家可以选择 **EASY（简单）**、**MEDIUM（中等）** 或 **HARD（困难）** 三种难度。顶部导航栏显示游戏标题及当前 HP（5 颗红心）。

---

### 游戏主界面（简单模式 · 4×4 网格）

![游戏主界面 Easy](https://github.com/user-attachments/assets/06fa09b8-b00f-4290-9388-027a84a66d3c)

> 简单模式下，网格为 4 列 × 4 行。顶部蓝色标题格显示各列的目标和，左侧蓝色标题格显示各行的目标和。底部切换按钮可在 **橡皮擦**（划去）和 **铅笔**（标记）模式间切换。

---

### 游戏主界面（中等模式 · 6×6 网格）

![游戏主界面 Medium](https://github.com/user-attachments/assets/3bee0d91-8d71-4d89-a2a8-d8576f50205c)

> 中等难度下，网格扩展至 6×6，逻辑更加复杂，需要更多推理来确定哪些数字计入行列总和。

---

## 🎮 游戏玩法

1. 选择难度，游戏随机生成一个数字网格
2. 观察各行（左侧标题）和各列（顶部标题）的**目标和**
3. 使用两种模式对格子进行判断：
   - **🧹 橡皮擦模式**：点击你认为**不计入**总和的格子（划去它）
   - **✏️ 铅笔模式**：点击你认为**应计入**总和的格子（标记它）
4. 判断正确时格子产生相应视觉反馈，行/列全部正确时对应标题变为绿色
5. 所有行列均验证正确，显示**胜利弹窗（PUZZLE SOLVED）**
6. 判断错误时扣除 20 点 HP；HP 归零时弹出**重生弹窗（OUT OF HP）**
7. 可随时点击顶部 **Restart** 按钮重新开始

---

## 🚀 快速开始

### 环境要求

| 工具 | 版本要求 |
|------|----------|
| Node.js | ≥ 20 |
| pnpm | ≥ 10 |

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/Gentle-Lijie/Cross-Sums.git
cd Cross-Sums

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

打开浏览器访问 [http://127.0.0.1:5173](http://127.0.0.1:5173) 即可开始游戏。

### 构建生产版本

```bash
pnpm build
```

构建产物输出至 `dist/` 目录。

### 预览生产构建

```bash
pnpm preview
```

---

## 🏗️ 项目结构

```
Cross-Sums/
├── src/
│   ├── components/
│   │   ├── Header.vue        # 顶部导航（标题、Restart 按钮、HP 心形显示）
│   │   ├── GamePanel.vue     # 游戏主面板（网格渲染、点击逻辑、模式切换）
│   │   ├── Difficulty.vue    # 难度选择页
│   │   ├── Victory.vue       # 胜利弹窗
│   │   └── Respawn.vue       # 游戏结束弹窗
│   ├── stores/
│   │   ├── games.ts          # HP 常量及游戏配置
│   │   └── icons.ts          # SVG 图标（心形、橡皮擦、铅笔）
│   ├── styles/
│   │   ├── Header.css        # 顶部样式
│   │   └── GamePanel.css     # 游戏面板样式
│   ├── utils/
│   │   ├── generator.ts      # 网格生成与答案逻辑
│   │   └── emitter.ts        # 全局事件总线（mitt）
│   ├── App.vue               # 根组件
│   └── main.ts               # 应用入口
├── public/                   # 静态资源
├── index.html
├── vite.config.ts
└── package.json
```

---

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| [Vue 3](https://vuejs.org/) | 前端框架，使用 `<script setup>` 组合式 API |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全 |
| [Vite](https://vitejs.dev/) | 构建工具与开发服务器 |
| [mitt](https://github.com/developit/mitt) | 轻量级全局事件总线 |
| [vue-tsc](https://github.com/vuejs/language-tools) | Vue 模板的 TypeScript 类型检查 |

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的功能分支：`git checkout -b feat/your-feature`
3. 提交更改：`git commit -m 'feat: add some feature'`
4. 推送分支：`git push origin feat/your-feature`
5. 发起 Pull Request

---

<div align="center">

Made with ❤️ by [Gentle-Lijie](https://github.com/Gentle-Lijie)

</div>
