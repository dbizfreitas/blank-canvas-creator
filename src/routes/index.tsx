import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Building2,
  Calculator,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FilePlus2,
  LayoutDashboard,
  MapPinned,
  Menu,
  MoreHorizontal,
  PackageCheck,
  Plus,
  Search,
  Settings,
  Truck,
  UsersRound,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { Cliente, Cotacao, EtapaCotacao, OcorrenciaSAC, Viagem } from "@/types/crm";

export const Route = createFileRoute("/")({ component: Index });

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const clients: Cliente[] = [
  {
    id: "cli-01",
    razaoSocial: "Cafés Horizonte S.A.",
    nomeFantasia: "Cafés Horizonte",
    cnpj: "48.169.330/0001-42",
    segmento: "Alimentos & Bebidas",
    tipoFretePreferencial: "Ambos",
    contatoNome: "Marina Costa",
    contatoCargo: "Compras",
    email: "marina@cafeshorizonte.com.br",
    telefone: "(11) 98241-6203",
    cidade: "São Paulo",
    uf: "SP",
    status: "Ativo",
    limiteCredito: 250000,
    prazoPagamentoDias: 28,
    totalFretesRealizados: 83,
    volumeTotalFaturado: 486200,
    ultimaInteracao: "Hoje, 09:18",
    tags: ["Prioridade", "Sudeste"],
    observacoes: "Renovação de tabela prevista para outubro.",
  },
  {
    id: "cli-02",
    razaoSocial: "Tecnomax Equipamentos Ltda.",
    nomeFantasia: "Tecnomax",
    cnpj: "21.809.094/0001-71",
    segmento: "Metalurgia & Maquinário",
    tipoFretePreferencial: "FTL (Lotação)",
    contatoNome: "Gustavo Nunes",
    contatoCargo: "Logística",
    email: "gustavo@tecnomax.com.br",
    telefone: "(41) 99142-3090",
    cidade: "Curitiba",
    uf: "PR",
    status: "Ativo",
    limiteCredito: 180000,
    prazoPagamentoDias: 21,
    totalFretesRealizados: 54,
    volumeTotalFaturado: 371900,
    ultimaInteracao: "Ontem, 16:42",
    tags: ["Carga especial"],
    observacoes: "Necessita agendamento de descarga.",
  },
  {
    id: "cli-03",
    razaoSocial: "Verde Campo Insumos Agrícolas S.A.",
    nomeFantasia: "Verde Campo",
    cnpj: "09.571.283/0001-08",
    segmento: "Agronegócio",
    tipoFretePreferencial: "FTL (Lotação)",
    contatoNome: "Rafael Silva",
    contatoCargo: "Supply Chain",
    email: "rafael@verdecampo.com.br",
    telefone: "(62) 98420-5712",
    cidade: "Goiânia",
    uf: "GO",
    status: "Ativo",
    limiteCredito: 320000,
    prazoPagamentoDias: 30,
    totalFretesRealizados: 112,
    volumeTotalFaturado: 654800,
    ultimaInteracao: "02 set, 14:10",
    tags: ["Safra", "Centro-Oeste"],
    observacoes: "Pico de demanda entre setembro e janeiro.",
  },
  {
    id: "cli-04",
    razaoSocial: "Nexa Farma Distribuidora Ltda.",
    nomeFantasia: "Nexa Farma",
    cnpj: "34.115.624/0001-55",
    segmento: "Farmacêutico",
    tipoFretePreferencial: "LTL (Fracionado)",
    contatoNome: "Camila Torres",
    contatoCargo: "Operações",
    email: "camila@nexafarma.com.br",
    telefone: "(19) 99674-2811",
    cidade: "Campinas",
    uf: "SP",
    status: "Em Prospecção",
    limiteCredito: 100000,
    prazoPagamentoDias: 14,
    totalFretesRealizados: 0,
    volumeTotalFaturado: 0,
    ultimaInteracao: "01 set, 11:30",
    tags: ["Temperatura controlada"],
    observacoes: "Primeira operação piloto em negociação.",
  },
];

