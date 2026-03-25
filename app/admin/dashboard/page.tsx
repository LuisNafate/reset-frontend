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
  EmotionalTrend,
  ActivityFrequency,
  AddictionPrevalence,
  HallOfFameStreak,
  ForumReport
} from "@/lib/api/admin";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line 
} from "recharts";
import Link from "next/link";

const COLORS = ["#0ea5e9", "#7dd3fc", "#10b981", "#f59e0b", "#6366f1"];

export default function AdminDashboard() {
  const { user, isRestoring } = useAuth();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // States for different metric modules
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [trends, setTrends] = useState<EmotionalTrend[]>([]);
  const [frequency, setFrequency] = useState<ActivityFrequency[]>([]);
  const [prevalence, setPrevalence] = useState<AddictionPrevalence[]>([]);
  const [streaks, setStreaks] = useState<HallOfFameStreak[]>([]);
  const [reports, setReports] = useState<ForumReport[]>([]);

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
      // Intentar cargar todo en paralelo
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

      // Si todos fallan (probablemente backend no listo), aplicar mocks para demo
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
    setOverview({ totalUsers: 342, activeUsers24h: 89, padrinosCount: 56, adictosCount: 286 });
    setTrends([
      { date: "Lun", moodLevel: 4, label: "Calmado" },
      { date: "Mar", moodLevel: 3, label: "Ansioso" },
      { date: "Mie", moodLevel: 5, label: "Feliz" },
      { date: "Jue", moodLevel: 4, label: "Calmado" },
      { date: "Vie", moodLevel: 2, label: "Triste" },
      { date: "Sab", moodLevel: 5, label: "Motivado" },
      { date: "Dom", moodLevel: 6, label: "Excelente" },
    ]);
    setFrequency([
      { timeSlot: "08:00", count: 12 },
      { timeSlot: "12:00", count: 45 },
      { timeSlot: "16:00", count: 32 },
      { timeSlot: "20:00", count: 88 },
      { timeSlot: "00:00", count: 15 },
    ]);
    setPrevalence([
      { name: "Alcohol", value: 35 },
      { name: "Sustancias", value: 40 },
      { name: "Conductual", value: 25 },
    ]);
    setStreaks([
      { userName: "Carlos M.", days: 45 },
      { userName: "Elena R.", days: 32 },
      { userName: "Juan P.", days: 28 },
    ]);
    setReports([
      { id: "1", title: "Spam en foro", author: "User12", reason: "Publicidad no deseada", status: 'PENDING' },
      { id: "2", title: "Lenguaje ofensivo", author: "Anon99", reason: "Acoso", status: 'PENDING' },
    ]);
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

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Usuarios Totales" value={overview?.totalUsers ?? 0} icon="👥" color="text-slate-800" />
          <StatCard title="Actividad 24h" value={overview?.activeUsers24h ?? 0} icon="⚡" color="text-sky-500" />
          <StatCard title="Padrinos" value={overview?.padrinosCount ?? 0} icon="🤝" color="text-emerald-500" />
          <StatCard title="Ahijados" value={overview?.adictosCount ?? 0} icon="🌱" color="text-slate-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Emotional Trends (2/3 width) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-jetbrains">Progreso Emocional</h3>
              <select className="text-[11px] bg-slate-50 border-none rounded-lg px-3 py-1 text-slate-500 font-bold outline-none cursor-pointer">
                <option>Última Semana</option>
                <option>Último Mes</option>
              </select>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trends}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                  <YAxis hide domain={[0, 7]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Line type="monotone" dataKey="moodLevel" stroke="#0ea5e9" strokeWidth={4} dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Addiction Prevalence (1/3 width) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-jetbrains mb-8">Prevalencia</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={prevalence}
                    cx="50%" cy="50%"
                    innerRadius={60} outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {prevalence.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                {prevalence.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Logs Frequency */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-jetbrains mb-8">Frecuencia de Check-ins</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={frequency}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="timeSlot" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="count" fill="#7dd3fc" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Hall of Fame (Streaks) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-jetbrains mb-8">Salón de la Fama</h3>
            <div className="space-y-4">
              {streaks.map((streak, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-sky-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center font-bold text-sky-600 shadow-sm">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{streak.userName}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Ahijado Estrella</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-sky-500">{streak.days}</span>
                    <span className="text-[10px] text-sky-400 uppercase font-bold ml-1">Días</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Forum Moderation */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-jetbrains">Reportes de Foro</h3>
            <span className="px-3 py-1 bg-rose-50 text-rose-500 rounded-full text-[10px] font-bold uppercase tracking-widest">
              {reports.length} Pendientes
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Post / Comentario</th>
                  <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Autor</th>
                  <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Motivo</th>
                  <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {reports.map((report) => (
                  <tr key={report.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-2 font-bold text-slate-700">{report.title}</td>
                    <td className="py-4 px-2 text-slate-500 font-jetbrains">{report.author}</td>
                    <td className="py-4 px-2">
                      <span className="px-2 py-0.5 bg-slate-100 rounded-md text-[10px] font-medium text-slate-600 italic">
                        "{report.reason}"
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <button className="text-sky-500 hover:text-sky-600 font-bold uppercase tracking-widest text-[10px]">Revisar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

function StatCard({ title, value, icon, color }: { title: string, value: number, icon: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-xl grayscale-[0.5]">
          {icon}
        </div>
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 font-jetbrains">{title}</p>
      <p className={`text-3xl font-black ${color}`}>{value.toLocaleString()}</p>
    </div>
  );
}
