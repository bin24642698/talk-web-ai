import { useState, useEffect, useRef } from 'react';
import { FiSend, FiSettings, FiX, FiInfo, FiImage, FiTrash2, FiMessageSquare, FiMoon, FiSun, FiEdit, FiPlus, FiList, FiStar, FiMenu, FiClock, FiChevronRight, FiClipboard, FiCheck, FiSave, FiKey, FiFile, FiUser, FiCpu, FiLoader, FiEdit3, FiEye, FiEyeOff } from 'react-icons/fi';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Buffer } from 'buffer';
import OpenAI from 'openai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Switch } from '@headlessui/react';

// 浏览器环境中需要确保全局Buffer可用
if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer || Buffer;
}

// Simple CodeBlock component for syntax highlighting
const CodeBlock = ({ language, value }) => {
  return (
    <div className="relative rounded-md overflow-hidden bg-gray-800 dark:bg-gray-900 my-2">
      <div className="flex items-center justify-between px-4 py-1 bg-gray-700 dark:bg-gray-800 text-xs text-gray-200">
        <span>{language || 'code'}</span>
        <button 
          onClick={() => {
            navigator.clipboard.writeText(value);
            // Could add a toast notification here
          }}
          className="text-gray-300 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          <FiClipboard size={14} />
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-gray-300">
        <code>{value}</code>
      </pre>
    </div>
  );
};

// 定义模型常量以避免重复的字符串
const MODELS = {
  GEMINI_FLASH: 'gemini-2.0-flash-exp',
  GEMINI_FLASH_THINKING: 'gemini-2.0-flash-thinking-exp',
  GEMINI_PRO: 'gemini-2.5-pro-exp',
  OPENROUTER_GEMINI_PRO: 'google/gemini-2.5-pro-exp-03-25:free',
  OPENROUTER_GEMINI_FLASH_THINKING: 'google/gemini-2.0-flash-thinking-exp:free',
  DEEPSEEK: 'deepseek-chat'
};

// OpenRouter API密钥
const OPENROUTER_API_KEY = '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';

// 本地存储键
const STORAGE_KEYS = {
  API_KEYS: 'apiKeys',
  DEEPSEEK_API_KEY: 'deepseekApiKey',
  OPENROUTER_API_KEY: 'openrouterApiKey',
  SELECTED_MODEL: 'selectedModel',
  ENABLE_IMAGE_GENERATION: 'enableImageGeneration',
  DARK_MODE: 'darkMode',
  SYSTEM_PROMPT: 'systemPrompt',
  CHAT_HISTORY: 'chatHistory'
};

// 通用本地存储操作辅助函数
const storage = {
  // 保存数据到本地存储
  save: (key, value) => {
    try {
      if (typeof window === 'undefined') return;
      
      // 对象类型需要序列化
      const valueToStore = typeof value === 'object' 
        ? JSON.stringify(value) 
        : String(value);
      
      localStorage.setItem(key, valueToStore);
      return true;
    } catch (error) {
      console.error(`保存${key}失败:`, error);
      return false;
    }
  },
  
  // 从本地存储读取数据
  load: (key, defaultValue = null) => {
    try {
      if (typeof window === 'undefined') return defaultValue;
      
      const value = localStorage.getItem(key);
      if (value === null) return defaultValue;
      
      // 尝试解析JSON
      if (value.startsWith('{') || value.startsWith('[')) {
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      }
      
      // 处理布尔值
      if (value === 'true') return true;
      if (value === 'false') return false;
      
      return value;
    } catch (error) {
      console.error(`加载${key}失败:`, error);
      return defaultValue;
    }
  },
  
  // 删除本地存储中的数据
  remove: (key) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`删除${key}失败:`, error);
      return false;
    }
  }
};

// 通用的流式响应处理器
const createStreamProcessor = (aiMessageId, setMessages) => {
  const charQueue = [];
  let isProcessingQueue = false;
  
  // 处理字符队列
  const processQueue = () => {
    if (charQueue.length === 0) {
      isProcessingQueue = false;
      return;
    }
    
    isProcessingQueue = true;
    const char = charQueue.shift();
    
    // 更新消息列表中的当前AI消息
    setMessages(prevMessages => {
      const newMessages = [...prevMessages];
      const aiMessageIndex = newMessages.findIndex(msg => msg.id === aiMessageId);
      if (aiMessageIndex !== -1) {
        newMessages[aiMessageIndex] = {
          ...newMessages[aiMessageIndex],
          text: newMessages[aiMessageIndex].text + char
        };
      }
      return newMessages;
    });
    
    setTimeout(() => {
      processQueue();
    }, 15); // 字符显示的延迟
  };
  
  // 添加文本到队列
  const addToQueue = (text) => {
    for (const char of text) {
      charQueue.push(char);
    }
    
    // 如果队列处理没有在运行，启动它
    if (!isProcessingQueue) {
      processQueue();
    }
  };
  
  // 完成流式生成（设置isStreaming=false）
  const finishStreaming = (delay = 100) => {
    setTimeout(() => {
      setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        const aiMessageIndex = newMessages.findIndex(msg => msg.id === aiMessageId);
        if (aiMessageIndex !== -1) {
          newMessages[aiMessageIndex] = {
            ...newMessages[aiMessageIndex],
            isStreaming: false
          };
        }
        return newMessages;
      });
    }, delay);
  };
  
  return {
    addToQueue,
    finishStreaming
  };
};

