#!/usr/bin/env node
/**
 * Gera as páginas de guias (SEO local) em ./guias/*.html + ./guias.html (índice).
 * Conteúdo e shell num lugar só — pra adicionar página nova, acrescente um objeto em PAGINAS e rode:
 *   node gen-guias.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";

const SITE = "https://www.soteriasst.com.br";
const WHATS = "5541985058491";

/* ============================================================= CONTEÚDO */

const PAGINAS = [
  /* ---------------- SETORES ---------------- */
  {
    slug: "sst-para-restaurantes-curitiba",
    grupo: "setor",
    nome: "Restaurantes e cozinhas",
    titulo: "Segurança do Trabalho para Restaurantes em Curitiba | PGR, laudos e eSocial",
    h1: "Segurança do trabalho para <span class='hl'>restaurantes</span> em Curitiba",
    desc: "Restaurante com funcionário CLT precisa de PGR e ordens de serviço — e a cozinha tem calor, cortes e piso escorregadio. Veja o que a lei exige e quanto custa regularizar.",
    intro: "Cozinha profissional tem fogo, óleo quente, faca, piso molhado e correria. Não é à toa que restaurantes estão entre os negócios que mais geram afastamento por acidente — e entre os que mais levam multa por não ter a documentação básica de segurança do trabalho.",
    exige: [
      ["PGR — Programa de Gerenciamento de Riscos (NR-1)", "Obrigatório com funcionário CLT. Mapeia os riscos da cozinha e do salão (queimaduras, cortes, quedas) e define as medidas de controle."],
      ["Ordens de Serviço (NR-1)", "Cada função — cozinheiro, auxiliar, garçom — precisa receber por escrito os riscos do trabalho e como se proteger."],
      ["PCMSO e ASOs (NR-7)", "Exames admissional, periódico e demissional, coordenados por médico do trabalho. Sem ASO válido, o eSocial acusa."],
      ["Avaliação de calor e agentes (NR-15)", "Cozinhas com forno e fogão industrial podem caracterizar insalubridade por calor — só medição no local responde."],
    ],
    riscos: ["Queimaduras com óleo e superfícies quentes", "Cortes com facas e fatiadores", "Quedas em piso escorregadio", "Calor excessivo junto a fornos e chapas", "Movimentação de cargas (caixas, botijões)"],
    como: "Visitamos o restaurante, medimos o que precisa ser medido (calor, por exemplo), elaboramos o PGR e as ordens de serviço com ART de engenheiro, e deixamos um painel online com os vencimentos — você sabe o que renovar antes de virar problema no eSocial.",
    faq: [
      ["Restaurante pequeno, com 3 funcionários, precisa de PGR?", "Precisa. A obrigação vale a partir do primeiro funcionário CLT. Microempresas de grau de risco mais baixo podem ter simplificações, mas o setor de alimentação é grau de risco 3 — o PGR é exigido."],
      ["Cozinheiro tem direito a insalubridade por calor?", "Depende da medição. A NR-15 define limites de exposição ao calor (IBUTG); só a avaliação no local, com equipamento calibrado, diz se há direito ao adicional — e protege você de pagar sem dever ou de ser condenado por não pagar."],
      ["O que acontece se eu não tiver nada disso?", "Multas por item faltante na fiscalização, bloqueio de eventos do eSocial e, no caso de acidente (uma queimadura séria, por exemplo), responsabilização com indenização muito maior por não haver gestão de risco documentada."],
    ],
    rel: ["o-que-e-pgr", "laudo-insalubridade-curitiba", "sst-para-padarias-curitiba"],
  },
  {
    slug: "sst-para-construcao-civil-curitiba",
    grupo: "setor",
    nome: "Construção civil",
    titulo: "Segurança do Trabalho para Construção Civil em Curitiba | PGR, NR-18 e laudos",
    h1: "Segurança do trabalho para <span class='hl'>construção civil</span> em Curitiba",
    desc: "Obra é grau de risco 3-4: PGR por canteiro, NR-18, NR-35 e laudos. Veja o que a fiscalização cobra de construtoras e como regularizar com engenheiro e ART.",
    intro: "A construção civil está entre os setores mais fiscalizados do Paraná — e entre os que mais registram acidentes graves. Trabalho em altura, máquinas, escavações e eletricidade convivem no mesmo canteiro, e a documentação precisa acompanhar cada obra, não só a empresa.",
    exige: [
      ["PGR com as condições de cada canteiro (NR-1 + NR-18)", "O gerenciamento de risco precisa refletir a obra real: fases, máquinas, alturas. Obra nova = revisão do PGR."],
      ["Treinamentos de NR válidos", "NR-35 (altura, reciclagem a cada 2 anos), NR-18, NR-12 (máquinas), NR-10 (elétrica) — por trabalhador, com certificado."],
      ["Laudo de periculosidade e insalubridade (NR-16/NR-15)", "Eletricidade, ruído, poeira e cimento são exposições típicas. O laudo correto define quem recebe adicional — e quem não."],
      ["LTCAT atualizado", "Base da aposentadoria especial e do eSocial S-2240. Revisado quando muda a condição (nova fase da obra, novo equipamento)."],
    ],
    riscos: ["Queda de altura (andaimes, lajes, telhados)", "Soterramento em escavações", "Choque elétrico", "Ruído e poeira mineral (sílica)", "Máquinas sem proteção (serra, betoneira, grua)"],
    como: "Atendemos por obra: visita ao canteiro, medições (ruído, poeira), PGR e laudos com ART, e o painel online mostra o que vence por funcionário — NR-35 de cada um, ASOs, tudo num lugar. Construtora com 3 canteiros enxerga os 3 separados.",
    faq: [
      ["Cada obra precisa do seu próprio PGR?", "O PGR é da empresa, mas precisa contemplar as condições reais de cada canteiro — na prática, obra nova exige atualização do inventário de riscos e do plano de ação. PGR genérico de prateleira não passa em fiscalização."],
      ["Subcontratados (empreiteiros) são responsabilidade minha?", "A contratante pode ser responsabilizada — inclusive solidariamente, em caso de acidente — pelas condições de segurança no canteiro. Exigir e conferir a documentação dos terceiros faz parte do seu gerenciamento de risco."],
      ["Pedreiro tem insalubridade?", "Depende da exposição medida: cimento (álcalis), poeira, ruído. Não é automático por função — é a avaliação técnica no local que caracteriza, e isso protege a empresa de pagar adicional indevido."],
    ],
    rel: ["o-que-e-pgr", "laudo-periculosidade-curitiba", "ltcat-curitiba"],
  },
  {
    slug: "sst-para-clinicas-curitiba",
    grupo: "setor",
    nome: "Clínicas e saúde",
    titulo: "Segurança do Trabalho para Clínicas e Consultórios em Curitiba | NR-32, PGR e laudos",
    h1: "Segurança do trabalho para <span class='hl'>clínicas e consultórios</span> em Curitiba",
    desc: "Clínica lida com risco biológico (NR-32): PGR, insalubridade da recepcionista à enfermeira e eSocial. Veja o que a lei exige de clínicas, consultórios e laboratórios.",
    intro: "Clínicas, consultórios e laboratórios têm uma armadilha silenciosa: parecem escritórios, mas são grau de risco 3 por causa do risco biológico. A recepcionista talvez não tenha adicional — a técnica de enfermagem que aplica injetável provavelmente tem. Quem define é o laudo, não o achismo.",
    exige: [
      ["PGR com risco biológico (NR-1 + NR-32)", "Contato com pacientes, perfurocortantes e material biológico precisam estar mapeados, com plano de ação."],
      ["Laudo de insalubridade (NR-15, Anexo 14)", "Define função a função quem tem exposição a agentes biológicos — e em que grau: médio (20%) ou máximo (40%), conforme o Anexo 14."],
      ["PCMSO com protocolos da NR-32", "Vacinação (hepatite B), condutas pós-acidente com perfurocortante, exames específicos — coordenado por médico do trabalho."],
      ["LTCAT para o eSocial (S-2240)", "Exposição biológica entra no eSocial e na aposentadoria especial. Errar o enquadramento gera passivo previdenciário."],
    ],
    riscos: ["Acidente com perfurocortante (agulhas)", "Exposição a agentes biológicos", "Produtos de limpeza e esterilização (químicos)", "Posturas e movimentos repetitivos na recepção", "Radiação ionizante (se houver raio-X)"],
    como: "Avaliamos sala a sala e função a função: quem tem exposição real, quem não tem. Laudo com ART discriminando cada função — sua prova técnica robusta em fiscalização e em juízo. No painel online, os vencimentos e a checagem do eSocial ficam visíveis pra você e pro seu contador.",
    faq: [
      ["A recepcionista da clínica tem insalubridade?", "Em regra, não — se ela não tem contato com pacientes em procedimentos nem com material biológico. Mas é o laudo técnico que documenta isso; sem laudo, a empresa chega à perícia judicial sem nenhuma prova técnica própria."],
      ["Clínica de estética entra nas mesmas regras?", "Se há procedimento invasivo (agulhas, microagulhamento), há risco biológico e a NR-32 orienta os cuidados. Cada caso exige avaliação — é exatamente o que o diagnóstico inicial responde."],
      ["O que é exigido pro eSocial da clínica?", "Os eventos S-2220 (saúde ocupacional) e S-2240 (condições de exposição) precisam bater com o PCMSO e o LTCAT. Inconsistência entre eles é o que gera notificação."],
    ],
    rel: ["laudo-insalubridade-curitiba", "ltcat-curitiba", "o-que-e-pgr"],
  },
  {
    slug: "sst-para-oficinas-curitiba",
    grupo: "setor",
    nome: "Oficinas mecânicas",
    titulo: "Segurança do Trabalho para Oficinas Mecânicas em Curitiba | PGR, insalubridade e ruído",
    h1: "Segurança do trabalho para <span class='hl'>oficinas mecânicas</span> em Curitiba",
    desc: "Oficina tem ruído, solvente, graxa e solda: PGR, laudo de insalubridade e EPIs com CA válido. Veja o que a lei exige de oficinas e auto centers.",
    intro: "Oficina mecânica é o retrato do pequeno negócio exposto: ruído de compressor e lixadeira, solventes e óleos, solda, elevação de veículos. Quase sempre tem insalubridade pra caracterizar — e quase nunca tem o laudo que protege o dono de pagar errado (pra mais ou pra menos).",
    exige: [
      ["PGR (NR-1)", "Mapa dos riscos da oficina: químicos (solventes, tintas), físicos (ruído), mecânicos (elevadores, ferramentas)."],
      ["Laudo de insalubridade (NR-15)", "Ruído e químicos medidos com equipamento calibrado. Define o adicional correto — 10%, 20%, 40% ou nenhum."],
      ["Fichas de EPI com CA válido (NR-6)", "Luva, protetor auricular, máscara de solda — entregues, documentados e com CA vigente."],
      ["Treinamento e ordens de serviço", "Quem opera elevador automotivo e solda precisa estar formalmente orientado."],
    ],
    riscos: ["Ruído contínuo acima do limite (compressor, lixadeira)", "Solventes e derivados de petróleo na pele e no ar", "Fumos metálicos de solda", "Veículo em elevação (esmagamento)", "Incêndio (inflamáveis)"],
    como: "Medimos ruído e avaliamos os químicos no seu ambiente real, com dosímetro e metodologia da Fundacentro. O laudo com ART diz exatamente quem recebe o quê — e o PGR organiza as proteções. No painel online você acompanha EPIs e vencimentos por mecânico.",
    faq: [
      ["Todo mecânico tem direito a insalubridade?", "Não automaticamente. Depende da exposição medida: ruído acima de 85 dB(A) na jornada, contato com hidrocarbonetos sem proteção adequada. O laudo evita os dois erros caros: pagar sem dever ou ser condenado a pagar retroativo com reflexos (13º, férias, FGTS) e juros."],
      ["EPI elimina o adicional de insalubridade?", "Pode neutralizar, se comprovadamente eficaz e com uso fiscalizado (Súmula 80 do TST) — mas pra ruído o STF entende que o EPI nem sempre afasta o direito. É análise técnica caso a caso, função do laudo."],
      ["Oficina com 2 funcionários precisa disso tudo?", "Precisa de PGR, ASOs e EPIs documentados desde o primeiro CLT. O custo de regularizar é uma fração de uma única condenação por insalubridade não paga."],
    ],
    rel: ["laudo-insalubridade-curitiba", "o-que-e-pgr", "sst-para-industrias-curitiba"],
  },
  {
    slug: "sst-para-transportadoras-curitiba",
    grupo: "setor",
    nome: "Transportadoras",
    titulo: "Segurança do Trabalho para Transportadoras em Curitiba | PGR, toxicológico e eSocial",
    h1: "Segurança do trabalho para <span class='hl'>transportadoras</span> em Curitiba",
    desc: "Transportadora tem exame toxicológico (Lei 13.103), PGR, periculosidade de carga inflamável e eSocial. Veja as obrigações de quem tem motorista CLT.",
    intro: "Quem tem motorista profissional CLT carrega duas camadas de obrigação: a trabalhista comum (PGR, ASOs, eSocial) e a específica do setor — exame toxicológico com janela de 2 anos e 6 meses por motorista, jornada, e a periculosidade quando há carga inflamável ou escolta.",
    exige: [
      ["Exame toxicológico (Lei 13.103)", "Admissional, demissional e periódico a cada 2 anos e 6 meses — por motorista, com datas individuais. Vencimento perdido = multa e CNH em risco."],
      ["PGR (NR-1)", "Riscos de carga/descarga, movimentação, pernoite, agressão externa — mapeados com plano de ação."],
      ["Laudo de periculosidade (NR-16)", "Transporte de inflamáveis e atividades com abastecimento caracterizam os 30%. O laudo diz quais motoristas e em que condições."],
      ["ASOs e eSocial em dia", "S-2220 e S-2240 por motorista, batendo com PCMSO e LTCAT."],
    ],
    riscos: ["Acidente de trânsito (principal causa de óbito ocupacional)", "Carga e descarga manual (coluna, esmagamento)", "Inflamáveis e produtos perigosos", "Jornadas longas e fadiga", "Assalto e violência externa"],
    como: "Organizamos a casa por motorista: o painel online mostra o toxicológico de cada um com semáforo de vencimento (a dor número 1 de quem tem frota), os ASOs, e os documentos da empresa. Os laudos saem com medição e ART; a checagem do eSocial avisa antes de o governo notificar.",
    faq: [
      ["Motorista de caminhão tem periculosidade?", "Tem quando transporta inflamáveis acima dos limites de isenção da NR-16 ou acompanha abastecimento. Não é todo motorista — o enquadramento errado custa 30% sobre o salário-base de cada motorista pra quem paga sem dever."],
      ["Como controlo o toxicológico de 40 motoristas com datas diferentes?", "É exatamente o que o nosso painel resolve: cada motorista com a data do seu exame e alerta antes de vencer. Sem planilha, sem surpresa."],
      ["Agregado/terceiro também é responsabilidade minha?", "Motorista agregado PJ não entra no seu eSocial, mas a tomadora mantém deveres de segurança na operação (carga/descarga nas suas instalações, por exemplo). Vale mapear no PGR."],
    ],
    rel: ["laudo-periculosidade-curitiba", "o-que-e-pgr", "ltcat-curitiba"],
  },
  {
    slug: "sst-para-industrias-curitiba",
    grupo: "setor",
    nome: "Indústrias",
    titulo: "Segurança do Trabalho para Indústrias em Curitiba e RMC | PGR, laudos, LTCAT e NR-12",
    h1: "Segurança do trabalho para <span class='hl'>indústrias</span> em Curitiba e região",
    desc: "Indústria é grau de risco 3-4: PGR, laudos de insalubridade e periculosidade, LTCAT, NR-12 e CIPA. Veja o pacote completo de conformidade industrial.",
    intro: "Na indústria, a segurança do trabalho deixa de ser um documento e vira gestão: máquinas (NR-12), ruído, químicos, empilhadeiras, caldeiras, CIPA constituída. É também onde o eSocial cruza mais dados — e onde o passivo de um laudo malfeito custa mais caro.",
    exige: [
      ["PGR robusto (NR-1)", "Inventário de riscos por setor produtivo e plano de ação acompanhado — não um PDF na gaveta."],
      ["Laudos de insalubridade e periculosidade", "Ruído, calor, químicos, eletricidade. Função a função, com medições rastreáveis."],
      ["LTCAT e aposentadoria especial", "Alimenta o S-2240 do eSocial. Errar aqui gera passivo previdenciário de anos."],
      ["CIPA (NR-5) e treinamentos", "Dimensionada pelo quadro; treinamentos NR-12, NR-11 (empilhadeira), NR-33/35 quando aplicável."],
    ],
    riscos: ["Máquinas e prensas sem proteção (NR-12)", "Ruído industrial contínuo", "Químicos no processo (solventes, ácidos, tintas)", "Empilhadeiras e movimentação de carga", "Espaços confinados e trabalho a quente"],
    como: "Fazemos a avaliação completa de planta: medições com equipamento calibrado, laudos com ART, PGR com plano de ação executável e o painel online pra acompanhar vencimento por funcionário — treinamento NR-12 do operador, ASO do soldador, tudo visível. Pra grau de risco alto, oferecemos atendimento técnico contínuo em contrato mensal.",
    faq: [
      ["Qual a diferença entre LTCAT e laudo de insalubridade?", "O LTCAT é previdenciário: documenta exposição pra aposentadoria especial e eSocial. O laudo de insalubridade é trabalhista: define adicional salarial pela NR-15. As medições se aproveitam, mas são documentos com fins e consequências diferentes."],
      ["Minha indústria precisa de engenheiro de segurança contratado (SESMT)?", "Depende do dimensionamento da NR-4 (grau de risco × nº de funcionários). Muitas indústrias médias ficam abaixo da exigência de SESMT próprio — e cobrem a responsabilidade técnica com consultoria contínua de engenheiro externo, que é o que oferecemos."],
      ["O que o eSocial cruza da indústria?", "S-2240 com o LTCAT (agentes, intensidade, EPI/EPC), S-2220 com o PCMSO, S-2210 com CATs. Divergência entre o evento enviado e o laudo é a porta de entrada da fiscalização moderna."],
    ],
    rel: ["ltcat-curitiba", "laudo-insalubridade-curitiba", "laudo-periculosidade-curitiba"],
  },
  {
    slug: "sst-para-comercio-curitiba",
    grupo: "setor",
    nome: "Comércio e lojas",
    titulo: "Segurança do Trabalho para Comércio e Lojas em Curitiba | PGR simplificado e eSocial",
    h1: "Segurança do trabalho para <span class='hl'>comércio e lojas</span> em Curitiba",
    desc: "Loja com funcionário CLT também precisa de PGR e eSocial — mas o caminho é mais simples e barato que você imagina. Veja o mínimo legal do comércio.",
    intro: "Boa notícia pra quem tem loja, mercado ou escritório comercial: o seu grau de risco é baixo, e a conformidade é a mais simples e barata de todas — mas não é zero. Com um funcionário CLT, PGR (ou a declaração de dispensa correta), ASOs e eSocial já são obrigação.",
    exige: [
      ["PGR ou dispensa formalizada (NR-1)", "ME/EPP de grau de risco 1 e 2 sem exposição a agentes nocivos pode ser dispensada do PGR — mas precisa da declaração formal. 'Não fiz nada' não é dispensa."],
      ["ASOs em dia (NR-7)", "Admissional antes de começar, periódico conforme o protocolo, demissional na saída."],
      ["Ordens de serviço e ergonomia básica", "Caixas, estoquistas e balconistas têm riscos reais: levantamento de peso, postura, escadas."],
      ["eSocial SST", "Mesmo no comércio, os eventos S-2220/S-2240 precisam ser enviados — geralmente pelo contador, com base nos seus documentos."],
    ],
    riscos: ["Levantamento de caixas no estoque", "Quedas de escada/banqueta na reposição", "Postura estática no caixa", "Assalto (violência externa)", "Instalações elétricas improvisadas"],
    como: "Pro comércio, o nosso trabalho é dimensionar o mínimo legal sem te vender o que você não precisa: se cabe dispensa de PGR, formalizamos a dispensa; se precisa do PGR, é o PGR direto ao ponto. Diagnóstico gratuito em 2 minutos diz em qual caso você está.",
    faq: [
      ["Minha loja é ME com 2 funcionários. Preciso de PGR?", "Se o grau de risco do seu CNAE é 1 ou 2 e não há exposição a agentes nocivos, você pode emitir a declaração de dispensa do PGR — um documento formal, não a simples ausência. Nosso diagnóstico verifica seu CNAE e responde na hora."],
      ["Quanto custa regularizar um comércio pequeno?", "É o cenário mais barato da segurança do trabalho — em geral uma fração do valor de uma única multa. O orçamento exato sai depois do diagnóstico gratuito, sem compromisso."],
      ["O contador não resolve isso pra mim?", "O contador transmite o eSocial, mas os documentos que alimentam os eventos (PGR, ASOs, laudos quando houver) são técnicos — de engenheiro e médico do trabalho. Os dois trabalhos se completam: por isso temos parceria com escritórios contábeis."],
    ],
    rel: ["o-que-e-pgr", "sst-para-restaurantes-curitiba", "sst-para-padarias-curitiba"],
  },
  {
    slug: "sst-para-padarias-curitiba",
    grupo: "setor",
    nome: "Padarias e confeitarias",
    titulo: "Segurança do Trabalho para Padarias em Curitiba | PGR, calor de forno e farinha",
    h1: "Segurança do trabalho para <span class='hl'>padarias e confeitarias</span> em Curitiba",
    desc: "Padaria tem forno, madrugada, farinha em suspensão e masseira: PGR, avaliação de calor e NR-12. Veja o que a lei exige de padarias e confeitarias.",
    intro: "Padaria mistura indústria pequena com comércio: forno a lenha ou elétrico, masseira e cilindro (máquinas com histórico de acidente grave), farinha em suspensão, jornada de madrugada. O dono geralmente descobre as obrigações na primeira fiscalização — ou no primeiro acidente com o cilindro.",
    exige: [
      ["PGR (NR-1)", "Padaria é grau de risco 2-3 dependendo do CNAE; o PGR mapeia forno, máquinas e químicos de limpeza."],
      ["Proteções de máquina (NR-12)", "Masseira e cilindro precisam de proteções físicas e parada de emergência — é o item que mais mutila no setor."],
      ["Avaliação de calor (NR-15)", "Forneiro pode ter insalubridade por calor; só a medição IBUTG no local caracteriza."],
      ["ASOs e adicional noturno em ordem", "Quem assa de madrugada tem exame e direitos específicos — e o eSocial confere."],
    ],
    riscos: ["Mãos em masseira e cilindro (esmagamento/amputação)", "Calor junto ao forno", "Farinha em suspensão (respiratório)", "Queimaduras com assadeiras", "Pisos engordurados"],
    como: "Visitamos a padaria fora do horário de pico, medimos o calor na boca do forno, verificamos as proteções da masseira e do cilindro e entregamos PGR + ordens de serviço com ART. Se houver caracterização de insalubridade, o laudo define exatamente quem e quanto — sem achismo.",
    faq: [
      ["O padeiro da madrugada tem algum adicional além do noturno?", "Pode ter insalubridade por calor, dependendo da medição junto ao forno. São direitos independentes: o noturno é automático pelo horário; a insalubridade depende de laudo técnico."],
      ["Masseira antiga sem proteção pode continuar sendo usada?", "Não deveria — a NR-12 exige adequação (proteções fixas/móveis e comando seguro). É o investimento mais importante da padaria: o acidente típico de masseira é amputação."],
      ["Padaria MEI precisa de PGR?", "MEI sem funcionário CLT está dispensado das obrigações de SST patronais. Contratou o primeiro CLT, nasce a obrigação — começando pelo ASO admissional e pelo PGR (ou dispensa formal, conforme o caso)."],
    ],
    rel: ["sst-para-restaurantes-curitiba", "laudo-insalubridade-curitiba", "o-que-e-pgr"],
  },

  /* ---------------- SERVIÇOS ---------------- */
  {
    slug: "o-que-e-pgr",
    grupo: "servico",
    nome: "PGR (NR-1)",
    titulo: "O que é PGR e quem precisa ter | Soteria Segurança do Trabalho Curitiba",
    h1: "O que é o <span class='hl'>PGR</span> — e a sua empresa precisa de um?",
    desc: "PGR é o documento que materializa o Gerenciamento de Riscos (GRO) da NR-1, obrigatório para empresas com CLT. Entenda quem está dispensado, validade e preço em Curitiba.",
    intro: "O PGR (Programa de Gerenciamento de Riscos) substituiu o antigo PPRA em 2022 e é o documento-mãe da segurança do trabalho: o inventário dos riscos da sua operação e o plano de ação pra controlá-los. É a primeira coisa que fiscal, juiz e eSocial perguntam.",
    secExige: "O essencial em 4 pontos",
    exige: [
      ["Quem precisa", "Toda empresa com funcionário CLT, a partir do primeiro. Exceções: MEI sem empregado e ME/EPP de grau de risco 1-2 sem exposição a agentes nocivos (estas precisam formalizar a dispensa)."],
      ["O que contém", "Inventário de riscos (físicos, químicos, biológicos, ergonômicos, mecânicos) por função/ambiente + plano de ação com prazos e responsáveis."],
      ["Validade", "O documento é vivo: revisão a cada 2 anos (3 pra ME/EPP com certificação), ou antes, quando muda o processo, o layout ou acontece acidente."],
      ["Quem assina", "Profissional habilitado em segurança do trabalho. Na Soteria, engenheiro de segurança com ART — o que dá fé técnica ao documento em juízo."],
    ],
    secRiscos: "O que um PGR malfeito te custa",
    riscos: ["Multa por item na fiscalização do trabalho", "PGR de prateleira invalidado em perícia judicial", "eSocial S-2240 sem base técnica (notificações)", "Acidente sem gestão documentada = responsabilização agravada", "Pagar adicional indevido (ou dever retroativo) por falta de avaliação"],
    como: "Nosso PGR começa com visita técnica — andamos pela sua operação, conversamos com quem executa, medimos o que precisa. O documento sai com ART, plano de ação realista e entra no painel online com alerta de revisão. Preço fechado conforme porte e nº de funções: a partir de R$ 1.500 pra negócios pequenos.",
    faq: [
      ["PGR e PPRA são a mesma coisa?", "O PGR substituiu o PPRA em janeiro de 2022, com escopo maior: todos os riscos (não só ambientais) e plano de ação gerencial. Se sua empresa ainda 'tem PPRA', está desatualizada há anos."],
      ["Posso comprar um PGR pronto pela internet?", "Pode — e é o erro mais comum. PGR genérico sem visita não reflete sua operação, não para em fiscalização e desmorona numa perícia. O barato vira passivo."],
      ["Quanto custa um PGR em Curitiba?", "Depende do porte, do grau de risco e do nº de funções. Negócio pequeno de baixo risco: a partir de R$ 1.500, com ART e visita inclusas. O diagnóstico gratuito te dá o cenário antes de qualquer proposta."],
    ],
    rel: ["laudo-insalubridade-curitiba", "ltcat-curitiba", "sst-para-comercio-curitiba"],
  },
  {
    slug: "laudo-insalubridade-curitiba",
    grupo: "servico",
    nome: "Laudo de insalubridade",
    titulo: "Laudo de Insalubridade em Curitiba | medição NR-15 com ART",
    h1: "Laudo de <span class='hl'>insalubridade</span> em Curitiba — medido no local, com ART",
    desc: "Laudo de insalubridade NR-15 define o adicional de 10%, 20% ou 40% — função a função, com medição. Privativo de engenheiro de segurança ou médico do trabalho (CLT art. 195).",
    intro: "O adicional de insalubridade não é opinião: é medição. Ruído, calor, químicos e agentes biológicos têm limites definidos na NR-15, e só a avaliação no local de trabalho — com equipamento calibrado e metodologia da Fundacentro — diz quem tem direito a 10%, 20% ou 40% do salário mínimo.",
    secExige: "O que o laudo responde",
    exige: [
      ["Quem tem direito ao adicional", "Função a função, com base na exposição medida — não no nome do cargo."],
      ["Em que grau", "Mínimo (10%), médio (20%) ou máximo (40%), conforme o agente e a intensidade encontrada."],
      ["Se o EPI neutraliza", "EPI eficaz e fiscalizado pode afastar o adicional (Súmula 80 TST) — mas há exceções importantes, como ruído. O laudo analisa caso a caso."],
      ["A prova técnica da empresa", "Por força do art. 195 da CLT, a caracterização é privativa de engenheiro de segurança ou médico do trabalho — laudo com ART é a sua defesa documentada."],
    ],
    secRiscos: "Quando você precisa de um",
    riscos: ["Funcionário pediu adicional (ou entrou com reclamatória)", "Fiscalização exigiu a avaliação", "Você paga adicional 'por via das dúvidas' e quer saber se deve mesmo", "Vai contratar pra função com exposição e quer enquadrar certo", "O eSocial S-2240 precisa de base técnica"],
    como: "Agendamos a visita, medimos durante a jornada real (dosimetria de ruído, IBUTG de calor, avaliação química conforme o agente) e entregamos o laudo com ART discriminando função a função. Atendemos Curitiba e região metropolitana com agenda rápida — laudo avulso a partir de R$ 1.500.",
    faq: [
      ["Posso parar de pagar o adicional se o laudo der negativo?", "O laudo técnico fundamenta a cessação dali em diante (não retroativa) — recomendamos fazê-lo junto com orientação jurídica trabalhista. O que não dá é decidir sem medição."],
      ["Quanto tempo leva?", "Em geral 1 a 2 semanas entre a visita e a entrega, dependendo dos agentes (alguns exigem análise laboratorial). Urgência de reclamatória? Fale conosco — priorizamos."],
      ["Laudo de outra cidade vale pra minha unidade de Curitiba?", "Não. A insalubridade é das condições do local de trabalho específico. Cada unidade com exposição precisa da sua avaliação."],
    ],
    rel: ["laudo-periculosidade-curitiba", "ltcat-curitiba", "sst-para-oficinas-curitiba"],
  },
  {
    slug: "laudo-periculosidade-curitiba",
    grupo: "servico",
    nome: "Laudo de periculosidade",
    titulo: "Laudo de Periculosidade em Curitiba | NR-16, adicional de 30% com ART",
    h1: "Laudo de <span class='hl'>periculosidade</span> em Curitiba — o adicional de 30% sem achismo",
    desc: "Inflamáveis, eletricidade, segurança patrimonial e motocicleta: o laudo NR-16 define quem recebe os 30%. Avaliação no local com ART de engenheiro.",
    intro: "Periculosidade paga 30% sobre o salário-base — o adicional mais caro da folha. E o enquadramento tem pegadinhas dos dois lados: tem empresa pagando pra quem não tem direito (área de risco mal delimitada) e empresa devendo retroativo por não pagar a quem tem.",
    secExige: "O que caracteriza (NR-16)",
    exige: [
      ["Inflamáveis e explosivos", "Armazenamento, abastecimento e transporte acima dos limites de isenção — inclui o entorno do tanque e a área de risco delimitada."],
      ["Eletricidade", "Trabalho no sistema elétrico de potência ou em suas proximidades, nas condições do Anexo 4."],
      ["Segurança patrimonial e motocicleta", "Vigilantes e trabalhadores em motocicleta têm previsões específicas."],
      ["A delimitação da área de risco", "O ponto técnico decisivo: quem circula na área de risco × quem só passa eventualmente. É o que o laudo desenha."],
    ],
    secRiscos: "Quando você precisa de um",
    riscos: ["Tem tanque, gerador ou estoque de inflamáveis no prédio", "Eletricista próprio ou manutenção em painéis", "Motoboy CLT na operação", "Reclamatória pedindo os 30%", "Dúvida se a portaria/vigia tem direito"],
    como: "Visitamos a operação, levantamos quantidades e localizações de inflamáveis, delimitamos a área de risco em planta e entregamos o laudo com ART dizendo função a função quem está enquadrado. É o documento que define a folha — sua prova técnica robusta na perícia judicial.",
    faq: [
      ["Posso acumular insalubridade e periculosidade?", "Não — a CLT manda optar pelo mais favorável quando os dois incidem. O laudo conjunto avalia ambos e aponta o cenário correto de pagamento."],
      ["Gerador no subsolo gera periculosidade pra todo o prédio?", "Não necessariamente. Depende da quantidade de combustível e de quem efetivamente trabalha/circula na área de risco delimitada. É exatamente o que a avaliação responde — antes que um processo responda por você."],
      ["O laudo vale por quanto tempo?", "Enquanto as condições não mudarem (quantidade de inflamáveis, layout, instalação elétrica). Mudou a operação, revisa-se o laudo."],
    ],
    rel: ["laudo-insalubridade-curitiba", "sst-para-transportadoras-curitiba", "sst-para-industrias-curitiba"],
  },
  {
    slug: "ltcat-curitiba",
    grupo: "servico",
    nome: "LTCAT",
    titulo: "LTCAT em Curitiba | laudo para eSocial S-2240 e aposentadoria especial",
    h1: "<span class='hl'>LTCAT</span> em Curitiba — a base do eSocial e da aposentadoria especial",
    desc: "O LTCAT documenta exposição a agentes nocivos para o INSS e alimenta o S-2240 do eSocial. Sem validade fixa (IN 128/2022), revisado quando muda a condição. Com ART.",
    intro: "O LTCAT (Laudo Técnico das Condições Ambientais do Trabalho) é o documento previdenciário da segurança do trabalho: ele diz ao INSS se o seu funcionário tem exposição que conta pra aposentadoria especial — e é dele que saem os dados do evento S-2240 do eSocial. Errar o LTCAT é plantar passivo previdenciário.",
    secExige: "O essencial em 4 pontos",
    exige: [
      ["Pra que serve", "Fundamenta o PPP (Perfil Profissiográfico Previdenciário) e o S-2240. É o que o INSS consulta quando o funcionário pede aposentadoria especial."],
      ["Quem precisa", "Empresas com exposição a agentes físicos, químicos ou biológicos — indústria, saúde, construção, oficinas, transporte. Escritório puro em regra não."],
      ["Validade", "Não tem prazo fixo (IN INSS 128/2022): vale enquanto as condições não mudarem. Trocou máquina, layout, EPC? Revisão."],
      ["Quem assina", "Engenheiro de segurança ou médico do trabalho, com ART/registro. Na Soteria, sempre com medição no local."],
    ],
    secRiscos: "O que um LTCAT errado causa",
    riscos: ["S-2240 inconsistente → notificação do eSocial", "Funcionário ganha aposentadoria especial na justiça e o INSS cobra a empresa (alíquota retroativa)", "PPP emitido errado por anos", "GFIP/eSocial com alíquota RAT/FAP indevida", "Multa por não apresentar o laudo na fiscalização"],
    como: "Medimos os agentes no local (ruído, calor, químicos, biológicos), avaliamos EPC/EPI e entregamos o LTCAT com ART pronto pra alimentar o eSocial — inclusive orientando seu contador sobre o que vai em cada campo do S-2240. No painel online, o laudo fica disponível com aviso de revisão quando você cadastrar mudança de condição.",
    faq: [
      ["LTCAT tem que ser renovado todo ano?", "Não. Desde a IN 128/2022 o LTCAT não tem validade fixa — vale enquanto as condições ambientais não mudarem. Quem te vende 'renovação anual de LTCAT' automática está vendendo papel."],
      ["LTCAT e PGR não são a mesma coisa?", "Não. O PGR é gestão de riscos (trabalhista, NR-1); o LTCAT é prova previdenciária de exposição (INSS). As medições se aproveitam entre eles, e fazemos os dois juntos com economia — mas são documentos distintos com destinos distintos."],
      ["Minha empresa nunca teve LTCAT. E agora?", "Se há exposição, o eSocial já está sendo enviado sem base técnica — ou não está sendo enviado. Os dois cenários geram notificação. O caminho é fazer o laudo agora e regularizar os eventos com seu contador; quanto antes, menor o passivo."],
    ],
    rel: ["o-que-e-pgr", "laudo-insalubridade-curitiba", "sst-para-industrias-curitiba"],
  },
];

