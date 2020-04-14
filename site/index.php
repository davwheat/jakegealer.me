<?php
    // Grabs the YML file with all of the portfolio information.
    $portfolio_yml = yaml_parse_file("portfolio.yml");
?>
<!DOCTYPE HTML>
<html lang="en">
    <head>
        <title>Jake Gealer</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content="Jake Gealer,Developer,HTML,Python,Javascript,TypeScript">
        <meta name="author" content="<?php echo $portfolio_yml['name'] ?>">
        <meta name="description" content="<?php echo $portfolio_yml['description'] ?>">
        <meta property="og:type" content="website">
        <meta property="og:title" content="<?php echo $portfolio_yml['name'] ?>">
        <meta property="og:url" content="<?php echo $portfolio_yml['url'] ?>">
        <meta property="og:description" content="<?php echo $portfolio_yml['description'] ?>">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css">
    </head>

    <body style="text-align: center;">
        <h1 class="title is-1">Personal site is down for a bit</h1>
        <p>
            Don't worry, it'll be back soon. You can check out my <a href="https://blog.jakegealer.me">blog</a> or <a href="https://twitter.com/JakeBuildsStuff">Twitter</a> if you want.
        </p>
    </body>
</html>
