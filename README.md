# PDF Sage

A full-stack project for PDF-based Retrieval-Augmented Generation (RAG) using Node.js, LangChain, Qdrant, and a React frontend.

## Features

- **PDF Upload:** Upload PDF files to the backend for processing.
- **Chunking & Embedding:** PDFs are split into chunks and embedded using a vector embedding model.
- **Vector Storage:** Embeddings are stored in a Qdrant vector database for efficient retrieval.
- **Chat Interface:** Ask questions about the uploaded PDF and get context-aware answers.
- **Queue Processing:** Uses BullMQ and Redis for background PDF processing.
- **Frontend:** Simple React-based chat interface.

## Tech Stack

- **Backend:** Node.js, Express, LangChain, Qdrant, BullMQ, Redis, Multer
- **Frontend:** React (Next.js), TypeScript
- **Vector DB:** Qdrant
- **PDF Parsing:** pdf-parse, LangChain PDFLoader

## How It Works

1. **Upload PDF:** User uploads a PDF via the frontend.
2. **Queue:** The backend enqueues the file for processing.
3. **Worker:** The worker reads the PDF, splits it into chunks, generates embeddings, and stores them in Qdrant.
4. **Chat:** User sends a question; the backend retrieves relevant chunks from Qdrant and generates an answer using an LLM.

## Embedding Model

> **Note:**  
> By default, this project uses the OpenAI embedding model, which requires a paid OpenAI API key.  
> **You must provide your own OpenAI API key as an environment variable or switch to a free embedding model (e.g., Ollama or Sentence Transformers) if you do not wish to use a paid service.**

## Getting Started

### Prerequisites

- Node.js
- Redis
- Qdrant
- (Optional) Python & Sentence Transformers or Ollama for free embeddings

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/PDF_RAG.git
   cd PDF_RAG
   ```

2. **Install dependencies:**
   ```bash
   cd server
   pnpm install
   cd ../client
   pnpm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the `server` directory.
   - Add your OpenAI API key:
     ```
     OPENAI_API_KEY=your-key-here
     ```

4. **Start services:**
   - Start Redis and Qdrant.
   - In `/server`:
     ```bash
     pnpm run dev
     pnpm run dev:worker
     ```
   - In `/client`:
     ```bash
     pnpm run dev
     ```

5. **Open the frontend** in your browser and start chatting!

## Switching to a Free Embedding Model

If you do not want to use a paid OpenAI API key, you can switch to a free embedding model like [Ollama](https://ollama.com/) or [Sentence Transformers](https://www.sbert.net/).  
See the project issues or discussions for community guides.