const initialQuotes: Cotacao[] = [
  {
    id: "q-01",
    numero: "COT-2026-1842",
    clienteId: "cli-01",
    clienteNome: "Cafés Horizonte",
    cnpjCliente: clients[0].cnpj,
    origemCidade: "São Paulo",
    origemUF: "SP",
    destinoCidade: "Belo Horizonte",
    destinoUF: "MG",
    distanciaKm: 586,
    tipoCarga: "Carga Seca",
    modalidade: "Lotação (FTL)",
    pesoKg: 14500,
    volumeM3: 48,
    pesoCubado: 14400,
    pesoCalculo: 14500,
    valorMercadoria: 185000,
    valorFretePeso: 7420,
    valorPedagio: 312,
    valorGRIS: 463,
    valorAdValorem: 648,
    valorOutros: 180,
    valorTotal: 9023,
    margemLucroPercentual: 18,
    etapa: "NEGOCIACAO",
    validadeProposta: "08 set 2026",
    responsavelComercial: "Beatriz Martins",
    dataCriacao: "05 set 2026",
  },
  {
    id: "q-02",
    numero: "COT-2026-1841",
    clienteId: "cli-03",
    clienteNome: "Verde Campo",
    cnpjCliente: clients[2].cnpj,
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Ribeirão Preto",
    destinoUF: "SP",
    distanciaKm: 712,
    tipoCarga: "Granel Sólido",
    modalidade: "Lotação (FTL)",
    pesoKg: 27500,
    volumeM3: 75,
    pesoCubado: 22500,
    pesoCalculo: 27500,
    valorMercadoria: 420000,
    valorFretePeso: 12600,
    valorPedagio: 588,
    valorGRIS: 1050,
    valorAdValorem: 1470,
    valorOutros: 250,
    valorTotal: 15958,
    margemLucroPercentual: 16,
    etapa: "PROPOSTA_ENVIADA",
    validadeProposta: "10 set 2026",
    responsavelComercial: "João Lima",
    dataCriacao: "04 set 2026",
  },
  {
    id: "q-03",
    numero: "COT-2026-1840",
    clienteId: "cli-02",
    clienteNome: "Tecnomax",
    cnpjCliente: clients[1].cnpj,
    origemCidade: "Curitiba",
    origemUF: "PR",
    destinoCidade: "Porto Alegre",
    destinoUF: "RS",
    distanciaKm: 711,
    tipoCarga: "Maquinário Pesado",
    modalidade: "Lotação (FTL)",
    pesoKg: 21000,
    volumeM3: 62,
    pesoCubado: 18600,
    pesoCalculo: 21000,
    valorMercadoria: 680000,
    valorFretePeso: 11500,
    valorPedagio: 490,
    valorGRIS: 1700,
    valorAdValorem: 2380,
    valorOutros: 820,
    valorTotal: 16890,
    margemLucroPercentual: 21,
    etapa: "CALCULO",
    validadeProposta: "09 set 2026",
    responsavelComercial: "Beatriz Martins",
    dataCriacao: "05 set 2026",
  },
  {
    id: "q-04",
    numero: "COT-2026-1839",
    clienteId: "cli-04",
    clienteNome: "Nexa Farma",
    cnpjCliente: clients[3].cnpj,
    origemCidade: "Campinas",
    origemUF: "SP",
    destinoCidade: "Rio de Janeiro",
    destinoUF: "RJ",
    distanciaKm: 516,
    tipoCarga: "Refrigerada / Congelada",
    modalidade: "Fracionado (LTL)",
    pesoKg: 3200,
    volumeM3: 16,
    pesoCubado: 4800,
    pesoCalculo: 4800,
    valorMercadoria: 96000,
    valorFretePeso: 3800,
    valorPedagio: 220,
    valorGRIS: 240,
    valorAdValorem: 336,
    valorOutros: 400,
    valorTotal: 4996,
    margemLucroPercentual: 19,
    etapa: "NOVA",
    validadeProposta: "07 set 2026",
    responsavelComercial: "João Lima",
    dataCriacao: "05 set 2026",
  },
  {
    id: "q-05",
    numero: "COT-2026-1838",
    clienteId: "cli-01",
    clienteNome: "Cafés Horizonte",
    cnpjCliente: clients[0].cnpj,
    origemCidade: "Santos",
    origemUF: "SP",
    destinoCidade: "Uberlândia",
    destinoUF: "MG",
    distanciaKm: 638,
    tipoCarga: "Carga Seca",
    modalidade: "Lotação (FTL)",
    pesoKg: 18000,
    volumeM3: 55,
    pesoCubado: 16500,
    pesoCalculo: 18000,
    valorMercadoria: 240000,
    valorFretePeso: 8900,
    valorPedagio: 350,
    valorGRIS: 600,
    valorAdValorem: 840,
    valorOutros: 100,
    valorTotal: 10790,
    margemLucroPercentual: 17,
    etapa: "FECHADO",
    validadeProposta: "03 set 2026",
    responsavelComercial: "Beatriz Martins",
    dataCriacao: "01 set 2026",
  },
];

