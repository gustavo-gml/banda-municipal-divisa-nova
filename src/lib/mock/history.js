/**
 * mock/history.js
 *
 * Dados de exemplo para a linha do tempo histórica da banda.
 * TODO: substituir pela busca ao Prismic com getHistory() em src/lib/data.js.
 */

/** @type {Array<{id: string, decade: string, title: string, description: string, imageUrl: string|null, imageAlt: string|null}>} */
export const mockHistory = [
  {
    id: "hist-1940",
    decade: "1940",
    title: "Fundação da Banda Municipal",
    description:
      "A Banda Municipal José Ângelo Vaz foi fundada em 1945 pelo maestro José Ângelo Vaz, com um grupo inicial de 18 músicos voluntários. O objetivo era proporcionar cultura e entretenimento à recém-emancipada cidade de Divisa Nova.",
    imageUrl: "/images/placeholder-historia-1940.jpg",
    imageAlt:
      "Foto em preto e branco da primeira formação da Banda Municipal, com 18 músicos posando em frente à sede original",
  },
  {
    id: "hist-1960",
    decade: "1960",
    title: "Expansão e Novos Instrumentos",
    description:
      "Na década de 1960, a banda recebeu uma doação de instrumentos de sopro de metal e contou com o apoio da prefeitura para ampliar o quadro de músicos para 35 integrantes. Foram os anos de ouro dos desfiles cívicos.",
    imageUrl: "/images/placeholder-historia-1960.jpg",
    imageAlt:
      "Banda Municipal em desfile cívico pela Avenida Principal em 1968, com trajes formais e instrumentos de metal",
  },
  {
    id: "hist-1980",
    decade: "1980",
    title: "Escola de Música e Formação de Jovens",
    description:
      "Em 1982, foi criada a escola de música vinculada à banda, abrindo as portas para que jovens da cidade aprendessem instrumentos gratuitamente. Dezenas de músicos profissionais saíram desta iniciativa.",
    imageUrl: null,
    imageAlt: null,
  },
  {
    id: "hist-2000",
    decade: "2000",
    title: "Modernização e Novos Repertórios",
    description:
      "A virada do milênio trouxe novos repertórios, incluindo música popular brasileira e trilhas de filmes, além dos clássicos marciais e religiosos. A banda se modernizou e ampliou seu público.",
    imageUrl: "/images/placeholder-historia-2000.jpg",
    imageAlt:
      "Músicos da banda em apresentação em teatro coberto durante festival de música em 2004",
  },
  {
    id: "hist-2020",
    decade: "2020",
    title: "Resistência e Renovação",
    description:
      "Apesar das dificuldades impostas pela pandemia de 2020, a banda manteve sua coesão com ensaios online e apresentações ao ar livre assim que foi possível. A renovação de jovens músicos garante a continuidade da tradição.",
    imageUrl: null,
    imageAlt: null,
  },
];
