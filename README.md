![](https://imgur.com/I5hgkvq.png)
## 🥇 1st Place Winner at [HackKosice](https://hackkosice.com/)🥇
This project was presented at the [HackKosice](https://hackkosice.com/) hackathon and won the following prizes:
* Top Team Overall
* Hack Kosice Top 3 finalist
* Best IoT Hack using a Qualcomm Device

## Check out the demo! 🎥🛒

[![Demo](http://img.youtube.com/vi/lWFueaT09S4/0.jpg)](https://www.youtube.com/watch?v=lWFueaT09S4 "Demo")

### Built by
* [Alvaro Rausell Guiard](https://github.com/AlvaroRausell/)
* [Danilo Del Busso](https://github.com/danilo-delbusso/)
* [Luka Kralj](https://github.com/lukakralj)

## What's the idea?
Coming from similar regions as Košice, we figured there are many remote villages with a long ride from bigger grocery and medicine suppliers. Often people living in such areas turn out to be the elderly, who might not be able to drive themselves to the shops everyday. Hence, their children have to go and take them around which might not always be possible, due to work, family etc. On the first thought, an online shopping could be a solution but a lot of people are still not comfortable using it, and more importantly, large vendors like Amazon usually don't even deliver in such areas - at least not for a reasonable price.

Therefore, we designed a system which allows the elderly (and others) to scan their handwritten shopping lists and automatically issues a delivery order at their preferred supplier. We figured that many people are still not comfortable using smart phones and many don't even own them.

## What is it
The app is split into two components:

One is a small device, powered by the Dragonboard 410c, it uses facial recognition to identify the user and then allows scanning of the handwritten list and digitalises . It then displays a list and asks for a confirmation.

The second part is a web application that is meant to be used by the vendors. They can manage their orders there, update prices and send SMS receipts to the users to inform them about the price they'll need to pay. The system also maps an efficient root for the vendor to deliver everything.

<img src="https://i.imgur.com/uoNylF3.png" data-canonical-src="https://i.imgur.com/uoNylF3.png" width="500" height="500" />

*Fig 1 - A view of the DragonBoard's screen and the Shop Dashboard*
## How we built it
We used Dragonboard 410c and a webcam for the face and list scanning and processing.
The web application is built with NodeJs, MongooseDB, and Socket.io.

![The Qualcomm Dragonboard 410c](https://developer.qualcomm.com/sites/default/files/attachments/db410c-top1.png)

*Fig 2 - The Qualcomm Dragonboard 410c used for the project*
## External links

* [Devpost](https://devpost.com/software/easy-nakup)
* [HackKosice](https://hackkosice.com/)
* [Qualcomm DragonBoard 410c Development Board](https://developer.qualcomm.com/hardware/dragonboard-410c)

## ⚠WARNING⚠

This build is highly unstable as it was developed in 24 hours.
All the developers were high on ☕☕ caffeine ☕☕ and and/or 🥟pieroghi🥟 and barely made it out alive.
Use at your own risk.

![](https://media.giphy.com/media/z5ClThZt4zJ04/giphy.gif)

### P.S.: WE ARE SORRY FOR THE COMMIT MESSAGES
![](https://media.giphy.com/media/xT3i1guCHAImD167yE/giphy.gif)

![](https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif)

*Fig 3 - One of the mentors at [HackKosice](https://hackkosice.com/) debugging our code just minutes before the demo*
