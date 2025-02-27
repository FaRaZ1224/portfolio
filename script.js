class PortfolioChat {
    constructor() {
        this.chatHistory = document.getElementById('chatHistory');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        this.themeButton = document.getElementById('themeButton');
        
        this.projects = {
            project1: {
                title: "Full-Stack Project",
                description: "A complete web application built with React and Node.js",
                link: "https://github.com/yourusername/project1"
            },
            project2: {
                title: "Mobile App",
                description: "Cross-platform mobile app built with React Native",
                link: "https://github.com/yourusername/project2"
            },
            about: {
                title: "About Me",
                description: "I'm a highly motivated and results-oriented AI/ML Engineer with a strong track record of success in developing and deploying innovative AI solutions. I have expertise in machine learning, natural language processing, and data visualization, with a strong foundation in programming and data analysis. I am skilled in designing retrieval-augmented generation (RAG) chatbots, data orchestration pipelines, and containerized AI models to streamline workflows and enhance decision-making. I have proven ability to collaborate effectively with cross-functional teams to deliver impactful results. I am passionate about leveraging AI to drive business value and improve decision-making."
            },
            contact: {
                title: "Contact",
                description: "Email: farazh1224@gmail.com\nLinkedIn: linkedin.com/in/farazh24"
            }
        };

        this.initialize();
    }

    initialize() {
        this.addWelcomeMessage();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Theme toggle
        this.themeButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });

        // Suggestion pills
        document.querySelectorAll('.suggestion-pill').forEach(pill => {
            pill.addEventListener('click', (e) => {
                const projectKey = e.target.dataset.project;
                this.handleProjectClick(projectKey);
            });
        });

        // Send message
        this.sendButton.addEventListener('click', () => this.handleUserInput());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserInput();
        });
    }

    async addWelcomeMessage() {
        const welcomeMessage = "👋 Hi! I'm Your Name's portfolio AI assistant. Feel free to ask about my projects or click one of the suggestions above!";
        await this.addMessage(welcomeMessage, 'assistant');
    }

    async handleProjectClick(projectKey) {
        const project = this.projects[projectKey];
        if (!project) return;

        const message = `Here's information about ${project.title}:\n\n${project.description}`;
        if (project.link) {
            message += `\n\nCheck it out here: ${project.link}`;
        }

        await this.addMessage(message, 'assistant');
    }

    async handleUserInput() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // Clear input
        this.userInput.value = '';

        // Add user message
        await this.addMessage(message, 'user');

        // Show loading
        const loadingDiv = this.showLoading();

        // Simulate response delay
        setTimeout(async () => {
            loadingDiv.remove();
            await this.addMessage("This is a simulated response. Customize this based on user input!", 'assistant');
        }, 1500);
    }

    showLoading() {
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.innerHTML = '<span></span><span></span><span></span>';
        this.chatHistory.appendChild(loading);
        return loading;
    }

    async addMessage(text, sender) {
        const message = document.createElement('div');
        message.className = `message ${sender}`;
        
        // Simulate typing effect
        message.textContent = '';
        this.chatHistory.appendChild(message);
        
        for (let i = 0; i < text.length; i++) {
            message.textContent += text[i];
            await new Promise(resolve => setTimeout(resolve, 20));
        }

        this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioChat();
}); 