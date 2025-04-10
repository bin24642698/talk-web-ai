import Head from 'next/head'

export default function Route1() {
  return (
    <>
      <Head>
        <title>知夏写作 - 我的创作空间</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap" />
        <style jsx global>{`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          
          html {
            font-size: 16px;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
          }
          
          body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.5;
            letter-spacing: -0.01em;
          }
          
          h1, h2, h3, h4, h5, h6 {
            letter-spacing: -0.02em;
            line-height: 1.25;
          }
          
          p {
            line-height: 1.625;
            letter-spacing: 0;
            font-weight: 400;
          }
          
          .text-shadow-sm {
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          }
          
          .text-shadow {
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          /* 增强字体清晰度 */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
          
          /* 增强文本对比度 */
          .text-gray-800 {
            color: rgba(31, 41, 55, 0.95) !important;
          }
          
          .text-gray-600 {
            color: rgba(75, 85, 99, 0.95) !important;
          }
          
          /* 增强清晰度的文本阴影 */
          .enhanced-text {
            text-shadow: 0 0 1px rgba(0, 0, 0, 0.01);
          }
        `}</style>
      </Head>
      <div className="flex min-h-screen font-sans antialiased text-gray-800" style={{
        backgroundColor: '#f6f9ff',
        backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(120, 180, 255, 0.15) 0%, transparent 30%),
            radial-gradient(circle at 90% 30%, rgba(167, 139, 250, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(96, 221, 142, 0.1) 0%, transparent 35%),
            linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 249, 255, 0.8) 100%)
        `,
        backgroundAttachment: 'fixed',
        fontFamily: "'Noto Sans SC', sans-serif",
        position: 'relative'
      }}>
        {/* 背景图案 */}
        <div className="absolute inset-0 pointer-events-none z-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        {/* Sidebar */}
        <aside className="w-72 flex flex-col flex-shrink-0 relative z-10" style={{
          background: 'rgba(30, 41, 72, 0.75)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}>
          {/* Logo/Brand */}
          <div className="h-20 flex items-center px-8 border-b border-slate-700/30 flex-shrink-0">
            <div className="bg-gradient-to-r from-cyan-400 to-teal-400 rounded-xl p-2.5 flex items-center justify-center mr-3.5 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"></path>
              </svg>
            </div>
            <span className="text-xl font-bold text-white enhanced-text">知夏写作</span>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 py-6 px-6 space-y-2.5 overflow-y-auto">
            <a href="#" className="flex items-center px-4 py-3.5 bg-white/10 text-white text-base font-medium rounded-xl group enhanced-text" style={{
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div className="absolute inset-0" style={{
                content: "''",
                background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%)',
                transform: 'rotate(30deg)',
                pointerEvents: 'none'
              }}></div>
              <svg className="w-6 h-6 mr-4 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              小说创作
            </a>
            <a href="#" className="flex items-center px-4 py-3.5 text-slate-300 hover:bg-white/10 hover:text-white text-base font-medium rounded-xl group transition-colors duration-200 enhanced-text">
              <svg className="w-6 h-6 mr-4 text-slate-400 group-hover:text-teal-300 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
              角色设计
            </a>
          </nav>
          
          {/* Sidebar Footer */}
          <div className="px-6 py-6 border-t border-slate-700/30 flex-shrink-0">
            <button className="p-3 text-slate-400 hover:text-teal-300 rounded-lg transition-colors duration-200">
              <span className="sr-only">功能</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="h-20 sticky top-0 z-10 flex-shrink-0 flex items-center justify-end px-10" style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.5)'
          }}>
            <a href="#" className="text-base font-medium text-emerald-600 mr-8 enhanced-text">创作空间</a>
            <a href="#" className="text-base text-gray-500 hover:text-gray-800 transition-colors duration-200 enhanced-text">我的作品</a>
          </header>

          {/* Content Area */}
          <div className="flex-1 p-10 overflow-y-auto relative">
            {/* 装饰图案 */}
            <div className="absolute inset-0 z-0" style={{
              backgroundImage: `
                radial-gradient(rgba(66, 133, 244, 0.08) 1px, transparent 1px),
                radial-gradient(rgba(66, 133, 244, 0.06) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px, 40px 40px',
              backgroundPosition: '0 0, 10px 10px',
              pointerEvents: 'none'
            }}></div>
            
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-10 enhanced-text" style={{
                background: 'linear-gradient(120deg, #1d976c 0%, #38ef7d 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
              }}>我的创作空间</h1>

              {/* Container for the cards */}
              <div className="flex flex-wrap gap-10">
                {/* Card 1: Create New */}
                <div className="rounded-2xl p-8 w-96 h-72 flex flex-col items-center justify-center text-center cursor-pointer" style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0px)';
                }}>
                  <div className="absolute inset-0" style={{
                    content: "''",
                    background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%)',
                    transform: 'rotate(30deg)',
                    pointerEvents: 'none'
                  }}></div>
                  <div className="relative mb-6" style={{
                    animation: 'float 6s ease-in-out infinite'
                  }}>
                    <button className="relative w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 via-emerald-500 to-green-500 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                    {/* Yellow Badge */}
                    <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 transform translate-x-1 -translate-y-1 ring-4 ring-white"></span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 enhanced-text">创建新作品</h3>
                  <p className="text-base text-gray-600 leading-relaxed px-4 enhanced-text">开启你的夏日创作之旅，记录灵感与故事</p>
                </div>

                {/* Card 2: Template Center */}
                <div className="rounded-2xl p-8 relative w-96 h-72 flex flex-col justify-between" style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0px)';
                }}>
                  <div className="absolute inset-0" style={{
                    content: "''",
                    background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%)',
                    transform: 'rotate(30deg)',
                    pointerEvents: 'none'
                  }}></div>
                  <div>
                    <div className="mb-4">
                      <svg className="w-9 h-9 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1 enhanced-text">模板中心</h3>
                    <h4 className="text-base font-medium text-emerald-600 mb-3 enhanced-text">探索创作模板</h4>
                    <p className="text-base text-gray-600 leading-relaxed enhanced-text">使用专业模板快速开始你的创作</p>
                  </div>
                  <a href="#" className="absolute bottom-8 right-8 group">
                    <svg className="w-7 h-7 text-emerald-500 group-hover:text-emerald-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </a>
                </div>

                {/* 新增: 创作灵感卡片 */}
                <div className="rounded-2xl p-8 relative w-96 h-72 flex flex-col justify-between" style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0px)';
                }}>
                  <div className="absolute inset-0" style={{
                    content: "''",
                    background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%)',
                    transform: 'rotate(30deg)',
                    pointerEvents: 'none'
                  }}></div>
                  <div>
                    <div className="mb-4">
                      <svg className="w-9 h-9 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1 enhanced-text">灵感收集</h3>
                    <h4 className="text-base font-medium text-purple-500 mb-3 enhanced-text">捕捉创意火花</h4>
                    <p className="text-base text-gray-600 leading-relaxed enhanced-text">收集并整理你的创作灵感和想法</p>
                  </div>
                  <a href="#" className="absolute bottom-8 right-8 group">
                    <svg className="w-7 h-7 text-purple-500 group-hover:text-purple-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Action Button */}
          <button className="fixed bottom-10 right-10 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-6 py-3.5 rounded-xl flex items-center text-base font-medium transition-all duration-300 z-20 enhanced-text" style={{
            boxShadow: '0 10px 25px rgba(249, 115, 22, 0.3), 0 5px 15px rgba(249, 115, 22, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(249, 115, 22, 0.4), 0 8px 20px rgba(249, 115, 22, 0.2)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(249, 115, 22, 0.3), 0 5px 15px rgba(249, 115, 22, 0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 15l2.846-.813a4.5 4.5 0 003.09-3.09L9 7.25l.813 2.846a4.5 4.5 0 003.09 3.09L15 15l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 7.5l.813 2.846a4.5 4.5 0 013.09 3.09L24.75 15l-2.846.813a4.5 4.5 0 01-3.09 3.09L18.25 21l-.813-2.846a4.5 4.5 0 01-3.09-3.09L12.75 15l2.846-.813a4.5 4.5 0 013.09-3.09L18.25 7.5z" />
            </svg>
            创作助手
          </button>
        </main>
      </div>
    </>
  )
} 