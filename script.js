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
                        { name: '0.3.1 字符串', type: 'file', path: '0级/0.3 数据类型详解/0.3.1 字符串.md' }
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
    
    // 加载Markdown文件
    async function loadMarkdownFile(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error('无法加载文件');
            }
            
            const text = await response.text();
            const html = marked.parse(text);
            
            document.getElementById('markdown-content').innerHTML = html;
            
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