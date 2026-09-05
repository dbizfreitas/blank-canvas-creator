export type SegmentoCliente =
  | "Agronegócio"
  | "Alimentos & Bebidas"
  | "Indústria Química"
  | "E-commerce & Varejo"
  | "Construção Civil"
  | "Metalurgia & Maquinário"
  | "Farmacêutico";

export type StatusCliente = "Ativo" | "Em Prospecção" | "Inativo" | "Bloqueado";

export interface Cliente {
  id: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  ie?: string;
  segmento: SegmentoCliente;
  tipoFretePreferencial: "FTL (Lotação)" | "LTL (Fracionado)" | "Ambos";
  contatoNome: string;
  contatoCargo: string;
  email: string;
  telefone: string;
  cidade: string;
  uf: string;
  status: StatusCliente;
  limiteCredito: number;
  prazoPagamentoDias: number;
  totalFretesRealizados: number;
  volumeTotalFaturado: number;
  ultimaInteracao: string;
  tags: string[];
  observacoes: string;
}

export type EtapaCotacao =
  "NOVA" | "CALCULO" | "PROPOSTA_ENVIADA" | "NEGOCIACAO" | "FECHADO" | "PERDIDO";

export type TipoCarga =
  | "Carga Seca"
  | "Refrigerada / Congelada"
  | "Granel Sólido"
  | "Perigosa (MOPP)"
  | "Carga Frágil"
  | "Maquinário Pesado";

export type ModalidadeFrete = "Lotação (FTL)" | "Fracionado (LTL)" | "Dedicado Expresso";

export interface Cotacao {
  id: string;
  numero: string;
  clienteId: string;
  clienteNome: string;
  cnpjCliente: string;
  origemCidade: string;
  origemUF: string;
  destinoCidade: string;
  destinoUF: string;
  distanciaKm: number;
  tipoCarga: TipoCarga;
  modalidade: ModalidadeFrete;
  pesoKg: number;
  volumeM3: number;
  pesoCubado: number;
  pesoCalculo: number;
  valorMercadoria: number;
  valorFretePeso: number;
  valorPedagio: number;
  valorGRIS: number;
  valorAdValorem: number;
  valorOutros: number;
  valorTotal: number;
  margemLucroPercentual: number;
  etapa: EtapaCotacao;
  motivoPerda?: string;
  validadeProposta: string;
  responsavelComercial: string;
  dataCriacao: string;
  observacoes?: string;
}

export type StatusViagem =
  | "COLETA_AGENDADA"
  | "COLETA_REALIZADA"
  | "EM_TRANSITO"
  | "EM_ENTREGA"
  | "ENTREGUE"
  | "COM_OCORRENCIA";

export interface Viagem {
  id: string;
  codigo: string;
  cotacaoId?: string;
  clienteNome: string;
  origem: string;
  destino: string;
  motoristaNome: string;
  motoristaTelefone: string;
  placaCavalo: string;
  placaCarreta: string;
  tipoVeiculo: "Carreta LS" | "Bitrem 9 Eixos" | "Truck" | "Toco" | "Fiorino / Van" | "Vanderleia";
  cteNumero: string;
  manifestoNumero: string;
  status: StatusViagem;
  previsaoEntrega: string;
  dataSaida: string;
  dataEntrega?: string;
  progressoPercentual: number;
  ultimaPosicaoRastreador: string;
  valorFrete: number;
  temperaturaAtual?: string;
}

export type TipoOcorrencia =
  | "Atraso na Entrega"
  | "Avaria Parcial"
  | "Avaria Total"
  | "Falta / Extravio"
  | "Recusa de Recebimento"
  | "Problema de Acesso / Descarga"
  | "Reentrega Solicitada"
  | "Divergência Fiscal";

export type PrioridadeOcorrencia = "BAIXA" | "MEDIA" | "ALTA" | "CRITICA";
export type StatusOcorrencia = "ABERTO" | "EM_ANALISE" | "AGUARDANDO_CLIENTE" | "RESOLVIDO";

export interface OcorrenciaSAC {
  id: string;
  protocolo: string;
  viagemId?: string;
  viagemCodigo?: string;
  clienteNome: string;
  tipo: TipoOcorrencia;
  prioridade: PrioridadeOcorrencia;
  status: StatusOcorrencia;
  dataAbertura: string;
  dataFechamento?: string;
  descricao: string;
  solucao?: string;
  responsavelAtendimento: string;
  impactoFinanceiro?: number;
}

export interface CalculoFreteInput {
  origemCidade: string;
  origemUF: string;
  destinoCidade: string;
  destinoUF: string;
  distanciaKm: number;
  tipoCarga: TipoCarga;
  modalidade: ModalidadeFrete;
  pesoKg: number;
  volumeM3: number;
  fatorCubagem?: number; // Padrão 300kg/m³ rodoviário
  valorMercadoria: number;
  margemLucroPercentual: number;
  pedagioIncluso: boolean;
  grisPercentual?: number; // Padrão 0.25%
  adValoremPercentual?: number; // Padrão 0.35%
  taxaDescarga?: number;
  eixos?: number;
}

export interface CalculoFreteResultado {
  pesoCubado: number;
  pesoCobrado: number;
  taxaBaseKm: number;
  fretePeso: number;
  gris: number;
  adValorem: number;
  pedagio: number;
  taxaDescarga: number;
  subtotalCusto: number;
  margemLucroValor: number;
  valorFinalFrete: number;
}
