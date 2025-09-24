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
                title: "Obsidian Scribe",
                description: "Advanced audio transcription plugin for Obsidian with speaker diarization and smart chunking. Automatically converts recordings into structured Markdown notes with multi-speaker identification and large file handling capabilities.",
                category: "tools",
                technologies: ["Python", "OpenAI Whisper", "Hugging Face", "YAML", "Obsidian API"],
                image: null,
                links: {
                    demo: "https://github.com/titaniumshovel/obsidian-scribe#demo",
                    github: "https://github.com/titaniumshovel/obsidian-scribe"
                },
                featured: true,
                status: "completed"
            },
            {
                id: 2,
                title: "LegalEyes Browser Extension",
                description: "AI-powered browser extension that summarizes Terms & Conditions and privacy policies using Google's Gemini AI. Highlights concerning clauses by severity and category for informed decision-making.",
                category: "web",
                technologies: ["JavaScript", "Google Gemini AI", "Browser APIs", "Chrome Extensions"],
                image: null,
                links: {
                    demo: "https://github.com/titaniumshovel/LegalEyes#usage",
                    github: "https://github.com/titaniumshovel/LegalEyes"
                },
                featured: true,
                status: "completed"
            },
            {
                id: 3,
                title: "Whisper Obsidian Plugin",
                description: "Speech-to-text plugin for Obsidian that integrates OpenAI's Whisper API for real-time audio transcription directly within your knowledge management workflow.",
                category: "tools",
                technologies: ["TypeScript", "Obsidian API", "OpenAI Whisper", "Audio Processing"],
                image: null,
                links: {
                    demo: "https://github.com/titaniumshovel/whisper-obsidian-plugin#features",
                    github: "https://github.com/titaniumshovel/whisper-obsidian-plugin"
                },
                featured: false,
                status: "completed"
            },
            {
                id: 4,
                title: "Media Transcriber",
                description: "Python-based media transcription toolkit for batch processing audio and video files. Supports multiple formats and provides automated transcription workflows for content creators.",
                category: "tools",
                technologies: ["Python", "FFmpeg", "Audio Processing", "Batch Processing"],
                image: null,
                links: {
                    demo: "https://github.com/titaniumshovel/media-transcriber#usage",
                    github: "https://github.com/titaniumshovel/media-transcriber"
                },
                featured: false,
                status: "completed"
            },
            {
                id: 5,
                title: "MarkdownToPDF Converter",
                description: "JavaScript tool for converting Markdown documents to professional PDF format with customizable styling, table of contents generation, and batch processing capabilities.",
                category: "tools",
                technologies: ["JavaScript", "Markdown", "PDF Generation", "Node.js"],
                image: null,
                links: {
                    demo: "https://github.com/titaniumshovel/MarkdownToPDF#examples",
                    github: "https://github.com/titaniumshovel/MarkdownToPDF"
                },
                featured: false,
                status: "completed"
            },
            {
                id: 6,
                title: "V1 Credit Breakdown",
                description: "Python analytics tool for analyzing Trend Vision One credit usage patterns. Provides detailed insights into API consumption, cost optimization recommendations, and usage forecasting.",
                category: "tools",
                technologies: ["Python", "Data Analytics", "API Integration", "Visualization"],
                image: null,
                links: {
                    demo: "https://github.com/titaniumshovel/V1CreditBreakdown#analysis",
                    github: "https://github.com/titaniumshovel/V1CreditBreakdown"
                },
                featured: false,
                status: "completed"
            },
        ];

        this.filteredProjects = [...this.projects];
        this.renderProjects();

        // Delay private projects loading to ensure DOM is ready
        setTimeout(() => {
            this.loadPrivateProjects();
        }, 100);
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

    loadPrivateProjects() {
        this.privateProjects = [
            {
                id: 1,
                title: "ToothPaste",
                description: "Universal cross-platform collaboration platform that makes files, clipboard, mouse, and keyboard flow between devices seamlessly. Zero-configuration with automatic discovery, local-first architecture, and enterprise features.",
                category: "tools",
                technologies: ["Python", "WebRTC", "Bluetooth", "P2P Networking", "Enterprise Security"],
                features: [
                    "Software KVM - mouse/keyboard flow between devices",
                    "Universal clipboard with format preservation",
                    "Cross-machine drag & drop functionality",
                    "Automatic device discovery via BLE/mDNS",
                    "Enterprise authentication & policy engine",
                    "End-to-end encryption with forward secrecy"
                ],
                isPrivate: true
            },
            {
                id: 2,
                title: "ScoreKeeper",
                description: "Self-hosted replacement for KeepTheScore.com - real-time scoreboards perfect for livestreaming and game management. Complete with user authentication, collaboration features, and professional OBS integration.",
                category: "web",
                technologies: ["Node.js", "JWT Auth", "WebSocket", "Real-time Sync", "OBS Integration"],
                features: [
                    "JWT-based authentication & user management",
                    "Real-time score synchronization across devices",
                    "Professional layouts optimized for streaming",
                    "Team customization with logos and colors",
                    "Advanced timer with period management",
                    "OBS browser source integration"
                ],
                isPrivate: true
            },
            {
                id: 3,
                title: "10YearAnniversarySite",
                description: "Comprehensive interactive website celebrating a 10-year marriage anniversary with advanced photo management, timeline milestones, and powerful search capabilities. Features 650+ optimized photos, smart filtering, and mobile-optimized navigation.",
                category: "web",
                technologies: ["JavaScript", "Canvas API", "Photo Management", "Timeline UI", "Mobile Optimization"],
                features: [
                    "650+ Photos with lazy loading & Canvas thumbnails",
                    "Advanced Search by date, location, caption, filename",
                    "Interactive Timeline with chronological life events",
                    "Smart filters for holidays, seasons, and date ranges",
                    "Full-size slideshow with keyboard navigation",
                    "Mobile-optimized touch controls"
                ],
                isPrivate: true
            }
        ];

        this.renderPrivateProjects();
    }

    renderPrivateProjects() {
        const privateGrid = document.querySelector('.private-projects-grid');
        if (!privateGrid) {
            console.error('Private projects grid not found!');
            return;
        }

        console.log('Rendering private projects...', this.privateProjects);
        privateGrid.innerHTML = '';

        this.privateProjects.forEach((project, index) => {
            const projectCard = this.createPrivateProjectCard(project);
            privateGrid.appendChild(projectCard);

            setTimeout(() => {
                projectCard.style.opacity = '1';
                projectCard.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    createPrivateProjectCard(project) {
        const card = document.createElement('article');
        card.className = 'private-project-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        card.innerHTML = `
            <div class="private-card-header">
                <div class="private-badge">🔒 Private Repository</div>
                <h4 class="private-project-title">${project.title}</h4>
            </div>
            <div class="private-project-content">
                <p class="private-project-description">${project.description}</p>
                <div class="private-project-tech">
                    ${project.technologies.map(tech =>
                        `<span class="tech-tag private-tech">${tech}</span>`
                    ).join('')}
                </div>
                <div class="private-features">
                    <h5>Key Features:</h5>
                    <ul class="features-list">
                        ${project.features.map(feature =>
                            `<li class="feature-item">${feature}</li>`
                        ).join('')}
                    </ul>
                </div>
                <div class="private-actions">
                    <button class="btn btn-private" onclick="projectShowcase.requestCollaboratorAccess('${project.title}')">
                        <span class="request-icon">🤝</span>
                        Request Collaborator Access
                    </button>
                    <div class="private-note">
                        <small>Interested in seeing the code? Send a collaboration request!</small>
                    </div>
                </div>
            </div>
        `;

        return card;
    }

    requestCollaboratorAccess(projectTitle) {
        // Create modal for collaboration request
        const modal = document.createElement('div');
        modal.className = 'collaboration-modal';
        modal.innerHTML = `
            <div class="collaboration-modal-content">
                <div class="modal-header">
                    <h3>Request Collaborator Access</h3>
                    <button class="modal-close" onclick="this.closest('.collaboration-modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="collaboration-info">
                        <div class="project-info">
                            <h4>${projectTitle}</h4>
                            <p>This is a private repository. To request collaborator access, please reach out through one of the contact methods below:</p>
                        </div>
                        <div class="contact-options">
                            <a href="mailto:chris@titaniumshovel.com?subject=Collaborator Request: ${projectTitle}&body=Hi Chris,%0A%0AI'm interested in collaborating on ${projectTitle}. Here's a bit about my background:%0A%0A[Please tell me about yourself and why you're interested in this project]%0A%0AThanks!" class="contact-option">
                                <span class="contact-icon">📧</span>
                                <div class="contact-details">
                                    <strong>Email Request</strong>
                                    <small>Pre-filled collaboration email</small>
                                </div>
                            </a>
                            <a href="https://linkedin.com/in/chrismackle" target="_blank" class="contact-option">
                                <span class="contact-icon">💼</span>
                                <div class="contact-details">
                                    <strong>LinkedIn Message</strong>
                                    <small>Connect and send a message</small>
                                </div>
                            </a>
                            <a href="https://github.com/titaniumshovel" target="_blank" class="contact-option">
                                <span class="contact-icon">⚡</span>
                                <div class="contact-details">
                                    <strong>GitHub Discussion</strong>
                                    <small>Open an issue or discussion</small>
                                </div>
                            </a>
                        </div>
                        <div class="request-note">
                            <p><strong>What to include in your request:</strong></p>
                            <ul>
                                <li>Your background and experience</li>
                                <li>Why you're interested in this project</li>
                                <li>How you'd like to contribute</li>
                                <li>Your GitHub username</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        setTimeout(() => {
            modal.classList.add('active');
        }, 10);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Track the request
        console.log(`Collaboration request initiated for: ${projectTitle}`);
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

/* Private Projects Styles */
.private-projects-section {
    margin-top: 4rem;
    padding-top: 3rem;
    border-top: 2px solid var(--titanium-silver);
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: var(--border-radius);
    padding: 3rem 2rem;
}

.private-section-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.private-section-subtitle {
    color: var(--text-secondary);
    font-size: 1.1rem;
    margin-bottom: 0;
}

.private-projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.private-project-card {
    background: white;
    border-radius: var(--border-radius);
    padding: 0;
    box-shadow: var(--shadow-soft);
    border: 2px solid var(--titanium-silver);
    overflow: hidden;
    transition: all var(--transition-medium);
    position: relative;
}

.private-project-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-heavy);
    border-color: var(--secondary-color);
}

.private-card-header {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 1.5rem;
    position: relative;
}

.private-badge {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 1rem;
    display: inline-block;
}

.private-project-title {
    font-size: 1.4rem;
    font-weight: 700;
    margin: 0;
    font-family: var(--font-mono);
}

.private-project-content {
    padding: 1.5rem;
}

.private-project-description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

.private-project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.private-tech {
    background: var(--accent-color);
    color: white;
    border: none;
    font-weight: 600;
}

.private-features {
    margin-bottom: 2rem;
}

.private-features h5 {
    color: var(--text-primary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    font-size: 1rem;
}

.features-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.feature-item {
    padding: 0.5rem 0;
    color: var(--text-secondary);
    position: relative;
    padding-left: 1.5rem;
    font-size: 0.9rem;
}

.feature-item::before {
    content: '✨';
    position: absolute;
    left: 0;
    top: 0.5rem;
}

.private-actions {
    text-align: center;
}

.btn-private {
    background: linear-gradient(135deg, var(--secondary-color), var(--accent-color));
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: var(--border-radius);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-medium);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    width: 100%;
    margin-bottom: 1rem;
}

.btn-private:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
    background: linear-gradient(135deg, #c0392b, #e67e22);
}

.request-icon {
    font-size: 1.2rem;
}

.private-note {
    color: var(--text-muted);
    font-style: italic;
}

/* Collaboration Modal Styles */
.collaboration-modal {
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

.collaboration-modal.active {
    opacity: 1;
}

.collaboration-modal-content {
    background: white;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    border-radius: var(--border-radius);
    position: relative;
    overflow-y: auto;
    box-shadow: var(--shadow-heavy);
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.collaboration-modal.active .collaboration-modal-content {
    transform: scale(1);
}

.collaboration-info {
    padding: 2rem;
}

.project-info {
    text-align: center;
    margin-bottom: 2rem;
}

.project-info h4 {
    color: var(--text-primary);
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-family: var(--font-mono);
}

.contact-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
}

.contact-option {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--bg-primary);
    border-radius: var(--border-radius);
    text-decoration: none;
    color: var(--text-primary);
    transition: all var(--transition-medium);
    border: 2px solid transparent;
}

.contact-option:hover {
    background: var(--secondary-color);
    color: white;
    transform: translateX(5px);
    border-color: var(--secondary-color);
}

.contact-icon {
    font-size: 1.5rem;
    min-width: 30px;
}

.contact-details strong {
    display: block;
    margin-bottom: 0.25rem;
}

.contact-details small {
    color: var(--text-muted);
    font-size: 0.85rem;
}

.contact-option:hover .contact-details small {
    color: rgba(255, 255, 255, 0.8);
}

.request-note {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: var(--border-radius);
    border-left: 4px solid var(--accent-color);
}

.request-note p {
    margin-bottom: 1rem;
    font-weight: 600;
    color: var(--text-primary);
}

.request-note ul {
    margin: 0;
    padding-left: 1.5rem;
}

.request-note li {
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
    .private-projects-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .private-projects-section {
        padding: 2rem 1rem;
        margin-top: 2rem;
    }

    .private-section-title {
        font-size: 1.8rem;
    }

    .collaboration-modal-content {
        width: 95%;
    }

    .collaboration-info {
        padding: 1.5rem;
    }

    .contact-option {
        flex-direction: column;
        text-align: center;
        gap: 0.5rem;
    }

    .contact-details {
        text-align: center;
    }
}
`;

const modalStyleSheet = document.createElement('style');
modalStyleSheet.textContent = MODAL_STYLES;
document.head.appendChild(modalStyleSheet);

let projectShowcase;
document.addEventListener('DOMContentLoaded', () => {
    projectShowcase = new ProjectShowcase();
    window.projectShowcase = projectShowcase;
});

// Fallback initialization if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!projectShowcase) {
            projectShowcase = new ProjectShowcase();
            window.projectShowcase = projectShowcase;
        }
    });
} else {
    // DOM is already ready
    if (!projectShowcase) {
        projectShowcase = new ProjectShowcase();
        window.projectShowcase = projectShowcase;
    }
}