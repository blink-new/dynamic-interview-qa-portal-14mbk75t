# Dynamic Interview Q&A Portal

A professional interview preparation platform that dynamically fetches questions and answers from GitHub README files. Built with React, TypeScript, Node.js, and PostgreSQL.

## 🚀 Features

- **Dynamic GitHub Integration**: Automatically parse interview questions from GitHub repository README files
- **Professional UI**: Modern dark theme with responsive design
- **Advanced Filtering**: Filter by technology, difficulty, category, and search
- **Real-time Updates**: Sync questions from GitHub repositories on demand
- **Question Management**: Organize questions by difficulty and technology
- **Interactive Interface**: Expandable question cards with detailed answers

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for development and building

### Backend
- **Node.js** with Express
- **PostgreSQL** for data storage
- **GitHub API** for repository integration
- **Marked** for markdown parsing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd dynamic-interview-qa-portal
```

### 2. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 3. Backend Setup

#### Install Backend Dependencies
```bash
cd server
npm install
```

#### Database Setup
1. Create a PostgreSQL database:
```sql
CREATE DATABASE interview_portal;
```

2. Create a `.env` file in the `server` directory:
```env
# Database Configuration
DB_USER=postgres
DB_HOST=localhost
DB_NAME=interview_portal
DB_PASSWORD=your_password
DB_PORT=5432

# Server Configuration
PORT=5000

# GitHub API (Optional - for higher rate limits)
GITHUB_TOKEN=your_github_personal_access_token_here
```

#### Start the Backend Server
```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

The backend API will be available at `http://localhost:5000`

## 🔧 Usage

### 1. Access the Application
Open your browser and navigate to `http://localhost:5173`

### 2. GitHub Integration
1. Click the "Show Integration" button in the status banner
2. Add a GitHub repository by entering:
   - **Repository Owner**: e.g., `facebook`
   - **Repository Name**: e.g., `react`
   - **Technology** (optional): e.g., `React`
   - **Category** (optional): e.g., `Frontend`

### 3. Supported Repository Formats
The system automatically parses questions from README files that follow these patterns:

#### Question Formats
```markdown
# What is React?
## What is React?
1. What is React?
```

#### Answer Sections
```markdown
## Answer
## Solution
## Explanation
```

### 4. Example Repositories to Try
- `facebook/react` - React.js questions
- `nodejs/node` - Node.js questions
- `microsoft/TypeScript` - TypeScript questions
- Any repository with interview questions in README format

## 🔍 API Endpoints

### Questions
- `GET /api/questions` - Get all questions with optional filters
- `GET /api/questions?technology=react&difficulty=medium` - Filtered questions

### Repositories
- `GET /api/repositories` - Get all synced repositories
- `POST /api/repositories` - Add a new repository
- `POST /api/repositories/:id/sync` - Re-sync a repository

### Health Check
- `GET /api/health` - Server health status

## 🎨 Features in Detail

### Dynamic Question Parsing
The system intelligently parses markdown content to extract:
- Question titles and content
- Associated answers and explanations
- Automatic difficulty classification
- Technology and category tagging

### Smart Filtering
- **Technology Filter**: React, Node.js, JavaScript, TypeScript, etc.
- **Difficulty Levels**: Easy, Medium, Hard (auto-detected)
- **Search**: Full-text search across questions and answers
- **Category**: Frontend, Backend, Database, etc.

### Real-time Sync
- Automatic question updates when repositories change
- Manual sync option for immediate updates
- Repository status tracking with last sync timestamps

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy the `dist` folder to your hosting service
```

### Backend Deployment
1. Set up PostgreSQL database on your hosting service
2. Configure environment variables
3. Deploy the `server` directory
4. Run database migrations (automatic on first start)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by DevInterview.io and similar interview preparation platforms
- Built with modern web technologies and best practices
- GitHub API for seamless repository integration

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include error logs and steps to reproduce

---

**Happy Interview Preparation! 🎯**