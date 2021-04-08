export default async function smsSubmit(event, searchParams) {
    // Check the key.
    if (searchParams.get("key") !== TWILIO_KEY) return new Response("Invalid key.", { status: 403 })

    // Read the request.
    const formData = await event.request.formData()

    // POST the webhook.
    res = await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            embeds: [
                {
                    title: "Twilio SMS Recieved",
                    fields: [
                        {
                            name: "Phone Number:",
                            value: formData.get("From"),
                            inline: false,
                        },
                        {
                            name: "Body:",
                            value: formData.get("Body"),
                            inline: false,
                        },
                    ],
                },
            ],
        }),
    })

    // Return after the webhook submitted.
    if (res.ok) return new Response("", { status: 204 })
    return new Response("Failed to write webhook.", { status: 400 })
}
