import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin_session")

    if (!session?.value) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      )
    }

    // Decodificar token
    const decoded = Buffer.from(session.value, "base64").toString()
    const [userId] = decoded.split(":")

    // Buscar usuário
    const { data: user, error } = await supabase
      .from("capsite_users")
      .select("id, email, name, role")
      .eq("id", userId)
      .single()

    if (error || !user) {
      return NextResponse.json(
        { error: "Sessão inválida" },
        { status: 401 }
      )
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
