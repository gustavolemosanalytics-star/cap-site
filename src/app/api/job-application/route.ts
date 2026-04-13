import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { nome, email, telefone, portfolio } = await request.json()

    // Validação básica
    if (!nome || !email || !telefone) {
      return NextResponse.json(
        { error: "Nome, email e telefone são obrigatórios" },
        { status: 400 }
      )
    }

    // Enviar email
    const { data, error } = await resend.emails.send({
      from: "CAP Digital <contato@capdigital.company>",
      to: ["pedro@capdigital.company", "guilherme@capdigital.company"],
      replyTo: email,
      subject: `Nova candidatura - Creator & Content Designer - ${nome}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FD3434; border-bottom: 2px solid #FD3434; padding-bottom: 10px;">
            Nova Candidatura - Creator & Content Designer
          </h2>

          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nome:</strong> ${nome}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Telefone:</strong> ${telefone}</p>
            <p style="margin: 10px 0;"><strong>Portfólio:</strong> ${portfolio || "Não informado"}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">
            Este email foi enviado automaticamente pelo formulário de candidatura do site CAP Digital.
          </p>
        </div>
      `
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: `Erro ao enviar email: ${JSON.stringify(error)}` },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("API error:", error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { error: `Erro interno do servidor: ${errorMessage}` },
      { status: 500 }
    )
  }
}