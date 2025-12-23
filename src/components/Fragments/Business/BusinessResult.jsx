import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  PieChart,
  TrendingUp,
} from "lucide-react";

export default function BusinessResult({ result }) {
  return (
    <div className="lg:col-span-5">
      {result ? (
        (() => {
          const themeColors = {
            green: {
              bg: "bg-green-50",
              border: "border-green-200",
              text: "text-green-700",
              ring: "text-green-500",
              badge: "bg-green-100 text-green-800 hover:bg-green-200",
            },
            yellow: {
              bg: "bg-yellow-50",
              border: "border-yellow-200",
              text: "text-yellow-700",
              ring: "text-yellow-500",
              badge: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
            },
            red: {
              bg: "bg-red-50",
              border: "border-red-200",
              text: "text-red-700",
              ring: "text-red-500",
              badge: "bg-red-100 text-red-800 hover:bg-red-200",
            },
          };

          const theme = themeColors[result.color_code] || themeColors.green;
          return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Card
                className={`border-2 ${theme.border} ${theme.bg} overflow-hidden relative shadow-lg`}
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-40 rounded-full blur-3xl"></div>

                <CardHeader>
                  <CardTitle className="text-center text-slate-700 flex flex-col items-center gap-2">
                    <span className="text-sm font-medium uppercase tracking-wider text-slate-500">
                      Business Health Score
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center ">
                  <div className="relative flex items-center justify-center w-48 h-48 mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-white/50"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={552}
                        strokeDashoffset={
                          552 - (552 * result.health_score) / 100
                        }
                        className={`${theme.ring} transition-all duration-1000 ease-out`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-5xl font-extrabold ${theme.text}`}>
                        {result.health_score}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold mt-1">
                        / 100
                      </span>
                    </div>
                  </div>

                  <Badge
                    className={`text-lg px-8 py-1.5 shadow-sm ${theme.badge}`}
                  >
                    {result.status_label}
                  </Badge>

                  <p className="text-center text-slate-600 mt-4 px-4 text-sm leading-relaxed">
                    {result.analysis_summary}
                  </p>
                  <div className="grid grid-cols-2 gap-4 w-full mt-6">
                    <div
                      className={`bg-white/60 p-3 rounded-lg text-center border-2 ${theme.border}`}
                    >
                      <p className="text-xs text-slate-500 uppercase">
                        Margin Laba Kotor
                      </p>
                      <p className="font-bold text-slate-800">
                        {result.key_metrics.gross_margin_percent}
                      </p>
                    </div>
                    <div
                      className={`bg-white/60 p-3 rounded-lg text-center border-2 ${theme.border}`}
                    >
                      <p className="text-xs text-slate-500 uppercase">
                        Est. Laba Bersih
                      </p>
                      <p className="font-bold text-slate-800">
                        {result.key_metrics.net_profit_estimated}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader className="pb-1 border-b border-slate-100">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-red-500" />
                    Faktor Risiko
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  {!result.risk_factors || result.risk_factors.length === 0 ? (
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                      <CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold text-green-800 text-sm">
                          Operasional Sehat
                        </p>
                        <p className="text-sm text-green-700 mt-1">
                          Tidak ditemukan risiko kritikal pada data keuangan
                          ini.
                        </p>
                      </div>
                    </div>
                  ) : (
                    result.risk_factors.map((risk, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-xl border bg-red-50 border-red-100"
                      >
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-bold text-sm text-red-800">
                            Perhatian
                          </p>
                          <p className="text-sm mt-1 text-red-700">{risk}</p>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    Rekomendasi Strategis
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-5">
                    {result.recommendations.map((rec, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 text-sm text-slate-700 items-start"
                      >
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-slate-900 leading-snug">
                            {rec.title}
                          </span>
                          <span className="leading-snug text-slate-600">
                            {rec.action}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          );
        })()
      ) : (
        <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100">
            <Activity className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-700 mb-2">
            Menunggu Data
          </h3>
          <p className="text-slate-500 max-w-xs leading-relaxed">
            Silakan isi data keuangan di sebelah kiri, lalu klik tombol{" "}
            <span className="font-medium text-purple-600">
              Analisis dengan AI
            </span>
            .
          </p>
        </div>
      )}
    </div>
  );
}
