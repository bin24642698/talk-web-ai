import ChatInterface from '../components/ChatInterface'
import Link from 'next/link'
import Head from 'next/head'
import { useEffect } from 'react'

export default function Home() {
  // 动态添加吉卜力背景图样式
  useEffect(() => {
    document.body.classList.add('ghibli-bg');
    // 可选：在组件卸载时移除类
    return () => {
      document.body.classList.remove('ghibli-bg');
    };
  }, []);

  return (
    <>
      <Head>
        <title>AI Chat</title> 
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap" />
        <style jsx global>{`
          html, body {
            height: 100%;
            margin: 0;
            padding: 0;
          }
          html {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            font-weight: normal;
            scroll-behavior: smooth;
          }
          
          body {
            font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif;
            font-weight: normal;
            background-color: #F7F4EB; 
          }
          
          /* 吉卜力风格背景 */
          .ghibli-bg {
            background-color: #F7F4EB;
            background-image: 
              radial-gradient(rgba(139, 184, 168, 0.5) 1px, transparent 1px),
              radial-gradient(rgba(106, 155, 176, 0.5) 1px, transparent 1px);
            background-size: 50px 50px;
            background-position: 0 0, 25px 25px;
            background-attachment: fixed;
          }
          
          /* 云朵装饰 */
          .ghibli-cloud {
            position: absolute;
            background: white;
            border-radius: 50%;
            filter: blur(15px);
            opacity: 0.3;
            z-index: 0; 
          }
          
          /* 小飞机悬浮动画 */
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(-2deg); }
          }
          
          .float-animation {
            animation: float 8s ease-in-out infinite;
          }
        `}</style>
      </Head>
      {/* Main container: Full screen, flexbox centering */}
      <div className="relative min-h-screen flex justify-center items-center w-full p-4">
        {/* Decorative elements (absolute positioning relative to main container) */}
        <div className="ghibli-cloud w-32 h-32 top-20 left-[15%]"></div>
        <div className="ghibli-cloud w-24 h-24 top-10 right-[20%]"></div>
        <div className="ghibli-cloud w-40 h-20 bottom-60 left-[10%]"></div>
        <div className="ghibli-cloud w-28 h-28 bottom-40 right-[15%]"></div>
        
        {/* Chat Interface Component (Direct child, centered by parent flex) */}
        <div className="w-full max-w-5xl">
          <ChatInterface />
        </div>
        
        {/* Floating Action Button (Top Right) */}
        <Link 
          href="/route1" 
          className="absolute top-5 right-5 w-12 h-12 bg-white/80 backdrop-blur-sm shadow-md rounded-xl flex items-center justify-center hover:shadow-lg transition-all duration-300 z-20 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="absolute text-[10px] font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-300 -mt-9 z-10 opacity-80">创作空间</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="relative z-10 w-5 h-5 text-blue-600 group-hover:text-teal-700 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </Link>
        
        {/* Floating Decoration (Bottom Right) */}
        <div className="absolute bottom-10 right-10 w-16 h-16 z-0 opacity-60 float-animation">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13" stroke="#a7c1b3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#9bbbd0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </>
  )
}