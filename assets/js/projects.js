class ProjectShowcase {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.currentFilter = 'all';
        this.isAnimating = false;

        this.init();
    }

    init() {
        this.loadProjects();
        this.setupFilters();
        this.setupProjectInteractions();
        this.setupInfiniteScroll();
    }

    loadProjects() {
        this.projects = [
            {
                id: 1,
                title: "E-Commerce Platform",
                description: "Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard. Built with modern web technologies for scalability and performance.",
                category: "web",
                technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
                image: null,
                links: {
                    demo: "#",
                    github: "#"
                },
                featured: true,
                status: "completed"
            },
            {
                id: 2,
                title: "Task Management App",
                description: "Collaborative task management application with real-time updates, team collaboration features, and advanced project tracking capabilities.",
                category: "web",
                technologies: ["Vue.js", "Firebase", "PWA", "WebRTC"],
                image: null,
                links: {
                    demo: "#",
                    github: "#"
                },
                featured: true,
                status: "completed"
            },
            {
                id: 3,
                title: "Mobile Weather App",
                description: "Cross-platform mobile weather application with location-based forecasts, interactive maps, and personalized weather alerts.",
                category: "mobile",
                technologies: ["React Native", "OpenWeather API", "Maps", "Push Notifications"],
                image: null,
                links: {
                    demo: "#",
                    github: "#"
                },
                featured: false,
                status: "completed"
            },
            {
                id: 4,
                title: "Code Deployment Tool",
                description: "Automated deployment pipeline tool that streamlines the development workflow with CI/CD integration and monitoring capabilities.",
                category: "tools",
                technologies: ["Python", "Docker", "AWS", "Jenkins", "Bash"],
                image: null,
                links: {
                    demo: "#",
                    github: "#"
                },
                featured: true,
                status: "completed"
            },
            {
                id: 5,
                title: "AI Content Generator",
                description: "Machine learning-powered content generation tool that creates blog posts, social media content, and marketing copy using natural language processing.",
                category: "ai",
                technologies: ["Python", "TensorFlow", "OpenAI API", "Flask", "React"],
                image: null,
                links: {
                    demo: "#",
                    github: "#"
                },
                featured: true,
                status: "in-development"
            },
            {
                id: 6,
                title: "Data Visualization Dashboard",
                description: "Interactive dashboard for data visualization and analytics with real-time charts, custom filters, and export capabilities for business intelligence.",
                category: "web",
                technologies: ["D3.js", "React", "Express", "PostgreSQL", "Chart.js"],
                image: null,
                links: {
                    demo: "#",
                    github: "#"
                },
                featured: false,
                status: "completed"
            }
        ];

        this.filteredProjects = [...this.projects];
        this.renderProjects();
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                if (this.isAnimating) return;

                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);

                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    filterProjects(category) {
        this.isAnimating = true;
        this.currentFilter = category;

        const projectGrid = document.querySelector('.projects-grid');
        const existingCards = projectGrid.querySelectorAll('.project-card');

        existingCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.95)';
            }, index * 50);
        });

        setTimeout(() => {
            if (category === 'all') {
                this.filteredProjects = [...this.projects];
            } else {
                this.filteredProjects = this.projects.filter(project =>
                    project.category === category
                );
            }

            this.renderProjects();

            setTimeout(() => {
                this.isAnimating = false;
            }, 500);
        }, 400);
    }

    renderProjects() {
        const projectGrid = document.querySelector('.projects-grid');
        if (!projectGrid) return;

        projectGrid.innerHTML = '';

        this.filteredProjects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project);
            projectGrid.appendChild(projectCard);

            setTimeout(() => {
                projectCard.style.opacity = '1';
                projectCard.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        });

        if (this.filteredProjects.length === 0) {
            this.showEmptyState();
        }
    }

    createProjectCard(project) {
        const card = document.createElement('article');
        card.className = 'project-card';
        card.setAttribute('data-category', project.category);
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

        const statusBadge = project.status === 'in-development'
            ? '<div class="project-status">In Development</div>'
            : '';

        const featuredBadge = project.featured
            ? '<div class="project-featured">Featured</div>'
            : '';

        card.innerHTML = `
            ${statusBadge}
            ${featuredBadge}
            <div class="project-image">
                ${project.image
                    ? `<img src="${project.image}" alt="${project.title}" loading="lazy">`
                    : `<div class="project-placeholder">
                        <div class="placeholder-icon">🚀</div>
                        <div class="placeholder-text">${project.title}</div>
                    </div>`
                }
                <div class="project-overlay">
                    <div class="project-actions">
                        <a href="${project.links.demo}" class="project-action" target="_blank" rel="noopener noreferrer">
                            <span>👁️</span> View Demo
                        </a>
                        <a href="${project.links.github}" class="project-action" target="_blank" rel="noopener noreferrer">
                            <span>⚡</span> View Code
                        </a>
                    </div>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech =>
                        `<span class="tech-tag" data-tech="${tech.toLowerCase()}">${tech}</span>`
                    ).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.links.demo}" class="project-link" target="_blank" rel="noopener noreferrer">
                        Live Demo
                    </a>
                    <a href="${project.links.github}" class="project-link" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                </div>
            </div>
        `;

        this.addProjectCardEvents(card, project);
        return card;
    }

    addProjectCardEvents(card, project) {
        const projectImage = card.querySelector('.project-image');
        const overlay = card.querySelector('.project-overlay');

        card.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
            card.style.transform = 'translateY(0) scale(1)';
        });

        const techTags = card.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                this.highlightTechnology(tag.getAttribute('data-tech'));
            });
        });

        const projectActions = card.querySelectorAll('.project-action');
        projectActions.forEach(action => {
            action.addEventListener('click', (e) => {
                e.stopPropagation();
                this.trackProjectInteraction(project, action.textContent.includes('Demo') ? 'demo' : 'code');
            });
        });

        card.addEventListener('click', () => {
            this.showProjectDetails(project);
        });
    }

    highlightTechnology(techName) {
        const allTechTags = document.querySelectorAll('.tech-tag');
        allTechTags.forEach(tag => {
            if (tag.getAttribute('data-tech') === techName) {
                tag.classList.add('highlighted');
                setTimeout(() => {
                    tag.classList.remove('highlighted');
                }, 2000);
            }
        });
    }

    showProjectDetails(project) {
        const modal = this.createProjectModal(project);
        document.body.appendChild(modal);

        setTimeout(() => {
            modal.classList.add('active');
        }, 10);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeProjectModal(modal);
            }
        });

        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.closeProjectModal(modal);
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeProjectModal(modal);
            }
        });
    }

    createProjectModal(project) {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <div class="modal-header">
                    <h2>${project.title}</h2>
                    <div class="modal-status ${project.status}">${project.status}</div>
                </div>
                <div class="modal-body">
                    <div class="project-details">
                        <p class="project-full-description">${project.description}</p>
                        <div class="project-technologies">
                            <h4>Technologies Used:</h4>
                            <div class="tech-list">
                                ${project.technologies.map(tech =>
                                    `<span class="tech-item">${tech}</span>`
                                ).join('')}
                            </div>
                        </div>
                        <div class="project-actions-modal">
                            <a href="${project.links.demo}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                View Live Demo
                            </a>
                            <a href="${project.links.github}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                                View Source Code
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return modal;
    }

    closeProjectModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }

    trackProjectInteraction(project, action) {
        console.log(`Project interaction: ${project.title} - ${action}`);
    }

    showEmptyState() {
        const projectGrid = document.querySelector('.projects-grid');
        projectGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>No projects found</h3>
                <p>Try selecting a different category or check back later for new projects.</p>
                <button class="btn btn-primary" onclick="projectShowcase.filterProjects('all')">
                    Show All Projects
                </button>
            </div>
        `;
    }

    setupProjectInteractions() {
        const projectsSection = document.querySelector('#projects');
        if (!projectsSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateProjectsOnScroll();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(projectsSection);
    }

    animateProjectsOnScroll() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 150);
        });
    }

    setupInfiniteScroll() {
        if (this.projects.length <= 6) return;

        let isLoading = false;
        const loadMore = () => {
            if (isLoading) return;
            isLoading = true;

            setTimeout(() => {
                isLoading = false;
            }, 1000);
        };

        window.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 100) {
                loadMore();
            }
        });
    }
}

const MODAL_STYLES = `
.project-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
    backdrop-filter: blur(5px);
}

