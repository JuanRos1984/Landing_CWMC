// src/lib/email.ts
import { Resend } from 'resend';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  to: string; 
}


const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    // Validaciones
    if (!data.name || !data.email || !data.message || !data.to) {
      return { success: false, error: 'Missing required fields' };
    }

    // Crear contenido HTML del email
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Nuevo mensaje de contacto - Connecting Words MC</h2>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Nombre:</strong> ${data.name}</p>
          <p><strong>Email del remitente:</strong> ${data.email}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="background-color: white; padding: 15px; border-radius: 4px;">${data.message.replace(/\n/g, '<br>')}</p>
        </div>
        
        <p style="color: #6b7280; font-size: 14px;">
          Este mensaje fue enviado desde el formulario de contacto de Connecting Words MC.
        </p>
      </div>
    `;

    // Enviar email con Resend
    const { data: response, error } = await resend.emails.send({
      from: import.meta.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [data.to], 
      subject: `Nuevo mensaje de contacto de ${data.name}`,
      html: html,
      replyTo: data.email, 
    });

    if (error) {
    
      return { success: false, error: error.message };
    }

    
    return { success: true };

  } catch (error) {
    
    return { success: false, error: 'Internal server error' };
  }
}