<?php
    // Grabs the YML file with all of the portfolio information.
    $portfolio_yml = yaml_parse_file("portfolio.yml");
?>
<!DOCTYPE HTML>
<html lang="en">
    <head>
        <title>Jake Gealer</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Jake Gealer,Developer,HTML,Python,Javascript,TypeScript,for hire" />
        <meta name="author" content="<?php echo $portfolio_yml['name'] ?>" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="<?php echo $portfolio_yml['name'] ?>" />
        <meta property="og:url" content="<?php echo $portfolio_yml['url'] ?>" />
        <meta property="og:description" content="<?php echo $portfolio_yml['description'] ?>" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css">
    </head>

    <body>
        <div class="container">
            <div style="padding: 20px; padding-top: 30px; text-align: center">
                <h1 class="title"><?php echo $portfolio_yml['name'] ?></h1>
                <h2 class="subtitle"><?php echo $portfolio_yml['description'] ?></h2>
                <?php
                    foreach ($portfolio_yml['buttons'] as &$button) {
                        echo(sprintf('<a class="button is-link" href="%s" style="margin-right: 5px">%s</a>', $button['url'], $button['name']));
                    }
                ?>
                <br>
                <br>
                <a href="https://github.com/JakeMakesStuff/jakegealer.me">Want to fork this website? It is open source under the MPL-2.0 license!</a>
            </div>
            <?php
            if (array_key_exists("work", $portfolio_yml)) {
                echo("<hr><h1 class=\"title\">Experience</h1><p>This is my experience when it comes to work. If you have any questions, do not hesitate to contact me:</p>");
                foreach ($portfolio_yml["work"] as $job => $additional_info) {
                    $left = "present";
                    if ($additional_info["left"]) {
                        $left = $additional_info["left"];
                    }
                    echo("<hr>");

                    $btn = sprintf('<a class="button is-link" href="%s"> Learn more about %s</a>', $additional_info['url'], $job);
                    echo('<div class="columns"><div class="column"><p>'. "<h2 class=\"subtitle\"><a href=\"". $additional_info["url"] . "\">" . $job . " (" .  $additional_info["started"] . "-" . $left . ")</a></h2>" . $additional_info['description'] . '</p><br>' . $btn .  '</div>');
                    echo('<div class="column is-one-fifth" style="width: 10%"><img src="img/' . $additional_info['icon'] . '" alt="Logo" style="margin: 0"></div>' .'</div>');
                }
            }
            ?>
            <hr>
            <div class="columns">
                <div class="column">
                    <h1 class="title">Education</h1>
                    <p>These are the places where I have been educated and the qualifications I have got while I was there. If you have any questions, do not hesitate to contact me:</p>
                    <hr>
                    <?php
                    foreach ($portfolio_yml['qualifications'] as $school => $additional_info) {
                        echo(sprintf('<h2 class="subtitle"><a href="%s">%s</a></h2>', $additional_info['url'], $school));
                        $p_part = "<p><b>I started at " . $school . " in " . $additional_info['started'];
                        if ($additional_info['graduated'] != null) {
                            $p_part .= " and graduated in " . $additional_info['graduated'] . ":</b></p>";
                        } else {
                            $p_part .= ":</b></p>";
                        }
                        echo $p_part . "<br>";
                        foreach ($additional_info['grades'] as $grade_name => $grade) {
                            if ($grade == null) {
                                $grade = "Currently in progress";
                            }
                            echo "<p>" . $grade_name . ": " . $grade . "</p>";
                        }
                        echo '<hr>';
                    }
                    ?>
                    <h1 class="title">Extracurricular Activities</h1>
                    <p>I have done several extracurricular activities:</p>
                    <br>
                    <div class="list is-hoverable">
                    <?php
                    foreach ($portfolio_yml['extracurricular_activities'] as &$activity) {
                        echo sprintf('<p class="list-item">' . $activity . '</p>');
                    }
                    ?>
                    </div>
                </div>
                <div class="column">
                    <h1 class="title">Projects</h1>
                    <p>Here are some projects which I have had a part in. If you have any questions, do not hesitate to contact me:</p>
                    <hr>
                    <?php
                    foreach ($portfolio_yml['projects'] as $project => $additional_info) {
                        echo(sprintf('<h2 class="subtitle"><a href="%s">%s</a></h2>', $additional_info['url'], $project));
                        echo('<div class="columns"><div class="column is-four-fifths"><p>' . $additional_info['description'] . '</p><br>' . sprintf('<a class="button is-link" href="%s"> Learn more about %s</a>', $additional_info['url'], $project) .  '</div>');
                        echo('<div class="column"><img src="img/' . $additional_info['icon'] . '" alt="Logo" style="margin: 0"></div>' .'</div><hr>');
                    }
                    ?>
                </div>
            </div>
        </div>
        <footer class="footer" style="padding: 20px">
            <div class="content has-text-centered">
                <p>
                    Website template/renderer by <a href="https://jakegealer.me">Jake Gealer</a>. The source code for this website is licensed under the <a href="https://opensource.org/licenses/MPL-2.0">MPL-2.0</a> license.
                </p>
            </div>
        </footer>
    </body>
</html>