.project-modal.active {
    opacity: 1;
}

.modal-content {
    background: white;
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    border-radius: var(--border-radius);
    position: relative;
    overflow-y: auto;
    box-shadow: var(--shadow-heavy);
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.project-modal.active .modal-content {
    transform: scale(1);
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--text-secondary);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
    z-index: 1;
}

.modal-close:hover {
    background: var(--secondary-color);
    color: white;
}

.modal-header {
    padding: 2rem 2rem 1rem;
    border-bottom: 1px solid var(--titanium-silver);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h2 {
    margin: 0;
    color: var(--text-primary);
    font-size: 1.8rem;
}

.modal-status {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
}

.modal-status.completed {
    background: #d4edda;
    color: #155724;
}

.modal-status.in-development {
    background: #fff3cd;
    color: #856404;
}

.modal-body {
    padding: 2rem;
}

.project-full-description {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 2rem;
    color: var(--text-secondary);
}

.project-technologies h4 {
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
}

.tech-item {
    background: var(--bg-primary);
    color: var(--text-primary);
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius);
    font-weight: 500;
    border: 2px solid var(--titanium-silver);
}

.project-actions-modal {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(44, 62, 80, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity var(--transition-medium);
}

.project-actions {
    display: flex;
    gap: 1rem;
    flex-direction: column;
}

.project-action {
    background: white;
    color: var(--text-primary);
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    text-decoration: none;
    font-weight: 600;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.project-action:hover {
    background: var(--secondary-color);
    color: white;
    transform: translateY(-2px);
}

.project-status {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: var(--accent-color);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    z-index: 2;
}

.project-featured {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: var(--secondary-color);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    z-index: 2;
}

.placeholder-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.placeholder-text {
    font-weight: 600;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.tech-tag.highlighted {
    background: var(--secondary-color);
    color: white;
    transform: scale(1.1);
    box-shadow: var(--shadow-medium);
}

.empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 4rem 2rem;
    color: var(--text-secondary);
}

.empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.empty-state h3 {
    color: var(--text-primary);
    margin-bottom: 1rem;
}

@media (max-width: 768px) {
    .modal-content {
        width: 95%;
        max-height: 95vh;
    }

    .modal-header,
    .modal-body {
        padding: 1.5rem;
    }

    .modal-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .project-actions-modal {
        flex-direction: column;
    }

    .tech-list {
        justify-content: center;
    }
}
`;

const modalStyleSheet = document.createElement('style');
modalStyleSheet.textContent = MODAL_STYLES;
document.head.appendChild(modalStyleSheet);

let projectShowcase;
document.addEventListener('DOMContentLoaded', () => {
    projectShowcase = new ProjectShowcase();
});

window.projectShowcase = projectShowcase;