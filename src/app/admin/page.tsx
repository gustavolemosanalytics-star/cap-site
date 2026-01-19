"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  message: string | null
  fbc: string | null
  fbp: string | null
  gclid: string | null
  source: string
  status: "new" | "contacted" | "qualified" | "converted" | "lost"
  notes: string | null
  created_at: string
  updated_at: string
}

const statusLabels: Record<string, { label: string; color: string }> = {
  new: { label: "Novo", color: "bg-blue-500" },
  contacted: { label: "Contatado", color: "bg-yellow-500" },
  qualified: { label: "Qualificado", color: "bg-purple-500" },
  converted: { label: "Convertido", color: "bg-green-500" },
  lost: { label: "Perdido", color: "bg-red-500" }
}

export default function AdminPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  // Login state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // Dashboard state
  const [leads, setLeads] = useState<Lead[]>([])
  const [totalLeads, setTotalLeads] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isLoadingLeads, setIsLoadingLeads] = useState(false)

  // Check authentication on mount
  useEffect(() => {
    checkAuth()
  }, [])

  // Fetch leads when authenticated or filters change
  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads()
    }
  }, [isAuthenticated, currentPage, statusFilter, searchQuery])

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me")
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setLoginError("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (res.ok) {
        setUser(data.user)
        setIsAuthenticated(true)
      } else {
        setLoginError(data.error || "Erro ao fazer login")
      }
    } catch (error) {
      setLoginError("Erro de conexão")
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setIsAuthenticated(false)
    setUser(null)
    setLeads([])
  }

  const fetchLeads = async () => {
    setIsLoadingLeads(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "20",
        status: statusFilter,
        search: searchQuery
      })

      const res = await fetch(`/api/leads?${params}`)
      const data = await res.json()

      if (res.ok) {
        setLeads(data.leads || [])
        setTotalLeads(data.total || 0)
        setTotalPages(data.totalPages || 1)
      }
    } catch (error) {
      console.error("Error fetching leads:", error)
    } finally {
      setIsLoadingLeads(false)
    }
  }

  const updateLeadStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      })

      if (res.ok) {
        fetchLeads()
        if (selectedLead?.id === id) {
          setSelectedLead({ ...selectedLead, status: status as Lead["status"] })
        }
      }
    } catch (error) {
      console.error("Error updating lead:", error)
    }
  }

  const updateLeadNotes = async (id: string, notes: string) => {
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, notes })
      })
    } catch (error) {
      console.error("Error updating notes:", error)
    }
  }

  const deleteLead = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este lead?")) return

    try {
      const res = await fetch(`/api/leads?id=${id}`, { method: "DELETE" })
      if (res.ok) {
        fetchLeads()
        setSelectedLead(null)
      }
    } catch (error) {
      console.error("Error deleting lead:", error)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FD3434] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">CAP Digital</h1>
            <p className="text-white/50 text-sm">Painel Administrativo</p>
          </div>

          <form onSubmit={handleLogin} className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/10">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#FD3434] transition-colors"
                  placeholder="admin@capdigital.company"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#FD3434] transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              {loginError && (
                <p className="text-red-400 text-sm text-center">{loginError}</p>
              )}

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 bg-[#FD3434] text-white font-medium rounded-lg hover:bg-[#FD3434]/90 transition-colors disabled:opacity-50"
              >
                {isLoggingIn ? "Entrando..." : "Entrar"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    )
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#1a1a1a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">CAP CRM</h1>
            <span className="text-white/30">|</span>
            <span className="text-white/50 text-sm">{totalLeads} leads</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-sm">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {Object.entries(statusLabels).map(([status, { label, color }]) => {
            const count = leads.filter(l => l.status === status).length
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(statusFilter === status ? "all" : status)}
                className={`p-4 rounded-xl border transition-all ${
                  statusFilter === status
                    ? "bg-white/10 border-white/20"
                    : "bg-[#1a1a1a] border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${color}`} />
                  <span className="text-white/50 text-xs uppercase tracking-wider">{label}</span>
                </div>
                <p className="text-2xl font-bold text-white">{count}</p>
              </button>
            )
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome, email ou telefone..."
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#FD3434] transition-colors"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FD3434] transition-colors"
          >
            <option value="all">Todos os status</option>
            {Object.entries(statusLabels).map(([status, { label }]) => (
              <option key={status} value={status}>{label}</option>
            ))}
          </select>
        </div>

        {/* Leads Table */}
        <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden">
          {isLoadingLeads ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-[#FD3434] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center text-white/50">
              Nenhum lead encontrado
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Nome</th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Contato</th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Status</th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Marketing</th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Data</th>
                    <th className="text-right px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-6 py-4">
                        <p className="text-white font-medium">{lead.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-white/80 text-sm">{lead.email}</p>
                        {lead.phone && (
                          <p className="text-white/50 text-xs">{lead.phone}</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusLabels[lead.status].color} text-white`}>
                          {statusLabels[lead.status].label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {lead.fbc && <span className="text-[10px] px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded">FBC</span>}
                          {lead.fbp && <span className="text-[10px] px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded">FBP</span>}
                          {lead.gclid && <span className="text-[10px] px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded">GCLID</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white/50 text-sm">
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteLead(lead.id)
                          }}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
              <p className="text-white/50 text-sm">
                Página {currentPage} de {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Próxima
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1a1a1a] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Detalhes do Lead</h2>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-white/50 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/50">Nome</label>
                    <p className="text-white font-medium mt-1">{selectedLead.name}</p>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/50">Email</label>
                    <p className="text-white font-medium mt-1">{selectedLead.email}</p>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/50">Telefone</label>
                    <p className="text-white font-medium mt-1">{selectedLead.phone || "-"}</p>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/50">Data</label>
                    <p className="text-white font-medium mt-1">{formatDate(selectedLead.created_at)}</p>
                  </div>
                </div>

                {/* Message */}
                {selectedLead.message && (
                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/50">Mensagem</label>
                    <p className="text-white/80 mt-2 p-4 bg-white/5 rounded-lg whitespace-pre-wrap">
                      {selectedLead.message}
                    </p>
                  </div>
                )}

                {/* Marketing Data */}
                {(selectedLead.fbc || selectedLead.fbp || selectedLead.gclid) && (
                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/50 mb-2 block">Dados de Marketing</label>
                    <div className="space-y-2 p-4 bg-white/5 rounded-lg">
                      {selectedLead.fbc && (
                        <p className="text-sm">
                          <span className="text-white/50">FBC:</span>{" "}
                          <span className="text-white/80 font-mono text-xs">{selectedLead.fbc}</span>
                        </p>
                      )}
                      {selectedLead.fbp && (
                        <p className="text-sm">
                          <span className="text-white/50">FBP:</span>{" "}
                          <span className="text-white/80 font-mono text-xs">{selectedLead.fbp}</span>
                        </p>
                      )}
                      {selectedLead.gclid && (
                        <p className="text-sm">
                          <span className="text-white/50">GCLID:</span>{" "}
                          <span className="text-white/80 font-mono text-xs">{selectedLead.gclid}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Status */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-white/50 mb-2 block">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(statusLabels).map(([status, { label, color }]) => (
                      <button
                        key={status}
                        onClick={() => updateLeadStatus(selectedLead.id, status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedLead.status === status
                            ? `${color} text-white`
                            : "bg-white/5 text-white/50 hover:bg-white/10"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-white/50 mb-2 block">Notas</label>
                  <textarea
                    defaultValue={selectedLead.notes || ""}
                    onBlur={(e) => updateLeadNotes(selectedLead.id, e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#FD3434] transition-colors resize-none"
                    placeholder="Adicione notas sobre este lead..."
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => deleteLead(selectedLead.id)}
                    className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    Excluir Lead
                  </button>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
