# UniOn - Student Wellbeing & Academic Tracker

UniOn is a comprehensive web application designed to help college students manage their academic progress while maintaining their mental wellbeing. The platform provides an integrated approach to student success by combining academic tracking with mental health monitoring.

## Features

### Wellbeing Tracking

- Daily mood tracking and journaling
- AI-powered insights and personalized feedback
- Historical mood data visualization
- Proactive support suggestions based on mood patterns

### Academic Management

- Course and assignment tracking
- Grade monitoring and performance analytics
- Class notes organization
- Visual progress indicators

### Smart Support System

- AI-powered chatbot for immediate support
- Customized recommendations based on student's state
- Integration with university resources
- Crisis prevention through early warning indicators

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: BetterAuth with Google OAuth
- **AI Integration**: Google Gemini AI
- **Styling**: Tailwind CSS, shadcn/ui components

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/uni-on.git
cd uni-on
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Fill in your environment variables:

```env
DATABASE_URL="postgresql://..."
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GOOGLE_AI_KEY="your_gemini_ai_key"
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
uni-on/
├── app/                  # Next.js app router pages
├── components/          # React components
├── utils/              # Utility functions and helpers
├── prisma/             # Database schema and migrations
└── public/             # Static assets
```

## Contributing

We welcome contributions! Please see our contributing guidelines for more details.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- Next.js team for the fantastic framework
- Vercel for hosting and deployment
- Google for AI capabilities
- All contributors and supporters
