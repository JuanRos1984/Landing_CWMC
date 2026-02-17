// src/pages/api/contact.ts

import type { APIRoute } from 'astro';
import { sendContactEmail } from '../../lib/email';

export const POST: APIRoute = async ({ request }) => {
  
  
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
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
};