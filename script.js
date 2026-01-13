  const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 100);
        });

        document.querySelectorAll('a, button, .project-card, .assignment-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                follower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.project-card, .skill-category, .assignment-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Assignment Modal Data
        const assignmentData = {
            web: {
                title: "Web Development",
                subtitle: "HTML, CSS, JavaScript assignments",
                assignments: [
                    { name: "Portfolio Website", url: "#" },
                    { name: "Responsive Landing Page", url: "#" },
                    { name: "CSS Grid Gallery", url: "#" },
                    { name: "Interactive Form Validation", url: "#" },
                    { name: "Animated Navigation Menu", url: "#" }
                ]
            },
            react: {
                title: "React Projects",
                subtitle: "ReactJS component-based assignments",
                assignments: [
                    { name: "Todo App with Hooks", url: "#" },
                    { name: "Weather Dashboard", url: "#" },
                    { name: "E-commerce Cart", url: "#" },
                    { name: "Real-time Chat UI", url: "#" },
                    { name: "State Management Demo", url: "#" }
                ]
            },
            server: {
                title: "Server Side",
                subtitle: "Node.js backend assignments",
                assignments: [
                    { name: "REST API Development", url: "#" },
                    { name: "Authentication System", url: "#" },
                    { name: "File Upload Handler", url: "#" },
                    { name: "WebSocket Chat Server", url: "#" },
                    { name: "Middleware Implementation", url: "#" }
                ]
            },
            java: {
                title: "Programming",
                subtitle: "Java programming assignments",
                assignments: [
                    { name: "OOP Concepts", url: "#" },
                    { name: "Data Structures Implementation", url: "#" },
                    { name: "Algorithm Design", url: "#" },
                    { name: "Collections Framework", url: "#" },
                    { name: "Exception Handling", url: "#" }
                ]
            },
            database: {
                title: "Database",
                subtitle: "MySQL database assignments",
                assignments: [
                    { name: "Database Schema Design", url: "#" },
                    { name: "Complex Queries", url: "#" },
                    { name: "Stored Procedures", url: "#" },
                    { name: "Normalization Practice", url: "#" },
                    { name: "Database Optimization", url: "#" }
                ]
            }
        };

      
        const modal = document.getElementById('assignmentModal');
        const modalClose = document.getElementById('modalClose');
        const modalTitle = document.getElementById('modalTitle');
        const modalSubtitle = document.getElementById('modalSubtitle');
        const assignmentList = document.getElementById('assignmentList');

       
        document.querySelectorAll('.assignment-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.getAttribute('data-category');
                const data = assignmentData[category];
                
                modalTitle.textContent = data.title;
                modalSubtitle.textContent = data.subtitle;
                
                
                assignmentList.innerHTML = data.assignments.map((assignment, index) => `
                    <a href="${assignment.url}" class="assignment-item">
                        <div class="assignment-item-info">
                            <span class="assignment-number">${String(index + 1).padStart(2, '0')}</span>
                            <span class="assignment-item-title">${assignment.name}</span>
                        </div>
                        <svg class="assignment-item-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </a>
                `).join('');
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

       
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

       
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });