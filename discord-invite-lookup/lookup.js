// Gets information on a invite.
async function getInviteInfo(inviteCode) {
    let response = null;
    try {
        response = await $.get("https://discordapp.com/api/v6/invites/" + inviteCode);
    } catch {
        return response;
    }
    if (response.message !== undefined) {
        return null;
    }
    return response;
}

// Handles errors.
async function handleError(errorID) {
    if (!(await $("#NoInviteSpecified").hasClass("is-hidden"))) {
        await $("#NoInviteSpecified").addClass("is-hidden");
    }
    if (!(await $("#LookupError").hasClass("is-hidden"))) {
        await $("#LookupError").addClass("is-hidden");
    }
    if (errorID) {
        await $(errorID).removeClass("is-hidden");
    }
}

// Something has been pressed to start the lookup.
async function startLookup() {
    let inviteBoxText = await $("#InviteBox").val().trim();

    if (inviteBoxText == "") {
        return await handleError("#NoInviteSpecified");
    }

    let forVerification = inviteBoxText.toLowerCase();

    if (forVerification.startsWith("https://")) {
        inviteBoxText = inviteBoxText.slice(8);
        forVerification = forVerification.slice(8);
    } else if (forVerification.startsWith("http://")) {
        inviteBoxText = inviteBoxText.slice(7);
        forVerification = forVerification.slice(7);
    }

    if (forVerification.startsWith("discord.gg/")) {
        inviteBoxText = inviteBoxText.slice(11);
        forVerification = forVerification.slice(11);
    } else if (forVerification.startsWith("discordapp.com/invite/")) {
        inviteBoxText = inviteBoxText.slice(22);
        forVerification = forVerification.slice(22);
    }

    const inviteResult = await getInviteInfo(encodeURI(inviteBoxText));

    if (!inviteResult) {
        return await handleError("#LookupError");
    }

    if (await $("#InviteResult").length !== 0) {
        await $("#InviteResult").remove();
    }

    let features = inviteResult.guild.features.join(", ");
    if (features === "") {
        features = "No special features.";
    }

    let inviter;
    if (inviteResult.inviter) {
        inviter = `${inviteResult.inviter.username}#${inviteResult.inviter.discriminator} (${inviteResult.inviter.id})`;
    } else {
        inviter = "No inviter found. Is this a vanity invite?";
    }

    let guild_pfp;
    if (inviteResult.guild.icon) {
        guild_pfp = `<a href="https://cdn.discordapp.com/icons/${inviteResult.guild.id}/${inviteResult.guild.icon}.png">Click here to view.</a>`;
    } else {
        guild_pfp = "Guild does not have set."
    }

    await handleError(null);
    await $("#MainContainer").append(`
        <div class="notification is-info" id="InviteResult">
            <h1 class="title">
                Information about ${inviteResult.guild.name} (From invite ${inviteResult.code}):
            </h1>
            <p><strong>Guild ID:</strong> ${inviteResult.guild.id}</p>
            <p><strong>Guild Icon:</strong> ${guild_pfp}</p>
            <p><strong>Invite Channel:</strong> #${inviteResult.channel.name} (${inviteResult.channel.id})</p>
            <p><strong>Special Features:</strong> ${features}</p>
            <p><strong>Inviter:</strong> ${inviter}</p>
        </div>
    `);
}

// Detects the ENTER key.
$("#InviteBox").keydown(async(event) => {
    if (event.keyCode == 13) {
        await startLookup();
    }
});

// Detects the lookup button being pressed.
$("#LookupButton").click(async() => {
    await startLookup();
});
