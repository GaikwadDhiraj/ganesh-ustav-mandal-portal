"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Plus, Trash2, ArrowRight, ArrowLeft, ShieldCheck, QrCode, MapPin, Image as ImageIcon, Users, Calendar, Upload, CreditCard, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ImageUploader from "@/components/ui/image-uploader";
import { registerMandal } from "@/actions/mandalActions";
import { getPlatformSettings } from "@/actions/adminActions";
import { toast } from "sonner";
import Link from "next/link";

export default function RegisterMandalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submittedSlug, setSubmittedSlug] = useState(null);

  // Platform Admin Payment Settings
  const [platformSettings, setPlatformSettings] = useState({
    adminUpiId: "8600570542@paytm",
    registrationFee: 501
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const settings = await getPlatformSettings();
        if (settings) {
          setPlatformSettings(settings);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadSettings();
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    tagline: "गणपती बाप्पा मोरया! मंगलमूर्ती मोरया!",
    establishedYear: "१९९५",
    address: "",
    city: "पुणे",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    
    // 2 Separate Description Fields with Limits
    shortDescription: "आमच्या गणेशोत्सवात आपले सहर्ष स्वागत आहे. बाप्पाचे दर्शन घ्या व आशीर्वाद मिळवा.", // Max 150 Chars
    aboutText: "आमच्या गणेशोत्सवात आपले सहर्ष स्वागत आहे. श्रींच्या चरणी आपली सेवा व प्रार्थना अर्पित करा आणि बाप्पाचे आशीर्वाद प्राप्त करा.", // Max 1000 Chars

    heroImageUrl: "/hero-main-ganesha.jpg",
    upiId: "",
    qrCodeUrl: "",
    googleMapUrl: "",

    // Payment Txn Reference ID
    registrationFeeTxnId: "",

    // 4 Editable About Section Highlights
    aboutHighlight1Title: "भव्य व सुरेख देखावे",
    aboutHighlight1Desc: "दरवर्षी आकर्षक व पर्यावरणपूरक देखावे सादर केले जातात.",

    aboutHighlight2Title: "सामाजिक उपक्रम",
    aboutHighlight2Desc: "रक्तदान शिबिर, वृक्षारोपण व मोफत रुग्ण सेवा.",

    aboutHighlight3Title: "सांस्कृतिक स्पर्धा",
    aboutHighlight3Desc: "महिला व लहान मुलांसाठी मनोरंजक स्पर्धा.",

    aboutHighlight4Title: "एकजूट व कार्यकर्ते",
    aboutHighlight4Desc: "तरुणांची भक्कम साथ व सर्वधर्मीय बंधुभाव.",
  });

  // Dynamic Schedules
  const [events, setEvents] = useState([
    { dayTitle: "दिवस १ (प्रतिष्ठापना)", eventTime: "सकाळी ९:०० वा.", title: "श्रींची प्राणप्रतिष्ठापना व आरती", description: "पारंपरिक ढोल-ताशा गजरात आगमन." },
    { dayTitle: "दिवस ५ (महाप्रसाद)", eventTime: "सायंकाळी ६:०० वा.", title: "भव्य महाप्रसाद व भजन संध्या", description: "सर्व भाविकांसाठी महाप्रसाद." }
  ]);

  // Dynamic Members
  const [members, setMembers] = useState([
    { name: "राकेश शिंदे", designation: "अध्यक्ष", imageUrl: "" },
    { name: "सचिन देशपांडे", designation: "उपाध्यक्ष", imageUrl: "" }
  ]);

  // Dynamic Photo Gallery (Up to max 10 photos)
  const [gallery, setGallery] = useState([
    { imageUrl: "/bal-ganesha-modak.jpg", caption: "बाल गणेश उत्सव देखावा" },
    { imageUrl: "/peeking-ganesha.jpg", caption: "श्री गणेश मूर्ती देखावा" }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Event Handlers
  const addEvent = () => setEvents([...events, { dayTitle: `दिवस ${events.length + 1}`, eventTime: "सायंकाळी ७:०० वा.", title: "", description: "" }]);
  const removeEvent = (index) => setEvents(events.filter((_, i) => i !== index));
  const updateEvent = (index, field, value) => {
    const updated = [...events];
    updated[index][field] = value;
    setEvents(updated);
  };

  // Member Handlers
  const addMember = () => setMembers([...members, { name: "", designation: "कार्यकर्ते", imageUrl: "" }]);
  const removeMember = (index) => setMembers(members.filter((_, i) => i !== index));
  const updateMember = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  // Gallery Handlers
  const addGallery = () => {
    if (gallery.length >= 10) {
      toast.error("गॅलरीमध्ये जास्तीत जास्त 10 फोटो जोडता येतात.");
      return;
    }
    setGallery([...gallery, { imageUrl: "", caption: "" }]);
  };
  const removeGallery = (index) => setGallery(gallery.filter((_, i) => i !== index));
  const updateGallery = (index, field, value) => {
    const updated = [...gallery];
    updated[index][field] = value;
    setGallery(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.address.trim() || !formData.contactPerson.trim() || !formData.contactPhone.trim()) {
      toast.error("कृपया आवश्यक माहिती (मंडळाचे नाव, पत्ता व संपर्क) पूर्ण भरा.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        registrationFeeAmount: platformSettings.registrationFee,
        events,
        members,
        gallery,
      };

      const res = await registerMandal(payload);

      if (res.success) {
        toast.success("मंडळाची नोंदणी यशस्वीरीत्या झाली आहे!");
        setSubmittedSlug(res.slug);
      } else {
        toast.error(res.error || "त्रुटी आली.");
      }
    } catch (err) {
      toast.error("सर्व्हर एरर: नोंदणी पूर्ण होऊ शकली नाही.");
    } finally {
      setLoading(false);
    }
  };

  if (submittedSlug) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-amber-500/20 via-white to-amber-50 flex items-center justify-center p-4 font-marathi">
        <Card className="max-w-xl w-full text-center p-8 border-2 border-amber-300 shadow-2xl rounded-3xl space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center text-4xl shadow-lg shadow-emerald-500/30">
            ✓
          </div>
          <h2 className="text-3xl font-extrabold font-marathi-heading text-gray-900">
            मंडळाची नोंदणी यशस्वी!
          </h2>
          <p className="text-gray-600 text-base font-medium">
            तुमचा अर्ज ॲडमिन मंजुरीसाठी पाठवला गेला आहे. ॲडमिन पडताळणीनंतर तुमचा वेब पोर्टल खालील लिंकवर सक्रिय होईल.
          </p>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left space-y-2">
            <span className="text-xs text-amber-800 font-bold uppercase tracking-wider block">पोर्टल लिंक (Preview URL):</span>
            <code className="text-sm font-mono font-bold text-orange-700 block break-all bg-white p-2 rounded-xl border border-amber-300">
              /mandal/{submittedSlug}
            </code>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link href={`/mandal/${submittedSlug}`} className="w-full">
              <Button variant="golden" className="w-full justify-center gap-2 font-bold">
                वेब पोर्टल पूर्वदृश्य (Preview) पहा
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/admin" className="w-full">
              <Button variant="outline" className="w-full justify-center font-bold">
                ॲडमिन पॅनेलमध्ये जा (Approve करा)
              </Button>
            </Link>
          </div>
        </Card>
      </main>
    );
  }

  const paymentQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    `upi://pay?pa=${platformSettings.adminUpiId}&pn=MandalPortalRegistration&am=${platformSettings.registrationFee}&cu=INR`
  )}`;

  return (
    <main className="min-h-screen bg-[#FFFDF9] text-gray-900 pb-20 font-marathi">
      
      {/* Page Header */}
      <header className="bg-gradient-to-r from-orange-600 via-amber-600 to-amber-500 text-white py-12 px-4 sm:px-8 border-b-4 border-amber-400">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold bg-white/20 text-amber-100 hover:bg-white/30 px-3 py-1.5 rounded-full mb-3 backdrop-blur-md transition-colors">
              <ArrowLeft className="w-4 h-4" />
              मुख्य पृष्ठावर जा
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-marathi-heading">
              गणेश मंडळ वेब पोर्टल नोंदणी अर्ज
            </h1>
            <p className="text-amber-100 text-sm sm:text-base mt-1 font-medium">
              तुमच्या गणेशोत्सवासाठी अधिकृत वेब पोर्टल तयार करा.
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-3xl">
            🌺
          </div>
        </div>
      </header>

      {/* Form Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 -mt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Basic Info */}
          <Card className="rounded-3xl border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <Sparkles className="w-5 h-5 text-amber-500" />
                १. मंडळाची प्राथमिक माहिती व वर्णने (Basic Info & Descriptions)
              </CardTitle>
              <CardDescription>मंडळाचे अधिकृत नाव, पत्ता व २ स्वतंत्र वर्णने (संक्षिप्त व सविस्तर) प्रविष्ट करा.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-800">मंडळाचे नाव *</label>
                <Input
                  name="name"
                  placeholder="उदा. श्री छत्रपती शिवाजी सार्वजनिक गणेशोत्सव मंडळ"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">घोषवाक्य (Tagline)</label>
                <Input
                  name="tagline"
                  placeholder="उदा. गणपती बाप्पा मोरया! मंगलमूर्ती मोरया!"
                  value={formData.tagline}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">स्थापना वर्ष</label>
                <Input
                  name="establishedYear"
                  placeholder="उदा. १९९५"
                  value={formData.establishedYear}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-800">मंडळाचा पत्ता (Location) *</label>
                <Input
                  name="address"
                  placeholder="उदा. शिवाजी चौक, स्टेशन रोड"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">शहर / गाव</label>
                <Input
                  name="city"
                  placeholder="उदा. पुणे"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>

              {/* Main Banner Image with Device Upload */}
              <div className="space-y-2 md:col-span-2">
                <ImageUploader
                  label="मुख्य फोटो / बॅनर इमेज (Hero Banner)"
                  value={formData.heroImageUrl}
                  onChange={(val) => setFormData((prev) => ({ ...prev, heroImageUrl: val }))}
                  placeholder="/hero-main-ganesha.jpg किंवा इमेज फाईल निवडा"
                />
              </div>

              {/* 1. Short Description (Max 150 Chars) */}
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-amber-900">
                    १. संक्षिप्त माहिती (Short Description - मुख्य पृष्ठावर दिसणारे) *
                  </label>
                  <span className={`text-xs font-bold ${formData.shortDescription.length > 150 ? "text-red-600" : "text-gray-500"}`}>
                    {formData.shortDescription.length} / 150 अक्षरे (Limit: 150)
                  </span>
                </div>
                <Textarea
                  name="shortDescription"
                  rows={2}
                  maxLength={150}
                  placeholder="मुख्य पृष्ठावरील बाप्पाच्या फोटोशेजारी दाखवण्यासाठी १-२ ओळींत संक्षिप्त माहिती लिहा (कमाल 150 अक्षरे)..."
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                />
              </div>

              {/* 2. Detailed Description (Max 1000 Chars) */}
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-amber-900">
                    २. सविस्तर माहिती (Detailed Description - मंडळाबद्दल माहिती सेक्शनमध्ये दिसणारे) *
                  </label>
                  <span className={`text-xs font-bold ${formData.aboutText.length > 1000 ? "text-red-600" : "text-gray-500"}`}>
                    {formData.aboutText.length} / 1000 अक्षरे (Limit: 1000)
                  </span>
                </div>
                <Textarea
                  name="aboutText"
                  rows={5}
                  maxLength={1000}
                  placeholder="मंडळाचा इतिहास, सामाजिक कार्य, व परंपरा याविषयी सविस्तर माहिती लिहा (कमाल 1000 अक्षरे)..."
                  value={formData.aboutText}
                  onChange={handleInputChange}
                />
              </div>

            </CardContent>
          </Card>

          {/* Section 2: Customizable 4 About Section Highlights */}
          <Card className="rounded-3xl border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                २. मंडळाचे ४ मुख्य वैशिष्ट्य कार्ड्स (About Section Highlights)
              </CardTitle>
              <CardDescription>खालील ४ कार्ड्सचे शीर्षक व माहिती एडिट करा.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Highlight 1: देखावे */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                <label className="text-xs font-bold text-orange-700 uppercase tracking-wider block">वैशिष्ट्य १: देखावे</label>
                <Input
                  name="aboutHighlight1Title"
                  placeholder="शीर्षक (उदा. भव्य व सुरेख देखावे)"
                  value={formData.aboutHighlight1Title}
                  onChange={handleInputChange}
                />
                <Textarea
                  name="aboutHighlight1Desc"
                  rows={2}
                  placeholder="माहिती (उदा. दरवर्षी आकर्षक देखावे...)"
                  value={formData.aboutHighlight1Desc}
                  onChange={handleInputChange}
                />
              </div>

              {/* Highlight 2: सामाजिक उपक्रम */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                <label className="text-xs font-bold text-orange-700 uppercase tracking-wider block">वैशिष्ट्य २: सामाजिक उपक्रम</label>
                <Input
                  name="aboutHighlight2Title"
                  placeholder="शीर्षक (उदा. सामाजिक उपक्रम)"
                  value={formData.aboutHighlight2Title}
                  onChange={handleInputChange}
                />
                <Textarea
                  name="aboutHighlight2Desc"
                  rows={2}
                  placeholder="माहिती (उदा. रक्तदान शिबिर, वृक्षारोपण...)"
                  value={formData.aboutHighlight2Desc}
                  onChange={handleInputChange}
                />
              </div>

              {/* Highlight 3: सांस्कृतिक स्पर्धा */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                <label className="text-xs font-bold text-orange-700 uppercase tracking-wider block">वैशिष्ट्य ३: सांस्कृतिक स्पर्धा</label>
                <Input
                  name="aboutHighlight3Title"
                  placeholder="शीर्षक (उदा. सांस्कृतिक स्पर्धा)"
                  value={formData.aboutHighlight3Title}
                  onChange={handleInputChange}
                />
                <Textarea
                  name="aboutHighlight3Desc"
                  rows={2}
                  placeholder="माहिती (उदा. महिला व मुलांसाठी स्पर्धा...)"
                  value={formData.aboutHighlight3Desc}
                  onChange={handleInputChange}
                />
              </div>

              {/* Highlight 4: एकजूट व कार्यकर्ते */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                <label className="text-xs font-bold text-orange-700 uppercase tracking-wider block">वैशिष्ट्य ४: एकजूट व कार्यकर्ते</label>
                <Input
                  name="aboutHighlight4Title"
                  placeholder="शीर्षक (उदा. एकजूट व कार्यकर्ते)"
                  value={formData.aboutHighlight4Title}
                  onChange={handleInputChange}
                />
                <Textarea
                  name="aboutHighlight4Desc"
                  rows={2}
                  placeholder="माहिती (उदा. तरुणांची भक्कम साथ...)"
                  value={formData.aboutHighlight4Desc}
                  onChange={handleInputChange}
                />
              </div>

            </CardContent>
          </Card>

          {/* Section 3: Contact Details */}
          <Card className="rounded-3xl border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <Users className="w-5 h-5 text-amber-500" />
                ३. संपर्क माहिती (Contact Details)
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">संपर्क व्यक्तीचे नाव *</label>
                <Input
                  name="contactPerson"
                  placeholder="उदा. राकेश शिंदे (अध्यक्ष)"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">मोबाईल नंबर *</label>
                <Input
                  name="contactPhone"
                  placeholder="उदा. +91 9876543210"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">ई-मेल आयडी (ऐच्छिक)</label>
                <Input
                  name="contactEmail"
                  type="email"
                  placeholder="उदा. contact@mandal.org"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Schedule Events */}
          <Card className="rounded-3xl border-amber-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  ४. उत्सव वेळापत्रक (Daily Events Schedule)
                </CardTitle>
                <CardDescription>आरती, महाप्रसाद व कार्यक्रमांची यादी जोडा.</CardDescription>
              </div>
              <Button type="button" onClick={addEvent} variant="secondary" size="sm" className="gap-1.5 font-bold">
                <Plus className="w-4 h-4" />
                नवीन कार्यक्रम जोडा
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.map((evt, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 relative grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-3">
                    <Input
                      placeholder="उदा. दिवस १ (प्रतिष्ठापना)"
                      value={evt.dayTitle}
                      onChange={(e) => updateEvent(idx, "dayTitle", e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <Input
                      placeholder="उदा. सकाळी ९:०० वा."
                      value={evt.eventTime}
                      onChange={(e) => updateEvent(idx, "eventTime", e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-5">
                    <Input
                      placeholder="कार्यक्रमाचे नाव (उदा. महाआरती)"
                      value={evt.title}
                      onChange={(e) => updateEvent(idx, "title", e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-1 text-right">
                    <button type="button" onClick={() => removeEvent(idx)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Section 5: Members */}
          <Card className="rounded-3xl border-amber-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <Users className="w-5 h-5 text-amber-500" />
                  ५. मंडळ कार्यकारिणी / सदस्य (Members)
                </CardTitle>
                <CardDescription>अध्यक्ष, उपाध्यक्ष, सचिव, खजिनदार व कार्यकर्ते फोटोसह जोडा.</CardDescription>
              </div>
              <Button type="button" onClick={addMember} variant="secondary" size="sm" className="gap-1.5 font-bold">
                <Plus className="w-4 h-4" />
                सदस्य जोडा
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {members.map((mem, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-5">
                      <Input
                        placeholder="सदस्याचे नाव"
                        value={mem.name}
                        onChange={(e) => updateMember(idx, "name", e.target.value)}
                      />
                    </div>
                    <div className="sm:col-span-6">
                      <Input
                        placeholder="पद (उदा. अध्यक्ष, सचिव, खजिनदार, कार्यकर्ते)"
                        value={mem.designation}
                        onChange={(e) => updateMember(idx, "designation", e.target.value)}
                      />
                    </div>
                    <div className="sm:col-span-1 text-right">
                      <button type="button" onClick={() => removeMember(idx)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <ImageUploader
                    label="सदस्याचा फोटो (Max 500KB)"
                    value={mem.imageUrl}
                    onChange={(val) => updateMember(idx, "imageUrl", val)}
                    placeholder="सदस्याच्या फोटोची फाईल निवडा किंवा URL टाका"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Section 6: Photo Gallery */}
          <Card className="rounded-3xl border-amber-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <ImageIcon className="w-5 h-5 text-amber-500" />
                  ६. फोटो गॅलरी (Photo Gallery - Max 10 Photos)
                </CardTitle>
                <CardDescription>गणेशोत्सवातील देखावे व आरती प्रसंगांचे फोटो जोडा (जास्तीत जास्त 10 फोटो).</CardDescription>
              </div>
              <Button
                type="button"
                onClick={addGallery}
                disabled={gallery.length >= 10}
                variant="secondary"
                size="sm"
                className="gap-1.5 font-bold"
              >
                <Plus className="w-4 h-4" />
                आणखी फोटो जोडा ({gallery.length}/10)
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {gallery.map((gal, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold text-amber-900 bg-amber-200 px-3 py-1 rounded-full">
                      फोटो क्रमांक {idx + 1}
                    </span>
                    <button type="button" onClick={() => removeGallery(idx)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <ImageUploader
                    label="फोटो (Max 500KB)"
                    value={gal.imageUrl}
                    onChange={(val) => updateGallery(idx, "imageUrl", val)}
                    placeholder="गॅलरी फोटोची फाईल निवडा किंवा URL टाका"
                  />

                  <Input
                    placeholder="फोटो शीर्षक / कॅप्शन (उदा. बाल गणेश देखावा)"
                    value={gal.caption}
                    onChange={(e) => updateGallery(idx, "caption", e.target.value)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Section 7: Donation & Google Map */}
          <Card className="rounded-3xl border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <QrCode className="w-5 h-5 text-amber-500" />
                ७. मंडळाची स्वतःची वर्गणी UPI ID, QR Code व गूगल मॅप (Mandal Vargani & Location)
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">मंडळाचा वर्गणी UPI ID</label>
                <Input
                  name="upiId"
                  placeholder="उदा. mandal@upi किंवा 9876543210@paytm"
                  value={formData.upiId}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <ImageUploader
                  label="मंडळाचा वर्गणी QR Code फोटो (QR Code Image)"
                  value={formData.qrCodeUrl}
                  onChange={(val) => setFormData((prev) => ({ ...prev, qrCodeUrl: val }))}
                  placeholder="QR Code फोटो फाईल निवडा किंवा URL टाका (Auto QR साठी मोकळे सोडा)"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-800">गूगल मॅप Embed URL (Google Map Link)</label>
                <Input
                  name="googleMapUrl"
                  placeholder="उदा. https://www.google.com/maps/embed?pb=..."
                  value={formData.googleMapUrl}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 8: Platform Portal Registration Payment Step */}
          <Card className="rounded-3xl border-2 border-orange-400 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700 font-extrabold text-xl">
                <CreditCard className="w-6 h-6 text-amber-600" />
                ८. पोर्टल नोंदणी फी भरणा (Portal Registration Payment)
              </CardTitle>
              <CardDescription className="text-gray-700 font-medium">
                वेब पोर्टल नोंदणी पूर्ण करण्यासाठी खालील QR कोड स्कॅन करून निर्धारित फी भरा.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Payment Details */}
              <div className="md:col-span-7 space-y-4">
                <div className="p-4 rounded-2xl bg-white border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-700">पोर्टल नोंदणी फी (Registration Amount):</span>
                    <span className="text-2xl font-extrabold text-orange-600 font-marathi-heading">
                      ₹{platformSettings.registrationFee}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 border-t border-gray-100 pt-2">
                    <span className="font-medium">अधिकृत ॲडमिन UPI ID:</span>
                    <span className="font-mono font-bold text-amber-900">{platformSettings.adminUpiId}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900 block">
                    पेमेंट केल्यानंतर मिळालेला Transaction ID / UTR / Reference No. प्रविष्ट करा *
                  </label>
                  <Input
                    name="registrationFeeTxnId"
                    placeholder="उदा. UTR 424109852109 किंवा Paytm/GPay Ref No"
                    value={formData.registrationFeeTxnId}
                    onChange={handleInputChange}
                    className="font-mono font-bold border-amber-400"
                    required
                  />
                  <p className="text-xs text-gray-500 font-medium">
                    पेमेंट पूर्ण झाल्यानंतर UPI अ‍ॅपमध्ये दिसणारा 12 अंकी UTR / Txn ID येथे टाका.
                  </p>
                </div>
              </div>

              {/* Payment QR Code */}
              <div className="md:col-span-5 flex flex-col items-center text-center">
                <div className="w-52 h-52 p-2.5 rounded-2xl bg-white border-2 border-amber-400 shadow-lg">
                  <img
                    src={paymentQrUrl}
                    alt="Registration Payment QR Code"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <span className="text-xs font-bold text-amber-900 mt-2">
                  स्कॅन करा व ₹{platformSettings.registrationFee} भरा
                </span>
                <span className="text-[11px] text-gray-500 font-semibold">GPay • PhonePe • Paytm • BHIM</span>
              </div>

            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <Button
              type="submit"
              disabled={loading}
              size="lg"
              variant="golden"
              className="w-full sm:w-auto px-12 py-4 text-lg shadow-2xl font-bold"
            >
              {loading ? "नोंदणी सादर होत आहे..." : "मंडळ अर्ज सादर करा (Submit Portal Application)"}
            </Button>
          </div>

        </form>
      </div>

    </main>
  );
}
