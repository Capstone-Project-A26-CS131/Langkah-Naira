import React from "react";
import axios from "axios";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ImagePlus,
  ShieldCheck,
  X,
} from "lucide-react";
import Field from "../../../components/forms/Field";
import AiAutofillCard from "../components/AiAutofillCard";
import { Button } from "@/components/ui/button";

export default function RegistrationPage({
  form,
  setForm,
  onNavigate,
  embedded = false,
  embeddedBackLabel = "Kembali ke Ringkasan Dashboard",
}) {
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");
  const [photoFile, setPhotoFile] = React.useState(null);
  const [photoPreview, setPhotoPreview] = React.useState("");
  const [photoError, setPhotoError] = React.useState("");
  const [activeStep, setActiveStep] = React.useState(1);
  const fileInputRef = React.useRef(null);

  const hasText = (value) =>
    value !== undefined && value !== null && String(value).trim() !== "";

  const isStep1Complete = Boolean(
    hasText(form.full_name) &&
      hasText(form.nickname) &&
      hasText(form.gender) &&
      hasText(form.birth_date) &&
      hasText(form.birth_place) &&
      hasText(form.religion) &&
      (form.religion !== "Lainnya" || hasText(form.religion_other)) &&
      (photoFile || hasText(form.photo_url)) &&
      hasText(form.living_with) &&
      (form.living_with !== "Lainnya" || hasText(form.living_with_other)) &&
      hasText(form.blood_type) &&
      hasText(form.height_cm) &&
      hasText(form.weight_kg) &&
      (form.hobbies || []).length > 0 &&
      (!(form.hobbies || []).includes("Lainnya") || hasText(form.hobbies_other)),
  );

  const isStep2Complete = Boolean(
    hasText(form.special_needs_diagnosis) &&
      hasText(form.birth_history) &&
      (form.birth_history !== "Lainnya" || hasText(form.birth_history_other)) &&
      (hasText(form.health_notes_other) || (form.health_notes || []).length > 0) &&
      (!form.is_allergic || hasText(form.allergy_detail)) &&
      (!form.ever_hospitalized || hasText(form.hospitalized_detail)) &&
      (!(form.health_aids || []).includes("Lainnya") ||
        hasText(form.health_aids_other)),
  );

  const isStep3Complete = Boolean(
    hasText(form.emergency_contact_1_phone) &&
      hasText(form.emergency_contact_1_relation) &&
      hasText(form.preferred_schedule),
  );

  const isStep4Complete = Boolean(
    (form.personality_traits || []).length > 0 &&
      (!(form.personality_traits || []).includes("Lainnya") ||
        hasText(form.personality_other)) &&
      (form.emotional_expressions || []).length > 0 &&
      (!(form.emotional_expressions || []).includes("Lainnya") ||
        hasText(form.emotional_other)) &&
      hasText(form.social_frequency) &&
      hasText(form.tv_hours_per_day) &&
      hasText(form.gadget_hours_per_day) &&
      hasText(form.independence_eating) &&
      hasText(form.independence_toilet) &&
      hasText(form.independence_wakeup) &&
      hasText(form.independence_dressing) &&
      hasText(form.independence_school_prep) &&
      hasText(form.independence_belongings) &&
      (form.family_activities || []).length > 0 &&
      (!(form.family_activities || []).includes("Lainnya") ||
        hasText(form.family_activities_other)),
  );

  const stepperSteps = [
    {
      id: 1,
      label: "Data Pendaftaran",
      targetId: "step-data-pendaftaran",
      completed: isStep1Complete,
    },
    {
      id: 2,
      label: "Riwayat Kesehatan",
      targetId: "step-riwayat-kesehatan",
      completed: isStep2Complete,
    },
    {
      id: 3,
      label: "Kontak Darurat",
      targetId: "step-kontak-darurat",
      completed: isStep3Complete,
    },
    {
      id: 4,
      label: "Kebiasaan & Kemandirian",
      targetId: "step-kebiasaan-kemandirian",
      completed: isStep4Complete,
    },
  ];

  const scrollToStep = (step) => {
    setActiveStep(step.id);
    const target = document.getElementById(step.targetId);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const marker = 180;
      const step4El = document.getElementById("step-kebiasaan-kemandirian");
      const step3El = document.getElementById("step-kontak-darurat");
      const step2El = document.getElementById("step-riwayat-kesehatan");

      if (step4El && step4El.getBoundingClientRect().top <= marker) {
        setActiveStep(4);
      } else if (step3El && step3El.getBoundingClientRect().top <= marker) {
        setActiveStep(3);
      } else if (step2El && step2El.getBoundingClientRect().top <= marker) {
        setActiveStep(2);
      } else {
        setActiveStep(1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (!photoFile) {
      setPhotoPreview("");
      return undefined;
    }
    const objectUrl = URL.createObjectURL(photoFile);
    setPhotoPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [photoFile]);

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setPhotoError("Format foto harus JPG, PNG, atau WEBP.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("Ukuran foto maksimal 2 MB.");
      event.target.value = "";
      return;
    }

    setPhotoError("");
    setPhotoFile(file);
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoError("");
    setForm((current) => ({ ...current, photo_url: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const update = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));
  const updateBoolean = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.checked }));
  const toggleChoice = (key, value) => {
    setForm((current) => {
      const choices = current[key] || [];
      return {
        ...current,
        [key]: choices.includes(value)
          ? choices.filter((choice) => choice !== value)
          : [...choices, value],
      };
    });
  };
  const submit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    const token =
      localStorage.getItem("token") || localStorage.getItem("parent_token");

    if (!token) {
      setSubmitError(
        "Silakan masuk sebagai orang tua sebelum mengirim pendaftaran.",
      );
      return;
    }

    setSubmitting(true);

    const diagnosis = form.special_needs_diagnosis;
    const payload = {
      photo_url: form.photo_url || null,
      full_name: form.full_name,
      nickname: form.nickname || null,
      gender: form.gender,
      religion: form.religion || null,
      religion_other: form.religion_other || null,
      birth_place: form.birth_place || null,
      birth_date: form.birth_date,
      living_with: form.living_with || null,
      living_with_other: form.living_with_other || null,
      hobbies: form.hobbies || [],
      hobbies_other: form.hobbies_other || null,
      sibling_older: Number(form.sibling_older || 0),
      sibling_younger: Number(form.sibling_younger || 0),
      blood_type: form.blood_type || null,
      health_aids: form.health_aids || [],
      health_aids_other: form.health_aids_other || null,
      health_notes: form.health_notes || [],
      health_notes_other: form.health_notes_other || null,
      is_allergic: Boolean(form.is_allergic),
      allergy_detail: form.allergy_detail || null,
      ever_hospitalized: Boolean(form.ever_hospitalized),
      hospitalized_detail: form.hospitalized_detail || null,
      is_special_needs: Boolean(diagnosis || form.is_special_needs),
      special_needs_diagnosis: diagnosis || null,
      birth_history: form.birth_history || null,
      birth_history_other: form.birth_history_other || null,
      height_cm: form.height_cm ? Number(form.height_cm) : null,
      weight_kg: form.weight_kg ? Number(form.weight_kg) : null,
      emergency_contact_1_phone: form.emergency_contact_1_phone || null,
      emergency_contact_1_relation: form.emergency_contact_1_relation || null,
      emergency_contact_2_phone: form.emergency_contact_2_phone || null,
      emergency_contact_2_relation: form.emergency_contact_2_relation || null,
      emergency_contact_3_phone: form.emergency_contact_3_phone || null,
      emergency_contact_3_relation: form.emergency_contact_3_relation || null,
      personality_traits: form.personality_traits || [],
      personality_other: form.personality_other || null,
      emotional_expressions: form.emotional_expressions || [],
      emotional_other: form.emotional_other || null,
      social_frequency: form.social_frequency || null,
      tv_hours_per_day: form.tv_hours_per_day || null,
      gadget_hours_per_day: form.gadget_hours_per_day || null,
      other_habits: form.other_habits || null,
      independence_eating: form.independence_eating || null,
      independence_toilet: form.independence_toilet || null,
      independence_wakeup: form.independence_wakeup || null,
      independence_dressing: form.independence_dressing || null,
      independence_school_prep: form.independence_school_prep || null,
      independence_belongings: form.independence_belongings || null,
      family_activities: form.family_activities || [],
      family_activities_other: form.family_activities_other || null,
      preferred_schedule: form.preferred_schedule || null,
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const response = await axios.post(
        `${apiUrl}/api/students/register`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const createdStudent = response.data.data;
      let uploadedPhotoUrl = createdStudent.photo_url || "";

      if (photoFile) {
        const photoData = new FormData();
        photoData.append("photo", photoFile);
        const photoResponse = await axios.post(
          `${apiUrl}/api/students/${createdStudent.id}/photo`,
          photoData,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        uploadedPhotoUrl =
          photoResponse.data?.data?.photo_url || uploadedPhotoUrl;
      }

      setForm((current) => ({
        ...current,
        student_id: createdStudent.id,
        photo_url: uploadedPhotoUrl,
      }));
      onNavigate("schedule");
    } catch (error) {
      const details = error.response?.data?.details;
      if (Array.isArray(details) && details.length > 0) {
        setSubmitError(details.map((detail) => detail.message).join(" "));
      } else {
        setSubmitError(
          error.response?.data?.message ||
            "Pendaftaran gagal dikirim. Periksa koneksi dan coba lagi.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const Wrapper = embedded ? "div" : "main";
  const wrapperClass = embedded ? "w-full" : "subpage registration-page";
  const innerClass = embedded ? "w-full" : "hero-background p-5 max-md:py-4";
  const containerClass = embedded ? "w-full" : "page-container";

  return (
    <Wrapper className={wrapperClass}>
      <section className={innerClass}>
        <div className={containerClass}>
          <Button
            variant="ghost"
            className="back-link h-auto p-0 text-[#524480] hover:text-[#3B325E] hover:bg-transparent font-medium inline-flex items-center gap-1.5"
            onClick={() => onNavigate(embedded ? "dashboard" : "home")}
          >
            <ArrowLeft size={13} /> {embedded ? embeddedBackLabel : "Kembali ke beranda"}
          </Button>
          <div className="form-heading">
            <div>
              <span className="form-headline">FORMULIR PENDAFTARAN</span>
              <h1>Pendaftaran Anak Baru</h1>
              <p>
                Lengkapi data diri, riwayat kesehatan, dan kontak orang tua.{" "}
                <b>* Wajib diisi.</b>
              </p>
            </div>
          </div>
          <div className="registration-stepper" role="navigation" aria-label="Tahapan formulir pendaftaran">
            {stepperSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                {index > 0 && (
                  <i className={stepperSteps[index - 1].completed ? "completed" : ""} />
                )}
                <button
                  type="button"
                  onClick={() => scrollToStep(step)}
                  className={`registration-step border-0 bg-transparent p-0 text-left cursor-pointer transition-opacity hover:opacity-85 ${
                    step.completed
                      ? "completed"
                      : activeStep === step.id
                      ? "active"
                      : ""
                  }`}
                >
                  <span>{step.completed ? <Check size={14} /> : step.id}</span>
                  <h2>{step.label}</h2>
                </button>
              </React.Fragment>
            ))}
          </div>
          <div className="registration-layout">
            <form className="registration-form" onSubmit={submit}>
              <AiAutofillCard
                onApplyParsed={(patch) =>
                  setForm((current) => ({ ...current, ...patch }))
                }
              />
              <section id="step-data-pendaftaran" className="form-card scroll-mt-24">
                <div className="form-card-title">
                  <span className="number">01</span>
                  <div>
                    <h2>Data Pendaftaran</h2>
                    <p>
                      Informasi dasar calon siswa yang akan mengikuti program.
                    </p>
                  </div>
                </div>
                <div className="form-grid">
                  <Field label="Nama lengkap anak" required>
                    <input
                      required
                      value={form.full_name}
                      onChange={update("full_name")}
                      placeholder="Tulis nama lengkap"
                    />
                  </Field>
                  <Field label="Nama panggilan">
                    <input
                      value={form.nickname}
                      onChange={update("nickname")}
                      placeholder="Nama yang biasa dipanggil"
                    />
                  </Field>
                  <Field label="Jenis kelamin" required>
                    <div className="gender-options">
                      <label className="gender-option">
                        <input
                          type="radio"
                          name="gender"
                          value="L"
                          checked={form.gender === "L"}
                          onChange={update("gender")}
                          required
                        />
                        <span>Laki-laki</span>
                      </label>
                      <label className="gender-option">
                        <input
                          type="radio"
                          name="gender"
                          value="P"
                          checked={form.gender === "P"}
                          onChange={update("gender")}
                        />
                        <span>Perempuan</span>
                      </label>
                    </div>
                  </Field>
                  <Field label="Tanggal lahir" required>
                    <input
                      required
                      type="date"
                      value={form.birth_date}
                      onChange={update("birth_date")}
                    />
                  </Field>
                  <Field label="Tempat lahir">
                    <input
                      value={form.birth_place}
                      onChange={update("birth_place")}
                      placeholder="Kota tempat lahir"
                    />
                  </Field>
                  <Field label="Agama">
                    <div className="select-wrap">
                      <select
                        value={form.religion}
                        onChange={update("religion")}
                      >
                        <option value="">Pilih agama</option>
                        <option>Islam</option>
                        <option>Katolik</option>
                        <option>Protestan</option>
                        <option>Hindu</option>
                        <option>Budha</option>
                        <option>Lainnya</option>
                      </select>
                      <ChevronDown className="select-chevron" size={15} />
                    </div>
                  </Field>
                  {form.religion === "Lainnya" && (
                    <Field label="Agama (lainnya)">
                      <input
                        value={form.religion_other}
                        onChange={update("religion_other")}
                        placeholder="Tulis agama"
                      />
                    </Field>
                  )}
                  <Field label="Foto 3x4">
                    <div className="flex w-full min-w-0 items-center gap-3 overflow-hidden rounded-lg border border-slate-200 bg-white p-2.5">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handlePhotoChange}
                        style={{ display: "none" }}
                      />
                      <div className="h-14 w-11 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400">
                        {photoPreview || form.photo_url ? (
                          <img
                            src={photoPreview || form.photo_url}
                            alt="Preview foto siswa"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <ImagePlus size={18} />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-slate-700">
                          {photoFile ? photoFile.name : "Belum ada foto dipilih"}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          JPG, PNG, atau WEBP (maks. 2 MB)
                        </p>
                        {photoError && (
                          <p className="mt-1 text-[11px] font-semibold text-red-600" role="alert">
                            {photoError}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          className="h-8 rounded-lg border-slate-200 px-3 text-xs font-semibold text-[#524480] hover:bg-[#F3EEFA]"
                        >
                          {photoFile ? "Ganti" : "Pilih Foto"}
                        </Button>
                        {photoFile && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={handleRemovePhoto}
                            className="h-8 w-8 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                            aria-label="Hapus foto"
                          >
                            <X size={14} />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Field>
                  <Field label="Tinggal bersama">
                    <div className="select-wrap">
                      <select value={form.living_with} onChange={update("living_with")}>
                        <option value="">Pilih</option>
                        <option>Kedua orang tua</option>
                        <option>Ayah</option>
                        <option>Ibu</option>
                        <option>Paman</option>
                        <option>Bibi</option>
                        <option>Kakek</option>
                        <option>Nenek</option>
                        <option>Saudara kandung</option>
                        <option>Kerabat jauh</option>
                        <option>Orang tua angkat</option>
                        <option>Lainnya</option>
                      </select>
                      <ChevronDown className="select-chevron" size={15} />
                    </div>
                  </Field>
                  {form.living_with === "Lainnya" && (
                    <Field label="Tinggal bersama (lainnya)">
                      <input
                        value={form.living_with_other}
                        onChange={update("living_with_other")}
                        placeholder="Tulis keterangan"
                      />
                    </Field>
                  )}
                  <Field label="Saudara lebih tua">
                    <input type="number" min="0" value={form.sibling_older} onChange={update("sibling_older")} />
                  </Field>
                  <Field label="Saudara lebih muda">
                    <input type="number" min="0" value={form.sibling_younger} onChange={update("sibling_younger")} />
                  </Field>
                  <Field label="Golongan darah">
                    <div className="select-wrap">
                      <select value={form.blood_type} onChange={update("blood_type")}>
                        <option value="">Pilih golongan darah</option>
                        <option>A</option><option>B</option><option>AB</option><option>O</option>
                      </select>
                      <ChevronDown className="select-chevron" size={15} />
                    </div>
                  </Field>
                  <Field label="Tinggi badan (cm)">
                    <input type="number" min="1" step="0.1" value={form.height_cm} onChange={update("height_cm")} placeholder="Contoh: 110" />
                  </Field>
                  <Field label="Berat badan (kg)">
                    <input type="number" min="1" step="0.01" value={form.weight_kg} onChange={update("weight_kg")} placeholder="Contoh: 17.5" />
                  </Field>
                  <Field label="Hobi">
                    <div className="choice-grid">
                      {["Membaca", "Menggambar", "Olahraga", "Musik", "Lainnya"].map((choice) => (
                        <label className="choice-check" key={choice}>
                          <input type="checkbox" checked={(form.hobbies || []).includes(choice)} onChange={() => toggleChoice("hobbies", choice)} />
                          {choice}
                        </label>
                      ))}
                    </div>
                  </Field>
                  {form.hobbies.includes("Lainnya") && (
                    <Field label="Hobi (lainnya)">
                      <input value={form.hobbies_other} onChange={update("hobbies_other")} placeholder="Tulis hobi lain" />
                    </Field>
                  )}
                </div>
                <div id="step-riwayat-kesehatan" className="form-section-divider scroll-mt-24">
                  <span>02 / Riwayat Kesehatan</span>
                </div>
                <div className="form-grid">
                  <Field label="Diagnosa / kebutuhan khusus">
                    <div className="select-wrap">
                      <select
                        value={form.special_needs_diagnosis}
                        onChange={update("special_needs_diagnosis")}
                      >
                        <option value="">Pilih kebutuhan anak</option>
                        <option value="Autism">Autism</option>
                        <option value="ADD/ADHD">ADD/ADHD</option>
                        <option value="Speech Delay">Speech Delay</option>
                        <option value="CP">CP</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                      <ChevronDown className="select-chevron" size={15} />
                    </div>
                  </Field>
                  <Field label="Riwayat kelahiran">
                    <div className="select-wrap">
                      <select value={form.birth_history} onChange={update("birth_history")}>
                        <option value="">Pilih riwayat kelahiran</option>
                        <option>Normal</option><option>Cesar</option><option>Vakum</option><option>Lainnya</option>
                      </select>
                      <ChevronDown className="select-chevron" size={15} />
                    </div>
                  </Field>
                  {form.birth_history === "Lainnya" && (
                    <Field label="Riwayat kelahiran (lainnya)">
                      <input value={form.birth_history_other} onChange={update("birth_history_other")} placeholder="Tulis keterangan" />
                    </Field>
                  )}
                  <Field label="Catatan kesehatan">
                    <input value={form.health_notes_other} onChange={update("health_notes_other")} placeholder="Tuliskan kondisi atau catatan kesehatan" />
                  </Field>
                  <Field label="Alergi">
                    <label className="choice-check">
                      <input type="checkbox" checked={form.is_allergic} onChange={updateBoolean("is_allergic")} />
                      Anak memiliki riwayat alergi
                    </label>
                  </Field>
                  {form.is_allergic && (
                    <Field label="Detail alergi">
                      <input value={form.allergy_detail} onChange={update("allergy_detail")} placeholder="Misalnya dingin, debu, atau makanan" />
                    </Field>
                  )}
                  <Field label="Rawat inap">
                    <label className="choice-check">
                      <input type="checkbox" checked={form.ever_hospitalized} onChange={updateBoolean("ever_hospitalized")} />
                      Pernah dirawat inap
                    </label>
                  </Field>
                  {form.ever_hospitalized && (
                    <Field label="Detail rawat inap">
                      <input value={form.hospitalized_detail} onChange={update("hospitalized_detail")} placeholder="Tanggal atau alasan rawat inap" />
                    </Field>
                  )}
                  <Field label="Alat bantu kesehatan">
                    <div className="choice-grid">
                      {["Kacamata", "Alat bantu dengar", "Tongkat", "Kursi roda", "Lainnya"].map((choice) => (
                        <label className="choice-check" key={choice}>
                          <input type="checkbox" checked={(form.health_aids || []).includes(choice)} onChange={() => toggleChoice("health_aids", choice)} />
                          {choice}
                        </label>
                      ))}
                    </div>
                  </Field>
                  {form.health_aids.includes("Lainnya") && (
                    <Field label="Alat bantu (lainnya)">
                      <input value={form.health_aids_other} onChange={update("health_aids_other")} placeholder="Tulis alat bantu lain" />
                    </Field>
                  )}
                  <Field label="Catatan diagnosis kesehatan">
                    <div className="choice-grid">
                      {["ADD/ADHD", "Autism", "Speech Delay", "CP", "Lainnya"].map((choice) => (
                        <label className="choice-check" key={choice}>
                          <input type="checkbox" checked={(form.health_notes || []).includes(choice)} onChange={() => toggleChoice("health_notes", choice)} />
                          {choice}
                        </label>
                      ))}
                    </div>
                  </Field>
                </div>
              </section>
              <section id="step-kontak-darurat" className="form-card scroll-mt-24">
                <div className="form-card-title">
                  <span className="number">03</span>
                  <div>
                    <h2>Kontak darurat</h2>
                    <p>Tambahkan sampai tiga kontak selain orang tua atau wali.</p>
                  </div>
                </div>
                <div className="form-grid">
                  <Field label="Nomor kontak darurat">
                    <input
                      type="tel"
                      value={form.emergency_contact_1_phone}
                      onChange={update("emergency_contact_1_phone")}
                      placeholder="08xxxxxxxxxx"
                    />
                  </Field>
                  <Field label="Hubungan kontak darurat">
                    <input
                      value={form.emergency_contact_1_relation}
                      onChange={update("emergency_contact_1_relation")}
                      placeholder="Contoh: Paman"
                    />
                  </Field>
                  <Field label="Nomor kontak darurat 2">
                    <input type="tel" value={form.emergency_contact_2_phone} onChange={update("emergency_contact_2_phone")} placeholder="08xxxxxxxxxx" />
                  </Field>
                  <Field label="Hubungan kontak darurat 2">
                    <input value={form.emergency_contact_2_relation} onChange={update("emergency_contact_2_relation")} placeholder="Contoh: Bibi" />
                  </Field>
                  <Field label="Nomor kontak darurat 3">
                    <input type="tel" value={form.emergency_contact_3_phone} onChange={update("emergency_contact_3_phone")} placeholder="08xxxxxxxxxx" />
                  </Field>
                  <Field label="Hubungan kontak darurat 3">
                    <input value={form.emergency_contact_3_relation} onChange={update("emergency_contact_3_relation")} placeholder="Contoh: Kakek" />
                  </Field>
                  <Field label="Waktu terapi pilihan">
                    <div className="select-wrap">
                      <select value={form.preferred_schedule} onChange={update("preferred_schedule")}>
                        <option value="">Pilih waktu</option>
                        <option>Pagi</option><option>Siang</option><option>Sore</option>
                      </select>
                      <ChevronDown className="select-chevron" size={15} />
                    </div>
                  </Field>
                </div>
              </section>
              <section id="step-kebiasaan-kemandirian" className="form-card scroll-mt-24">
                <div className="form-card-title">
                  <span className="number">04</span>
                  <div>
                    <h2>Kebiasaan dan kemandirian</h2>
                    <p>Informasi perilaku anak untuk menentukan pendampingan yang tepat.</p>
                  </div>
                </div>
                <div className="form-grid">
                  <Field label="Sifat kepribadian">
                    <div className="choice-grid">
                      {["Pendiam", "Aktif", "Pemalu", "Cepat marah", "Ramah", "Lainnya"].map((choice) => (
                        <label className="choice-check" key={choice}>
                          <input type="checkbox" checked={(form.personality_traits || []).includes(choice)} onChange={() => toggleChoice("personality_traits", choice)} />
                          {choice}
                        </label>
                      ))}
                    </div>
                  </Field>
                  {form.personality_traits.includes("Lainnya") && (
                    <Field label="Sifat (lainnya)">
                      <input value={form.personality_other} onChange={update("personality_other")} placeholder="Tulis sifat lain" />
                    </Field>
                  )}
                  <Field label="Ekspresi emosi">
                    <div className="choice-grid">
                      {["Senang", "Sedih", "Marah", "Cemas", "Sulit mengekspresikan", "Lainnya"].map((choice) => (
                        <label className="choice-check" key={choice}>
                          <input type="checkbox" checked={(form.emotional_expressions || []).includes(choice)} onChange={() => toggleChoice("emotional_expressions", choice)} />
                          {choice}
                        </label>
                      ))}
                    </div>
                  </Field>
                  {form.emotional_expressions.includes("Lainnya") && (
                    <Field label="Ekspresi emosi (lainnya)">
                      <input value={form.emotional_other} onChange={update("emotional_other")} placeholder="Tulis ekspresi lain" />
                    </Field>
                  )}
                  <Field label="Frekuensi sosialisasi">
                    <div className="select-wrap">
                      <select value={form.social_frequency} onChange={update("social_frequency")}>
                        <option value="">Pilih frekuensi</option><option>Sering</option><option>Jarang</option><option>Tidak pernah</option>
                      </select>
                      <ChevronDown className="select-chevron" size={15} />
                    </div>
                  </Field>
                  <Field label="Waktu menonton TV">
                    <div className="select-wrap">
                      <select value={form.tv_hours_per_day} onChange={update("tv_hours_per_day")}>
                        <option value="">Pilih durasi</option>
                        {["0 jam", "<1 jam", "1-2 jam", "2-3 jam", ">3 jam"].map((choice) => <option key={choice}>{choice}</option>)}
                      </select>
                      <ChevronDown className="select-chevron" size={15} />
                    </div>
                  </Field>
                  <Field label="Waktu menggunakan gawai">
                    <div className="select-wrap">
                      <select value={form.gadget_hours_per_day} onChange={update("gadget_hours_per_day")}>
                        <option value="">Pilih durasi</option>
                        {["0 jam", "<1 jam", "1-2 jam", "2-3 jam", ">3 jam"].map((choice) => <option key={choice}>{choice}</option>)}
                      </select>
                      <ChevronDown className="select-chevron" size={15} />
                    </div>
                  </Field>
                  <Field label="Kebiasaan lain">
                    <input value={form.other_habits} onChange={update("other_habits")} placeholder="Tuliskan kebiasaan penting" />
                  </Field>
                </div>
                <div className="form-section-divider"><span>Kemandirian Anak</span></div>
                <div className="form-grid">
                  {[
                    ["independence_eating", "Makan"],
                    ["independence_toilet", "Ke toilet"],
                    ["independence_wakeup", "Bangun tidur"],
                    ["independence_dressing", "Berpakaian"],
                    ["independence_school_prep", "Menyiapkan ke sekolah"],
                    ["independence_belongings", "Menjaga barang bawaan"],
                  ].map(([key, label]) => (
                    <Field label={label} key={key}>
                      <div className="select-wrap">
                        <select value={form[key]} onChange={update(key)}>
                          <option value="">Pilih</option>
                          <option value="A">Dibantu</option>
                          <option value="B">Melakukan sendiri</option>
                        </select>
                        <ChevronDown className="select-chevron" size={15} />
                      </div>
                    </Field>
                  ))}
                  <Field label="Kegiatan bersama keluarga">
                    <div className="choice-grid">
                      {["Makan bersama", "Bermain", "Berolahraga", "Beribadah", "Belajar", "Lainnya"].map((choice) => (
                        <label className="choice-check" key={choice}>
                          <input type="checkbox" checked={(form.family_activities || []).includes(choice)} onChange={() => toggleChoice("family_activities", choice)} />
                          {choice}
                        </label>
                      ))}
                    </div>
                  </Field>
                  {form.family_activities.includes("Lainnya") && (
                    <Field label="Kegiatan keluarga (lainnya)">
                      <input value={form.family_activities_other} onChange={update("family_activities_other")} placeholder="Tulis kegiatan lain" />
                    </Field>
                  )}
                </div>
              </section>
              <div className="form-footer">
                <p>
                  <ShieldCheck size={16} /> Data Anda aman dan hanya digunakan
                  untuk kebutuhan pendampingan.
                </p>
                {submitError && (
                  <p className="form-submit-error" role="alert">
                    {submitError}
                  </p>
                )}
                <Button
                  className="primary-button bg-[#524480] hover:bg-[#43376B] text-white font-bold py-3 px-6 rounded-full shadow-md"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Mengirim..." : "Lanjut pilih jadwal"}
                  {!submitting && <ArrowRight size={17} />}
                </Button>
              </div>
            </form>
            <aside className="registration-help">
              <div className="help-icon">
                <Check size={15} />
                <h2 className="help-title">Langkah Selanjutnya</h2>
              </div>
              <p>
                Admin akan memverifikasi data pendaftaran. Setelah disetujui,
                Anda dapat melanjutkan ke pemilihan jadwal terapi.
              </p>
              <div className="example-note">
                <ShieldCheck size={30} />{" "}
                <p>
                  Setelah data lengkap, lanjutkan ke pemilihan jadwal terapi.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
