
export interface TelegramNotification {
  chatId: string;
  message: string;
  parseMode?: 'HTML' | 'Markdown';
}

export interface WhatsAppNotification {
  phoneNumber: string;
  message: string;
  templateName?: string;
}

// Telegram Bot Service
export class TelegramService {
  private botToken: string;
  private adminChatId: string;

  constructor(botToken: string, adminChatId: string) {
    this.botToken = botToken;
    this.adminChatId = adminChatId;
  }

  async sendAdminNotification(message: string): Promise<boolean> {
    try {
      const response = await fetch(`https://api.telegram.org/bot${this.botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.adminChatId,
          text: message,
          parse_mode: 'HTML'
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to send Telegram notification:', error);
      return false;
    }
  }

  async notifyNewBooking(booking: any): Promise<boolean> {
    const message = `
🏊‍♂️ <b>حجز جديد - ${booking.activityType}</b>

📋 <b>رقم الحجز:</b> ${booking.bookingNumber}
👤 <b>اسم العميل:</b> ${booking.clientName}
📞 <b>الهاتف:</b> ${booking.phone}
📅 <b>التاريخ:</b> ${booking.date}
⏰ <b>الوقت:</b> ${booking.time}
⏱️ <b>المدة:</b> ${booking.duration} ساعة
💰 <b>المبلغ الإجمالي:</b> ${booking.totalPrice} ريال
💳 <b>المقدم المطلوب:</b> ${booking.depositAmount} ريال

⚠️ <b>يحتاج إلى مراجعة وتأكيد</b>
    `;

    return this.sendAdminNotification(message);
  }

  async notifyStatusChange(booking: any, oldStatus: string, newStatus: string): Promise<boolean> {
    const message = `
🔄 <b>تحديث حالة الحجز</b>

📋 <b>رقم الحجز:</b> ${booking.bookingNumber}
👤 <b>العميل:</b> ${booking.clientName}
📊 <b>الحالة السابقة:</b> ${oldStatus}
📈 <b>الحالة الجديدة:</b> ${newStatus}
📅 <b>التاريخ:</b> ${booking.date}
⏰ <b>الوقت:</b> ${booking.time}
    `;

    return this.sendAdminNotification(message);
  }
}

// WhatsApp Service
export class WhatsAppService {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accessToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accessToken;
  }

  async sendMessage(phoneNumber: string, message: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: phoneNumber,
          type: 'text',
          text: { body: message }
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      return false;
    }
  }

  async notifyBookingConfirmation(booking: any): Promise<boolean> {
    const message = `
مرحباً ${booking.clientName}

تم تأكيد حجزك بنجاح! ✅

📋 رقم الحجز: ${booking.bookingNumber}
🏊‍♂️ النشاط: ${booking.activityType}
📅 التاريخ: ${booking.date}
⏰ الوقت: ${booking.time}
⏱️ المدة: ${booking.duration} ساعة
💰 المبلغ الإجمالي: ${booking.totalPrice} ريال

يرجى الحضور قبل 15 دقيقة من موعد الحجز.

شكراً لثقتكم بنا 🙏
Sports Hub Platform
    `;

    return this.sendMessage(booking.phone, message);
  }

  async notifyPaymentReminder(booking: any): Promise<boolean> {
    const message = `
مرحباً ${booking.clientName}

تذكير بسداد المبلغ المتبقي لحجز:
📋 رقم الحجز: ${booking.bookingNumber}
💰 المبلغ المتبقي: ${booking.remainingAmount} ريال
📅 تاريخ الموعد: ${booking.date}

يرجى سداد المبلغ عند الحضور.

Sports Hub Platform
    `;

    return this.sendMessage(booking.phone, message);
  }
}

// Initialize services (these would come from environment variables)
export const telegramService = new TelegramService(
  process.env.TELEGRAM_BOT_TOKEN || '',
  process.env.TELEGRAM_ADMIN_CHAT_ID || ''
);

export const whatsappService = new WhatsAppService(
  process.env.WHATSAPP_API_URL || '',
  process.env.WHATSAPP_ACCESS_TOKEN || ''
);
