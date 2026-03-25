"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  getAdminOverview, 
  getEmotionalTrends, 
  getLogsFrequency, 
  getLogsByAddiction, 
  getStreaksSummary, 
  getReportsSummary,
  AdminOverview,
  EmotionalTrendsData,
  LogsFrequencyData,
  LogsByAddictionData,
  StreaksSummaryData,
  ReportsSummaryData
} from "@/lib/api/admin";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from "recharts";

const COLORS = ["#0ea5e9", "#7dd3fc", "#10b981", "#f59e0b", "#6366f1", "#f43f5e"];

export default function AdminDashboard() {
  const { user, isRestoring } = useAuth();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // States for different metric modules
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [trends, setTrends] = useState<EmotionalTrendsData | null>(null);
  const [frequency, setFrequency] = useState<LogsFrequencyData | null>(null);
  const [prevalence, setPrevalence] = useState<LogsByAddictionData | null>(null);
  const [streaks, setStreaks] = useState<StreaksSummaryData | null>(null);
  const [reports, setReports] = useState<ReportsSummaryData | null>(null);

  useEffect(() => {
    if (!isRestoring) {
      if (!user || user.role !== "ADMIN") {
        router.push("/login");
      } else {
        fetchAllData();
      }
    }
  }, [user, isRestoring, router]);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [ov, tr, fr, pr, st, re] = await Promise.allSettled([
        getAdminOverview(),
        getEmotionalTrends(),
        getLogsFrequency(),
        getLogsByAddiction(),
        getStreaksSummary(),
        getReportsSummary()
      ]);

      if (ov.status === 'fulfilled') setOverview(ov.value);
      if (tr.status === 'fulfilled') setTrends(tr.value);
      if (fr.status === 'fulfilled') setFrequency(fr.value);
      if (pr.status === 'fulfilled') setPrevalence(pr.value);
      if (st.status === 'fulfilled') setStreaks(st.value);
      if (re.status === 'fulfilled') setReports(re.value);

      if (ov.status === 'rejected') applyMocks();

    } catch (err: any) {
      console.error("Error loading dashboard data:", err);
      setError("Error al conectar con la API central. Visualizando datos temporales.");
      applyMocks();
    } finally {
      setLoading(false);
    }
  };

  const applyMocks = () => {
    setOverview({
      users: { total: 1500, activeLoggers: 450 },
      tracking: { totalLogs: 12500, totalStreaks: 1500, activeStreaks: 1200 },
      forum: { totalPosts: 300, totalComments: 1200, totalReactions: 5000 }
    });
    setTrends({
      global: { avgCraving: 4.5, avgEmotion: 6.2, totalLogs: 12500 },
      daily: [
        { date: "2026-03-18", avgCraving: 4.2, avgEmotion: 5.5, logCount: 150 },
        { date: "2026-03-19", avgCraving: 3.8, avgEmotion: 6.0, logCount: 162 },
        { date: "2026-03-20", avgCraving: 3.5, avgEmotion: 6.5, logCount: 140 },
        { date: "2026-03-21", avgCraving: 4.0, avgEmotion: 6.2, logCount: 180 },
        { date: "2026-03-22", avgCraving: 4.5, avgEmotion: 5.8, logCount: 155 },
      ],
      cravingDistribution: [{ level: 1, count: 500 }],
      emotionDistribution: [{ level: 10, count: 200 }]
    });
    setFrequency({
      summary: { totalLogs: 12500, avgLogsPerDay: 416.6, logsWithConsumption: 1500, logsClean: 11000, uniqueUsersLogging: 450 },
      daily: [
        { date: "2026-03-23T00:00", count: 120 },
        { date: "2026-03-24T00:00", count: 150 }
      ]
    });
    setPrevalence({
      byClassification: [
        { classification: "Sustancias", totalUsers: 800, totalLogs: 8500, avgLogsPerUser: 10.6, consumedLogs: 1200, relapseRate: 14.1, activeLoggers: 300 },
        { classification: "Conductual", totalUsers: 700, totalLogs: 4000, avgLogsPerUser: 5.7, consumedLogs: 300, relapseRate: 7.5, activeLoggers: 150 }
      ],
      byAddictionName: []
    });
    setStreaks({
      summary: { totalStreaks: 1500, activeStreaks: 1200, brokenStreaks: 300, relapseRate: 20.0 },
      averages: { avgDaysAll: 18.5, maxDaysAll: 365, avgDaysActive: 25.4, maxDaysActive: 365 },
      distribution: { "0-7": 500, "8-14": 300, "15-30": 200, "31-60": 150, "61-90": 100, "90+": 250 }
    });
    setReports({
      totalReports: 50,
      byReason: [
        { reason: "spam", count: 25 },
        { reason: "lenguaje_ofensivo", count: 15 },
        { reason: "otro", count: 10 }
      ],
      byStatus: [{ status: "pending", count: 40 }],
      byTargetType: [{ targetType: "post", count: 35 }]
    });
  };

  if (isRestoring || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-500" />
          <p className="text-xs font-jetbrains text-slate-400 uppercase tracking-widest">Cargando Sistema...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") return null;

  // Helpers to safely get array data and map for Recharts
  const streakDistObj = streaks?.distribution || {};
  const streaksDistributionData = Object.keys(streakDistObj).map(key => ({
    rango: key,
    usuarios: streakDistObj[key as keyof typeof streakDistObj]
  }));

  const mapDate = (isoString: string) => {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Navbar Minimalista */}
      <nav className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 md:px-10 sticky top-0 z-50 backdrop-blur-md bg-white/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span className="font-playfair text-xl tracking-tight text-slate-800">Reset <span className="text-sky-500 font-sans text-xs font-bold uppercase tracking-widest ml-1">Admin</span></span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={fetchAllData}
            className="p-2 text-slate-400 hover:text-sky-500 transition-colors"
            title="Refrescar datos"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
          </button>
          <div className="h-8 w-px bg-slate-100 mx-1" />
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-bold text-slate-800 leading-none">{user.name}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Administrador</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold overflow-hidden shadow-sm">
              {user.avatarUrl ? <img src={user.avatarUrl} alt={user.name} /> : user.name.charAt(0)}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-10 pt-10">
        {error && (
          <div className="mb-10 p-4 bg-sky-50 border border-sky-100 text-sky-700 rounded-2xl text-[12px] flex items-center gap-3 font-jetbrains">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            {error}
          </div>
        )}

        {/* Overview Stats (Kcards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Usuarios Totales" value={overview?.users.total ?? 0} subtitle={`${overview?.users.activeLoggers ?? 0} activos hoy`} icon="👥" color="text-slate-800" />
          <StatCard title="Rachas Activas" value={overview?.tracking.activeStreaks ?? 0} subtitle={`De ${overview?.tracking.totalStreaks ?? 0} creadas`} icon="🔥" color="text-sky-500" />
          <StatCard title="Bitácoras Totales" value={overview?.tracking.totalLogs ?? 0} subtitle="Respuestas emocionales" icon="📖" color="text-emerald-500" />
          <StatCard title="Posts en Foro" value={overview?.forum.totalPosts ?? 0} subtitle={`${overview?.forum.totalComments ?? 0} comentarios`} icon="💬" color="text-slate-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Emotional Trends (2/3 width) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-jetbrains">Tendencias Emocionales</h3>
                <p className="text-xs text-slate-500 mt-1">Nivel Promedio Global de Emoción: {trends?.global.avgEmotion.toFixed(1) ?? 'N/A'} / 10</p>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trends?.daily || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" tickFormatter={mapDate} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#0ea5e9', fontSize: 11}} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#f59e0b', fontSize: 11}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    labelFormatter={mapDate}
                  />
                  <Line yAxisId="left" type="monotone" name="Emoción (1-10)" dataKey="avgEmotion" stroke="#0ea5e9" strokeWidth={3} dot={false} />
                  <Line yAxisId="right" type="monotone" name="Craving (1-5)" dataKey="avgCraving" stroke="#f59e0b" strokeWidth={3} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Addiction Prevalence (1/3 width) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-jetbrains mb-8">Base Clínica</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={prevalence?.byClassification || []}
                    cx="50%" cy="50%"
                    innerRadius={60} outerRadius={80}
                    paddingAngle={8}
                    dataKey="totalUsers"
                    nameKey="classification"
                  >
                    {(prevalence?.byClassification || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number, name: string) => [`${value} usuarios`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                {(prevalence?.byClassification || []).map((item, i) => (
                  <div key={item.classification} className="flex flex-col items-center">
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{item.classification}</span>
                    </div>
                    <span className="text-slate-800 text-xs font-bold">{item.totalUsers}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Logs Frequency */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-jetbrains">Frecuencia de Entradas</h3>
              <p className="text-xs text-emerald-500 font-bold mt-1">Registros Limpios: {frequency?.summary?.logsClean ?? 0} vs Recaídas: {frequency?.summary?.logsWithConsumption ?? 0}</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={frequency?.daily || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" tickFormatter={mapDate} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    labelFormatter={mapDate}
                  />
                  <Bar dataKey="count" name="Registros" fill="#7dd3fc" radius={[6, 6, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Streaks Distribution */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-jetbrains">Salón de la Fama: Rachas</h3>
              <p className="text-xs text-sky-500 font-bold mt-1">Media Activa: {streaks?.averages?.avgDaysActive.toFixed(1) ?? 0} días / Max: {streaks?.averages?.maxDaysActive ?? 0} días</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={streaksDistributionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                  <YAxis dataKey="rango" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} width={50} />
                  <Tooltip 
                    cursor={{fill: '#f0f9ff'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="usuarios" name="Nro. Usuarios" fill="#38bdf8" radius={[0, 6, 6, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Forum Moderation */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-jetbrains">Moderación Comunitaria</h3>
            <span className="px-3 py-1 bg-rose-50 text-rose-500 rounded-full text-[10px] font-bold uppercase tracking-widest">
              {reports?.totalReports ?? 0} Casos Reportados
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
             {/* By Reason */}
             <div className="bg-slate-50 p-4 rounded-2xl">
                <h4 className="text-xs font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">Por Motivo</h4>
                <ul className="space-y-2">
                  {(reports?.byReason || []).map(r => (
                    <li key={r.reason} className="flex justify-between items-center text-xs">
                      <span className="text-slate-600 capitalize">{r.reason.replace('_', ' ')}</span>
                      <span className="font-bold bg-white px-2 py-0.5 rounded-lg shadow-sm text-slate-800">{r.count}</span>
                    </li>
                  ))}
                  {(reports?.byReason || []).length === 0 && <li className="text-xs text-slate-400">Sin datos</li>}
                </ul>
             </div>
             {/* By Status */}
             <div className="bg-slate-50 p-4 rounded-2xl">
                <h4 className="text-xs font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">Estado Actual</h4>
                <ul className="space-y-2">
                  {(reports?.byStatus || []).map(r => (
                    <li key={r.status} className="flex justify-between items-center text-xs">
                      <span className="text-slate-600 capitalize">{r.status}</span>
                      <span className={`font-bold bg-white px-2 py-0.5 rounded-lg shadow-sm ${r.status === 'pending' ? 'text-rose-500' : 'text-emerald-500'}`}>{r.count}</span>
                    </li>
                  ))}
                  {(reports?.byStatus || []).length === 0 && <li className="text-xs text-slate-400">Sin datos</li>}
                </ul>
             </div>
             {/* By Target Type */}
             <div className="bg-slate-50 p-4 rounded-2xl">
                <h4 className="text-xs font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">Tipo de Contenido</h4>
                <ul className="space-y-2">
                  {(reports?.byTargetType || []).map(r => (
                    <li key={r.targetType} className="flex justify-between items-center text-xs">
                      <span className="text-slate-600 capitalize">{r.targetType}</span>
                      <span className="font-bold bg-white px-2 py-0.5 rounded-lg shadow-sm text-slate-800">{r.count}</span>
                    </li>
                  ))}
                  {(reports?.byTargetType || []).length === 0 && <li className="text-xs text-slate-400">Sin datos</li>}
                </ul>
             </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 text-center">
        <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[3px] font-jetbrains text-slate-300">
          <span>Seguridad</span>
          <div className="w-1 h-1 rounded-full bg-slate-200" />
          <span>Privacidad</span>
          <div className="w-1 h-1 rounded-full bg-slate-200" />
          <span>Reset Portal</span>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon, color }: { title: string, value: number, subtitle?: string, icon: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl grayscale-[0.2]">
            {icon}
          </div>
        </div>
        <p className={`text-4xl font-black tracking-tight ${color}`}>{value.toLocaleString()}</p>
        <p className="text-[11px] font-bold text-slate-800 uppercase tracking-widest mt-2">{title}</p>
        {subtitle && <p className="text-[10px] text-slate-400 mt-1 font-jetbrains">{subtitle}</p>}
      </div>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-slate-50 rounded-full blur-2xl z-0" />
    </div>
  );
}
