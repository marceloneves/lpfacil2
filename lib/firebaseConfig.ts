import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let db: any = null;

// Verifica se já existe uma instância inicializada
if (!getApps().length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  // Validação das variáveis de ambiente
  if (!projectId || !clientEmail || !privateKey) {
    console.warn('Variáveis de ambiente do Firebase não configuradas. Configure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL e FIREBASE_PRIVATE_KEY.');
  } else {
    try {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      });
      db = getFirestore();
    } catch (error) {
      console.error('Erro ao inicializar Firebase Admin:', error);
    }
  }
} else {
  db = getFirestore();
}

export { db };
