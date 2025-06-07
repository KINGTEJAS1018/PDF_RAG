import { Worker } from 'bullmq';
import { OpenAIEmbeddings } from '@langchain/openai';
import { QdrantVectorStore } from '@langchain/qdrant';
import { Document } from '@langchain/core/documents';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { CharacterTextSplitter } from '@langchain/textsplitters';

const worker = new Worker(
  'file-upload-queue',
  async (job) => {
    console.log(`Job:`, job.data);
    const data = JSON.parse(job.data);
    /*
    Path: data.path
    read the pdf from path,
    chunk the pdf,
    call the openai embedding model for every chunk,
    store the chunk in qdrant db
    */

    // Load the PDF
    const loader = new PDFLoader(data.path);
    const docs = await loader.load();

    // const textsplitters = new CharacterTextSplitter({
    //     chunkSize:300,
    //     chunkOverlap:0,
    // });

    // const texts = await textsplitters.splitText(docs);
    // console.log(texts);

    const embeddings = new OpenAIEmbeddings({
      model: 'text-embedding-3-small',
      apiKey: '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',
    });

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: 'http://localhost:6333',
        collectionName: 'langchainjs-testing',
      }
    );
    await vectorStore.addDocuments(docs);
    console.log(`All docs are added to vector store`);
  },
  {
    concurrency: 100,
    connection: {
      host: 'localhost',
      port: '6379',
    },
  }
);