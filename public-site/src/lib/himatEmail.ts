import { buildInquiryOwnerAlert, InquiryAlertPayload } from "./himat";

type DeliveryStatus = {
  ownerNotificationSent: boolean;
  emailSent: boolean;
};

export async function alertHimatTextileOwner(input: InquiryAlertPayload): Promise<DeliveryStatus> {
  const alert = buildInquiryOwnerAlert(input);
  
  let ownerNotificationSent = false;
  const forgeUrl = process.env.BUILT_IN_FORGE_API_URL;
  const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;
  if (forgeUrl && forgeKey) {
    try {
      const normalizedBase = forgeUrl.endsWith("/") ? forgeUrl : `${forgeUrl}/`;
      const endpoint = new URL("webdevtoken.v1.WebDevService/SendNotification", normalizedBase).toString();
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${forgeKey}`,
          "content-type": "application/json",
          "connect-protocol-version": "1",
        },
        body: JSON.stringify({ title: alert.title, content: alert.content }),
      });
      ownerNotificationSent = response.ok;
    } catch (e) {
      console.warn("[Notification] Forge notification failed:", e);
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.HIMAT_ALERT_EMAIL;
  const from = process.env.HIMAT_EMAIL_FROM;

  if (!apiKey || !recipient || !from) {
    return { ownerNotificationSent, emailSent: false };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        subject: alert.title,
        text: alert.content,
      }),
    });
    return { ownerNotificationSent, emailSent: response.ok };
  } catch (error) {
    console.error("[Email] Failed to send email via Resend:", error);
    return { ownerNotificationSent, emailSent: false };
  }
}