/* ============================================================= SHELL */

const header = (depth) => {
  const p = depth ? "../" : "";
  return `<header>
  <div class="wrap nav">
    <a class="brand" href="${p}index.html">
      <div class="mark"><svg viewBox="0 0 100 100" style="width:100%;height:100%;display:block" xmlns="http://www.w3.org/2000/svg" aria-label="Soteria"><circle cx="50" cy="50" r="48" fill="#1fa84f"/><g fill="#fff"><rect x="44" y="20" width="12" height="60" rx="2"/><rect x="20" y="44" width="60" height="12" rx="2"/></g><g transform="translate(50,53) scale(0.44) translate(-50,-50)"><path d="M25 60 C25 39 36 29 50 29 C64 29 75 39 75 60 Z" fill="#ffb200"/><rect x="15" y="60" width="70" height="9" rx="4.5" fill="#ffb200"/><rect x="46" y="22" width="8" height="9" rx="2.5" fill="#ffb200"/><g stroke="#e89400" stroke-width="3.6" stroke-linecap="round"><line x1="50" y1="32" x2="50" y2="58"/><line x1="38" y1="37" x2="38" y2="58"/><line x1="62" y1="37" x2="62" y2="58"/></g></g></svg></div>
      <div><b>SOTERIA</b><span>Segurança do Trabalho · CREA-PR 208582/D</span></div>
    </a>
    <a class="btn btn-wa" href="${p}diagnostico.html">Diagnóstico grátis</a>
  </div>
</header>`;
};

