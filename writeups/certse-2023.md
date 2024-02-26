---
layout: single
title: CERT-SE CTF2023
date: 2023-11-02
authors:
  - 0xPThree
  - Usagi
---

![](/images/writeups/certse-2023/certse-2023.png)

```js
<scenario>
  CERT-SE has come across files from a previously unknown fictional hacker group. In these 
  files there's "flags" hidden. Can you find all the flags?
</scenario>
```
<https://www.cert.se/2023/09/cert-se-ctf2023>

> In the .zip file below there is a network dump (PCAP) and a document that contains a total of seven flags, these have the format “CTF[xxxxxxxxxx]”.
> 
> When you feel that you have found as many flags as you can, feel free to email us these and a description of how you solved the various tasks to cert@cert.se, write “CTF2023” as the subject of the email. Fastest, most flags and best descriptions are awarded.
> 
> NOTE, we will only accept one response per person so be sure to find as many flags as possible before submitting. The last day to send in answers is 31st October 2023.
> 
> [CERT-SE_CTF2023.zip](https://www.cert.se/CERT-SE_CTF2023.zip) (36089982 bytes, sha256: 6823958ff25220d4a8dbdba52ef53f6f0359c28ef7094ea860ec317c1235c19f)

---

# tldr; flags
1. Odt Metadata: **CTF[WILLIAM]**
2. Odt Rebus: **CFT[INCIDENT]** eller **CTF[INCIDEND]**
3. FTP mappens namn: **CTF[HUNTER2]**
4. Stegsolve cert.se logo: **CTF[SNEAKY]** 
5. Decrypt TLS: **CTF[GALOIS]**
6. Message.wav: **CTF[HAMRADIO]**
7. Binär till ASCII i bilden med stenar - **CTF[BluffCity]**

---

# Extracted IRC Conversation
```javascript
CAP LS 302
NICK Christina
USER user 0 * :realname
:irc.example.net CAP * LS :multi-prefix
CAP REQ :multi-prefix
:irc.example.net CAP Christina ACK :multi-prefix
CAP END
:irc.example.net 001 Christina :Welcome to the Internet Relay Network Christina!~user@192.168.0.30
:irc.example.net 002 Christina :Your host is irc.example.net, running version ngircd-26.1 (x86_64/alpine/linux-musl)
:irc.example.net 003 Christina :This server has been started Thu Aug 17 2023 at 10:52:06 (CEST)
:irc.example.net 004 Christina irc.example.net ngircd-26.1 abBcCFiIoqrRswx abehiIklmMnoOPqQrRstvVz
:irc.example.net 005 Christina RFC2812 IRCD=ngIRCd CHARSET=UTF-8 CASEMAPPING=ascii PREFIX=(qaohv)~&@%+ CHANTYPES=#&+ CHANMODES=beI,k,l,imMnOPQRstVz CHANLIMIT=#&+:10 :are supported on this server
:irc.example.net 005 Christina CHANNELLEN=50 NICKLEN=9 TOPICLEN=490 AWAYLEN=127 KICKLEN=400 MODES=5 MAXLIST=beI:50 EXCEPTS=e INVEX=I PENALTY FNC :are supported on this server
:irc.example.net 251 Christina :There are 3 users and 0 services on 1 servers
:irc.example.net 254 Christina 2 :channels formed
:irc.example.net 255 Christina :I have 3 users, 0 services and 0 servers
:irc.example.net 265 Christina 3 3 :Current local users: 3, Max: 3
:irc.example.net 266 Christina 3 3 :Current global users: 3, Max: 3
:irc.example.net 250 Christina :Highest connection count: 3 (3 connections received)
:irc.example.net 375 Christina :- irc.example.net message of the day
:irc.example.net 372 Christina :- *************************************
:irc.example.net 372 Christina :- *                                   *
:irc.example.net 372 Christina :- * This is a CERT-SE CTF IRC Server  *
:irc.example.net 372 Christina :- *                                   *
:irc.example.net 372 Christina :- *                                   *
:irc.example.net 372 Christina :- *************************************
:irc.example.net 376 Christina :End of MOTD command
JOIN #ops
:Christina!~user@192.168.0.30 JOIN :#ops
:irc.example.net 353 Christina = #ops :Christina Bob Alice
:irc.example.net 366 Christina #ops :End of NAMES list
MODE #ops
:irc.example.net 324 Christina #ops +P
:irc.example.net 329 Christina #ops 1692262326
WHO #ops
:irc.example.net 352 Christina #ops ~user 192.168.0.30 irc.example.net Christina H :0 realname
:irc.example.net 352 Christina #ops ~user 192.168.0.20 irc.example.net Bob H :0 realname
:irc.example.net 352 Christina #ops ~user 192.168.0.10 irc.example.net Alice H :0 realname
:irc.example.net 315 Christina #ops :End of WHO list
:Alice!~user@192.168.0.10 PRIVMSG #ops :is this really safe, I mean it's not encrypted right?
:Bob!~user@192.168.0.20 PRIVMSG #ops :we should be safe, it's only internal traffic on the hypervisor
:Bob!~user@192.168.0.20 PRIVMSG #ops :and the secret management system is encrypted with TLS
:Alice!~user@192.168.0.10 PRIVMSG #ops :should we proceed then?
:Bob!~user@192.168.0.20 PRIVMSG #ops :yes, you have to unlock the vault with the secret stored on the secret-management server
:Alice!~user@192.168.0.10 PRIVMSG #ops :yes I know I know. Just give me a sec
:Bob!~user@192.168.0.20 PRIVMSG #ops :ok
:Alice!~user@192.168.0.10 PRIVMSG #ops :so, I have unlocked the vault, you can do your thing now
:Bob!~user@192.168.0.20 PRIVMSG #ops :thanks
:Alice!~user@192.168.0.10 PRIVMSG #ops :Hey, by the way you were saying we are listed on some target list for cyber attacks?
:Bob!~user@192.168.0.20 PRIVMSG #ops :yes we should keep our eyes open for anomalies
:Alice!~user@192.168.0.10 PRIVMSG #ops :ok, I will ping Christina, she is really good with the FPC and the analysis backend
:Bob!~user@192.168.0.20 PRIVMSG #ops :yes, that's a really good idea
:Alice!~user@192.168.0.10 PRIVMSG #ops :ping @Christina
PRIVMSG #ops :Hi Alice, how are you?
:Alice!~user@192.168.0.10 PRIVMSG #ops :just fine, how are you?
PRIVMSG #ops :o fine, just a lot of work with the new IDS. So many false positives, not really useful right now
:Alice!~user@192.168.0.10 PRIVMSG #ops :I see. Here is something to cheer you up a bit
:Alice!~user@192.168.0.10 PRIVMSG Christina :.DCC SEND message.wav 199 0 11888756 47.
:Alice!~user@192.168.0.10 PRIVMSG Christina :SHA-256 checksum for message.wav (remote): 4e31cddd5b972ce211770aca79dc2576099ad07c303de805b89604a7bfbc8b4c
PRIVMSG Alice :.DCC SEND message.wav 3232235550 51991 11888756 47.
PRIVMSG #ops :hahaha, that was wonderful. Thank you!
:Alice!~user@192.168.0.10 PRIVMSG #ops :Bob mentioned we are on some list of potential cyber operation targets. Please let us know if you find anything suspicious.
PRIVMSG #ops :yeah sure will. Do you know what kind of list and who's behind the announcement?
:Alice!~user@192.168.0.10 PRIVMSG #ops :He told me the group announcing the list is known to exfiltrate information
PRIVMSG #ops :ok, I'll see what I can find
PRIVMSG #ops :damn, I found some suspicious traffic to a known bad address
:Alice!~user@192.168.0.10 PRIVMSG #ops :Oh no
PRIVMSG #ops :Looks like they got in to that mail server we told operations to patch weeks ago!!
PRIVMSG #ops :need to investigate what data they transferred but It looks like it originates from the secret-management server.......
:Alice!~user@192.168.0.10 PRIVMSG #ops :Oh no, Bob and I used the secret earlier today
```

---

# 1. Odt Metadata
Filen `CERT-SE_CTF2023 - CompetenceLateRoadThink.odt` är egentligen en zip-fil med massa XML-filer för att beskriva dokumentet. Packa upp .odt och filen `meta.xml` finns följande:
```xml
<office:document-meta office:version="1.3">
 <office:meta>
  <meta:creation-date>2023-08-08T10:57:12.998681141</meta:creation-date>
  <dc:date>2023-08-09T09:22:24.583354797</dc:date>
  <meta:editing-duration>PT21M33S</meta:editing-duration>
  <meta:editing-cycles>5</meta:editing-cycles>
  <meta:generator> LibreOffice/7.0.4.2$Linux_X86_64 LibreOffice_project/00$Build-2
</meta:generator>
<meta:document-statistic meta:table-count="0" meta:image-count="2" meta:object-count="0" meta:page-count="2" meta:paragraph-count="7" meta:word-count="307" meta:character-count="1525" meta:non-whitespace-character-count="1222"/>
<meta:user-defined meta:name="CTF">CTF[WILLIAM]</meta:user-defined>
</office:meta>
</office:document-meta>
```
Under `meta:name` finner vi flaggan **CTF[WILLIAM]**

## 1.1 Alternativ lösning:
Med `unzip` och ripgrep (`rg`) kan denna one-liner plocka ut samma data.
```sh
CERT-SE_CTF2023 ➜ unzip -p CERT-SE_CTF2023\ -\ CompetenceLateRoadThink.odt | rg -b 'CTF\['
977:<office:document-meta xmlns:grddl="http://www.w3.org/2003/g/data-view#" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ooo="http://openoffice.org/2004/office" xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" office:version="1.3"><office:meta><meta:creation-date>2023-08-08T10:57:12.998681141</meta:creation-date><dc:date>2023-08-09T09:22:24.583354797</dc:date><meta:editing-duration>PT21M33S</meta:editing-duration><meta:editing-cycles>5</meta:editing-cycles><meta:generator>LibreOffice/7.0.4.2$Linux_X86_64 LibreOffice_project/00$Build-2</meta:generator><meta:document-statistic meta:table-count="0" meta:image-count="2" meta:object-count="0" meta:page-count="2" meta:paragraph-count="7" meta:word-count="307" meta:character-count="1525" meta:non-whitespace-character-count="1222"/><meta:user-defined meta:name="CTF">CTF[WILLIAM]</meta:user-defined></office:meta></office:document-meta><?xml version="1.0" encoding="UTF-8"?>
binary file matches (found "\0" byte around offset 14285)
```

---

# 2. Rebus
CTF[☔-ra+💿d=i+⛺t=d]
* ☔-ra = rain - ra => in
* 💿 = cd där d=i => ci
* ⛺ = tent där t=d => dent eller dend

Flagga: **CFT[INCIDENT]** eller **CTF[INCIDEND]**

---

# 3. ripgrep .pcap
```bash
CERT-SE_CTF2023 ➜ strings CERT-SE_CTF2023.pcap | rg 'CTF\['                           
-rw-r--r--    1 0        0               0 Aug 10 08:31 CTF[HUNTER2]
-rw-r--r--    1 0        0               0 Aug 10 08:31 CTF[HUNTER2]
```
Det är namnet på en mapp på FTP:n som fås när en directory-listing görs.

![FTP-data](/images/writeups/certse-2023/01.png)

Flagga: **CTF[HUNTER2]**

---

# 4. StegSolve på cert.se loggan
Bilden `1000020100000258000000BCA31AE58ABEF1BC61.png` med cert.se-loggan har flaggan dold i röd-lagret på bilden.

**Orginal-bild:**

![Orginal bild](/images/writeups/certse-2023/1000020100000258000000BCA31AE58ABEF1BC61.png)

Nyttja StegSolve (<https://github.com/eugenekolo/sec-tools/blob/master/stego/stegsolve/stegsolve/stegsolve.jar>) och stega igenom bilden med '`>`' tills du hittar flaggan i röd-lagret.

![StegSolve](/images/writeups/certse-2023/02.png)

Flagga: **CFT[SNEAKY]**

---

# 5. Decrypt TLS
I Wireshark, exportera `File > Export Objects > HTTP` från HTTP POST src `10.0.1.20` till dest `240.0.0.68`.

```bash
certse-23 ➜ file http-post
http-post: gzip compressed data, from Unix, original size modulo 2^32 2900

certse-23 ➜ mv http-post.gzip http-post.gz  
certse-23 ➜ zcat http-post.gz  

-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDU7yGUoAUtql9a
9QRcqcL8WLyyEVHbqL/twiO65RRU7mQW47jlUTyAqMYdsDgllnItuqZ2MGIzNCwL
qfiN9qlCGQ3NPb0wv/SWxMjxlA12F3Pwz9zLAZfWYB587K7q1cIVI4Ztlk3GAW5C
RVjBrNZgt1dGxPH0iGGtoyXtbj3rAuUKim3FMw0U8fx8mRZuR6lqWIT+p2OET01n
w+KuCgXRgaYgm2CZQij9VW2YotAByECN+DI6Rxx6FEZJe9/qGO7gbjxPb3/PNlRb
HqnsF6LcbYweYcluOg2ovfcNMwIY15J6Wi7/0hbUC7zgbsDnzTbJlVDPHI/bWp3a
n42qZV/lAgMBAAECggEABNR7dpouS+PMX8KPi6+Lx/rA+v64FItjy8zxJQqQYcB6
Pj0CTcIAOpXkJTprp59IQz/I31pHxqFlagqmuUenUrkWmPl7IA7hSYXjXfwjAF2r
UwLQChMk7Sdcga5tEFAdeSpyC0HTIqLtK+0pRH67FSdg1YQ0TdJFzvEUtD7212y8
iopbYH8aoJC5ty/lZMp9uqoy959s4SLkubMYL+SA1Au4fIqC6o99LpmBo74YB+vY
6YrCcCT3ymcUsx4p9W17lI6Hh8DI8HToWqFpn6klikvh+tY+aaTFZT/FooqAgKB2
M2npnGqKP2Pi4Tm0jw/jnKtF9qFwxy1THPBJDBGYgQKBgQDtPlzWVx0qaey44GwV
OHodgZE75vIK8vWEqL1Eb9kybi9oqMWZYOPcbqjj/bRQt8C0qg0jnG+dtt73+80E
CJ49O0YRPl5Huy0LdHeMHHiNbLE9D+WrEdqb0e3/2xa71wAztrdHyNfl7Xsuqzxb
AtZFg4qSWTX0pEtLvm6d+OuTZQKBgQDlxMMU1hZheCT5O1Ggukr+7lgwdGN5vFdT
SPdIVAc6eV6iKgMiJb5G6qhOUrjsJmr+9T0LnpcAIGieylO0h7KhkNFNtBB0PMLI
xb56fSF7RypYNAB1sGvWO3eZsNwiW8sWSVmRRRnZURSQI+d0Edy5AmJnOb7QQ2Xk
EU1eBFcSgQKBgGoALTbPoYZr4YsRKvmoTFeWpq+fFpJxz+VAB6DmYKM5vBEFJ5TK
R8Ub5HZJyyEtmPqf6FL6+Jv9M06VwRqGRz2QmFPoC/P827l8hlWh+vMll2NzEOkI
hyaL+80PtO6kt8BjaSy3vk9Ldnh5pfP8JoTUqzuMhKEUL1hec8o9h/RJAoGBAIuv
4rXxLewV4cyPzqF7gIqaFo1mxO9GnIRqsMONKlPXY7wM9Ji2/4YXtTjgu8H93UCh
kXpV8RFHorMe6GKxuNzWsRifZv1zzyvGZHYNSuSqsEitXLYwCm9U+fI6/qn4ynAD
KevSadOfonO7EESVc24az/5XsfTldLWB+1o0I0eBAoGAbkIGr+VAwYOliDl9Ax3X
KxqzanzzsmiqZnQ8XoCaKAEIOQOLxy6hyBX/ddRAMH8e0yaG+bBstSBnq0gX4qwg
JO3pwnvBeTkERQxS/eR0STnObz/B/M8DUEZZUFpK1hYi/SDEWtQ01yr4UMUqh27Q
THToWPWEz246+RekeBUvTEY=
-----END PRIVATE KEY-----
-----BEGIN CERTIFICATE-----
MIIDRTCCAi0CFEHUfr6q2L765N+4Jo6pnAvbWAlZMA0GCSqGSIb3DQEBCwUAMF8x
CzAJBgNVBAYTAlNFMRIwEAYDVQQIDAlTdG9ja2hvbG0xDjAMBgNVBAcMBVNvbG5h
MRAwDgYDVQQKDAdDVEYyMDIzMRowGAYDVQQDDBFzZWNyZXQtbWFuYWdlbWVudDAe
Fw0yMzA4MTAwNjUxNTlaFw0yNDA4MDkwNjUxNTlaMF8xCzAJBgNVBAYTAlNFMRIw
EAYDVQQIDAlTdG9ja2hvbG0xDjAMBgNVBAcMBVNvbG5hMRAwDgYDVQQKDAdDVEYy
MDIzMRowGAYDVQQDDBFzZWNyZXQtbWFuYWdlbWVudDCCASIwDQYJKoZIhvcNAQEB
BQADggEPADCCAQoCggEBANTvIZSgBS2qX1r1BFypwvxYvLIRUduov+3CI7rlFFTu
ZBbjuOVRPICoxh2wOCWWci26pnYwYjM0LAup+I32qUIZDc09vTC/9JbEyPGUDXYX
c/DP3MsBl9ZgHnzsrurVwhUjhm2WTcYBbkJFWMGs1mC3V0bE8fSIYa2jJe1uPesC
5QqKbcUzDRTx/HyZFm5HqWpYhP6nY4RPTWfD4q4KBdGBpiCbYJlCKP1VbZii0AHI
QI34MjpHHHoURkl73+oY7uBuPE9vf882VFseqewXotxtjB5hyW46Dai99w0zAhjX
knpaLv/SFtQLvOBuwOfNNsmVUM8cj9tandqfjaplX+UCAwEAATANBgkqhkiG9w0B
AQsFAAOCAQEAFD3ccPkRw91kVM0UXUa+7cuA5jZUpC3qW/CUZ8DFe5WUUKXJWBAW
B7FQFy8K+jn5CFaR5aHwFvB70VLL7Qzm5egKID9wxLX9heW79KIw5I2E4N+4MO/r
LvejNBkQxdUF5cFJhLa6QnGAZPMcpZy8y/PnxKta8He44Iq9EJcR7Npk/YUEJ0rl
AF0E/Mn3ObU6mf+TGLwiP/leGXtWa6hVhnSS0lMA373RAXZtVu+3mnyeQlV7Al/3
VPKZSxj1eRP5g/gBtMRlzUQWXfP59znlJWbGVYc+de3E6CYqXhCPrquwAMDcq6H8
Y3Vx00FYepOIQaJsXqXg7sPboC7mqk0eXA==
-----END CERTIFICATE-----

certse-23 ➜ gunzip http-post.gz
certse-23 ➜ file http-post
http-post: OpenSSH private key (no password)
```

Lägg till nyckel i Wireshark:

![Wireshark](/images/writeups/certse-2023/03.png)

Paket 3449 i Wireshark kommer dekrypteras och vi ser att de skickat en PNG-fil. 

![Wireshark](/images/writeups/certse-2023/04.png)

Exportera bilden:

![Exporeta från Wireshark](/images/writeups/certse-2023/05.png)

secret.png:

![CTF-flaggan](/images/writeups/certse-2023/06.png)

Flagga: **CFT[GALOIS]**

---


# 6. Message.wav
IRC DCC send message.wav
```javascript
:Alice!~user@192.168.0.10 PRIVMSG Christina :SHA-256 checksum for message.wav (remote): 4e31cddd5b972ce211770aca79dc2576099ad07c303de805b89604a7bfbc8b4c
```
In Wireshark filter on `tcp.stream eq 54 ` and right click  `Follow > TCP Stream ` change show data as  `Raw` from 192.168.0.10 and save as. 

Compare the file signatures to ensure that we have the correct `message.wav` file:
```bash
$ shasum -a 256 message.wav  
4e31cddd5b972ce211770aca79dc2576099ad07c303de805b89604a7bfbc8b4c  message.wav
```

Lösningen löst vi inte själva utan fick ta hjälp av: [CTF Writeup: CERT-SE CTF2023](https://www.youtube.com/watch?v=oFdY9hnn6KM)

Öppna .wav-filen i [Sonic Visualiser](https://www.sonicvisualiser.org/) och kolla spectrogrammet med följande inställningar:
- Colour: Banded
- Scale: db None
- Windows: 1024 50% 1x
- Bins: All Bins Linear
Runt 24 sekunder kommer en överlagra signal på 780 Hz. 

![Spectrogram](/images/writeups/certse-2023/07.jpg)

Starta sedan programmet `fldigi` och öppna `File > Audio > Playback` och välj `780` där det står `1500` och efter 24 sekunder börjar text för flaggan ramla ut.

![CTF-flagga](/images/writeups/certse-2023/08.png)


Flagga: **CTF[HAMRADIO]**

---

# 7. Binär text till ASCII
I bilden `100000000000040000000300B296674118E1FCC5.jpg` med massor av stenar finns i slutet en långt sträng som ser konstig ut.
```bash
$ strings -n 10 100000000000040000000300B296674118E1FCC5.jpg
EEEEEEEEEeEEEEeeEEEEEEEEEeEeEeEEEEEEEEEEEeEEEeeEEEEEEEEEEeEeeEeeEEEEEEEEEeEEEEeEEEEEEEEEEeeEeeEEEEEEEEEEEeeeEeEeEEEEEEEEEeeEEeeEEEEEEEEEEeeEEeeE EEEEEEEEEeEEEEeeEEEEEEEEEeeEeEEeEEEEEEEEEeeeEeEEEEEEEEEEEeeeeEEeEEEEEEEEEeEeeeEe
```
Ser ut som binärt `E = 0` och `e = 1`. Konvertera strängen till ettor och nollor så fås:
```bash
00000000010000110000000001010100000000000100011000000000010110110000000001000010000000000110110000000000011101010000000001100110000000000110011000000000010000110000000001101001000000000111010000000000011110010000000001011101
```
Nyttja binärt text till ASCII t.ex. [Binary to ASCII](https://www.rapidtables.com/convert/number/binary-to-ascii.html) så fås flaggan. 

Flagga: **CTF[BluffCity]**

---
