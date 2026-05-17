import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const resend = new Resend("re_PuEZJ3Qp_QFZDWVVE3pPGGMxYVcGwQAHk");
async function sendContactEmail(data) {
  try {
    if (!data.name || !data.email || !data.message || !data.to) {
      return { success: false, error: "Missing required fields" };
    }
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Nuevo mensaje de contacto - Connecting Words MC</h2>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Nombre:</strong> ${data.name}</p>
          <p><strong>Email del remitente:</strong> ${data.email}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="background-color: white; padding: 15px; border-radius: 4px;">${data.message.replace(/\n/g, "<br>")}</p>
        </div>
        
        <p style="color: #6b7280; font-size: 14px;">
          Este mensaje fue enviado desde el formulario de contacto de Connecting Words MC.
        </p>
      </div>
    `;
    const { data: response, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [data.to],
      subject: `Nuevo mensaje de contacto de ${data.name}`,
      html,
      replyTo: data.email
    });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: "Internal server error" };
  }
}

const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const result = await sendContactEmail(body);
    if (!result.success) {
      return new Response(
        JSON.stringify({ error: result.error }),
        { status: 400 }
      );
    }
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
