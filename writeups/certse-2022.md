---
layout: single
title: CERT-SE CTF2023
date: 2022-10-11
authors:
  - 0xPThree
  - Usagi
---

![](/images/writeups/certse-2022/certse-2022.png)

```js
<scenario>
  CERT-SE har återigen kommit över nätverkstrafik från den fiktiva hackergruppen ”Medelålders Sura Blackhats”. 
  Kan du hitta alla flaggorna?
</scenario>
```

<https://www.cert.se/2022/09/cert-se-ctf2022.html>

> In the .zip file below there is a network dump (PCAP) that contains a total of six flags in the format “CTF[xxxxxxxxxx]”, these are words or names, so not random letters.When you have found as many flags as you can, feel free to email them to us including a description of how you solved the various tasks. Send your email to cert@cert.se with “CTF2022” as the subject of the email.
> 
> The fastest responses, with most flags and the best descriptions are awarded.NOTE, we will only accept one response per person so make sure to find as many flags as possible before submitting. The last day to send in answers is 31 October, 2022.
> 
> [CERT-SE_CTF2022.zip](https://www.cert.se/ctf/CERT-SE_CTF2022.zip) (12957299 bytes, sha256: cf088acc3d4cd12b2b4c7f9a2b3a4a8f48a1a6231d302acb12e646b4cba8b61b)

---

# IRC konversation
Filtrera `.pcap` på `irc` och följ TCP strömmen, vi finner:
```javascript
:Hejarn!user@192.168.122.251 PRIVMSG #Priv-IRC :Ok, less chit chat this time, let's try to have better op-sec this year!
PRIVMSG #Priv-IRC :It wasn't only my fault last time... :'(
:Hejarn!user@192.168.122.251 PRIVMSG #Priv-IRC :@Kammen, noone is blaming you. Let's just do it better this time...
:Frallan!user@192.168.122.186 PRIVMSG #Priv-IRC :Sure...
:Hejarn!user@192.168.122.251 PRIVMSG #Priv-IRC :Aaaanyway... Is everyone here?
:Eran!user@192.168.122.156 PRIVMSG #Priv-IRC :Erm, I think Rosen, Anaforan and Pekarn is away. But I think their parts are done.
PRIVMSG #Priv-IRC :Yeah, Rosen told me the data to the ROM is "eb a3 8a e8 ba e2 ea 3b b8 ee 8a 3a e8 bb ae 00".
:Hejarn!user@192.168.122.251 PRIVMSG #Priv-IRC :@Kammen, thanks. 
:Hejarn!user@192.168.122.251 PRIVMSG #Priv-IRC :Ok, @Frallan, is the sequence ready?
:Frallan!user@192.168.122.186 PRIVMSG #Priv-IRC :Sure it's here: "444 6 2 4 444 66 33 0 444 333 0 444 0 9 33 777 33 0 2 7777 0 4 666 666 3 0 2 8 0 7 777 666 4 777 2 6 6 444 66 4 0 2 7777 0 222 8 333 [ 2 3 2 0 555 666 888 33 555 2 222 33 ]".
:Hejarn!user@192.168.122.251 PRIVMSG #Priv-IRC :Great! This should get the message out!
PRIVMSG #Priv-IRC :I still don't get it...
:Eran!user@192.168.122.156 PRIVMSG #Priv-IRC :@Kammen, well d......h! ;-)
PRIVMSG #Priv-IRC :Ha ha, very funny... 
PRIVMSG #Priv-IRC :@Eran, did you find a solution for the missing characters? 
:Eran!user@192.168.122.156 PRIVMSG #Priv-IRC :Erm, no... The [ and ] doesn't exist... But everyone should understand that they're represented by .. and .. on the Swedish keyboard. Right?
:Frallan!user@192.168.122.186 PRIVMSG #Priv-IRC :Maybe, let's hope so!
PRIVMSG #Priv-IRC :I just don't get why we should use such old tech?!?
:Eran!user@192.168.122.156 PRIVMSG #Priv-IRC :I did it as an homage to Faggin and Kildall for their contributions. And it serves our purpose extremely well! 
:Hejarn!user@192.168.122.251 PRIVMSG #Priv-IRC :Shut up!!! We need to keep quiet this time!
:Eran!user@192.168.122.156 PRIVMSG #Priv-IRC :Right, sorry...
PRIVMSG #Priv-IRC :@Eran, lol! What's next? You telling that the encrypted flag is "CTF[RRCJFW]" the code is "BBB" too? X-D
:Frallan!user@192.168.122.186 PRIVMSG #Priv-IRC :...
:Eran!user@192.168.122.156 PRIVMSG #Priv-IRC :Shut up!
PRIVMSG #Priv-IRC :Erm, oups.... :-/
PRIVMSG #Priv-IRC :But I'm pretty sure no one listens to this... 
:Hejarn!user@192.168.122.251 PRIVMSG #Priv-IRC :Sigh... 
:Hejarn!user@192.168.122.251 PRIVMSG #Priv-IRC :Anyway... We only have one shot of this. @Eran, is the package ready?
:Eran!user@192.168.122.156 PRIVMSG #Priv-IRC :Yes, sending it now...
:Eran!user@192.168.122.156 PRIVMSG #Priv-IRC :Done.
:Hejarn!user@192.168.122.251 PRIVMSG #Priv-IRC :Good! 
:Hejarn!user@192.168.122.251 PRIVMSG #Priv-IRC :@Kammen, is the website finished?
PRIVMSG #Priv-IRC :Yes! :-D
:Hejarn!user@192.168.122.251 PRIVMSG #Priv-IRC :Where is it?
PRIVMSG #Priv-IRC :http://192.168.122.129/
:Hejarn!user@192.168.122.251 PRIVMSG #Priv-IRC :Ok, let's see...
:Hejarn!user@192.168.122.251 PRIVMSG #Priv-IRC :Still no https?!?
PRIVMSG #Priv-IRC :There's really no need...
:Hejarn!user@192.168.122.251 PRIVMSG #Priv-IRC :Yeah, we said that last year too... :-/
:Eran!user@192.168.122.156 PRIVMSG #Priv-IRC :Is the link to Rosens part still there?
:Hejarn!user@192.168.122.251 PRIVMSG #Priv-IRC :Yes, I checked it. The link is ok. 
:Hejarn!user@192.168.122.251 PRIVMSG #Priv-IRC :Anyway, it has to do...
:Hejarn!user@192.168.122.251 PRIVMSG #Priv-IRC :Ok. We're done. 
:Hejarn!user@192.168.122.251 PRIVMSG #Priv-IRC :Now everyone logout and destroy your data.
:Frallan!user@192.168.122.186 PRIVMSG #Priv-IRC :Ok, see you.
:Eran!user@192.168.122.156 PRIVMSG #Priv-IRC :See you at the meeting point.
```


# Flagga 1
Från IRC-konversationen finner vi strängen `"444 6 2 4 444 66 33 0 444 333 0 444 0 9 33 777 33 0 2 7777 0 4 666 666 3 0 2 8 0 7 777 666 4 777 2 6 6 444 66 4 0 2 7777 0 222 8 333 [ 2 3 2 0 555 666 888 33 555 2 222 33 ]"` slänger vi detta genom en [multidecoder](https://www.cachesleuth.com/multidecoder/) visar **Vanity** detta:
`IMAGINE IF I WERE AS GOOD AT PROGRAMMING AS CTFADA LOVELACE`

Flagga: **CTF[ADA LOVELACE]**

-------------------

# Flagga 2
Från bilden `krets.png` finner vi en hint om circuitverse. 
Via https://circuitverse.org/users/147800/projects/cert-se-ctf-2022 kan vi översätta från morse till text. ROM-koden (från IRC) är med i PROM:en.

![](/images/writeups/certse-2022/cert01.png)
Om vi räknar på korta respektive långa ljussignaler får vi då fram nedan morsekod:
```
-.-. - ..-. .-.- .-.. --- --. .. -.-. .--.-
CTFÆLOGICÅ
```

Flagga: **CTF[LOGIC]**

---------------

# Flagga 3
En flagga ligger dold som en kommentar på Medelålders Sura Blackhats websida
```bash
➜  cert22 cat text
<!DOCTYPE html>
<! –– This is a part of CERT-SE's CTF2022 ––>
[... snip ...]
<! CTF%5BROSPIGG%5D>
```

Flagga: **CTF[ROSPIGG]**

-------------------

# Flagga 4 
I pcap'en finner vi att användare `eran` laddar upp filen `FAGGIN.zip`.
```bash
220 (vsFTPd 3.0.3)
USER eran
331 Please specify the password.
PASS Sn0mosglass
230 Login successful.
SYST
215 UNIX Type: L8
TYPE I
200 Switching to Binary mode.
PORT 192,168,122,156,227,163
200 PORT command successful. Consider using PASV.
STOR FAGGIN.zip
150 Ok to send data.
226 Transfer complete.
QUIT
221 Goodbye.
```

Extrahera `.zip` filen och packa upp den, där finner vi `FAGGIN.COM`. 
Vi kan inte köra COM-filen, och innan vi letar efter en valid emulator kan vi inspektera filen.

![](/images/writeups/certse-2022/cert02.png)

```bash
➜  faggin strings FAGGIN.COM 
[... snip ...]
EKMFLGDQVZNTOWYHXUSPAIBRCJAJDKSIRUXBLHWTMCQGZNPYFVOEBDFHJLCPRTXVZNYEIWGAKMUSQOESOVPZJAYQUIRHXLNFTGKDCMWBVZBRGITYUPSDNHLXAWMJQOFECKYRUHQSLDPXNGOKMIEBFZCWVJATQEVJZ
  Hint 1: II  I  III  
CEB  Hint 2: Start Setting-->
Rotor position: %c %c %c
Input the message, one key at the time.
(null)


➜  faggin cat FAGGIN.COM
[... snip ...]
EKMFLGDQVZNTOWYHXUSPAIBRCJAJDKSIRUXBLHWTMCQGZNPYFVOEBDFHJLCPRTXVZNYEIWGAKMUSQOESOVPZJAYQUIRHXLNFTGKDCMWBVZBRGITYUPSDNHLXAWMJQOFECKYRUHQSLDPXNGOKMIEBFZCWVJATQEVJZ  Hint 1: II  I  III  CEB  Hint 2: Start Setting-->CCCRotor position: %c %c %c
Input the message, one key at the time.
```

`Hint 1: II  I  III  CEB `
`Hint 2: Start Setting-->CCC`
`Rotor position: %c %c %c`

Med ledtrådarna ovan pekar det mot att vi kollar på ett enigma program. 
Kollar vi på den långa strängen ovanför ledtrådarna så kan vi dela upp den i 26 tecken och bekräfta att det är enigmas rotors:
```bash
I = EKMFLGDQVZNTOWYHXUSPAIBRCJ
II = AJDKSIRUXBLHWTMCQGZNPYFVOE
III = BDFHJLCPRTXVZNYEIWGAKMUSQO
IV = ESOVPZJAYQUIRHXLNFTGKDCMWB
V = VZBRGITYUPSDNHLXAWMJQOFECK
```

Nästa segment av 26 tecken motsvarar reflektor-värdet (B):
```bash
sträng: YRUHQSLDPXNGOKMIEBFZCWVJAT
reflektor b: AY BR CU DH EQ FS GL IP JX KN MO TZ VW
reflektor b (hela, inkl. kolission): AY BR CU DH EQ FS GL HD IP JX KN LG MO NK OM PI QE RB SF TZ UC VW WV XJ YA ZT
```

Kvar har vi då fem tecken `QEVJZ`, jag vet inte vad dom är till. 

Med den information vi har, samt den tidigare ledtråden från IRC, `What's next? You telling that the encrypted flag is "CTF[RRCJFW]" the code is "BBB" too? X-D`, så kan vi dekryptera `RRCJFW` med [enigma online](https://www.dcode.fr/enigma-machine-cipher) och få fram strängen `POLAND`, de land som lyckades dekryptera enigma först. 

![](/images/writeups/certse-2022/cert05.png)

Flagga: **CTF[POLAND]**

----------------

# Flagga 5
Exportera bilden `brus.png` från pcap'en. Skanna QR-koden med valfri online scanner så får vi ut nedan blobba:
```bash
01080B0842069E3230363100000078A0B7BE1A08960088D0F84C0300340288B9FC0C9900FF98D0F6C606A9F9C709D0EEA9014602B05A20A500AAF050B9D6FA9163E622D002E623E663D002E664CAD0ECA56BD0382A4602B03720A500E901B002C76B49FFA849FF65638563B002C66418E9008560A564E9008561B9EFBE99300BC8D0F7E664A900F0A798F0D0C66BB0AC20A500E90190394A855CB1226A8556E622D002E623A90120A700B0B6AAB1226A8502E622D002E6238AB01446022AB007460290F7F0E660489820A200856B68604C300B78A97F8D0DDC0560DDA9358501AD12D0CD0442F0FB30F6C937F00CC906D003A9C62CA9EA8D6C0CA9068D20D0851FA9098518A0008C11D05115D4A051FF3F8428842D842E842084218417A9209900040514067907A9010917D821D945DAA844DB88D0E1A204BD200F9533CA10F8A618BD2C0F851E20590DA735CB5C8635A9058536C61810E8A9D88D6D0DA97E8511043CA61FBD25489404651F150499E940A20E5DEF0E9DE7059DF7A96C5963A62E86DFBD21A40439DCA21F8624BD000F99DBC871D9F68EE95CA23F1C5C9D400580D4C03163F1ADE17D30FBA22FEC54D3D09EA91B8D1BEAA90E8525A9328D500CA424A625BDCF0E8D16D0BE000F8630F0583046A93ACD774EEA0197186EDC690129070918645F1F022471862662D5C1AAE4B910A6261644708D21D0CAD0D5A2080972FDEAA206EA8E1D078E29E71010E630B18617DE315110051DDD9D5FF2C625F012A5301869086DE975EE880081474C3E0CE624A006A9F8DE138C0BB8204110A528C907D037691F38E72DD01AA900CD2DD8C9D000C62E1004C603862E4CEDE8865EA62DB5608DB605B5648DDE0968510606556C2E6AC6281016A9078528A203BD18108529451CB02A20A90D1D01F0ADC749C02B9DD0167C0817FAA617F01FE006101BE0023017BCC20EB92010BCBC0E8419BCB60E841AA02691198810FBF07A174C220CA03184010A26210486508520A521290769108521A0078426A426B120A203E4330050240037984AB019A003B135290FAABDDF0E913587F354D42864B002C654261ED0A035957260A001B129889129C8C80C00485C60DA01D98C21DF6F08E0B8900504030201000A17C70081C0C80150207E7CE27B61FFEC6C7FE1FB62FCFEA03D18131903031D061117095D12170300590B0A1409550807D506057F9D9FA101510100265C4A3E180560455362545245432AF500020001545448454B205130572041544C2032303200A84070FFE0C0800E64070301F830ECB2BB19851AFB0A070D030E2FE04055A2A096F045A9B2D023B91313F01210190A8D9710B971CD8D920BE514D01FC857168DF84C7D108D482EF1186D19751ECE195CD0114094C9FF5F98900346440F897695D408651748090F8D18D420A710A207904A0EDE5412F00B1006BD53129D54124C3611BD2A12D030BC5112B9EF12850245F21603BC274FB1029B6977C80DA81295E05C08E9F09D28121CDE9D5212C99DE13FBC5612BD3EE98F4238E9609D551271D19D3E09550940DCFE578F01E477089D41772842193904311E7764FEE5773FCFFB0B5406D4F854057C4C1D932370F031B90767DF037D5D08648AF80418B90913561D087D581410057D5512297FA8516E6914A83D6AF9C989C902F04CBC41F979441D2A09E8D35BD708050B371009B90F736BF5B1A4FDC74D111879711F690022DDDE42EDC10C4CFC4A4F793F17C5029D031411116D520541F541F7412AA540F714C9C09016BD2B73021D9D8A11ECF021D0289D5614E1C9BDF0157DCE29F2B73106CDD90F9FD509FE57C736F00176492ABB51690071BD6A0BB10175373DD9B5046024BE1AE5050101FE01590C02724E428A7E507398C0E9164577ABE31E5D9FE6307FD32C8AED56C63DBA3FCB61FFA65713DAAD8C79747D97C1FD4CAE26B45A19F2E8FB2E82FA985D4C68B43202004103590405140655070855090A590B0C0D2A910E0F10111213141517181A1B1D1F20222427292B2E3134373A3E1E262E13453F43137520417B592901B254F1417580802562FF4310EF0298006060FFD20A011B25AC00EE00EC5526FC75FAF80E7DF05E5FEE08F37031160171C11C0295039506E5985517989A589AE593313793000040
```

Konvertera till HEX:
```bash
➜  cert22 cat brus.txt | xxd -ps -r > out
➜  cert22 file out 
out: CBM BASIC, SYS 2061
```

Läser vi om [SYS](https://www.c64-wiki.com/wiki/SYS) ser vi att det tillhör Commodore BASIC V2. Ladda in fil på valfri C64 emulator, testa alla extensions, `.prg` fungerar och ger oss flaggan.

![](/images/writeups/certse-2022/cert04.png)
Flagga: **CTF[RETROLOVE]**

----------------

# Flagga 6

I pcap'en finner vi kommunikation över port 1337, innehållet är endast punkter och mellanslag. 
Spara ner detta till fil och gör så att de två strecken i mitten blir parallella, då finner vi den 6e och sista flaggan.
![](/images/writeups/certse-2022/cert03.png)

```bash
  ...   ...... ..... ..... ....  ..... ..  ..  ...  ....   ...  ..   ..  ...  .....
..        ..   ....  ..    ....  ....  ...... ..... ....  ..... ....... .....    ..
  ...     ..   ..    ..... .. .. ..... ..  .. .. .. .. .. .. .. ..   .. .. .. .....
```

Flagga: **CTF[RENARAMA]**
---