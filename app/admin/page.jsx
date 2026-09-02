"use client";

import { useState, useEffect } from "react";
import { Sparkles, CheckCircle, XCircle, Clock, ExternalLink, Copy, Search, ShieldAlert, Phone, MapPin, Eye, QrCode, Download, Lock, KeyRound, LogOut, Edit, Settings, ChevronLeft, ChevronRight, Save, X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/ui/image-uploader";
import { getAdminDashboardStats, updateMandalStatusAdmin, updatePlatformSettings, updateMandalAdmin } from "@/actions/adminActions";
import { toast } from "sonner";
import Link from "next/link";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "ADViKS@Project@GaneshUstav@2026";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0, mandals: [], settings: { adminUpiId: "8600570542@paytm", registrationFee: 501 } });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showQrModal, setShowQrModal] = useState(null);

  // Modals state
  const [editingMandal, setEditingMandal] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsForm, setSettingsForm] = useState({ adminUpiId: "8600570542@paytm", registrationFee: 501 });

  // Pagination State (10 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("admin_authenticated");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      fetchStats();
    }
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      setPasswordError(false);
      toast.success("ॲडमिन प्रवेश यशस्वी! ॲडमिन पॅनेल अनलॉक झाले.");
      fetchStats();
    } else {
      setPasswordError(true);
      toast.error("चुकीचा पासवर्ड! कृपया योग्य ॲडमिन पासवर्ड टाका.");
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
    setPasswordInput("");
    toast.info("ॲडमिन सत्र पूर्ण झाले. पॅनेल लॉक झाले.");
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await getAdminDashboardStats();
      setStats(data);
      if (data.settings) {
        setSettingsForm(data.settings);
      }
    } catch (err) {
      toast.error("माहिती लोड करताना त्रुटी आली.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await updateMandalStatusAdmin(id, status);
      if (res.success) {
        toast.success(`मंडळ स्टेटस यशस्वीरीत्या अपडेट झाले (${status})!`);
        fetchStats();
      } else {
        toast.error(res.error || "अपडेट अपयशी.");
      }
    } catch (err) {
      toast.error("त्रुटी आली.");
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await updatePlatformSettings(settingsForm.adminUpiId, settingsForm.registrationFee);
      if (res.success) {
        toast.success("पेमेंट सेटिंग्ज यशस्वीरीत्या जतन झाल्या!");
        setShowSettingsModal(false);
        fetchStats();
      } else {
        toast.error(res.error || "सेटिंग्ज जतन होऊ शकल्या नाहीत.");
      }
    } catch (err) {
      toast.error("त्रुटी आली.");
    }
  };

  const handleSaveEditMandal = async (e) => {
    e.preventDefault();
    if (!editingMandal) return;
    try {
      const res = await updateMandalAdmin(editingMandal.id, editingMandal);
      if (res.success) {
        toast.success("मंडळ अर्ज माहिती यशस्वीरीत्या अद्ययावत (Updated) झाली!");
        setEditingMandal(null);
        fetchStats();
      } else {
        toast.error(res.error || "माहिती अद्ययावत झाली नाही.");
      }
    } catch (err) {
      toast.error("त्रुटी आली.");
    }
  };

  const copyPortalLink = (slug) => {
    const fullUrl = `${window.location.origin}/mandal/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("वेब पोर्टलची लिंक कॉपी झाली!");
  };

  const downloadQrCode = (slug, mandalName) => {
    const portalUrl = `${window.location.origin}/mandal/${slug}`;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(portalUrl)}`;
    
    fetch(qrApiUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${slug}-portal-qr.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        toast.success(`${mandalName} वेब पोर्टल QR Code डाउनलोड झाला!`);
      })
      .catch(() => {
        toast.error("QR Code डाउनलोड करताना त्रुटी आली.");
      });
  };

  const filteredMandals = stats.mandals.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.city.toLowerCase().includes(search.toLowerCase()) ||
    m.contactPerson.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMandals.length / itemsPerPage) || 1;
  const paginatedMandals = filteredMandals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // If Not Authenticated: Display Password Security Gate Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-amber-950 text-white flex items-center justify-center p-4 font-marathi">
        <Card className="max-w-md w-full bg-white text-gray-900 rounded-3xl p-8 shadow-2xl border-4 border-amber-400 space-y-6">
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-orange-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-orange-600/30">
              <Lock className="w-8 h-8" />
            </div>

            <Badge variant="golden" className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
              सुरक्षित ॲडमिन प्रवेश कक्ष
            </Badge>

            <h2 className="text-2xl font-extrabold font-marathi-heading text-gray-900">
              ॲडमिन पासवर्ड प्रविष्ट करा
            </h2>

            <p className="text-xs text-gray-500 font-medium">
              ॲडमिन नियंत्रण कक्षाचा वापर करण्यासाठी अधिकृत पासवर्ड टाकणे आवश्यक आहे.
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 block">ॲडमिन सिक्युरिटी पासवर्ड (Password)</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="सुरक्षा पासवर्ड टाका..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="pl-10 font-mono text-sm border-amber-300 focus:ring-amber-500"
                  required
                />
              </div>
              {passwordError && (
                <p className="text-xs text-red-600 font-bold">
                  ❌ चुकीचा पासवर्ड! कृपया अचूक पासवर्ड टाकून पुन्हा प्रयत्न करा.
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="golden"
              className="w-full justify-center gap-2 py-3 font-bold text-base shadow-xl"
            >
              <Lock className="w-4 h-4" />
              ॲडमिन पॅनेल अनलॉक करा (Unlock Panel)
            </Button>
          </form>

          <div className="pt-2 text-center border-t border-gray-100">
            <Link href="/" className="text-xs text-amber-800 font-bold hover:underline">
              ← मुख्य पृष्ठावर (Home) परत जा
            </Link>
          </div>

        </Card>
      </main>
    );
  }

  // If Authenticated: Display Full Admin Dashboard
  return (
    <main className="min-h-screen bg-[#FFFDF9] text-gray-900 pb-20 font-marathi">
      
      {/* Header */}
      <header className="bg-gray-950 text-white py-10 px-4 sm:px-8 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="golden" className="px-3 py-1 text-xs font-bold">सुपर ॲडमिन पॅनेल (अनलॉक)</Badge>
            </div>
            <h1 className="text-3xl font-extrabold font-marathi-heading mt-2">
              गणेश मंडळ अर्ज तपासणी व मंजुरी कक्ष
            </h1>
            <p className="text-gray-400 text-sm mt-1 font-medium">
              नवीन नोंदणी अर्जांची पडताळणी करा, अर्ज एडिट करा, पेमेंट सेटिंग्ज बदला व QR Code डाऊनलोड करा.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => setShowSettingsModal(true)} variant="outline" size="sm" className="gap-1.5 font-bold text-white border-amber-500 hover:bg-amber-950">
              <Settings className="w-4 h-4 text-amber-400" />
              पेमेंट सेटिंग्ज (UPI & Fee)
            </Button>
            <Link href="/register">
              <Button variant="golden" size="sm" className="gap-1.5 font-bold">
                + नवीन मंडळ नोंदणी
              </Button>
            </Link>
            <Button onClick={handleAdminLogout} variant="destructive" size="sm" className="gap-1.5 font-bold">
              <LogOut className="w-4 h-4" />
              लॉक करा
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 border-amber-200 bg-white">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">एकूण अर्ज (Total)</span>
            <span className="text-3xl font-extrabold font-marathi-heading text-gray-900 mt-1 block">{stats.total}</span>
          </Card>

          <Card className="p-5 border-amber-300 bg-amber-50/60">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">प्रलंबित (Pending Approval)</span>
            <span className="text-3xl font-extrabold font-marathi-heading text-amber-600 mt-1 block">{stats.pending}</span>
          </Card>

          <Card className="p-5 border-emerald-200 bg-emerald-50/60">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">मंजूर (Approved Portals)</span>
            <span className="text-3xl font-extrabold font-marathi-heading text-emerald-600 mt-1 block">{stats.approved}</span>
          </Card>

          <Card className="p-5 border-rose-200 bg-rose-50/60">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">नाकारलेले (Rejected)</span>
            <span className="text-3xl font-extrabold font-marathi-heading text-rose-600 mt-1 block">{stats.rejected}</span>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-amber-200 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
            <Input
              placeholder="मंडळाचे नाव किंवा शहर शोधा..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9"
            />
          </div>
          <p className="text-xs text-gray-500 font-bold">
            एकूण {filteredMandals.length} अर्जांपैकी {paginatedMandals.length} दर्शवत आहे (10-10 पझिनेशन)
          </p>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-16 text-gray-500 font-bold">
              अर्ज लोड होत आहेत...
            </div>
          ) : paginatedMandals.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-amber-200">
              <p className="text-gray-500 font-bold font-marathi-heading text-lg">कोणतेही मंडळ अर्ज सापडले नाहीत.</p>
            </div>
          ) : (
            paginatedMandals.map((mandal) => {
              const portalUrl = typeof window !== "undefined" ? `${window.location.origin}/mandal/${mandal.slug}` : `/mandal/${mandal.slug}`;

              return (
                <Card key={mandal.id} className="p-6 rounded-3xl border-amber-200 hover:border-amber-400 transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    
                    {/* Left Info */}
                    <div className="space-y-3 max-w-2xl">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-bold font-marathi-heading text-gray-900">
                          {mandal.name}
                        </h3>
                        <Badge variant={mandal.status === "APPROVED" ? "approved" : mandal.status === "PENDING" ? "pending" : "rejected"}>
                          {mandal.status === "APPROVED" ? "मंजूर (Approved)" : mandal.status === "PENDING" ? "प्रलंबित (Pending)" : "नाकारले (Rejected)"}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 font-bold">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-600" />
                          {mandal.address}, {mandal.city}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-amber-600" />
                          {mandal.contactPerson} ({mandal.contactPhone})
                        </span>
                        <span>स्थापना: {mandal.establishedYear || "N/A"}</span>
                      </div>

                      {/* Display Registration Fee Txn ID & Portal Link */}
                      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                            पोर्टल नोंदणी पेमेंट UTR / Txn ID:
                          </span>
                          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300 inline-block">
                            {mandal.registrationFeeTxnId || "पेमेंट प्रक्रिया पूर्ण"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingMandal(mandal)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 transition-colors shadow-sm"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            संपूर्ण अर्ज पहा व संपादित करा (Edit)
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <Link href={`/mandal/${mandal.slug}`} target="_blank">
                        <Button variant="outline" size="sm" className="gap-1 text-xs font-bold">
                          <Eye className="w-3.5 h-3.5" />
                          पोर्टल पहा
                        </Button>
                      </Link>

                      {mandal.status !== "APPROVED" && (
                        <Button
                          onClick={() => handleStatusUpdate(mandal.id, "APPROVED")}
                          variant="golden"
                          size="sm"
                          className="gap-1 text-xs font-bold"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-950" />
                          मंजूर करा (Approve)
                        </Button>
                      )}

                      {mandal.status !== "REJECTED" && (
                        <Button
                          onClick={() => handleStatusUpdate(mandal.id, "REJECTED")}
                          variant="destructive"
                          size="sm"
                          className="gap-1 text-xs font-bold"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          नाकारा
                        </Button>
                      )}

                      <Button
                        onClick={() => copyPortalLink(mandal.slug)}
                        variant="secondary"
                        size="sm"
                        className="gap-1 text-xs font-bold"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        लिंक कॉपी करा
                      </Button>

                      <Button
                        onClick={() => downloadQrCode(mandal.slug, mandal.name)}
                        variant="golden"
                        size="sm"
                        className="gap-1 text-xs font-bold"
                      >
                        <Download className="w-3.5 h-3.5" />
                        QR Code डाउनलोड करा
                      </Button>
                    </div>

                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* 10-10 Item Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 pt-6">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              variant="outline"
              size="sm"
              className="gap-1 font-bold"
            >
              <ChevronLeft className="w-4 h-4" />
              मागील (Previous)
            </Button>

            <span className="text-xs font-bold text-gray-700 px-3">
              पान {currentPage} पैकी {totalPages}
            </span>

            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              variant="outline"
              size="sm"
              className="gap-1 font-bold"
            >
              पुढील (Next)
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

      </div>

      {/* Admin Payment Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl border-4 border-amber-400 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-xl font-bold font-marathi-heading text-gray-900">
                ॲडमिन पेमेंट सेटिंग्ज (UPI & Fee Settings)
              </h3>
              <button onClick={() => setShowSettingsModal(false)} className="p-1 text-gray-400 hover:text-red-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">ॲडमिन UPI ID (पेमेंट स्वीकारण्यासाठी)</label>
                <Input
                  value={settingsForm.adminUpiId}
                  onChange={(e) => setSettingsForm({ ...settingsForm, adminUpiId: e.target.value })}
                  placeholder="उदा. 8600570542@paytm"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">वेब पोर्टल नोंदणी फी रक्कम (₹ Registration Amount)</label>
                <Input
                  type="number"
                  value={settingsForm.registrationFee}
                  onChange={(e) => setSettingsForm({ ...settingsForm, registrationFee: e.target.value })}
                  placeholder="उदा. 501"
                  required
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <Button type="submit" variant="golden" className="w-full justify-center gap-2 font-bold">
                  <Save className="w-4 h-4" />
                  सेटिंग्ज जतन करा (Save Settings)
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Admin Edit Mandal Form Modal */}
      {editingMandal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <Card className="max-w-3xl w-full bg-white rounded-3xl p-6 shadow-2xl border-4 border-amber-400 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b pb-4 sticky top-0 bg-white z-10">
              <div>
                <Badge variant="golden" className="text-xs">ॲडमिन संपादन मोड</Badge>
                <h3 className="text-2xl font-bold font-marathi-heading text-gray-900 mt-1">
                  {editingMandal.name} - अर्ज माहिती संपादित करा
                </h3>
              </div>
              <button onClick={() => setEditingMandal(null)} className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveEditMandal} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">मंडळाचे नाव</label>
                  <Input
                    value={editingMandal.name}
                    onChange={(e) => setEditingMandal({ ...editingMandal, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">घोषवाक्य (Tagline)</label>
                  <Input
                    value={editingMandal.tagline || ""}
                    onChange={(e) => setEditingMandal({ ...editingMandal, tagline: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">स्थापना वर्ष</label>
                  <Input
                    value={editingMandal.establishedYear || ""}
                    onChange={(e) => setEditingMandal({ ...editingMandal, establishedYear: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">शहर / गाव</label>
                  <Input
                    value={editingMandal.city || ""}
                    onChange={(e) => setEditingMandal({ ...editingMandal, city: e.target.value })}
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-gray-800">मंडळाचा पत्ता (Location)</label>
                  <Input
                    value={editingMandal.address || ""}
                    onChange={(e) => setEditingMandal({ ...editingMandal, address: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">संपर्क व्यक्तीचे नाव</label>
                  <Input
                    value={editingMandal.contactPerson || ""}
                    onChange={(e) => setEditingMandal({ ...editingMandal, contactPerson: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">मोबाईल नंबर</label>
                  <Input
                    value={editingMandal.contactPhone || ""}
                    onChange={(e) => setEditingMandal({ ...editingMandal, contactPhone: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">मंडळाचा वर्गणी UPI ID</label>
                  <Input
                    value={editingMandal.upiId || ""}
                    onChange={(e) => setEditingMandal({ ...editingMandal, upiId: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">गूगल मॅप Link</label>
                  <Input
                    value={editingMandal.googleMapUrl || ""}
                    onChange={(e) => setEditingMandal({ ...editingMandal, googleMapUrl: e.target.value })}
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <ImageUploader
                    label="मुख्य बॅनर फोटो (Hero Banner Image)"
                    value={editingMandal.heroImageUrl}
                    onChange={(val) => setEditingMandal({ ...editingMandal, heroImageUrl: val })}
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-gray-800">मंडळाविषयी सविस्तर माहिती (About Mandal)</label>
                  <Textarea
                    rows={3}
                    value={editingMandal.aboutText || ""}
                    onChange={(e) => setEditingMandal({ ...editingMandal, aboutText: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t pt-4">
                <Button type="button" onClick={() => setEditingMandal(null)} variant="outline">
                  रद्द करा
                </Button>
                <Button type="submit" variant="golden" className="gap-2 font-bold">
                  <Save className="w-4 h-4" />
                  बदल जतन करा (Save Changes)
                </Button>
              </div>

            </form>
          </Card>
        </div>
      )}

      {/* QR Code Preview Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full p-6 rounded-3xl text-center space-y-4 border-4 border-amber-300 shadow-2xl">
            <h4 className="font-bold text-lg font-marathi-heading text-gray-900">
              {showQrModal.name} - वेब पोर्टल QR Code
            </h4>

            <div className="w-60 h-60 mx-auto p-2 bg-amber-50 rounded-2xl border-2 border-amber-300">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(
                  typeof window !== "undefined" ? `${window.location.origin}/mandal/${showQrModal.slug}` : `/mandal/${showQrModal.slug}`
                )}`}
                alt="Portal QR Code"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>

            <p className="text-xs text-gray-500 font-medium">
              हा QR कोड स्कॅन करून भाविक थेट या मंडळाच्या वेब पोर्टलवर पोहोचतील.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Button
                onClick={() => downloadQrCode(showQrModal.slug, showQrModal.name)}
                variant="golden"
                className="w-full justify-center gap-2 font-bold"
              >
                <Download className="w-4 h-4" />
                डाउनलोड करा (PNG)
              </Button>

              <Button
                onClick={() => setShowQrModal(null)}
                variant="outline"
                className="w-full justify-center font-bold"
              >
                बंद करा
              </Button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
