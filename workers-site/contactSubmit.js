export default async function contactSubmit(event) {
    // Read the request.
    const json = await event.request.json()

    // Get all the contents.
    const name = String(json.name || "")
    const email = String(json.email || "")
    const description = String(json.description || "")
    if (!name || !email || !description) {
        return new Response('Parts were missing from the form.', { status: 400 })
    }

    // Get the hCAPTCHA response.
    let res = await fetch("https://hcaptcha.com/siteverify", {
        method: "POST",
        body: `response=${encodeURIComponent(json.hcaptcha)}&secret=${HCAPTCHA_TOKEN}`,
    })
    if (!(await res.json()).success) {
        return new Response("Invalid hCAPTCHA.", { status: 400 })
    }

    // POST the webhook.
    res = await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            embeds: [
                {
                    title: "Contact Form Submitted",
                    fields: [
                        {
                            name: "Name:",
                            value: name,
                            inline: false,
                        },
                        {
                            name: "E-mail Address:",
                            value: email,
                            inline: false,
                        },
                        {
                            name: "Description:",
                            value: description,
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