const trips: Viagem[] = [
  {
    id: "v-01",
    codigo: "TRP-9824",
    cotacaoId: "q-05",
    clienteNome: "Cafés Horizonte",
    origem: "Santos, SP",
    destino: "Uberlândia, MG",
    motoristaNome: "Carlos Eduardo",
    motoristaTelefone: "(11) 99872-1030",
    placaCavalo: "FRE-5J29",
    placaCarreta: "QWE-8H41",
    tipoVeiculo: "Carreta LS",
    cteNumero: "35260918456789000123570010000274651000274656",
    manifestoNumero: "MDFE-551943",
    status: "EM_TRANSITO",
    previsaoEntrega: "06 set, 18:00",
    dataSaida: "05 set, 06:20",
    progressoPercentual: 67,
    ultimaPosicaoRastreador: "Franca, SP - há 14 min",
    valorFrete: 10790,
  },
  {
    id: "v-02",
    codigo: "TRP-9821",
    clienteNome: "Verde Campo",
    origem: "Goiânia, GO",
    destino: "Campinas, SP",
    motoristaNome: "Aline Ribeiro",
    motoristaTelefone: "(62) 99604-2810",
    placaCavalo: "GHT-1A90",
    placaCarreta: "RTP-3D77",
    tipoVeiculo: "Bitrem 9 Eixos",
    cteNumero: "52260918456789000123570010000273101000273102",
    manifestoNumero: "MDFE-551917",
    status: "EM_ENTREGA",
    previsaoEntrega: "Hoje, 15:30",
    dataSaida: "03 set, 04:45",
    progressoPercentual: 94,
    ultimaPosicaoRastreador: "Campinas, SP - há 5 min",
    valorFrete: 18420,
  },
  {
    id: "v-03",
    codigo: "TRP-9818",
    clienteNome: "Tecnomax",
    origem: "Curitiba, PR",
    destino: "Caxias do Sul, RS",
    motoristaNome: "Roberto Farias",
    motoristaTelefone: "(41) 99140-1130",
    placaCavalo: "KLM-9B52",
    placaCarreta: "XYZ-0F18",
    tipoVeiculo: "Vanderleia",
    cteNumero: "41260918456789000123570010000272001000272002",
    manifestoNumero: "MDFE-551890",
    status: "COM_OCORRENCIA",
    previsaoEntrega: "Hoje, 17:00",
    dataSaida: "04 set, 08:30",
    progressoPercentual: 53,
    ultimaPosicaoRastreador: "Lages, SC - há 22 min",
    valorFrete: 9260,
  },
];

const issues: OcorrenciaSAC[] = [
  {
    id: "o-01",
    protocolo: "SAC-2026-104",
    viagemId: "v-03",
    viagemCodigo: "TRP-9818",
    clienteNome: "Tecnomax",
    tipo: "Atraso na Entrega",
    prioridade: "ALTA",
    status: "EM_ANALISE",
    dataAbertura: "Hoje, 10:24",
    descricao: "Interdição parcial na BR-116 impactou a janela de entrega.",
    responsavelAtendimento: "Fernanda Rocha",
  },
  {
    id: "o-02",
    protocolo: "SAC-2026-101",
    viagemCodigo: "TRP-9804",
    clienteNome: "Cafés Horizonte",
    tipo: "Avaria Parcial",
    prioridade: "MEDIA",
    status: "AGUARDANDO_CLIENTE",
    dataAbertura: "04 set, 14:08",
    descricao: "Duas caixas apresentaram amassamento externo no recebimento.",
    responsavelAtendimento: "Fernanda Rocha",
    impactoFinanceiro: 1200,
  },
];

const salesData = [
  { month: "Abr", value: 276 },
  { month: "Mai", value: 321 },
  { month: "Jun", value: 295 },
  { month: "Jul", value: 382 },
  { month: "Ago", value: 418 },
  { month: "Set", value: 462 },
];
const routeData = [
  { route: "SP → MG", value: 128 },
  { route: "GO → SP", value: 94 },
  { route: "PR → RS", value: 76 },
  { route: "SP → RJ", value: 63 },
];

const stages: { id: EtapaCotacao; label: string; color: string }[] = [
  { id: "NOVA", label: "Nova", color: "bg-slate-400" },
  { id: "CALCULO", label: "Em cálculo", color: "bg-sky-500" },
  { id: "PROPOSTA_ENVIADA", label: "Proposta enviada", color: "bg-violet-500" },
  { id: "NEGOCIACAO", label: "Negociação", color: "bg-amber-500" },
  { id: "FECHADO", label: "Fechado", color: "bg-emerald-500" },
];