const css = `
:root{--bg:#fff;--layer:#f4f4f4;--border:#e0e0e0;--border-strong:#8d8d8d;--text:#161616;--text-2:#525252;--helper:#6f6f6f;--accent:#1fa84f;--accent-hover:#168442;--accent-light:#defbe6;--accent-text:#0e6027;--green:#24a148;--body:"IBM Plex Sans",sans-serif;--mono:"IBM Plex Mono",monospace}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:var(--body);line-height:1.55;-webkit-font-smoothing:antialiased}
.wrap{max-width:880px;margin:0 auto;padding:0 28px}
a{color:inherit;text-decoration:none}
header{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.96);backdrop-filter:blur(10px);border-bottom:1px solid var(--border)}
header .wrap{max-width:1180px}
.nav{display:flex;align-items:center;justify-content:space-between;gap:12px;height:64px}
.brand{display:flex;align-items:center;gap:12px;min-width:0}
.brand>div{min-width:0}
.brand .mark{width:38px;height:38px;flex:none;display:grid;place-items:center}
.brand b{font-weight:600;font-size:.98rem;display:block;line-height:1.15;white-space:nowrap}
.brand span{font-family:var(--mono);font-size:.62rem;color:var(--helper);letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;display:block;overflow:hidden;text-overflow:ellipsis}
.btn{font-family:var(--body);font-size:.875rem;height:40px;padding:0 16px;cursor:pointer;border:none;display:inline-flex;align-items:center;justify-content:center;gap:10px;transition:.11s;letter-spacing:.01em;white-space:nowrap;flex-shrink:0}
.btn-wa{background:var(--accent);color:#fff;font-weight:500}.btn-wa:hover{background:var(--accent-hover)}
.btn-ghost{background:transparent;color:var(--accent);border:1px solid var(--accent)}.btn-ghost:hover{background:var(--accent);color:#fff}
.hero{padding:64px 0 36px;border-bottom:1px solid var(--border)}
.kicker{font-family:var(--mono);font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);margin-bottom:16px}
h1{font-weight:300;font-size:clamp(1.8rem,4vw,2.6rem);line-height:1.16;letter-spacing:-.01em}
h1 .hl{color:var(--accent);font-weight:400}
.intro{font-size:1.02rem;color:var(--text-2);font-weight:300;margin-top:18px;max-width:68ch}
section{padding:36px 0 0}
h2{font-weight:300;font-size:1.45rem;letter-spacing:-.01em;margin-bottom:16px}
.exige{display:grid;gap:1px;background:var(--border);border:1px solid var(--border)}
.exige div{background:#fff;padding:18px 20px}
.exige b{font-weight:500;display:block;margin-bottom:4px}
.exige p{color:var(--text-2);font-size:.9rem;font-weight:300}
.riscos{list-style:none;display:grid;gap:8px}
.riscos li{position:relative;padding-left:24px;color:var(--text-2);font-weight:300;font-size:.94rem}
.riscos li::before{content:"⚠";position:absolute;left:0;color:var(--accent-text);font-size:.85rem}
.como-box{background:var(--layer);border-left:4px solid var(--accent);padding:24px 26px;color:var(--text-2);font-weight:300}
.como-box b{color:var(--text);font-weight:500}
.faq dl{display:grid;gap:1px;background:var(--border);border:1px solid var(--border)}
.faq .item{background:#fff;padding:18px 22px}
.faq dt{font-weight:500;font-size:.96rem}
.faq dd{color:var(--text-2);font-size:.9rem;font-weight:300;margin-top:6px}
.cta{background:var(--layer);border:none;padding:40px 32px;text-align:center;position:relative;margin:48px 0}
.cta::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:var(--accent)}
.cta h2{margin-bottom:6px}
.cta p{color:var(--text-2);font-weight:300;margin-bottom:22px}
.cta .row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.cta .btn{height:48px;padding:0 22px}
.rel{padding-bottom:56px}
.rel ul{list-style:none;display:grid;gap:8px;margin-top:12px}
.rel a{color:var(--accent);text-decoration:underline;font-size:.94rem}
footer{border-top:1px solid var(--border);padding:32px 0;font-size:.78rem;color:var(--text-2);text-align:center;font-family:var(--mono)}
footer b{color:var(--text)}
.disclaimer{max-width:760px;margin:14px auto 0;font-size:.68rem;line-height:1.7;color:var(--helper)}
/* índice */
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px;margin-top:20px}
.cards a{background:#fff;border:1px solid var(--border);padding:22px;transition:background .11s,border-color .11s;display:block}
.cards a:hover{border-color:var(--accent)}
.cards a:hover{background:#fafafa}
.cards b{font-weight:500;display:block}
.cards span{color:var(--helper);font-size:.8rem;font-family:var(--mono)}
@media(max-width:700px){.nav{height:58px}.brand .mark{width:32px;height:32px}.brand span{font-size:.54rem}.nav .btn{font-size:.78rem;padding:0 12px;height:34px}}
`;

