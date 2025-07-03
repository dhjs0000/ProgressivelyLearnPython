/*
    循序渐进学Python : JavaScript部分（script.js）
    Copyright (C) 2025  dhjs0000

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://gnu.ac.cn/licenses/>.
*/

document.addEventListener('DOMContentLoaded', function() {
    // 教程结构
    const tutorials = [
        {
            name: '0级',
            type: 'folder',
            children: [
                {
                    name: '0.1 理论与环境',
                    type: 'folder',
                    children: [
                        { name: '0.1.1 python环境配置', type: 'file', path: '0级/0.1 理论与环境/0.1.1 python环境配置.md' },
                        { name: '0.1.2 python重要组成部分解释', type: 'file', path: '0级/0.1 理论与环境/0.1.2 python重要组成部分解释.md' },
                        { name: '0.1.3 IDE的重要性', type: 'file', path: '0级/0.1 理论与环境/0.1.3 IDE的重要性.md' },
                        { name: '0.1.4 如何使用Visual Studio Code', type: 'file', path: '0级/0.1 理论与环境/0.1.4 如何使用Visual Studio Code.md' },
                        { name: '0.1.5 Visual Studio Code中的第三方库', type: 'file', path: '0级/0.1 理论与环境/0.1.5 Visual Studio Code中的第三方库.md' }
                    ]
                },
                {
                    name: '0.2 第一个程序',
                    type: 'folder',
                    children: [
                        { name: '0.2.1 你的第一个python程序', type: 'file', path: '0级/0.2 第一个程序/0.2.1 你的第一个python程序.md' },
                        { name: '0.2.2 变量——数据的储物盒', type: 'file', path: '0级/0.2 第一个程序/0.2.2 变量——数据的储物盒.md' },
                        { name: '0.2.3 数据类型——认识不同的货物', type: 'file', path: '0级/0.2 第一个程序/0.2.3 数据类型——认识不同的货物.md' },
                        { name: '0.2.4 输入输出——与程序对话', type: 'file', path: '0级/0.2 第一个程序/0.2.4 输入输出——与程序对话.md' }
                    ]
                },
                {
                    name: '0.3 数据类型详解',
                    type: 'folder',
                    children: [
                        { name: '0.3.1 字符串', type: 'file', path: '0级/0.3 数据类型详解/0.3.1 字符串.md' },
                        { name: '0.3.2 整数', type: 'file', path: '0级/0.3 数据类型详解/0.3.2 整数.md' }
                    ]
                }
            ]
        }
    ];
    
    // 生成目录
    function generateDirectory(items, parentElement) {
        items.forEach(item => {
            const li = document.createElement('li');
            
            if (item.type === 'folder') {
                const folderDiv = document.createElement('div');
                folderDiv.className = 'folder';
                folderDiv.textContent = item.name;
                
                folderDiv.addEventListener('click', function(e) {
                    e.stopPropagation();
                    this.classList.toggle('open');
                    // 找到下一个兄弟元素（folder-content），并切换其显示状态
                    const folderContent = this.nextElementSibling;
                    if (folderContent && folderContent.classList.contains('folder-content')) {
                        if (this.classList.contains('open')) {
                            folderContent.style.display = 'block';
                        } else {
                            folderContent.style.display = 'none';
                        }
                    }
                });
                
                li.appendChild(folderDiv);
                
                const folderContent = document.createElement('div');
                folderContent.className = 'folder-content';
                folderContent.style.display = 'none'; // 默认隐藏
                
                const ul = document.createElement('ul');
                generateDirectory(item.children, ul);
                
                folderContent.appendChild(ul);
                li.appendChild(folderContent);
            } else if (item.type === 'file') {
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = item.name;
                a.setAttribute('data-path', item.path);
                
                a.addEventListener('click', function(e) {
                    e.preventDefault();
                    loadMarkdownFile(this.getAttribute('data-path'));
                });
                
                li.appendChild(a);
            }
            
            parentElement.appendChild(li);
        });
    }
    
    // 安全地转换文本为ID字符串
    function safeToId(text) {
        // 检查text是否为字符串
        if (typeof text !== 'string') {
            console.warn('不是字符串类型:', text);
            // 如果不是字符串，转换为字符串
            text = String(text || '');
        }
        
        // 将文本转换为小写，并替换非单词字符为连字符
        return text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
    }
    
    // 生成右侧大纲导航
    function generateOutline(headings) {
        const outlineElement = document.getElementById('outline');
        outlineElement.innerHTML = ''; // 清空现有内容
        
        // 调试信息
        console.log('生成大纲，标题数量:', headings.length);
        
        if (headings.length === 0) {
            const emptyNote = document.createElement('li');
            emptyNote.textContent = '无可用大纲';
            emptyNote.style.color = '#999';
            emptyNote.style.fontStyle = 'italic';
            outlineElement.appendChild(emptyNote);
            return;
        }
        
        headings.forEach(heading => {
            const li = document.createElement('li');
            li.className = `h${heading.level}`;
            
            const a = document.createElement('a');
            a.href = `#${heading.id}`;
            a.textContent = heading.text;
            
            a.addEventListener('click', function(e) {
                e.preventDefault();
                const targetElement = document.getElementById(heading.id);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
            
            li.appendChild(a);
            outlineElement.appendChild(li);
        });
    }
    
    // 提取Markdown文本中的标题并添加ID
    function addIdsToHeadings(html) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // 查找所有标题元素
        const headings = [];
        const headingElements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        headingElements.forEach(el => {
            const level = parseInt(el.tagName.substring(1));
            const text = el.textContent;
            const id = safeToId(text);
            
            // 添加ID属性
            el.id = id;
            
            headings.push({
                level,
                text,
                id
            });
        });
        
        return {
            html: tempDiv.innerHTML,
            headings: headings
        };
    }
    
    // 直接使用简单版本的marked解析
    function parseMarkdown(markdown) {
        try {
            // 重置marked的配置
            marked.setOptions({
                renderer: new marked.Renderer(),
                headerIds: true,  // 确保生成标题ID
                highlight: null,
                langPrefix: 'language-',
                pedantic: false,
                gfm: true,
                breaks: true,
                sanitize: false,
                smartypants: false,
                xhtml: false
            });
            
            // 简单地将Markdown转换为HTML
            return marked.parse(markdown);
        } catch (error) {
            console.error('Markdown解析错误:', error);
            return `<div class="error">
                <h2>解析失败</h2>
                <p>Markdown解析错误: ${error.message}</p>
            </div>`;
        }
    }
    
    // 加载Markdown文件
    async function loadMarkdownFile(path) {
        try {
            // 显示加载提示
            document.getElementById('markdown-content').innerHTML = '<div class="loading">加载中...</div>';
            document.getElementById('outline').innerHTML = '';
            
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error('无法加载文件');
            }
            
            const markdownText = await response.text();
            
            // 输出调试信息
            console.log('加载的Markdown文本长度:', markdownText.length);
            
            // 简单解析Markdown为HTML
            let html = parseMarkdown(markdownText);
            
            // 处理HTML，为标题添加ID并提取标题列表
            const { html: processedHtml, headings } = addIdsToHeadings(html);
            
            // 显示处理后的HTML内容
            document.getElementById('markdown-content').innerHTML = processedHtml;
            
            // 生成大纲
            generateOutline(headings);
            
            // 更新URL以便能够直接分享特定教程
            window.history.pushState({path}, '', `?tutorial=${encodeURIComponent(path)}`);
        } catch (error) {
            console.error('加载文件出错:', error);
            document.getElementById('markdown-content').innerHTML = `
                <div class="error">
                    <h2>加载失败</h2>
                    <p>无法加载教程文件: ${path}</p>
                    <p>错误: ${error.message}</p>
                </div>
            `;
            
            // 清空大纲
            document.getElementById('outline').innerHTML = '';
        }
    }
    
    // 初始化目录
    const directoryElement = document.getElementById('directory');
    generateDirectory(tutorials, directoryElement);
    
    // 检查URL参数是否指定了特定教程
    const urlParams = new URLSearchParams(window.location.search);
    const tutorialPath = urlParams.get('tutorial');
    
    if (tutorialPath) {
        loadMarkdownFile(decodeURIComponent(tutorialPath));
    }
    
    // 自动展开第一级目录
    const firstLevelFolders = document.querySelectorAll('.sidebar > ul > li > .folder');
    firstLevelFolders.forEach(folder => {
        folder.classList.add('open');
        // 同时设置对应的folder-content为显示状态
        const folderContent = folder.nextElementSibling;
        if (folderContent && folderContent.classList.contains('folder-content')) {
            folderContent.style.display = 'block';
        }
    });
}); 