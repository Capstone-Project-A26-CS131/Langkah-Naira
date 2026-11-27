import React from "react";
import axios from "axios";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthPage({ onNavigate, onAuthenticated }) {
  const [mode, setMode] = React.useState("login");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const update = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
    const isRegister = mode === "register";
    const payload = isRegister
      ? {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone || null,
        role: "parent",
      }
      : {
        email: form.email,
        password: form.password,
      };

    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/${isRegister ? "register" : "login"}`,
        payload,
      );
      const { token, user } = response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("parent_token", token);
      localStorage.setItem("user", JSON.stringify(user));
      onAuthenticated(user);

      if (user.role === "admin") {
        onNavigate("dashboard");
      } else {
        onNavigate("register");
      }
    } catch (requestError) {
      const details = requestError.response?.data?.details;
      if (Array.isArray(details) && details.length > 0) {
        setError(details.map((detail) => detail.message).join(" "));
      } else {
        setError(
          requestError.response?.data?.message ||
          "Login atau registrasi gagal. Periksa koneksi dan coba lagi.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-login subpage auth-page font-sans bg-[#FBFBFE]">
      <section className="auth-layout">
        <aside className="auth-aside justify-center pt-8 pb-8 lg:pb-20 bg-[#262040]">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate("home")}
            className="self-start px-0 h-auto pb-10 font-semibold text-[13px] text-[#FFFFFF] gap-2 hover:bg-transparent hover:underline hover:cursor-pointer"
          >
            <ArrowLeft size={13} /> Kembali ke beranda
          </Button>

          <span className="auth-overline text-[#C4B7E5]">LANGKAH NAIRA</span>
          <h1 className="text-white">{mode === "login" ? "Selamat datang kembali" : "Buat akun orang tua"}</h1>
          <p className="text-white/80">
            Akun digunakan untuk mengisi formulir siswa, memilih jadwal terapi,
            dan melihat status pendaftaran.
          </p>
          <div className="auth-benefit border-white/20 bg-white/10 text-[#FFE58F]">
            <ShieldCheck size={18} />
            <span className="text-white">Data dan akses akun dilindungi</span>
          </div>
        </aside>

        <div className="bg-form auth-card justify-center bg-white border border-[#ECE7F6] rounded-3xl p-8 shadow-sm">
          <div className="auth-tabs bg-[#F4F1FA] p-1 rounded-xl flex gap-1 mb-6" role="tablist" aria-label="Pilihan autentikasi">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              role="tab"
              aria-selected={mode === "login"}
              className={`flex-1 rounded-lg text-xs font-bold transition-all ${mode === "login"
                  ? "bg-white text-[#524480] shadow-sm hover:bg-white"
                  : "bg-transparent text-[#786E95] hover:text-[#524480] hover:bg-transparent"
                }`}
              onClick={() => {
                setMode("login");
                setError("");
                setShowPassword(false);
              }}
            >
              Masuk
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              role="tab"
              aria-selected={mode === "register"}
              className={`flex-1 rounded-lg text-xs font-bold transition-all ${mode === "register"
                  ? "bg-white text-[#524480] shadow-sm hover:bg-white"
                  : "bg-transparent text-[#786E95] hover:text-[#524480] hover:bg-transparent"
                }`}
              onClick={() => {
                setMode("register");
                setError("");
                setShowPassword(false);
              }}
            >
              Daftar
            </Button>
          </div>

          <form className="auth-form space-y-4" onSubmit={submit}>
            {mode === "register" && (
              <label className="block">
                <span className="text-xs font-bold text-[#2A2345] block mb-1.5">Nama lengkap</span>
                <div className="auth-input flex items-center gap-2 border border-[#E3DEEF] rounded-xl px-3.5 py-2.5 focus-within:border-[#524480] transition-colors">
                  <UserRound size={16} className="text-[#8479A3]" />
                  <input
                    required
                    minLength={3}
                    maxLength={150}
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Nama orang tua atau wali"
                    className="w-full text-xs text-[#2A2345] bg-transparent outline-none placeholder-[#A096BF]"
                  />
                </div>
              </label>
            )}

            <label className="block">
              <span className="text-xs font-bold text-[#2A2345] block mb-1.5">Email</span>
              <div className="auth-input flex items-center gap-2 border border-[#E3DEEF] rounded-xl px-3.5 py-2.5 focus-within:border-[#524480] transition-colors">
                <UserRound size={16} className="text-[#8479A3]" />
                <input
                  required
                  type="email"
                  maxLength={150}
                  value={form.email}
                  onChange={update("email")}
                  placeholder="nama@email.com"
                  className="w-full text-xs text-[#2A2345] bg-transparent outline-none placeholder-[#A096BF]"
                />
              </div>
            </label>

            {mode === "register" && (
              <label className="block">
                <span className="text-xs font-bold text-[#2A2345] block mb-1.5">Nomor telepon</span>
                <div className="auth-input flex items-center gap-2 border border-[#E3DEEF] rounded-xl px-3.5 py-2.5 focus-within:border-[#524480] transition-colors">
                  <LockKeyhole size={16} className="text-[#8479A3]" />
                  <input
                    type="tel"
                    maxLength={20}
                    pattern="[0-9+() -]{9,20}"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="08xxxxxxxxxx"
                    className="w-full text-xs text-[#2A2345] bg-transparent outline-none placeholder-[#A096BF]"
                  />
                </div>
              </label>
            )}

            <label className="block">
              <span className="text-xs font-bold text-[#2A2345] block mb-1.5">Password</span>
              <div className="auth-input flex items-center gap-2 border border-[#E3DEEF] rounded-xl px-3.5 py-2.5 focus-within:border-[#524480] transition-colors">
                <LockKeyhole size={16} className="text-[#8479A3]" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  minLength={mode === "register" ? 6 : 1}
                  maxLength={50}
                  value={form.password}
                  onChange={update("password")}
                  placeholder={mode === "register" ? "Minimal 6 karakter" : "Masukkan password"}
                  className="w-full text-xs text-[#2A2345] bg-transparent outline-none placeholder-[#A096BF]"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="auth-password-toggle h-6 w-6 p-0 text-[#8479A3] hover:text-[#524480]"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </label>

            {error && <p className="auth-error text-xs font-semibold text-[#D93838] bg-[#FDF2F2] p-3 rounded-xl border border-[#FAD7D7]" role="alert">{error}</p>}

            <Button
              type="submit"
              variant="green"
              disabled={loading}
              className="w-full rounded-full py-3 text-xs font-bold shadow-md transition-all h-auto mt-2"
            >
              {loading
                ? "Memproses..."
                : mode === "login"
                  ? "Masuk"
                  : "Daftar akun"}
            </Button>

            <div className="auth-footer text-center pt-2">
              {mode === "login" ? (
                <p className="text-xs text-[#7B7196]">
                  Belum punya akun? Silakan{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 h-auto text-xs font-bold text-[#524480]"
                    onClick={() => {
                      setMode("register");
                      setShowPassword(false);
                    }}
                  >
                    daftar di sini
                  </Button>
                </p>
              ) : (
                <p className="text-xs text-[#7B7196]">
                  Sudah punya akun?{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 h-auto text-xs font-bold text-[#524480]"
                    onClick={() => {
                      setMode("login");
                      setShowPassword(false);
                    }}
                  >
                    Masuk
                  </Button>
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