function Index() {
  const [section, setSection] = useState("Visão geral");
  const [quotes, setQuotes] = useState(initialQuotes);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [search, setSearch] = useState("");

  const moveQuote = (id: string, stage: EtapaCotacao) => {
    setQuotes((items) =>
      items.map((quote) => (quote.id === id ? { ...quote, etapa: stage } : quote)),
    );
    toast.success("Cotação atualizada", { description: "A etapa comercial foi alterada." });
  };

  const selectSection = (item: string) => {
    setSection(item);
    setMobileMenuOpen(false);
  };
  const filteredClients = clients.filter((client) =>
    `${client.nomeFantasia} ${client.segmento}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-900">
      <Sidebar
        section={section}
        onSelect={selectSection}
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <main className="min-h-screen lg:pl-[260px]">
        <Topbar
          section={section}
          onMenu={() => setMobileMenuOpen(true)}
          onNewQuote={() => setCalculatorOpen(true)}
        />
        <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
          {section === "Visão geral" && (
            <Dashboard
              quotes={quotes}
              onOpenCalculator={() => setCalculatorOpen(true)}
              onNavigate={selectSection}
            />
          )}
          {section === "Cotações" && (
            <Quotes quotes={quotes} onMove={moveQuote} onNewQuote={() => setCalculatorOpen(true)} />
          )}
          {section === "Clientes" && (
            <Clients clients={filteredClients} search={search} onSearch={setSearch} />
          )}
          {section === "Operação" && <Operations trips={trips} />}
          {section === "Ocorrências" && <Issues issues={issues} />}
          {section === "Relatórios" && <Reports />}
          {section === "Configurações" && <SettingsPanel />}
        </div>
      </main>
      {calculatorOpen && <FreightCalculator onClose={() => setCalculatorOpen(false)} />}
    </div>
  );
}

function Sidebar({
  section,
  onSelect,
  mobileOpen,
  onClose,
}: {
  section: string;
  onSelect: (name: string) => void;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const items = [
    ["Visão geral", LayoutDashboard],
    ["Cotações", CircleDollarSign],
    ["Clientes", UsersRound],
    ["Operação", Truck],
    ["Ocorrências", AlertTriangle],
    ["Relatórios", MapPinned],
  ];
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/45 lg:hidden ${mobileOpen ? "block" : "hidden"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col bg-[#0b1d38] px-3 pb-4 pt-5 text-slate-300 transition-transform lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-9 flex items-center justify-between px-3">
          <Brand />
          <button className="lg:hidden" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Gestão
        </p>
        <nav className="mt-3 grid gap-1">
          {items.map(([name, Icon]) => (
            <button
              key={name as string}
              onClick={() => onSelect(name as string)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${section === name ? "bg-[#18345c] text-white shadow-sm" : "hover:bg-white/5 hover:text-white"}`}
            >
              <Icon size={18} />
              {name as string}
              {name === "Ocorrências" && (
                <span className="ml-auto rounded-full bg-orange-400 px-1.5 py-0.5 text-[10px] font-bold text-slate-950">
                  2
                </span>
              )}
            </button>
          ))}
        </nav>
        <p className="mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Sistema
        </p>
        <button
          onClick={() => onSelect("Configurações")}
          className={`mt-3 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${section === "Configurações" ? "bg-[#18345c] text-white" : "hover:bg-white/5 hover:text-white"}`}
        >
          <Settings size={18} />
          Configurações
        </button>
        <div className="mt-auto rounded-xl border border-white/10 bg-white/[.04] p-3">
          <div className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-lg bg-orange-400 text-xs font-black text-slate-950">
              AS
            </div>
            <div>
              <p className="text-xs font-semibold text-white">AllSpark Intelligence</p>
              <p className="text-[11px] text-slate-400">Plano Enterprise</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid size-9 place-items-center rounded-xl bg-orange-400 font-black italic text-[#0b1d38]">
        A
      </div>
      <div className="leading-none">
        <b className="text-[17px] tracking-tight text-white">ALLSPARK</b>
        <p className="mt-1 text-[8px] font-bold tracking-[.24em] text-orange-300">TRANSPORTADORA</p>
      </div>
    </div>
  );
}