// 图片组件 - 包含错误处理和加载状态
const ImageWithFallback = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {hasError ? (
        <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg">
          <div className="text-center text-gray-500">
            <FiImage className="mx-auto mb-2 text-3xl" />
            <p>图片加载失败</p>
          </div>
        </div>
      ) : (
        <>
          <img 
            src={src} 
            alt={alt} 
            onClick={toggleZoom}
            className={`${className} transition-all duration-300 cursor-pointer ${isLoading ? 'hidden' : 'block'}`}
          />
          {isZoomed && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
              onClick={toggleZoom}
            >
              <img 
                src={src} 
                alt={alt} 
                className="max-w-[90vw] max-h-[90vh] object-contain animate-fade-in"
              />
              <button 
                className="absolute top-4 right-4 p-2 text-white bg-black bg-opacity-50 rounded-full transition-all hover:bg-gradient-to-r hover:from-gray-800 hover:to-black hover:shadow-lg hover:shadow-black/30 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white btn-icon"
                onClick={toggleZoom}
              >
                <FiX size={24} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Simple ApiKeyManagerModal component
const ApiKeyManagerModal = ({ isOpen, onClose, onSave }) => {
  const [openaiKey, setOpenaiKey] = useState('');
  
  useEffect(() => {
    // Load saved keys from localStorage when modal opens
    if (isOpen) {
      setOpenaiKey(localStorage.getItem('openai_api_key') || '');
    }
  }, [isOpen]);
  
  const handleSave = () => {
    onSave({
      openai: openaiKey
    });
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl overflow-hidden">
        <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <h3 className="text-xl font-semibold">API 密钥管理</h3>
          <p className="text-sm opacity-90 mt-1">设置API密钥</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OpenAI API 密钥</label>
            <input
              type="password"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
            />
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple PromptEditorModal component
const PromptEditorModal = ({ isOpen, onClose, initialPrompt, onSave }) => {
  const [prompt, setPrompt] = useState(initialPrompt || '');
  
  useEffect(() => {
    if (isOpen) {
      setPrompt(initialPrompt || '');
    }
  }, [isOpen, initialPrompt]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl overflow-hidden">
        <div className="p-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <h3 className="text-xl font-semibold">系统提示词编辑器</h3>
          <p className="text-sm opacity-90 mt-1">自定义AI助手的行为和角色</p>
        </div>
        
        <div className="p-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={8}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md resize-none"
            placeholder="例如: 你是一个乐于助人的AI助手..."
          />
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"
            >
              取消
            </button>
            <button
              onClick={() => onSave(prompt)}
              className="px-4 py-2 bg-purple-600 text-white rounded-md"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ChatInterface() {
  // State for messages
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for settings
  const [darkMode, setDarkMode] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful assistant.');
  
  // State for modals
  const [showSettings, setShowSettings] = useState(false);
  const [showApiKeyManager, setShowApiKeyManager] = useState(false);
  const [showPromptEditor, setShowPromptEditor] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  // State for image handling
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [viewingImage, setViewingImage] = useState(null);
  
  // Refs
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  // Load settings from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDarkMode = localStorage.getItem('darkMode') === 'true';
      const savedModel = localStorage.getItem('selectedModel') || 'gpt-4o';
      const savedApiKey = localStorage.getItem('openai_api_key') || '';
      const savedSystemPrompt = localStorage.getItem('system_prompt') || 'You are a helpful assistant.';
      
      setDarkMode(savedDarkMode);
      setSelectedModel(savedModel);
      setApiKey(savedApiKey);
      setSystemPrompt(savedSystemPrompt);
      
      // Apply dark mode to document
      if (savedDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);
  
  // Save dark mode preference when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', darkMode);
      
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [darkMode]);
  
  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  
  // Handle key press in textarea
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };
  
  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      // In a real app, you would upload the image to a server or cloud storage
      // For demo purposes, we'll just use a local URL
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    } catch (err) {
      setError('Image upload failed');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };
  
  // Handle image click to view full size
  const handleImageClick = (imageUrl) => {
    setViewingImage(imageUrl);
  };
  
  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (loading) return;
    if (!input.trim() && !selectedImage) return;
    
    // Add user message to chat
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: selectedImage 
        ? `![Image](${selectedImage}) ${input}`.trim()
        : input.trim()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedImage(null);
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would send the message to an API
      // For demo purposes, we'll just simulate a response
      setTimeout(() => {
        const botMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'This is a simulated response. In a real app, this would be the response from the AI model.'
        };
        
        setMessages(prev => [...prev, botMessage]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
      setLoading(false);
    }
  };
  
  // Clear chat history
  const clearChatHistory = () => {
    setMessages([]);
    setShowClearConfirm(false);
  };
  
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-xl shadow-lg overflow-hidden h-[90vh] ${darkMode ? 'dark:bg-gray-800/80' : ''}">
      {/* 顶部导航栏 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">AI 助手</h1>
          <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
            {selectedModel}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? <FiSun className="text-yellow-500" /> : <FiMoon className="text-gray-600" />}
          </button>
          <button 
            onClick={() => setShowSettings(true)} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <FiSettings className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* 聊天区域 */}
      <div ref={chatContainerRef} className="flex-grow flex flex-col px-4 pt-6 pb-2 sm:px-6 md:px-8 overflow-y-auto scroll-smooth relative">
        {/* 消息列表 */}
        <div className="flex-grow space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`relative px-4 py-3 rounded-xl max-w-lg lg:max-w-xl xl:max-w-2xl break-words ${ 
                  message.role === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none shadow-md'
                    : `bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none shadow-md border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center shadow-sm">
                    <FiCpu size={12} className="text-gray-600 dark:text-gray-300"/>
                  </div>
                )}
                {message.role === 'user' && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center shadow-sm">
                    <FiUser size={12} className="text-blue-600 dark:text-blue-300"/>
                  </div>
                )}
                
                {message.content.startsWith('![Image]') ? (
                  (() => {
                    const imageUrl = message.content.substring(9, message.content.indexOf(')'));
                    const caption = message.content.substring(message.content.indexOf(')') + 1).trim();
                    return (
                      <div className="flex flex-col items-center">
                        <img 
                          src={imageUrl} 
                          alt="Uploaded content" 
                          className="max-w-full h-auto rounded-lg mb-2 cursor-pointer" 
                          style={{ maxWidth: '250px', maxHeight: '250px' }}
                          onClick={() => handleImageClick(imageUrl)}
                        />
                        {caption && <p className="text-sm italic text-center mt-1">{caption}</p>}
                      </div>
                    );
                  })()
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline ? (
                            <CodeBlock
                              language={match ? match[1] : ''}
                              value={String(children).replace(/\n$/, '')}
                              {...props}
                            />
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                        a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" />
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse">
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
          {error && <div className="text-red-500 text-sm px-4 py-2 bg-red-100 dark:bg-red-900/50 rounded-md border border-red-300 dark:border-red-700">Error: {error}</div>}
          {messages.length === 0 && !loading && !error && (
            <div className="flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 h-full py-10">
              <FiMessageSquare size={32} className="mb-3 opacity-70"/>
              <p className="text-sm">开始聊天吧！</p>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="px-4 py-3 sm:px-6 md:px-8 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-600 relative">
        <form onSubmit={sendMessage} className="flex items-end gap-2">
          {selectedImage && (
            <div className="absolute bottom-full left-4 mb-2 p-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex items-center gap-2 z-10">
              <img src={selectedImage} alt="Preview" className="w-12 h-12 rounded object-cover" />
              <button 
                type="button" 
                onClick={() => setSelectedImage(null)} 
                className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors p-1 rounded-full bg-white/50 hover:bg-red-100/50 dark:bg-gray-700/50 dark:hover:bg-red-900/50"
              >
                <FiX size={16} />
              </button>
            </div>
          )}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="输入消息... (Shift+Enter 换行)"
            className="flex-grow p-2.5 pr-20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700 focus:border-blue-400 dark:focus:border-blue-500 outline-none resize-none transition-all duration-200 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
            rows={1}
            style={{ minHeight: '44px', maxHeight: '200px' }}
          />
          <div className="absolute right-6 bottom-4 flex items-center space-x-2">
            <label htmlFor="image-upload" className={`p-2 rounded-full cursor-pointer transition-colors ${isUploading ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-blue-100/50 dark:hover:bg-blue-900/50'}`}>
              {isUploading ? <FiLoader size={18} className="animate-spin" /> : <FiImage size={18} />}
            </label>
            <input 
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isUploading}
            />
            <button 
              type="submit" 
              disabled={loading || (!input.trim() && !selectedImage)}
              className={`p-2 rounded-full transition-all duration-200 ease-in-out flex items-center justify-center ${loading || (!input.trim() && !selectedImage) ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-inner'}`}
              style={{ width: '36px', height: '36px' }}
            >
              {loading ? <FiLoader size={18} className="animate-spin" /> : <FiSend size={18} />}
            </button>
          </div>
        </form>
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowApiKeyManager(true)} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
              <FiKey size={12} /> API密钥
            </button>
            <button onClick={() => setShowPromptEditor(true)} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
              <FiEdit3 size={12} /> 角色设置
            </button>
            <button onClick={() => setShowClearConfirm(true)} className="hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1">
              <FiTrash2 size={12} /> 清空对话
            </button>
          </div>
        </div>
      </div>
      
      {/* 模态框部分保持不变 */}
      {/* ... existing modals ... */}
    </div>
  );
}