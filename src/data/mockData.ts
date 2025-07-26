import { Question, Technology } from '../types';

export const technologies: Technology[] = [
  {
    id: 'react',
    name: 'React',
    icon: '⚛️',
    color: '#61dafb',
    questionCount: 45
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: '🟢',
    color: '#68a063',
    questionCount: 38
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '🟨',
    color: '#f7df1e',
    questionCount: 52
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: '🔷',
    color: '#3178c6',
    questionCount: 29
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    icon: '🔗',
    color: '#e10098',
    questionCount: 24
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    icon: '🐘',
    color: '#336791',
    questionCount: 31
  }
];

export const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'What is the Virtual DOM in React?',
    content: 'Explain the concept of Virtual DOM and how it improves performance in React applications.',
    answer: 'The Virtual DOM is a JavaScript representation of the actual DOM. React uses it to optimize rendering by comparing the virtual DOM tree with the previous version (diffing) and only updating the parts that have changed (reconciliation). This reduces expensive DOM manipulations and improves performance.',
    difficulty: 'Medium',
    technology: 'React',
    category: 'Core Concepts',
    tags: ['virtual-dom', 'performance', 'rendering'],
    githubUrl: 'https://github.com/facebook/react',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Explain Event Loop in Node.js',
    content: 'How does the event loop work in Node.js and what are the different phases?',
    answer: 'The Node.js event loop is a single-threaded loop that handles asynchronous operations. It has six phases: Timer, Pending callbacks, Idle/Prepare, Poll, Check, and Close callbacks. Each phase has a FIFO queue of callbacks to execute.',
    difficulty: 'Hard',
    technology: 'Node.js',
    category: 'Architecture',
    tags: ['event-loop', 'asynchronous', 'performance'],
    githubUrl: 'https://github.com/nodejs/node',
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    title: 'What is Hoisting in JavaScript?',
    content: 'Explain the concept of hoisting and how it affects variable and function declarations.',
    answer: 'Hoisting is JavaScript\'s behavior of moving declarations to the top of their scope during compilation. Variables declared with var are hoisted and initialized with undefined, while let and const are hoisted but not initialized (temporal dead zone).',
    difficulty: 'Easy',
    technology: 'JavaScript',
    category: 'Fundamentals',
    tags: ['hoisting', 'variables', 'scope'],
    createdAt: '2024-01-13'
  },
  {
    id: '4',
    title: 'What are React Hooks?',
    content: 'Explain React Hooks and their benefits over class components.',
    answer: 'React Hooks are functions that let you use state and other React features in functional components. They provide a more direct API to React concepts and enable better code reuse through custom hooks.',
    difficulty: 'Medium',
    technology: 'React',
    category: 'Hooks',
    tags: ['hooks', 'functional-components', 'state'],
    createdAt: '2024-01-12'
  },
  {
    id: '5',
    title: 'Explain TypeScript Generics',
    content: 'What are generics in TypeScript and how do they improve type safety?',
    answer: 'Generics allow you to create reusable components that work with multiple types while maintaining type safety. They enable you to capture the type information and use it throughout the component.',
    difficulty: 'Hard',
    technology: 'TypeScript',
    category: 'Advanced Types',
    tags: ['generics', 'type-safety', 'reusability'],
    createdAt: '2024-01-11'
  },
  {
    id: '6',
    title: 'What is GraphQL?',
    content: 'Explain GraphQL and its advantages over REST APIs.',
    answer: 'GraphQL is a query language and runtime for APIs that allows clients to request exactly the data they need. It provides a single endpoint, strong type system, and eliminates over-fetching and under-fetching of data.',
    difficulty: 'Medium',
    technology: 'GraphQL',
    category: 'API Design',
    tags: ['graphql', 'api', 'query-language'],
    createdAt: '2024-01-10'
  },
  {
    id: '7',
    title: 'PostgreSQL Indexing Strategies',
    content: 'What are the different types of indexes in PostgreSQL and when to use them?',
    answer: 'PostgreSQL supports B-tree (default), Hash, GiST, SP-GiST, GIN, and BRIN indexes. B-tree is best for equality and range queries, GIN for full-text search, and GiST for geometric data.',
    difficulty: 'Hard',
    technology: 'PostgreSQL',
    category: 'Performance',
    tags: ['indexing', 'performance', 'database'],
    createdAt: '2024-01-09'
  },
  {
    id: '8',
    title: 'Async/Await vs Promises',
    content: 'Compare async/await with Promises in JavaScript.',
    answer: 'Async/await is syntactic sugar over Promises, making asynchronous code look more like synchronous code. It improves readability and error handling with try/catch blocks, while Promises use .then() and .catch() methods.',
    difficulty: 'Medium',
    technology: 'JavaScript',
    category: 'Asynchronous',
    tags: ['async-await', 'promises', 'asynchronous'],
    createdAt: '2024-01-08'
  }
];