function Topbar({
  section,
  onMenu,
  onNewQuote,
}: {
  section: string;
  onMenu: () => void;
  onNewQuote: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <button className="mr-4 lg:hidden" onClick={onMenu}>
        <Menu />
      </button>
      <div>
        <p className="text-xs text-slate-500">AllSpark Transportadora</p>
        <h1 className="text-lg font-bold tracking-tight">{section}</h1>
      </div>
      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <button className="hidden rounded-lg border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50 sm:block">
          <Search size={18} />
        </button>
        <button className="relative rounded-lg border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50">
          <Bell size={18} />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-orange-500" />
        </button>
        <Button onClick={onNewQuote} className="bg-[#0b4c85] hover:bg-[#093d6b]">
          <Plus size={17} /> <span className="hidden sm:inline">Nova cotação</span>
        </Button>
        <div className="hidden border-l border-slate-200 pl-4 md:flex md:items-center md:gap-2">
          <div className="grid size-9 place-items-center rounded-full bg-sky-100 text-xs font-bold text-sky-800">
            BM
          </div>
          <div className="text-xs">
            <b className="block">Beatriz Martins</b>
            <span className="text-slate-500">Comercial</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function Dashboard({
  quotes,
  onOpenCalculator,
  onNavigate,
}: {
  quotes: Cotacao[];
  onOpenCalculator: () => void;
  onNavigate: (value: string) => void;
}) {
  const open = quotes.filter((q) => !["FECHADO", "PERDIDO"].includes(q.etapa));
  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-[#0b4c85]">Sábado, 05 de setembro</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">Bom dia, Beatriz.</h2>
          <p className="mt-1 text-sm text-slate-500">Aqui está o pulso da sua operação hoje.</p>
        </div>
        <Button variant="outline" onClick={onOpenCalculator}>
          <Calculator size={17} /> Calcular frete
        </Button>
      </section>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="Cotações abertas"
          value={String(open.length + 14)}
          trend="12%"
          positive
          icon={FilePlus2}
          accent="blue"
        />
        <Metric
          label="Faturamento previsto"
          value="R$ 462 mil"
          trend="18,4%"
          positive
          icon={CircleDollarSign}
          accent="orange"
        />
        <Metric
          label="Fretes em trânsito"
          value="28"
          trend="4 para entregar hoje"
          icon={Truck}
          accent="violet"
        />
        <Metric
          label="Taxa de conversão"
          value="36,8%"
          trend="Meta: 35%"
          positive
          icon={PackageCheck}
          accent="green"
        />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.45fr_.85fr]">
        <Panel>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">Faturamento por mês</h3>
              <p className="mt-0.5 text-sm text-slate-500">
                Valores confirmados em milhares de reais
              </p>
            </div>
            <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
              <ArrowUpRight className="mr-1 inline" size={13} />
              18,4%
            </span>
          </div>
          <div className="mt-5 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="revenue" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0b6fb3" stopOpacity=".24" />
                    <stop offset="100%" stopColor="#0b6fb3" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#e9edf3" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  tickFormatter={(v) => `${v}k`}
                />
                <Tooltip formatter={(value) => [`R$ ${value} mil`, "Faturamento"]} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0b6fb3"
                  strokeWidth={3}
                  fill="url(#revenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel>
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">Operação em tempo real</h3>
              <p className="mt-0.5 text-sm text-slate-500">Status da frota ativa</p>
            </div>
            <button
              onClick={() => onNavigate("Operação")}
              className="text-xs font-semibold text-[#0b4c85]"
            >
              Ver todos
            </button>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <StatusTile number="28" label="Em trânsito" color="bg-sky-500" />
            <StatusTile number="6" label="Para coleta" color="bg-violet-500" />
            <StatusTile number="12" label="Em entrega" color="bg-amber-500" />
            <StatusTile number="2" label="Ocorrências" color="bg-red-500" />
          </div>
          <div className="mt-5 rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-semibold">Próxima entrega crítica</p>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span>TRP-9821 · Verde Campo</span>
              <b className="text-amber-600">15:30</b>
            </div>
          </div>
        </Panel>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
        <Panel>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Pipeline comercial</h3>
              <p className="mt-0.5 text-sm text-slate-500">
                Oportunidades que precisam da sua atenção
              </p>
            </div>
            <button
              onClick={() => onNavigate("Cotações")}
              className="flex items-center text-xs font-semibold text-[#0b4c85]"
            >
              Abrir pipeline <ChevronRight size={15} />
            </button>
          </div>
          <div className="mt-4 divide-y divide-slate-100">
            {open.slice(0, 4).map((quote) => (
              <div key={quote.id} className="flex items-center gap-3 py-3">
                <div className="grid size-9 place-items-center rounded-lg bg-sky-50 text-xs font-bold text-[#0b4c85]">
                  {quote.clienteNome.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{quote.clienteNome}</p>
                  <p className="text-xs text-slate-500">
                    {quote.origemUF} → {quote.destinoUF} · {quote.numero}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{money.format(quote.valorTotal)}</p>
                  <p className="text-xs text-slate-500">
                    {quote.etapa.replaceAll("_", " ").toLowerCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <div>
            <h3 className="font-semibold">Rotas com maior volume</h3>
            <p className="mt-0.5 text-sm text-slate-500">Fretes realizados no mês</p>
          </div>
          <div className="mt-5 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={routeData} layout="vertical" margin={{ left: 15 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="route"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#475569", fontSize: 12 }}
                  width={70}
                />
                <Tooltip cursor={{ fill: "#f1f5f9" }} />
                <Bar dataKey="value" fill="#f59e0b" radius={[0, 5, 5, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  trend,
  positive,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  trend: string;
  positive?: boolean;
  icon: typeof Truck;
  accent: string;
}) {
  const colors: Record<string, string> = {
    blue: "bg-sky-50 text-[#0b6fb3]",
    orange: "bg-orange-50 text-orange-600",
    violet: "bg-violet-50 text-violet-600",
    green: "bg-emerald-50 text-emerald-600",
  };
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className={`grid size-10 place-items-center rounded-lg ${colors[accent]}`}>
          <Icon size={20} />
        </div>
        <span
          className={`flex items-center text-xs font-semibold ${positive ? "text-emerald-600" : "text-slate-500"}`}
        >
          {positive && <ArrowUpRight size={14} />}
          {trend}
        </span>
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}
function StatusTile({ number, label, color }: { number: string; label: string; color: string }) {
  return (
    <div className="rounded-lg border border-slate-100 p-3">
      <div className={`size-2 rounded-full ${color}`} />
      <p className="mt-2 text-xl font-bold">{number}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
function Panel({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      {children}
    </section>
  );
}

function Quotes({
  quotes,
  onMove,
  onNewQuote,
}: {
  quotes: Cotacao[];
  onMove: (id: string, stage: EtapaCotacao) => void;
  onNewQuote: () => void;
}) {
  const [view, setView] = useState<"pipeline" | "list">("pipeline");
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#0b4c85]">Comercial</p>
          <h2 className="mt-1 text-2xl font-bold">Cotações</h2>
          <p className="mt-1 text-sm text-slate-500">
            Acompanhe cada oportunidade, do pedido ao fechamento.
          </p>
        </div>
        <Button onClick={onNewQuote}>
          <Plus size={17} /> Nova cotação
        </Button>
      </div>
      <div className="mb-5 flex gap-1 rounded-lg border border-slate-200 bg-white p-1 w-fit">
        <button
          onClick={() => setView("pipeline")}
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${view === "pipeline" ? "bg-[#0b1d38] text-white" : "text-slate-500"}`}
        >
          Pipeline
        </button>
        <button
          onClick={() => setView("list")}
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${view === "list" ? "bg-[#0b1d38] text-white" : "text-slate-500"}`}
        >
          Lista
        </button>
      </div>
      {view === "pipeline" ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => (
            <div className="w-[275px] shrink-0" key={stage.id}>
              <div className="mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <i className={`size-2 rounded-full ${stage.color}`} />
                  {stage.label}
                </span>
                <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-600">
                  {quotes.filter((q) => q.etapa === stage.id).length}
                </span>
              </div>
              <div className="min-h-[280px] space-y-3 rounded-xl bg-slate-200/55 p-2">
                {quotes
                  .filter((q) => q.etapa === stage.id)
                  .map((quote) => (
                    <QuoteCard key={quote.id} quote={quote} onMove={onMove} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <QuoteTable quotes={quotes} />
      )}
    </div>
  );
}
function QuoteCard({
  quote,
  onMove,
}: {
  quote: Cotacao;
  onMove: (id: string, stage: EtapaCotacao) => void;
}) {
  const stageIndex = stages.findIndex((stage) => stage.id === quote.etapa);
  const next = stages[stageIndex + 1];
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-sm font-semibold">{quote.clienteNome}</p>
        <button className="text-slate-400">
          <MoreHorizontal size={17} />
        </button>
      </div>
      <p className="mt-1 text-xs text-slate-500">{quote.numero}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>
          {quote.origemUF} <ChevronRight className="inline" size={12} /> {quote.destinoUF}
        </span>
        <span>{quote.pesoCalculo.toLocaleString("pt-BR")} kg</span>
      </div>
      <p className="mt-3 text-base font-bold">{money.format(quote.valorTotal)}</p>
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2">
        <span className="text-[11px] text-slate-500">Validade: {quote.validadeProposta}</span>
        {next && (
          <button
            onClick={() => onMove(quote.id, next.id)}
            className="text-[11px] font-bold text-[#0b4c85]"
          >
            Avançar
          </button>
        )}
      </div>
    </article>
  );
}
function QuoteTable({ quotes }: { quotes: Cotacao[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="p-4">Cotação</th>
              <th className="p-4">Cliente</th>
              <th className="p-4">Rota</th>
              <th className="p-4">Valor</th>
              <th className="p-4">Etapa</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr key={quote.id} className="border-t border-slate-100">
                <td className="p-4 font-medium">
                  {quote.numero}
                  <span className="mt-1 block text-xs font-normal text-slate-500">
                    {quote.dataCriacao}
                  </span>
                </td>
                <td className="p-4">{quote.clienteNome}</td>
                <td className="p-4">
                  {quote.origemCidade}, {quote.origemUF}{" "}
                  <ChevronRight className="inline" size={14} /> {quote.destinoCidade},{" "}
                  {quote.destinoUF}
                </td>
                <td className="p-4 font-semibold">{money.format(quote.valorTotal)}</td>
                <td className="p-4">
                  <StageBadge stage={quote.etapa} />
                </td>
                <td className="p-4">
                  <button className="text-slate-400">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function StageBadge({ stage }: { stage: EtapaCotacao }) {
  const map: Record<EtapaCotacao, string> = {
    NOVA: "bg-slate-100 text-slate-600",
    CALCULO: "bg-sky-50 text-sky-700",
    PROPOSTA_ENVIADA: "bg-violet-50 text-violet-700",
    NEGOCIACAO: "bg-amber-50 text-amber-700",
    FECHADO: "bg-emerald-50 text-emerald-700",
    PERDIDO: "bg-red-50 text-red-700",
  };
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${map[stage]}`}>
      {stage.replaceAll("_", " ")}
    </span>
  );
}

function Clients({
  clients,
  search,
  onSearch,
}: {
  clients: Cliente[];
  search: string;
  onSearch: (value: string) => void;
}) {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#0b4c85]">Relacionamento</p>
          <h2 className="mt-1 text-2xl font-bold">Clientes & embarcadores</h2>
          <p className="mt-1 text-sm text-slate-500">
            Sua base comercial e histórico de relacionamento.
          </p>
        </div>
        <Button>
          <Plus size={17} /> Novo cliente
        </Button>
      </div>
      <div className="mb-4 flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
        <Search size={18} className="text-slate-400" />
        <input
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Buscar por cliente ou segmento"
          className="ml-2 w-full bg-transparent text-sm outline-none"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {clients.map((client) => (
          <article
            key={client.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="grid size-11 place-items-center rounded-xl bg-[#eaf4fb] font-bold text-[#0b4c85]">
                {client.nomeFantasia.slice(0, 2).toUpperCase()}
              </div>
              <span
                className={`rounded-full px-2 py-1 text-[11px] font-bold ${client.status === "Ativo" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
              >
                {client.status}
              </span>
            </div>
            <h3 className="mt-4 font-bold">{client.nomeFantasia}</h3>
            <p className="mt-1 text-xs text-slate-500">
              {client.cnpj} · {client.segmento}
            </p>
            <div className="my-4 h-px bg-slate-100" />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-slate-500">Faturamento</p>
                <p className="mt-1 font-semibold">{money.format(client.volumeTotalFaturado)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Fretes realizados</p>
                <p className="mt-1 font-semibold">{client.totalFretesRealizados}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-1.5">
              {client.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() =>
                toast.info(client.contatoNome, {
                  description: `${client.contatoCargo} · ${client.email}`,
                })
              }
              className="mt-4 flex w-full items-center justify-center gap-1 border-t border-slate-100 pt-3 text-xs font-bold text-[#0b4c85]"
            >
              Ver perfil <ChevronRight size={14} />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

function Operations({ trips }: { trips: Viagem[] }) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-medium text-[#0b4c85]">Torre de controle</p>
        <h2 className="mt-1 text-2xl font-bold">Operação de transportes</h2>
        <p className="mt-1 text-sm text-slate-500">
          Acompanhe viagens, entregas e posição da frota.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {trips.map((trip) => (
          <article
            key={trip.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-bold">{trip.codigo}</p>
                <p className="mt-1 text-xs text-slate-500">CT-e {trip.cteNumero.slice(-8)}</p>
              </div>
              <TravelBadge status={trip.status} />
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold">
              <span>{trip.origem}</span>
              <div className="h-px flex-1 bg-slate-200" />
              <Truck size={17} className="text-[#0b6fb3]" />
              <div className="h-px flex-1 bg-slate-200" />
              <span>{trip.destino}</span>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${trip.status === "COM_OCORRENCIA" ? "bg-red-500" : "bg-[#0b6fb3]"}`}
                style={{ width: `${trip.progressoPercentual}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-slate-500">
              <span>{trip.progressoPercentual}% do trajeto</span>
              <span>{trip.previsaoEntrega}</span>
            </div>
            <div className="mt-5 flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <div className="grid size-8 place-items-center rounded-full bg-white text-xs font-bold text-slate-600">
                {trip.motoristaNome.slice(0, 2)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold">{trip.motoristaNome}</p>
                <p className="truncate text-[11px] text-slate-500">
                  {trip.ultimaPosicaoRastreador}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
function TravelBadge({ status }: { status: Viagem["status"] }) {
  const map: Record<Viagem["status"], [string, string]> = {
    COLETA_AGENDADA: ["Coleta agendada", "bg-violet-50 text-violet-700"],
    COLETA_REALIZADA: ["Coleta realizada", "bg-sky-50 text-sky-700"],
    EM_TRANSITO: ["Em trânsito", "bg-sky-50 text-sky-700"],
    EM_ENTREGA: ["Em entrega", "bg-amber-50 text-amber-700"],
    ENTREGUE: ["Entregue", "bg-emerald-50 text-emerald-700"],
    COM_OCORRENCIA: ["Com ocorrência", "bg-red-50 text-red-700"],
  };
  return (
    <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${map[status][1]}`}>
      {map[status][0]}
    </span>
  );
}

function Issues({ issues }: { issues: OcorrenciaSAC[] }) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-medium text-[#0b4c85]">Atendimento</p>
        <h2 className="mt-1 text-2xl font-bold">Ocorrências & SAC</h2>
        <p className="mt-1 text-sm text-slate-500">
          Trate exceções antes que elas se tornem problemas para o cliente.
        </p>
      </div>
      <div className="space-y-3">
        {issues.map((issue) => (
          <article
            key={issue.id}
            className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
          >
            <div
              className={`grid size-11 shrink-0 place-items-center rounded-xl ${issue.prioridade === "ALTA" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}
            >
              <AlertTriangle size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold">{issue.tipo}</h3>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                  {issue.protocolo}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600">{issue.descricao}</p>
              <p className="mt-2 text-xs text-slate-500">
                {issue.clienteNome} · {issue.viagemCodigo} · Aberta {issue.dataAbertura}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400">Status</p>
                <p className="mt-1 text-xs font-bold text-[#0b4c85]">
                  {issue.status.replaceAll("_", " ")}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  toast.success("Ocorrência atribuída", {
                    description: `Responsável: ${issue.responsavelAtendimento}`,
                  })
                }
              >
                Tratar
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
function Reports() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-medium text-[#0b4c85]">Inteligência logística</p>
        <h2 className="mt-1 text-2xl font-bold">Relatórios</h2>
        <p className="mt-1 text-sm text-slate-500">
          Visões consolidadas para decisões mais rápidas.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Rentabilidade por rota", "Entenda margem, custo e preço por corredor logístico."],
          ["Performance comercial", "Conversão por vendedor, segmento e origem de lead."],
          ["Nível de serviço", "OTIF, atrasos e ocorrências por cliente."],
        ].map(([title, text]) => (
          <Panel key={title}>
            <MapPinned className="text-[#0b6fb3]" />
            <h3 className="mt-4 font-bold">{title}</h3>
            <p className="mt-2 text-sm text-slate-500">{text}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-5"
              onClick={() =>
                toast.info("Relatório preparado", {
                  description: "Em um ambiente conectado, a exportação ficará disponível aqui.",
                })
              }
            >
              Gerar relatório
            </Button>
          </Panel>
        ))}
      </div>
    </div>
  );
}
function SettingsPanel() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Configurações</h2>
      <div className="mt-6 max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-bold">Perfil da empresa</h3>
        <p className="mt-1 text-sm text-slate-500">
          Informações usadas em documentos e comunicações comerciais.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Razão social" value="AllSpark Transportadora Ltda." />
          <Field label="CNPJ" value="12.345.678/0001-90" />
          <Field label="E-mail operacional" value="operacao@allspark.com.br" />
          <Field label="Telefone" value="(11) 4000-1000" />
        </div>
        <Button className="mt-6" onClick={() => toast.success("Alterações salvas")}>
          Salvar alterações
        </Button>
      </div>
    </div>
  );
}
function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="text-xs font-semibold text-slate-600">
      {label}
      <input
        defaultValue={value}
        className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal outline-none focus:border-[#0b6fb3]"
      />
    </label>
  );
}

function FreightCalculator({ onClose }: { onClose: () => void }) {
  const [weight, setWeight] = useState(12000);
  const [volume, setVolume] = useState(42);
  const [distance, setDistance] = useState(580);
  const [value, setValue] = useState(180000);
  const cubic = volume * 300;
  const charged = Math.max(weight, cubic);
  const freightWeight = distance * 9.1 + charged * 0.12;
  const toll = distance * 0.52;
  const gris = value * 0.0025;
  const adValorem = value * 0.0035;
  const total = (freightWeight + toll + gris + adValorem) * 1.18;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 sm:items-center sm:p-4">
      <section className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
          <div>
            <p className="text-xs font-semibold text-[#0b4c85]">Ferramenta comercial</p>
            <h2 className="text-lg font-bold">Calculadora de frete</h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>
        <div className="grid gap-6 p-5 md:grid-cols-[1fr_.85fr]">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Origem" value="São Paulo, SP" />
              <Field label="Destino" value="Belo Horizonte, MG" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <NumberField label="Distância (km)" value={distance} onChange={setDistance} />
              <NumberField label="Peso real (kg)" value={weight} onChange={setWeight} />
              <NumberField label="Volume (m³)" value={volume} onChange={setVolume} />
              <NumberField label="Valor da mercadoria" value={value} onChange={setValue} />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Modalidade</label>
              <select className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <option>Lotação (FTL)</option>
                <option>Fracionado (LTL)</option>
                <option>Dedicado Expresso</option>
              </select>
            </div>
            <p className="rounded-lg bg-sky-50 p-3 text-xs leading-relaxed text-sky-800">
              Peso cubado: <b>{cubic.toLocaleString("pt-BR")} kg</b>. O cálculo considera o maior
              peso entre o real e o cubado, com fator rodoviário de 300 kg/m³.
            </p>
          </div>
          <div className="rounded-xl bg-[#0b1d38] p-5 text-white">
            <p className="text-sm text-slate-300">Composição estimada</p>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <Row label="Frete-peso" value={freightWeight} />
              <Row label="Pedágio" value={toll} />
              <Row label="GRIS (0,25%)" value={gris} />
              <Row label="Ad-valorem (0,35%)" value={adValorem} />
            </div>
            <div className="my-5 border-t border-white/15" />
            <p className="text-xs uppercase tracking-wider text-orange-300">Valor sugerido</p>
            <p className="mt-1 text-3xl font-bold">{money.format(total)}</p>
            <p className="mt-2 text-xs text-slate-400">Margem comercial de 18% aplicada</p>
            <Button
              onClick={() => {
                toast.success("Cotação criada", {
                  description: "O cálculo foi salvo como nova oportunidade.",
                });
                onClose();
              }}
              className="mt-6 w-full bg-orange-400 font-bold text-[#0b1d38] hover:bg-orange-300"
            >
              <FilePlus2 size={17} /> Criar cotação
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="text-xs font-semibold text-slate-600">
      {label}
      <input
        value={value}
        type="number"
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal outline-none focus:border-[#0b6fb3]"
      />
    </label>
  );
}
function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>{money.format(value)}</span>
    </div>
  );
}
