// 主JavaScript文件
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // 关闭移动端菜单
                if (navLinks) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 作品集筛选
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // 筛选作品
            portfolioItems.forEach(item => {
                if(filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // 表单提交
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // 这里可以添加实际的表单提交逻辑
            // 例如使用Fetch API发送到服务器
            
            // 显示成功消息
            showNotification('感谢您的留言！我会尽快回复您。', 'success');
            this.reset();
        });
    }
    
    // 图片滑块
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        // 自动播放
        let slideInterval = setInterval(nextSlide, 5000);
        
        // 按钮控制
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
        
        // 鼠标悬停暂停
        const slider = document.querySelector('.hero-image');
        if (slider) {
            slider.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            slider.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    }
    
    // 数字动画
    const statNumbers = document.querySelectorAll('.stat-number');
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    function animateNumbers() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2秒
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    function animateSkills() {
        skillProgresses.forEach(skill => {
            const width = skill.getAttribute('data-width');
            skill.style.width = width + '%';
        });
    }
    
    // 滚动时触发动画
    function checkScroll() {
        const statsSection = document.querySelector('.stats');
        const skillsSection = document.querySelector('.skills');
        
        if (statsSection) {
            const statsPosition = statsSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (statsPosition < screenPosition) {
                animateNumbers();
                window.removeEventListener('scroll', checkScroll);
            }
        }
        
        if (skillsSection) {
            const skillsPosition = skillsSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (skillsPosition < screenPosition) {
                animateSkills();
            }
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // 初始检查
    
    // 滚动时高亮导航项
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
        
        // 滚动时头部样式变化
        const header = document.querySelector('header');
        if(window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // 页面加载时触发一次滚动事件以设置初始状态
    window.dispatchEvent(new Event('scroll'));
    
    // 通知函数
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="close-notification"><i class="fas fa-times"></i></button>
        `;
        
        // 添加样式
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // 关闭按钮
        const closeBtn = notification.querySelector('.close-notification');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // 自动消失
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // 添加动画关键帧
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .close-notification {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1rem;
        }
    `;
    document.head.appendChild(style);
});