const footerHtml = (depth) => `<footer>
  <div class="wrap">
    <b>SOTERIA</b> — Segurança do Trabalho · CREA-PR 208582/D · Curitiba/PR
    <p class="disclaimer">Conteúdo informativo, sem caráter de consultoria para caso concreto — normas mudam e cada operação exige avaliação própria. Serviços executados sob responsabilidade técnica do profissional registrado no CREA-PR, com emissão de ART. <a href="${depth ? "../" : ""}privacidade.html" style="text-decoration:underline">Política de Privacidade</a>.</p>
  </div>
</footer>`;

function head(titulo, desc, canonical, faqJson) {
  return `<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${titulo}</title>
<meta name="description" content="${desc}" />
<link rel="canonical" href="${canonical}" />
<meta property="og:type" content="article" />
<meta property="og:locale" content="pt_BR" />
<meta property="og:site_name" content="SOTERIA — Segurança do Trabalho" />
<meta property="og:url" content="${canonical}" />
<meta property="og:title" content="${titulo}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${SITE}/og-image.png" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
${faqJson ? `<script type="application/ld+json">${faqJson}</script>` : ""}
<style>${css}</style>
</head>`;
}

function paginaHtml(p) {
  const canonical = `${SITE}/guias/${p.slug}.html`;
  const faqJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  });
  const relLinks = p.rel.map((slug) => {
    const alvo = PAGINAS.find((x) => x.slug === slug);
    return alvo ? `<li><a href="${slug}.html">${alvo.titulo.split("|")[0].trim()}</a></li>` : "";
  }).join("\n      ");
  const waMsg = encodeURIComponent(`Olá! Li o guia "${p.nome}" no site da Soteria e quero um orçamento.`);

  return `<!DOCTYPE html>
<html lang="pt-BR">
${head(p.titulo, p.desc, canonical, faqJson)}
<body>
${header(true)}

<main class="wrap">
  <section class="hero">
    <div class="kicker">${p.grupo === "setor" ? "Guia por setor" : "Guia de serviço"} · Curitiba e RMC</div>
    <h1>${p.h1}</h1>
    <p class="intro">${p.intro}</p>
  </section>

  <section>
    <h2>${p.secExige ?? "O que a lei exige"}</h2>
    <div class="exige">
      ${p.exige.map(([t, d]) => `<div><b>${t}</b><p>${d}</p></div>`).join("\n      ")}
    </div>
  </section>

  <section>
    <h2>${p.secRiscos ?? "Riscos típicos do setor"}</h2>
    <ul class="riscos">
      ${p.riscos.map((r) => `<li>${r}</li>`).join("\n      ")}
    </ul>
  </section>

  <section>
    <h2>Como a Soteria resolve</h2>
    <div class="como-box"><p>${p.como}</p></div>
  </section>

  <section class="faq">
    <h2>Perguntas frequentes</h2>
    <dl>
      ${p.faq.map(([q, a]) => `<div class="item"><dt>${q}</dt><dd>${a}</dd></div>`).join("\n      ")}
    </dl>
  </section>

  <div class="cta">
    <h2>Descubra a situação da sua empresa em 2 minutos</h2>
    <p>Diagnóstico gratuito: 12 perguntas e você vê sua nota de conformidade na hora — sem cadastro, sem compromisso.</p>
    <div class="row">
      <a class="btn btn-wa" href="../diagnostico.html">Fazer o diagnóstico grátis →</a>
      <a class="btn btn-ghost" href="https://wa.me/${WHATS}?text=${waMsg}">Falar no WhatsApp</a>
    </div>
  </div>

  <section class="rel">
    <h2>Leia também</h2>
    <ul>
      ${relLinks}
      <li><a href="../guias.html">Todos os guias →</a></li>
    </ul>
  </section>
</main>

${footerHtml(true)}
</body>
</html>`;
}

