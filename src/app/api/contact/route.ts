import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message, fbc, fbp, gclid } = await request.json()

    // Validação básica
    if (!name || !email) {
      return NextResponse.json(
        { error: "Nome e email são obrigatórios" },
        { status: 400 }
      )
    }

    // Salvar lead no Supabase
    const { error: dbError } = await supabase
      .from("capsite_leads")
      .insert({
        name,
        email,
        phone: phone || null,
        message: message || null,
        fbc: fbc || null,
        fbp: fbp || null,
        gclid: gclid || null,
        source: "website",
        status: "new"
      })

    if (dbError) {
      console.error("Supabase error:", dbError)
      // Continua mesmo se falhar o banco - pelo menos envia o email
    }

    // Enviar email
    const { data, error } = await resend.emails.send({
      from: "CAP Digital <onboarding@resend.dev>",
      to: ["atendimento@capdigital.company"],
      replyTo: email,
      subject: `Novo contato do site - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FD3434; border-bottom: 2px solid #FD3434; padding-bottom: 10px;">
            Novo Contato do Site
          </h2>

          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nome:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Telefone:</strong> ${phone || "Não informado"}</p>
          </div>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Mensagem:</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${message || "Nenhuma mensagem"}</p>
          </div>

          ${fbc || fbp || gclid ? `
          <div style="background: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; font-size: 12px; color: #666;"><strong>Dados de Marketing:</strong></p>
            ${fbc ? `<p style="margin: 5px 0; font-size: 11px; color: #888;">FBC: ${fbc}</p>` : ""}
            ${fbp ? `<p style="margin: 5px 0; font-size: 11px; color: #888;">FBP: ${fbp}</p>` : ""}
            ${gclid ? `<p style="margin: 5px 0; font-size: 11px; color: #888;">GCLID: ${gclid}</p>` : ""}
          </div>
          ` : ""}

          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">
            Este email foi enviado automaticamente pelo formulário de contato do site CAP Digital.
          </p>
        </div>
      `
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: "Erro ao enviar email" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
