---
layout: single
title: CERT-SE CTF2023
date: 2021-09-28
authors:
  - 0xPThree
  - Usagi
---

![](/images/writeups/certse-2021/certse-2021.png)

```js
<scenario>
   CERT-SE har kommit över nätverkstrafik från den fiktiva hackergruppen ”Medelålders Sura Blackhats”. 
   Kan du hitta alla flaggorna?
</scenario>
```

<https://www.cert.se/2021/10/cert-se-ctf2021.html>

> In the .zip file below there is a network dump (PCAP) that contains a total of six flags, these have the format “CTF[xxxxxxxxxx]“.When you feel that you have found as many flags as you can, feel free to email us these and a description of how you solved the various tasks to cert@cert.se, write “CTF2021” as the subject of the email.
> 
> Fastest, most flags and best descriptions are awarded.NOTE, we will only accept one response per person so be sure to find as many flags as possible before submitting. The last day to send in answers is 31st October 2021.
>
> [CERT-SE_CTF2021.zip](https://www.cert.se/ctf/CERT-SE_CTF2021.zip) (67360673 bytes, sha256: 5b551027a7564119337f2ddebc96e3c6ebbafc3a0572f1488b71955fde5e9706)

---

# tldr; flags
1. CTF[bra_start] -> http://192.168.122.129/CTF[bra_start]
2. CTF[Stackars_Myrstack] -> memdump4.dmp
3. CTF[skulle_skippat_linbanan] -> broadcast.7z (ch0kl4Dmoj5)
4. CTF[RESILIENS] -> doc.kml XGU[IVHRORVMH]
5. CTF[RYMDLJUD] -> Starta qsstv och receive och spela upp ljudet så kommer det fram en bild
6. CTF[chameleon] -> steghide på giveup.jpg utan lösenord

---

# Flagga 1
Gå igenom .pcap-filen och söker efter "CTF[" och får svar `http://192.168.122.129/CTF[bra_start]`

Flagga: **CTF[bra_start]**

---

# Flagga 2
Från IRC-chatten: _"Is the Debian-dump ready?"_
Packa up `memdump4.7z` till `memdump4.dmp`.

```bash
$ strings memdump4.dmp | grep -i 'Linux version' | uniq
Aug  3 12:20:34 dumpen kernel: [    0.000000] Linux version 4.9.0-6-amd64 (debian-kernel@lists.debian.org) (gcc version 6.3.0 20170516 (Debian 6.3.0-18+deb9u1) ) #1 SMP Debian 4.9.82-1+deb9u3 (2018-03-02)
SWIMS: Linux Version: %04X
Linux version 4.9.0-6-amd64 (debian-kernel@lists.debian.org) (gcc version 6.3.0 20170516 (Debian 6.3.0-18+deb9u1) ) #1 SMP Debian 4.9.82-1+deb9u3 (2018-03-02)
MESSAGE=Linux version 4.9.0-6-amd64 (debian-kernel@lists.debian.org) (gcc version 6.3.0 20170516 (Debian 6.3.0-18+deb9u1) ) #1 SMP Debian 4.9.82-1+deb9u3 (2018-03-02)
```

This indicates that is is Linux Debian v9.4 amd64 using.
Download correct profile for Linux:
```bash
$ curl https://github.com/volatilityfoundation/profiles/blob/master/Linux/Debian/x64/Debian94.zip -o Debian94.zip
```

Each of these profiles is implemented as a zip file. You can enable them individually with your Volatility installation by copying Linux profiles to volatility/plugins/overlays/linux
```bash
$ cp Debian94.zip /home/mib/tools/volatility/volatility/plugins/overlays/linux

$ python vol.py --info | grep Debian                                                                                     
Volatility Foundation Volatility Framework 2.6.1
LinuxDebian94x64      - A Profile for Linux Debian94 x64
```

Use the profile LinuxDebian94x64:

Get the file system:
```bash
$ python vol.py -f ../../Desktop/CERT-SE/memdump4.dmp --profile=LinuxDebian94x64 linux_recover_filesystem --dump-dir TEST
$  cd ./TEST/home/user
$ ./SuperSecretLogonTool        

      ,@@@@@@(    &&&&&&&&&&    %%%%%%%,     &&&&&&&&&&&&&(                 %@@@@@@,    @@@@@@@@@@@ 
   @@@*       %   @@            @@      @@&       *@@                     @@*      .    @@/         
 /@@              @@            @@       @@       *@@                     @@            @@/         
 @@               @@,,,,,,,,    @@     /@@,       *@@                      (@@@@/       @@&%%%%%%%  
 @@               @@            @@##%@@@(         *@@                           (@@@.   @@/         
 @@&              @@            @@      @@        *@@                              @@   @@/         
  #@@*            @@            @@       @@       *@@    ,,,,,,,,,,,,,,   @       @@@   @@/         
     %@@@@@@@@/   @@@@@@@@@@,   @@        @@,     *@@    ,,,,,,,,,,,,,,    %@@@@@@(     @@@@@@@@@@@ 
                                                         ,,,,,,,,,,,,,,                             
 ........................................................,,,,,,,,,,,,,,............................                                                                                                                                          
                                                         ,,,,,,,,,,,,.                                                                                                                                                                       
                                                            ,,,,,,,,                                                                                                                                                                         
                                                               .,                                                                                                                                                                            

Ange lösenord: 

$ strings ./SuperSecretLogonTool 
h3mlig!


$ ./SuperSecretLogonTool

      ,@@@@@@(    &&&&&&&&&&    %%%%%%%,     &&&&&&&&&&&&&(                 %@@@@@@,    @@@@@@@@@@@ 
   @@@*       %   @@            @@      @@&       *@@                     @@*      .    @@/         
 /@@              @@            @@       @@       *@@                     @@            @@/         
 @@               @@,,,,,,,,    @@     /@@,       *@@                      (@@@@/       @@&%%%%%%%  
 @@               @@            @@##%@@@(         *@@                           (@@@.   @@/         
 @@&              @@            @@      @@        *@@                              @@   @@/         
  #@@*            @@            @@       @@       *@@    ,,,,,,,,,,,,,,   @       @@@   @@/         
     %@@@@@@@@/   @@@@@@@@@@,   @@        @@,     *@@    ,,,,,,,,,,,,,,    %@@@@@@(     @@@@@@@@@@@ 
                                                         ,,,,,,,,,,,,,,                             
 ........................................................,,,,,,,,,,,,,,............................                                                                                                                                          
                                                         ,,,,,,,,,,,,.                                                                                                                                                                       
                                                            ,,,,,,,,                                                                                                                                                                         
                                                               .,                                                                                                                                                                            

Ange lösenord: h3mlig!
Du fann vårt hemliga lösenord. Men var är flaggan?
```

Analyze `SuperSecretLogonTool` in Ghidra and you will find a `print_flag` function which will not be called.

Debug the binary with GDB and jump to the found `print_flag` function:

```bash
$ gdb ./SuperSecretLogonTool 
GNU gdb (Debian 10.1-2) 10.1.90.20210103-git
Copyright (C) 2021 Free Software Foundation, Inc.                                                                                                                                                                                            
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
Type "show copying" and "show warranty" for details.
This GDB was configured as "x86_64-linux-gnu".
Type "show configuration" for configuration details.
For bug reporting instructions, please see:
<https://www.gnu.org/software/gdb/bugs/>.
Find the GDB manual and other documentation resources online at:
    <http://www.gnu.org/software/gdb/documentation/>.

For help, type "help".
Type "apropos word" to search for commands related to "word"...
Reading symbols from ./SuperSecretLogonTool...
(No debugging symbols found in ./SuperSecretLogonTool)
(gdb) break main
Breakpoint 1 at 0x4014ed
(gdb) run
Starting program: /home/mib/tools/volatility/TEST/home/user/SuperSecretLogonTool 

Breakpoint 1, 0x00000000004014ed in main ()
(gdb) jump *print_flag
Continuing at 0x4011d6.
Bra gjort! Här kommer flaggan: CTF[Stackars_Myrstack]
[Inferior 1 (process 3690) exited normally]
(gdb) 
```

Flagga: **CTF[Stackars_Myrstack]**

---

# Flagga 3
7zip-filen `broadcast.7z` har en katlaog som heter Zippper som innehåller `.secret` där mapparna `!` och `-` är lösenordsskyddade.
Dock består den också av följabde mappar `0`, `4`, `5`, `c`, `D`, `h`, `j`, `k`, `l`, `m`, `o` som inte är lösenordskyddade och innehåller tommat filer:
```
0 -> 3
4 -> 6
5 -> 11
c -> 1 
D -> 7 
h -> 2
j -> 10
k -> 4
l -> 5
m -> 8
o -> 9
```

Hittade:
3 6 11 1 7 2 10 4 5 8 9

I rätt ordning:
```
1 2 3 4 5 6 7 8 9 10 11
c h 0 k l 4 D m 9 j  5
```

Lösenord: ch0kl4Dmoj5

Packa upp med lösenordet och hitta flaggan.

Flagga: **CTF[skulle_skippat_linbanan]**

---

# Flagga 4 
1. I Networkminer frame 21123 -> DCC SEND startas. 
2. Gå in i Wireshark och på leta fram frame 21123 och utgå därifrån. 
3. Gå sedan till frame 21144 där det är det lite större fil klicka på "Follow TCP stream" vilket är "tcp.stream eq 270"
4. Syns PK (vilket är en zip.fil) välj "Show data as Raw" och tryck "Save as" och spara som en zip-fil.
5. Zip-filen innehåller doc.kml vilek är Google Earth koordinater.
6. Gå till https://earth.google.com/web/ och ladda in doc.kml-filen 
7. Som skriver ut följande bokstäver: XGU[IVHRORVMH] -> CTF[RESILIENS].
    Första kolumnen (Kol 1) är bokstäverna i Google map = XGU[IVHRORVMH].
    Andra kolumnen (Kol 2) är i klartext vi vet att X=C, G=T, U=F så det blir CTF[RESILIENS]

```
Kol 1    Kol 2
A	      Z
B	      Y
C	      X
D	      W
E	      V
F	      U
G	      T
H	      S
I	      R
J	      Q
K	      P
L	      O
M	      N
N	      M
O	      L
P	      K
Q	      J
R	      I
S	      H
T	      G
U	      F
V	      E
W	      D
X	      C
Y	      B
Z	      A
```
 
XGU[IVHRORVMH] -> CTF[RESILIENS]

Flagga: **CTF[RESILIENS]**

---

# Flagga 5
Starta qsstv och tryck på receive och spela upp ljudet "broadcast.wav" så kommer det fram en bild med flaggan..

Flagga: **CTF[RYMDLJUD]** 

---

# Flagga 6
giveup.jpg has a QR-code: `aHR0cHM6Ly95b3V0dS5iZS9kUXc0dzlXZ1hjUQ==`

```bash
$ echo -n "aHR0cHM6Ly95b3V0dS5iZS9kUXc0dzlXZ1hjUQ==" | base64 -d
https://youtu.be/dQw4w9WgXcQ -> Rick Rowling
	   
Password: Just press ENTER

$ steghide info giveup.jpg                                                                                                                                                                                                    "giveup.jpg":
  format: jpeg
  capacity: 765.0 Byte
Try to get information about embedded data ? (y/n) y
Enter passphrase: 
  embedded file "flag.txt":
    size: 15.0 Byte
    encrypted: rijndael-128, cbc
    compressed: yes

$ steghide extract -sf giveup.jpg
Enter passphrase: 
wrote extracted data to "flag.txt".
$ cat flag.txt                                    
CTF[chameleon]
```

Flagga: **CTF[chameleon]**

---

# Random
Lite lösenord:
- R0tmosp4stej		-> FTP-login User: sippen
- sm0rdegstras1g		-> FTP-login User: kammen
- Nyckelpiga 17173 	-> I IRC-chatten
- rootroot 		-> Lösenord för användarna "User" och "root" i memdump4.dmp
- h3mlig! 		-> SuperSecretLogonTool
- ch0kl4Dmoj5 		-> Från broadcast.7z

```bash
$ cat /etc/shadow
root:$6$9MBIewgJ$RbjupMzqVnnc9LcpODmf.bWrJB19WiCC218cbBgniN8YptejYsiSZ4HGbHuNOdI99/ENsqDev4UXc4SJ1SWHQ0:18842:0:99999:7:::
user:$6$WmAe9QuJ$LhpcIKL3YCpdCPbTkIN0DV2XpBBJtjPRgT6KhCgaR4M9nl/4g2kmSaRTZBliTc4F.dIHc6.8hs5VbIkPp4F1w0:18842:0:99999:7:::

$ hashcat -a 0 -m 1800 Desktop/hash.txt hc/Dicts/ --show
$6$WmAe9QuJ$LhpcIKL3YCpdCPbTkIN0DV2XpBBJtjPRgT6KhCgaR4M9nl/4g2kmSaRTZBliTc4F.dIHc6.8hs5VbIkPp4F1w0:rootroot
$6$9MBIewgJ$RbjupMzqVnnc9LcpODmf.bWrJB19WiCC218cbBgniN8YptejYsiSZ4HGbHuNOdI99/ENsqDev4UXc4SJ1SWHQ0:rootroot
```
---