function indiceHtml() {
  const canonical = `${SITE}/guias.html`;
  const setores = PAGINAS.filter((p) => p.grupo === "setor");
  const servicos = PAGINAS.filter((p) => p.grupo === "servico");
  const card = (p) => `<a href="guias/${p.slug}.html"><b>${p.nome}</b><span>${p.grupo === "setor" ? "o que a lei exige" : "entenda o documento"}</span></a>`;
  return `<!DOCTYPE html>
<html lang="pt-BR">
${head("Guias de Segurança do Trabalho — por setor e por documento | Soteria Curitiba",
    "Guias diretos de SST para quem decide: o que a lei exige do seu setor (restaurante, obra, clínica, indústria…) e o que é cada documento (PGR, LTCAT, laudos).",
    canonical, null)}
<body>
${header(false)}

<main class="wrap">
  <section class="hero">
    <div class="kicker">Guias de segurança do trabalho</div>
    <h1>O que a lei exige <span class="hl">do seu negócio</span> — sem juridiquês</h1>
    <p class="intro">Escolha o seu setor ou o documento que te pediram. Cada guia diz o que é obrigatório, o que acontece se faltar e quanto custa resolver — escrito por quem assina com ART.</p>
  </section>

  <section>
    <h2>Por setor</h2>
    <div class="cards">
      ${setores.map(card).join("\n      ")}
    </div>
  </section>

  <section>
    <h2>Por documento</h2>
    <div class="cards">
      ${servicos.map(card).join("\n      ")}
    </div>
  </section>

  <div class="cta">
    <h2>Não achou o seu setor?</h2>
    <p>O diagnóstico gratuito funciona pra qualquer negócio com funcionário CLT — 12 perguntas, nota na hora.</p>
    <div class="row">
      <a class="btn btn-wa" href="diagnostico.html">Fazer o diagnóstico grátis →</a>
      <a class="btn btn-ghost" href="https://wa.me/${WHATS}?text=${encodeURIComponent("Olá! Vi os guias no site da Soteria e tenho uma dúvida.")}">Falar no WhatsApp</a>
    </div>
  </div>
</main>

${footerHtml(false)}
</body>
</html>`;
}

/* ============================================================= GERA */

mkdirSync("guias", { recursive: true });
for (const p of PAGINAS) writeFileSync(`guias/${p.slug}.html`, paginaHtml(p));
writeFileSync("guias.html", indiceHtml());
console.log(`✓ ${PAGINAS.length} guias + índice gerados.`);
console.log("Sitemap — adicione se ainda não tiver:");
console.log(`  ${SITE}/guias.html`);
for (const p of PAGINAS) console.log(`  ${SITE}/guias/${p.slug}.html`);
