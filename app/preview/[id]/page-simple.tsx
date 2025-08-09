import { notFound } from 'next/navigation';
import { db } from '@/lib/firebaseConfig';
import PreviewRenderer from '@/app/components/preview/PreviewRenderer';


interface Props {
  params: { id: string };
}

// Fazer isso server-side para evitar problemas de hidratação
async function getLandingPage(id: string) {
  try {
    if (!db) {
      return null;
    }

    const doc = await db.collection('landing-pages').doc(id).get();
    
    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data()
    };
  } catch (error) {
    console.error('Erro ao buscar landing page:', error);
    return null;
  }
}

export default async function PreviewPageSimple({ params }: Props) {
  const landingPageData = await getLandingPage(params.id);

  if (!landingPageData) {
    notFound();
  }

  return (
    <>
      {/* Renderização server-side das seções */}
      <div className="min-h-screen bg-white">
        {landingPageData.sections && landingPageData.sections.length > 0 ? (
          <>
            {landingPageData.sections.map((section: any, index: number) => (
              <div key={index} className="w-full">
                {section.type === 'hero' && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center">
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                          {section.content.title || 'Título da Hero Section'}
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                          {section.content.subtitle || 'Subtítulo da Hero Section'}
                        </p>
                        {section.content.buttonText && (
                          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                            {section.content.buttonText}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {section.type === 'features' && (
                  <div className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                          {section.content.title || 'Features'}
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {section.content.items?.map((item: any, i: number) => (
                          <div key={i} className="text-center">
                            <div className="text-4xl mb-4">{item.icon || '⭐'}</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {item.title || `Feature ${i + 1}`}
                            </h3>
                            <p className="text-gray-600">
                              {item.description || 'Descrição da feature'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {section.type === 'cta' && (
                  <div className="bg-blue-600 py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        {section.content.title || 'Call to Action'}
                      </h2>
                      <p className="text-xl text-blue-100 mb-8">
                        {section.content.subtitle || 'Subtítulo do CTA'}
                      </p>
                      {section.content.buttonText && (
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
                          {section.content.buttonText}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Fallback para outros tipos */}
                {!['hero', 'features', 'cta'].includes(section.type) && (
                  <div className="py-16 bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {section.content.title || `Seção ${section.type}`}
                      </h2>
                      <p className="text-gray-600">
                        {section.content.subtitle || `Conteúdo da seção ${section.type}`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Landing Page Vazia
              </h2>
              <p className="text-gray-600">
                Esta landing page não possui seções para exibir.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold">{landingPageData.title}</h3>
                <p className="text-gray-400 text-sm">
                  Criado com LPFácil2 - Editor de Landing Pages
                </p>
              </div>
              <div className="text-sm text-gray-400">
                © 2024 Todos os direitos reservados
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
