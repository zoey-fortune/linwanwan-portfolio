# Romance Author Portfolio website

This project is built using:
- **React + Vite** for the frontend SPA
- **Express** backend for reading Markdown content via API
- **Tailwind CSS** for the warm, low-saturation design (smoky pink, oatmeal)
- **React Router** for navigation
- **React Markdown** for parsing markdown body text

### API Routes & Contact Form
The contact form submits to `/api/contact`. To send real emails, you should update `/server.ts` to use a service like **Resend** or **Nodemailer**.

```typescript
// Example using Resend:
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/contact", async (req, res) => {
    // ...
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'your-email@example.com',
      subject: `New Contact Form from ${name}`,
      text: message
    });
});
```
